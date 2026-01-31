import Stripe from "stripe";
import { NextResponse } from "next/server";

import { createClaimToken } from "@/lib/claimToken";
import { sendClaimLinkEmail } from "@/lib/email";
import {
  getStripe,
  isPaidSession,
  mergeMetadata,
  resolveTicketTier,
} from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getWebhookSecret = () => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  return secret;
};

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      getWebhookSecret()
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const sessionData = event.data.object as Stripe.Checkout.Session;
    const sessionId = sessionData.id;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer_details", "line_items", "payment_intent"],
      });

      if (!isPaidSession(session)) {
        return NextResponse.json({ received: true, skipped: "not_paid" });
      }

      const ticketTier = resolveTicketTier(session);
      const claimToken = createClaimToken(sessionId);
      const claimTokenIssuedAt = new Date().toISOString();
      const email =
        session.customer_details?.email ?? session.customer_email ?? undefined;

      let emailSent = false;
      let emailSentAt: string | undefined;

      if (email) {
        try {
          await sendClaimLinkEmail({
            email,
            claimToken,
            ticketTier,
            sessionId,
          });
          emailSent = true;
          emailSentAt = new Date().toISOString();
        } catch (error) {
          console.error("Failed to send claim email", error);
        }
      } else {
        console.warn("No customer email found for session", sessionId);
      }

      const claimedValue = session.metadata?.claimed === "true" ? "true" : "false";
      const metadata = mergeMetadata(session.metadata, {
        ticketTier,
        claimTokenIssuedAt,
        claimed: claimedValue,
        emailSent: emailSent ? "true" : "false",
        emailSentAt,
      });

      await stripe.checkout.sessions.update(sessionId, { metadata });

      return NextResponse.json({ received: true, emailSent });
    } catch (error) {
      console.error("Stripe webhook handler failed", error);
      return NextResponse.json(
        { received: true, error: "handler_failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

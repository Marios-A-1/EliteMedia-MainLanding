import Stripe from "stripe";
import { NextResponse } from "next/server";

import { createClaimToken } from "@/lib/claimToken";
import { sendClaimLinkEmail } from "@/lib/email";
import { getStripe, isPaidSession, mergeMetadata, resolveTicketTier } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  sessionId?: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RequestBody | null;
  const sessionId = body?.sessionId?.trim();

  if (!sessionId) {
    return NextResponse.json(
      { ok: false, status: "missing_session_id" },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details", "line_items", "payment_intent"],
    });
  } catch (error) {
    console.error("Failed to retrieve Stripe session", error);
    return NextResponse.json(
      { ok: false, status: "session_not_found" },
      { status: 404 }
    );
  }

  if (!isPaidSession(session)) {
    return NextResponse.json(
      { ok: false, status: "not_paid" },
      { status: 400 }
    );
  }

  if (session.metadata?.claimed === "true") {
    return NextResponse.json(
      { ok: false, status: "already_claimed" },
      { status: 409 }
    );
  }

  const email =
    body?.email?.trim() || session.customer_details?.email || session.customer_email;

  if (!email) {
    return NextResponse.json(
      { ok: false, status: "missing_email" },
      { status: 400 }
    );
  }

  const ticketTier = resolveTicketTier(session);
  const claimToken = createClaimToken(sessionId);
  const claimTokenIssuedAt = new Date().toISOString();

  let emailSent = false;
  let emailSentAt: string | undefined;

  try {
    await sendClaimLinkEmail({ email, claimToken, ticketTier, sessionId });
    emailSent = true;
    emailSentAt = new Date().toISOString();
  } catch (error) {
    console.error("Failed to send claim email", error);
  }

  const metadata = mergeMetadata(session.metadata, {
    ticketTier,
    claimTokenIssuedAt,
    claimed: session.metadata?.claimed === "true" ? "true" : "false",
    emailSent: emailSent ? "true" : "false",
    emailSentAt,
  });

  await stripe.checkout.sessions.update(sessionId, { metadata });

  return NextResponse.json({ ok: true, status: "sent", emailSent });
}

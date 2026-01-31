import Stripe from "stripe";
import { NextResponse } from "next/server";

import { verifyClaimToken } from "@/lib/claimToken";
import { sendTicketConfirmedEmail } from "@/lib/email";
import { appendClaimRow } from "@/lib/googleSheets";
import { getStripe, isPaidSession, mergeMetadata, resolveTicketTier } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  tokenOrSessionId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
};

const isStripeSessionId = (value: string) => value.startsWith("cs_");

const resolveSessionId = (tokenOrSessionId: string) => {
  if (isStripeSessionId(tokenOrSessionId)) {
    return { sessionId: tokenOrSessionId } as const;
  }

  const result = verifyClaimToken(tokenOrSessionId);
  if (!result.valid) {
    return { error: result.reason } as const;
  }

  return { sessionId: result.payload.sid } as const;
};

const getPaymentIntentId = (session: Stripe.Checkout.Session) => {
  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }
  if (session.payment_intent && typeof session.payment_intent === "object") {
    return session.payment_intent.id;
  }
  return null;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RequestBody | null;

  const tokenOrSessionId = body?.tokenOrSessionId?.trim();
  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim();
  const phone = body?.phone?.trim();

  if (!tokenOrSessionId || !fullName || !email || !phone) {
    return NextResponse.json(
      { ok: false, status: "missing_fields" },
      { status: 400 }
    );
  }

  const resolved = resolveSessionId(tokenOrSessionId);
  if ("error" in resolved) {
    return NextResponse.json(
      { ok: false, status: resolved.error === "expired" ? "expired" : "invalid" },
      { status: 400 }
    );
  }

  const stripe = getStripe();

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(resolved.sessionId, {
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

  const ticketTier = resolveTicketTier(session);
  const claimedAt = new Date().toISOString();

  const metadata = mergeMetadata(session.metadata, {
    ticketTier,
    claimed: "true",
    claimedAt,
    claimedName: fullName,
    claimedEmail: email,
    claimedPhone: phone,
  });

  await stripe.checkout.sessions.update(resolved.sessionId, { metadata });

  await appendClaimRow({
    timestamp: claimedAt,
    ticketTier,
    fullName,
    email,
    phone,
    sessionId: resolved.sessionId,
    paymentIntentId: getPaymentIntentId(session),
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
  });

  try {
    await sendTicketConfirmedEmail({
      email,
      fullName,
      ticketTier,
      sessionId: resolved.sessionId,
    });
  } catch (error) {
    console.error("Failed to send confirmation email", error);
  }

  return NextResponse.json({ ok: true, status: "claimed", ticketTier });
}
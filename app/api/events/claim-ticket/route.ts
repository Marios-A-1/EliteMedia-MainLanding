import Stripe from "stripe";
import { NextResponse } from "next/server";

import { sendTicketConfirmedEmail } from "@/lib/email";
import { appendClaimRow } from "@/lib/googleSheets";
import { getStripe, isPaidSession, mergeMetadata } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  sessionId?: string;
  tier?: "regular" | "vip";
  fullName?: string;
  email?: string;
  phone?: string;
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

  const sessionId = body?.sessionId?.trim();
  const tier = body?.tier;
  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim();
  const rawPhone = body?.phone?.trim();
  const phone = rawPhone ? rawPhone.replace(/[^\d+]/g, "") : "";

  if (!sessionId || !tier || !fullName || !email || !phone) {
    return NextResponse.json(
      { ok: false, status: "missing_fields" },
      { status: 400 }
    );
  }

  if (!/^\+?\d{8,15}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, status: "invalid_phone" },
      { status: 400 }
    );
  }

  if (tier !== "regular" && tier !== "vip") {
    return NextResponse.json(
      { ok: false, status: "invalid_tier" },
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

  const claimedAt = new Date().toISOString();

  const metadata = mergeMetadata(session.metadata, {
    claimed: "true",
    claimedAt,
    claimedTier: tier,
    claimedName: fullName,
    claimedEmail: email,
    claimedPhone: phone,
  });

  await stripe.checkout.sessions.update(sessionId, { metadata });

  await appendClaimRow({
    timestamp: claimedAt,
    ticketTier: tier,
    fullName,
    email,
    phone,
    sessionId,
    paymentIntentId: getPaymentIntentId(session),
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
  });

  if (process.env.EMAIL_PROVIDER_API_KEY) {
    try {
      await sendTicketConfirmedEmail({
        email,
        fullName,
        ticketTier: tier,
        sessionId,
      });
    } catch (error) {
      console.error("Failed to send confirmation email", error);
    }
  } else {
    console.warn("Email provider not configured; skipping confirmation email.");
  }

  return NextResponse.json({ ok: true, status: "claimed", ticketTier: tier });
}

import Stripe from "stripe";
import { NextResponse } from "next/server";

import { isEmailConfigured, sendTicketConfirmedEmail } from "@/lib/email";
import { appendClaimRow } from "@/lib/googleSheets";
import { sendMetaPurchaseEvent } from "@/lib/metaCapi";
import {
  getStripe,
  isPaidSession,
  mergeMetadata,
  resolveTicketTier,
} from "@/lib/stripe";
import { generateTicketCode } from "@/lib/ticketCode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  sessionId?: string;
  tier?: "regular" | "vip" | "online";
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

const normalizeTicketTier = (value: string | undefined) => {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  if (normalized.includes("regular")) {
    return "regular" as const;
  }
  if (normalized.includes("vip")) {
    return "vip" as const;
  }
  if (normalized.includes("online")) {
    return "online" as const;
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

  if (!sessionId || !fullName || !email || !phone) {
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

  if (tier && tier !== "regular" && tier !== "vip" && tier !== "online") {
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

  const resolvedTier = normalizeTicketTier(resolveTicketTier(session));
  const claimedTier = resolvedTier ?? normalizeTicketTier(tier);

  if (!claimedTier) {
    return NextResponse.json(
      { ok: false, status: "invalid_tier" },
      { status: 400 }
    );
  }

  const hasSentMetaPurchase = session.metadata?.metaPurchaseSent === "true";
  let metaPurchaseSent = hasSentMetaPurchase;
  let metaPurchaseSentAt = session.metadata?.metaPurchaseSentAt;

  if (!hasSentMetaPurchase) {
    try {
      const amountTotal =
        typeof session.amount_total === "number"
          ? session.amount_total / 100
          : undefined;

      const metaResult = await sendMetaPurchaseEvent({
        eventId: `stripe_checkout_${session.id}`,
        email: email || session.customer_details?.email || session.customer_email || undefined,
        fbp: session.metadata?.fbp,
        fbc: session.metadata?.fbc,
        value: amountTotal,
        currency: session.currency ?? undefined,
      });

      if (metaResult.sent) {
        metaPurchaseSent = true;
        metaPurchaseSentAt = new Date().toISOString();
      } else {
        console.warn("Meta CAPI purchase event skipped in claim flow", metaResult);
      }
    } catch (error) {
      console.error("Failed to send Meta CAPI purchase event from claim flow", error);
    }
  }

  const claimedAt = new Date().toISOString();
  const ticketCode = session.metadata?.ticketCode?.trim() || generateTicketCode();

  const metadata = mergeMetadata(session.metadata, {
    claimed: "true",
    claimedAt,
    claimedTier,
    claimedName: fullName,
    claimedEmail: email,
    claimedPhone: phone,
    ticketCode,
    metaPurchaseSent: metaPurchaseSent ? "true" : "false",
    metaPurchaseSentAt,
  });

  await stripe.checkout.sessions.update(sessionId, { metadata });

  await appendClaimRow({
    timestamp: claimedAt,
    ticketTier: claimedTier,
    fullName,
    email,
    phone,
    ticketCode,
    sessionId,
    paymentIntentId: getPaymentIntentId(session),
    amountTotal: session.amount_total ?? null,
    currency: session.currency ?? null,
  });

  if (isEmailConfigured()) {
    try {
      await sendTicketConfirmedEmail({
        email,
        fullName,
        ticketTier: claimedTier,
        sessionId,
        ticketCode,
      });
    } catch (error) {
      console.error("Failed to send confirmation email", error);
    }
  } else {
    console.warn(
      "Email provider not configured; set RESEND_API_KEY/RESEND_FROM or EMAIL_PROVIDER_API_KEY/EMAIL_FROM."
    );
  }

  return NextResponse.json({ ok: true, status: "claimed", ticketTier: claimedTier });
}

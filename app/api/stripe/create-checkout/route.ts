import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/appUrl";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TicketTier = "regular" | "vip";

type RequestBody = {
  ticketTier?: TicketTier;
  email?: string;
};

const resolvePriceId = (tier: TicketTier) => {
  if (tier === "regular") {
    return process.env.STRIPE_REGULAR_PRICE_ID;
  }
  if (tier === "vip") {
    return process.env.STRIPE_VIP_PRICE_ID;
  }
  return undefined;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RequestBody | null;

  if (!body?.ticketTier) {
    return NextResponse.json({ error: "missing_ticket_tier" }, { status: 400 });
  }

  const priceId = resolvePriceId(body.ticketTier);
  if (!priceId) {
    return NextResponse.json({ error: "invalid_ticket_tier" }, { status: 400 });
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/events/claim-ticket/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/events`,
    metadata: {
      ticketTier: body.ticketTier,
    },
    customer_email: body.email,
  });

  return NextResponse.json({ url: session.url });
}
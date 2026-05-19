import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/appUrl";
import { getPhysicalTicketAvailability } from "@/lib/eventCapacity";
import { getClaimedTicketCounts } from "@/lib/googleSheets";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TicketTier = "regular" | "vip";

type RequestBody = {
  ticketTier?: TicketTier;
  email?: string;
};

const readCookie = (cookieHeader: string | null, name: string) => {
  if (!cookieHeader) {
    return undefined;
  }

  const target = `${name}=`;
  const parts = cookieHeader.split(";");

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(target)) {
      continue;
    }

    const rawValue = trimmed.slice(target.length);
    if (!rawValue) {
      return undefined;
    }

    try {
      return decodeURIComponent(rawValue);
    } catch {
      return rawValue;
    }
  }

  return undefined;
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

  const counts = await getClaimedTicketCounts();
  if (counts) {
    const availability = getPhysicalTicketAvailability(
      body.ticketTier,
      counts[body.ticketTier]
    );
    if (availability.soldOut) {
      return NextResponse.json(
        { error: "ticket_tier_sold_out" },
        { status: 409 }
      );
    }
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();
  const successPath =
    body.ticketTier === "vip"
      ? "/events/claim-ticket/vip"
      : "/events/claim-ticket/regular";
  const cookieHeader = request.headers.get("cookie");
  const fbp = readCookie(cookieHeader, "_fbp");
  const fbc = readCookie(cookieHeader, "_fbc");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/events`,
    metadata: {
      ticketTier: body.ticketTier,
      ...(fbp ? { fbp } : {}),
      ...(fbc ? { fbc } : {}),
    },
    customer_email: body.email,
  });

  return NextResponse.json({ url: session.url });
}

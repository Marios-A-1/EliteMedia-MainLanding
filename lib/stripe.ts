import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export const getStripe = () => {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return stripeClient;
};

export const isPaidSession = (session: Stripe.Checkout.Session) => {
  if (session.payment_status === "paid") {
    return true;
  }

  if (session.status === "complete") {
    return true;
  }

  return false;
};

export const resolveTicketTier = (session: Stripe.Checkout.Session) => {
  const metadataTier = session.metadata?.ticketTier?.trim();
  if (metadataTier) {
    return metadataTier;
  }

  const successUrl = session.success_url?.toLowerCase();
  if (successUrl?.includes("/claim-ticket/online")) {
    return "online";
  }
  if (successUrl?.includes("/claim-ticket/vip")) {
    return "vip";
  }
  if (successUrl?.includes("/claim-ticket/regular")) {
    return "regular";
  }

  const regularPrice = process.env.STRIPE_REGULAR_PRICE_ID;
  const vipPrice = process.env.STRIPE_VIP_PRICE_ID;
  const onlinePrice = process.env.STRIPE_ONLINE_PRICE_ID;
  const lineItems = session.line_items?.data ?? [];

  for (const item of lineItems) {
    const priceId = item.price?.id;
    if (priceId && regularPrice && priceId === regularPrice) {
      return "regular";
    }
    if (priceId && vipPrice && priceId === vipPrice) {
      return "vip";
    }
    if (priceId && onlinePrice && priceId === onlinePrice) {
      return "online";
    }
    if (item.price?.nickname) {
      return item.price.nickname;
    }
    if (item.description) {
      return item.description;
    }
  }

  return "unknown";
};

export const mergeMetadata = (
  existing: Stripe.Metadata | null | undefined,
  updates: Record<string, string | undefined>
) => {
  const merged: Record<string, string> = {};
  if (existing) {
    for (const [key, value] of Object.entries(existing)) {
      if (typeof value === "string") {
        merged[key] = value;
      }
    }
  }
  for (const [key, value] of Object.entries(updates)) {
    if (typeof value === "string") {
      merged[key] = value;
    }
  }
  return merged;
};

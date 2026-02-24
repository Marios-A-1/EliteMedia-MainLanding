const fallbackLink = "mailto:admin@elite-media.gr";

const resolveEnvLink = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value : fallback;

export const REGULAR_EARLY_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_REGULAR_LINK,
  fallbackLink
);
export const REGULAR_LATE_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_REGULAR_LINK_EXPIRED,
  fallbackLink
);
export const VIP_EARLY_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_VIP_LINK,
  fallbackLink
);
export const VIP_LATE_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_VIP_LINK_EXPIRED,
  fallbackLink
);
export const ONLINE_STATIC_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_ONLINE_LINK ??
    process.env.NEXT_PUBLIC_STRIPE_20_EURO_LINK,
  fallbackLink
);

export const resolveEventTicketLink = (
  isExpired: boolean,
  early: string,
  late: string
) => (isExpired ? late : early);

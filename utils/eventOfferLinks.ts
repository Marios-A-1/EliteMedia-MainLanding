const fallbackLink = "mailto:hello@elitemedia.com";

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

export const resolveEventTicketLink = (
  isExpired: boolean,
  early: string,
  late: string
) => (isExpired ? late : early);

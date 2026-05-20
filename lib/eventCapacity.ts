export type PhysicalTicketTier = "regular" | "vip";
export type EventTicketTier = PhysicalTicketTier | "online";

export const EVENT_TICKET_CAPACITY: Record<PhysicalTicketTier, number> = {
  vip: 20,
  regular: 80,
};

export const PHYSICAL_TICKET_TIERS: PhysicalTicketTier[] = ["regular", "vip"];

export const PHYSICAL_TICKET_TOTAL = Object.values(EVENT_TICKET_CAPACITY).reduce(
  (total, capacity) => total + capacity,
  0
);

export type TicketClaimCounts = Record<EventTicketTier, number>;

export const EMPTY_TICKET_CLAIM_COUNTS: TicketClaimCounts = {
  regular: 0,
  vip: 0,
  online: 0,
};

export const normalizeEventTicketTier = (
  value: string | undefined
): EventTicketTier | null => {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  if (normalized.includes("regular")) {
    return "regular";
  }
  if (normalized.includes("vip")) {
    return "vip";
  }
  if (normalized.includes("online")) {
    return "online";
  }
  return null;
};

export const getRemainingPhysicalTickets = (
  tier: PhysicalTicketTier,
  claimed: number
) => Math.max(0, EVENT_TICKET_CAPACITY[tier] - claimed);

export const getPhysicalTicketAvailability = (
  tier: PhysicalTicketTier,
  claimed: number
) => {
  const capacity = EVENT_TICKET_CAPACITY[tier];
  const remaining = getRemainingPhysicalTickets(tier, claimed);

  return {
    capacity,
    claimed,
    remaining,
    soldOut: remaining <= 0,
  };
};

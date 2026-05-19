import { NextResponse } from "next/server";

import {
  EMPTY_TICKET_CLAIM_COUNTS,
  PHYSICAL_TICKET_TOTAL,
  getPhysicalTicketAvailability,
} from "@/lib/eventCapacity";
import { getClaimedTicketCounts } from "@/lib/googleSheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const buildSeatsResponse = (
  counts: typeof EMPTY_TICKET_CLAIM_COUNTS,
  ok: boolean
) => {
  const regular = getPhysicalTicketAvailability("regular", counts.regular);
  const vip = getPhysicalTicketAvailability("vip", counts.vip);
  const remaining = regular.remaining + vip.remaining;
  const claimed = regular.claimed + vip.claimed;

  return {
    ok,
    total: PHYSICAL_TICKET_TOTAL,
    remaining,
    claimed,
    tiers: {
      regular,
      vip,
      online: {
        capacity: null,
        claimed: counts.online,
        remaining: null,
        soldOut: false,
      },
    },
  };
};

export async function GET() {
  const counts = await getClaimedTicketCounts();

  if (counts === null) {
    return NextResponse.json(
      buildSeatsResponse(EMPTY_TICKET_CLAIM_COUNTS, false)
    );
  }

  return NextResponse.json(buildSeatsResponse(counts, true));
}

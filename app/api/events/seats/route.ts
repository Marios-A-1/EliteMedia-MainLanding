import { NextResponse } from "next/server";

import { getClaimedRowsCount } from "@/lib/googleSheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOTAL_SEATS = 100;

export async function GET() {
  const claimed = await getClaimedRowsCount();

  if (claimed === null) {
    return NextResponse.json({
      ok: false,
      total: TOTAL_SEATS,
      remaining: TOTAL_SEATS,
    });
  }

  const remaining = Math.max(0, TOTAL_SEATS - claimed);

  return NextResponse.json({
    ok: true,
    total: TOTAL_SEATS,
    remaining,
    claimed,
  });
}

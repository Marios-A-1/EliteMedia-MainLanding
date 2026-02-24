import { NextResponse } from "next/server";

import { appendLeadRow } from "@/lib/googleSheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  source?: string;
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");
const isValidPhone = (value: string) => /^\+?\d{8,15}$/.test(value);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RequestBody | null;

  const fullName = body?.fullName?.trim();
  const email = body?.email?.trim();
  const rawPhone = body?.phone?.trim();
  const source = body?.source?.trim();
  const phone = rawPhone ? normalizePhone(rawPhone) : "";

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { ok: false, status: "missing_fields" },
      { status: 400 }
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, status: "invalid_phone" },
      { status: 400 }
    );
  }

  const appendResult = await appendLeadRow({
    fullName,
    email,
    phone,
    source,
  });

  if (!appendResult.ok) {
    return NextResponse.json(
      { ok: false, status: "sheet_error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, status: "lead_saved" });
}

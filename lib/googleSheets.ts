import { google } from "googleapis";

export type ClaimSheetRow = {
  timestamp: string;
  ticketTier?: string;
  fullName: string;
  email: string;
  phone: string;
  sessionId: string;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
};

let sheetsClientPromise: ReturnType<typeof getSheetsClient> | null = null;

const getSheetsConfig = () => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || "Sheet1";

  if (!clientEmail || !privateKey || !sheetId) {
    return null;
  }

  return { clientEmail, privateKey, sheetId, tabName };
};

const getSheetsClient = async () => {
  const config = getSheetsConfig();
  if (!config) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
};

export const appendClaimRow = async (row: ClaimSheetRow) => {
  if (!sheetsClientPromise) {
    sheetsClientPromise = getSheetsClient();
  }

  const sheets = await sheetsClientPromise;
  const config = getSheetsConfig();

  if (!sheets || !config) {
    console.warn("Google Sheets not configured; skipping append.");
    return { ok: false, skipped: true } as const;
  }

  const values = [
    [
      row.fullName,
      row.phone,
      row.email,
      row.ticketTier ?? "",
      row.amountTotal === 0 ? "Yes" : "",
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: config.sheetId,
      range: `${config.tabName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    return { ok: true } as const;
  } catch (error) {
    console.error("Failed to append Google Sheets row", error);
    return { ok: false, skipped: false } as const;
  }
};

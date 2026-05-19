import { getAppUrl } from "@/lib/appUrl";
import { buildTicketConfirmedTemplate } from "@/lib/emailTemplates/ticketConfirmedTemplate";
import { EVENT_CONFIG } from "@/lib/eventConfig";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const getEmailConfig = () => {
  const apiKey =
    process.env.RESEND_API_KEY || process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.RESEND_FROM || process.env.EMAIL_FROM;

  return {
    apiKey,
    from,
    isConfigured: Boolean(apiKey && from),
  };
};

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

const sendEmail = async ({ to, subject, html, text }: SendEmailInput) => {
  const { apiKey, from } = getEmailConfig();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY or EMAIL_PROVIDER_API_KEY is not set");
  }

  if (!from) {
    throw new Error("RESEND_FROM or EMAIL_FROM is not set");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Email send failed (${response.status}): ${errorText}`);
  }

  return response.json();
};

export const isEmailConfigured = () => getEmailConfig().isConfigured;

type ClaimLinkEmailInput = {
  email: string;
  claimToken: string;
  ticketTier?: string;
  sessionId: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatTicketTier = (ticketTier?: string) => {
  switch (ticketTier?.trim().toLowerCase()) {
    case "vip":
      return "VIP Access";
    case "regular":
      return "In-Person Access";
    case "online":
      return "Online Access";
    default:
      return ticketTier ?? "";
  }
};

export const sendClaimLinkEmail = async ({
  email,
  claimToken,
  ticketTier,
  sessionId,
}: ClaimLinkEmailInput) => {
  const appUrl = getAppUrl();
  const claimUrl = `${appUrl}/events/claim-ticket/${claimToken}`;
  const subject = "Ολοκλήρωσε την καταχώρηση του εισιτηρίου σου | THYMIOLAS";
  const displayTier = formatTicketTier(ticketTier);
  const tierLine = displayTier ? `Κατηγορία: ${displayTier}` : "";

  const text = [
    "Η πληρωμή σου ολοκληρώθηκε με επιτυχία.",
    "",
    "Για να εκδοθεί το τελικό εισιτήριο, συμπλήρωσε τα στοιχεία σου στον παρακάτω σύνδεσμο:",
    claimUrl,
    "",
    `Event: ${EVENT_CONFIG.EVENT_TITLE}`,
    `Ημερομηνία: ${EVENT_CONFIG.EVENT_DATETIME_LABEL}`,
    `Ώρα: ${EVENT_CONFIG.EVENT_TIME_LABEL}`,
    tierLine,
    "",
    "Μετά την καταχώρηση θα λάβεις το τελικό email επιβεβαίωσης με τον κωδικό εισιτηρίου σου.",
    `Session: ${sessionId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html lang="el">
      <body style="margin:0;padding:0;background-color:#eef6ff;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:linear-gradient(180deg,#f8fbff 0%,#eef6ff 34%,#ffffff 100%);">
          <tr>
            <td align="center" style="padding:24px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:600px;">
                <tr>
                  <td style="padding:0 0 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#1d4ed8;background-image:linear-gradient(90deg,#1d4ed8 0%,#0ea5e9 48%,#38bdf8 100%);border-radius:28px;overflow:hidden;box-shadow:0 18px 42px rgba(37,99,235,0.24);">
                      <tr>
                        <td style="padding:24px 28px;">
                          <div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#dbeafe;">
                            THYMIOLAS EVENT
                          </div>
                          <div style="padding-top:10px;font-size:28px;line-height:34px;font-weight:900;color:#ffffff;">
                            Η πληρωμή ολοκληρώθηκε
                          </div>
                          <div style="padding-top:10px;font-size:15px;line-height:24px;font-weight:700;color:#eff6ff;">
                            Ένα τελευταίο βήμα: συμπλήρωσε τα στοιχεία σου για να εκδοθεί το τελικό εισιτήριο.
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #bfdbfe;border-radius:28px;box-shadow:0 18px 46px rgba(37,99,235,0.10);">
                      <tr>
                        <td style="padding:32px 28px 16px;">
                          <div style="font-size:18px;line-height:26px;font-weight:900;color:#0f172a;">
                            Ολοκλήρωσε την καταχώρηση του εισιτηρίου σου
                          </div>
                          <div style="padding-top:10px;font-size:16px;line-height:25px;font-weight:700;color:#475569;">
                            Η αγορά σου για το <span style="font-weight:900;color:#1d4ed8;">${escapeHtml(
                              EVENT_CONFIG.EVENT_TITLE
                            )}</span> έχει καταχωρηθεί. Πάτησε το κουμπί παρακάτω και συμπλήρωσε όνομα, email και τηλέφωνο ώστε να λάβεις το τελικό email επιβεβαίωσης με τον κωδικό εισιτηρίου.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 28px 18px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#f8fbff;border:1px solid #bfdbfe;border-radius:20px;">
                            <tr>
                              <td style="padding:16px;">
                                <div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Ημερομηνία</div>
                                <div style="padding-top:5px;font-size:16px;line-height:23px;font-weight:900;color:#0f172a;">${escapeHtml(
                                  EVENT_CONFIG.EVENT_DATETIME_LABEL
                                )}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding:0 16px 16px;">
                                <div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Ώρα</div>
                                <div style="padding-top:5px;font-size:16px;line-height:23px;font-weight:900;color:#0f172a;">${escapeHtml(
                                  EVENT_CONFIG.EVENT_TIME_LABEL
                                )}</div>
                              </td>
                            </tr>
                            ${
                              displayTier
                                ? `<tr><td style="padding:0 16px 16px;"><div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Κατηγορία</div><div style="padding-top:5px;font-size:16px;line-height:23px;font-weight:900;color:#0f172a;">${escapeHtml(
                                    displayTier
                                  )}</div></td></tr>`
                                : ""
                            }
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding:4px 28px 24px;">
                          <a href="${escapeHtml(
                            claimUrl
                          )}" style="display:inline-block;padding:15px 24px;border-radius:18px;border:1px solid #38bdf8;background:#1d4ed8;background-image:linear-gradient(90deg,#1d4ed8 0%,#0ea5e9 50%,#38bdf8 100%);color:#ffffff;font-size:15px;line-height:20px;font-weight:900;text-decoration:none;box-shadow:0 18px 42px rgba(37,99,235,0.22);">
                            Συμπλήρωσε τα στοιχεία σου
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 28px 28px;">
                          <div style="border-top:1px solid #dbeafe;padding-top:16px;font-size:12px;line-height:18px;font-weight:700;color:#64748b;">
                            Αυτό δεν είναι ακόμα το τελικό εισιτήριο. Μετά την καταχώρηση θα λάβεις ξεχωριστό email με τον κωδικό σου.<br />
                            Session reference: ${escapeHtml(sessionId)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return sendEmail({ to: email, subject, html, text });
};

type ConfirmationEmailInput = {
  email: string;
  fullName: string;
  ticketTier?: string;
  sessionId: string;
  ticketCode: string;
};

export const sendTicketConfirmedEmail = async ({
  email,
  fullName,
  ticketTier,
  sessionId,
  ticketCode,
}: ConfirmationEmailInput) => {
  const { subject, html, text } = buildTicketConfirmedTemplate({
    fullName,
    ticketTier,
    sessionId,
    ticketCode,
  });

  return sendEmail({ to: email, subject, html, text });
};

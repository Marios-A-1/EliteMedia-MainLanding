import { getAppUrl } from "@/lib/appUrl";
import { EVENT_CONFIG } from "@/lib/eventConfig";

type TicketConfirmedTemplateInput = {
  fullName: string;
  ticketTier?: string;
  sessionId: string;
  ticketCode: string;
};

type TicketConfirmedTemplate = {
  subject: string;
  html: string;
  text: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatTicketTier = (ticketTier?: string) => {
  switch (ticketTier) {
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

const buildDetailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:0 0 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#f8fbff;border:1px solid #bfdbfe;border-radius:18px;">
        <tr>
          <td style="padding:14px 16px;">
            <div style="font-size:12px;line-height:16px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;color:#64748b;">
              ${escapeHtml(label)}
            </div>
            <div style="padding-top:6px;font-size:16px;line-height:23px;font-weight:800;color:#0f172a;">
              ${escapeHtml(value)}
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`;

export const buildTicketConfirmedTemplate = ({
  fullName,
  ticketTier,
  sessionId,
  ticketCode,
}: TicketConfirmedTemplateInput): TicketConfirmedTemplate => {
  const appUrl = getAppUrl();
  const eventPageUrl = `${appUrl}/events`;
  const normalizedTier = ticketTier?.trim().toLowerCase();
  const isOnline = normalizedTier === "online";
  const displayTier = formatTicketTier(normalizedTier);
  const primaryCta = isOnline
    ? {
        label: "Δες τη σελίδα του event",
        href: eventPageUrl,
      }
    : {
        label: "Άνοιγμα διαδρομής",
        href: EVENT_CONFIG.GOOGLE_MAPS_DIRECTIONS_URL,
      };

  const secondaryCta = {
    label: "Προσθήκη στο ημερολόγιο",
    href: EVENT_CONFIG.GOOGLE_CALENDAR_URL,
  };

  const detailRows = [
    buildDetailRow("Event", EVENT_CONFIG.EVENT_TITLE),
    buildDetailRow("Ημερομηνία", EVENT_CONFIG.EVENT_DATETIME_LABEL),
    buildDetailRow("Ώρα", EVENT_CONFIG.EVENT_TIME_LABEL),
    isOnline
      ? buildDetailRow("Πρόσβαση", "Online Access")
      : buildDetailRow("Τοποθεσία", EVENT_CONFIG.EVENT_LOCATION_TEXT),
  ].join("");

  const subject = "Το εισιτήριό σου επιβεβαιώθηκε | THYMIOLAS";

  const text = [
    `Γεια σου ${fullName},`,
    "",
    "Η κράτησή σου επιβεβαιώθηκε.",
    `Κωδικός εισιτηρίου: ${ticketCode}`,
    displayTier ? `Κατηγορία: ${displayTier}` : "",
    `Event: ${EVENT_CONFIG.EVENT_TITLE}`,
    `Ημερομηνία: ${EVENT_CONFIG.EVENT_DATETIME_LABEL}`,
    `Ώρα: ${EVENT_CONFIG.EVENT_TIME_LABEL}`,
    isOnline
      ? "Πρόσβαση: Online Access"
      : `Τοποθεσία: ${EVENT_CONFIG.EVENT_LOCATION_TEXT}`,
    "",
    `Χρήσιμο link: ${primaryCta.href}`,
    `Ημερολόγιο: ${secondaryCta.href}`,
    `Event page: ${eventPageUrl}`,
    "",
    `Session: ${sessionId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html lang="el">
      <body style="margin:0;padding:0;background-color:#eef6ff;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:linear-gradient(180deg,#f8fbff 0%,#eef6ff 30%,#ffffff 60%,#f5faff 100%);background-color:#eef6ff;">
          <tr>
            <td align="center" style="padding:24px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:600px;">
                <tr>
                  <td style="padding:0 0 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#1d4ed8;background-image:linear-gradient(90deg,#1d4ed8 0%,#0ea5e9 42%,#38bdf8 100%);border-radius:28px;overflow:hidden;box-shadow:0 18px 42px rgba(37,99,235,0.24);">
                      <tr>
                        <td style="padding:24px 28px;">
                          <div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.16em;text-transform:uppercase;color:#dbeafe;">
                            THYMIOLAS EVENT
                          </div>
                          <div style="padding-top:10px;font-size:28px;line-height:34px;font-weight:900;color:#ffffff;">
                            Το εισιτήριό σου επιβεβαιώθηκε
                          </div>
                          <div style="padding-top:10px;font-size:15px;line-height:24px;font-weight:700;color:#eff6ff;">
                            Πρακτικό AI event για online income στην Ελλάδα με πραγματικό value, στρατηγικές και live Q&amp;A.
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
                        <td style="padding:32px 28px 18px;">
                          <div style="font-size:18px;line-height:26px;font-weight:800;color:#0f172a;">
                            Γεια σου ${escapeHtml(fullName)},
                          </div>
                          <div style="padding-top:10px;font-size:16px;line-height:25px;font-weight:700;color:#475569;">
                            Η κράτησή σου για το <span style="font-weight:900;color:#1d4ed8;">${escapeHtml(
                              EVENT_CONFIG.EVENT_TITLE
                            )}</span> καταχωρήθηκε κανονικά. Κράτησε τον παρακάτω κωδικό, γιατί είναι το βασικό reference του εισιτηρίου σου.
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 28px 20px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#f8fbff;border:1px solid #93c5fd;border-radius:24px;">
                            <tr>
                              <td align="center" style="padding:22px 20px 8px;">
                                <div style="font-size:12px;line-height:16px;font-weight:900;letter-spacing:0.12em;text-transform:uppercase;color:#1d4ed8;">
                                  Ο κωδικός εισιτηρίου σου
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:0 20px 8px;">
                                <div style="font-size:36px;line-height:40px;font-weight:900;letter-spacing:0.18em;color:#0f172a;font-family:'Courier New',Courier,monospace;">
                                  ${escapeHtml(ticketCode)}
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:0 20px 22px;">
                                <div style="font-size:14px;line-height:22px;font-weight:700;color:#64748b;">
                                  ${displayTier ? `Κατηγορία: ${escapeHtml(displayTier)}<br />` : ""}Κράτησέ τον διαθέσιμο για οτιδήποτε αφορά το εισιτήριό σου.
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 28px 8px;">
                          <div style="font-size:18px;line-height:24px;font-weight:900;color:#0f172a;">
                            Στοιχεία event
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 28px 10px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            ${detailRows}
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 28px 12px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr>
                              <td align="center" style="padding:0 0 14px;">
                                <a href="${escapeHtml(
                                  primaryCta.href
                                )}" style="display:inline-block;padding:15px 24px;border-radius:18px;border:1px solid #38bdf8;background:#1d4ed8;background-image:linear-gradient(90deg,#1d4ed8 0%,#0ea5e9 50%,#38bdf8 100%);color:#ffffff;font-size:15px;line-height:20px;font-weight:900;text-decoration:none;box-shadow:0 18px 42px rgba(37,99,235,0.22);">
                                  ${escapeHtml(primaryCta.label)}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:0 0 10px;">
                                <a href="${escapeHtml(
                                  secondaryCta.href
                                )}" style="font-size:14px;line-height:22px;font-weight:800;color:#1d4ed8;text-decoration:none;">
                                  ${escapeHtml(secondaryCta.label)}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding:0;">
                                <a href="${escapeHtml(
                                  eventPageUrl
                                )}" style="font-size:14px;line-height:22px;font-weight:700;color:#64748b;text-decoration:none;">
                                  Δες και τη σελίδα του event
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 28px 28px;">
                          <div style="border-top:1px solid #dbeafe;padding-top:16px;font-size:12px;line-height:18px;font-weight:700;color:#64748b;">
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

  return { subject, html, text };
};

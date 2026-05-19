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

export const sendClaimLinkEmail = async ({
  email,
  claimToken,
  ticketTier,
  sessionId,
}: ClaimLinkEmailInput) => {
  const appUrl = getAppUrl();
  const claimUrl = `${appUrl}/events/claim-ticket/${claimToken}`;
  const subject = "Your ticket claim link";
  const tierLine = ticketTier ? `Ticket tier: ${ticketTier}` : "";

  const text = [
    "Thanks for your purchase!",
    `Event date: ${EVENT_CONFIG.EVENT_DATETIME_LABEL}`,
    `Event time: ${EVENT_CONFIG.EVENT_TIME_LABEL}`,
    tierLine,
    "Claim your ticket here:",
    claimUrl,
    "",
    `Session: ${sessionId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2>Your ticket claim link</h2>
      <p>Thanks for your purchase! Use the link below to claim your ticket.</p>
      <p><strong>Event date:</strong> ${EVENT_CONFIG.EVENT_DATETIME_LABEL}</p>
      <p><strong>Event time:</strong> ${EVENT_CONFIG.EVENT_TIME_LABEL}</p>
      ${ticketTier ? `<p><strong>Ticket tier:</strong> ${ticketTier}</p>` : ""}
      <p><a href="${claimUrl}">Claim your ticket</a></p>
      <p style="color:#666;font-size:12px">Session: ${sessionId}</p>
    </div>
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

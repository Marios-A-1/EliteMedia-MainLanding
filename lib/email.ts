import { getAppUrl } from "@/lib/appUrl";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

const sendEmail = async ({ to, subject, html, text }: SendEmailInput) => {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("EMAIL_PROVIDER_API_KEY is not set");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not set");
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
};

export const sendTicketConfirmedEmail = async ({
  email,
  fullName,
  ticketTier,
  sessionId,
}: ConfirmationEmailInput) => {
  const subject = "Ticket confirmed";
  const tierLine = ticketTier ? `Ticket tier: ${ticketTier}` : "";
  const text = [
    `Hi ${fullName},`,
    "Your ticket has been confirmed.",
    tierLine,
    `Session: ${sessionId}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2>Ticket confirmed</h2>
      <p>Hi ${fullName}, your ticket has been confirmed.</p>
      ${ticketTier ? `<p><strong>Ticket tier:</strong> ${ticketTier}</p>` : ""}
      <p style="color:#666;font-size:12px">Session: ${sessionId}</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html, text });
};
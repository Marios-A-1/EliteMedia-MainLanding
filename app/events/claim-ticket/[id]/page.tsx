import Stripe from "stripe";

import ClaimTicketForm from "./ClaimTicketForm";
import { verifyClaimToken } from "@/lib/claimToken";
import { getStripe, isPaidSession, resolveTicketTier } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const isStripeSessionId = (value: string) => value.startsWith("cs_");

type PageProps = {
  params: Promise<{ id: string }>;
};

const StatusCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-6 text-sm text-neutral-700">
    <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
    <p className="mt-2 text-sm text-neutral-600">{description}</p>
  </div>
);

export default async function ClaimTicketPage({ params }: PageProps) {
  const { id } = await params;
  const rawId = decodeURIComponent(id);
  const tokenOrSessionId = rawId.trim();

  let sessionId: string | null = null;
  let tokenError: "invalid" | "expired" | null = null;

  if (isStripeSessionId(tokenOrSessionId)) {
    sessionId = tokenOrSessionId;
  } else {
    const verification = verifyClaimToken(tokenOrSessionId);
    if (!verification.valid) {
      tokenError = verification.reason;
    } else {
      sessionId = verification.payload.sid;
    }
  }

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-neutral-950/5 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            Claim your ticket
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Didn't get the email? You can still claim from this page with your
            checkout session ID.
          </p>
          <div className="mt-8">
            <StatusCard
              title="Claim link issue"
              description={
                tokenError === "expired"
                  ? "This claim link has expired. Please use your checkout session ID or request a new claim email."
                  : "This claim link is invalid. Please use your checkout session ID or request a new claim email."
              }
            />
          </div>
        </div>
      </main>
    );
  }

  const stripe = getStripe();
  let session: Stripe.Checkout.Session | null = null;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details", "line_items", "payment_intent"],
    });
  } catch (error) {
    console.error("Failed to retrieve Stripe session", error);
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-neutral-950/5 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-neutral-900">
            Claim your ticket
          </h1>
          <div className="mt-8">
            <StatusCard
              title="Session not found"
              description="We couldn't load your checkout session. Please check the link or contact support."
            />
          </div>
        </div>
      </main>
    );
  }

  const ticketTier = resolveTicketTier(session);
  const isPaid = isPaidSession(session);
  const isClaimed = session.metadata?.claimed === "true";
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? undefined;
  const customerName = session.customer_details?.name ?? undefined;

  return (
    <main className="min-h-screen bg-neutral-950/5 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-neutral-900">Claim your ticket</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Didn't get the email? You can still claim from this page.
        </p>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              Session: {session.id}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              Tier: {ticketTier}
            </span>
          </div>

          {!isPaid ? (
            <div className="mt-6">
              <StatusCard
                title="Payment pending"
                description="We haven't confirmed your payment yet. If you paid with an async method, refresh in a few minutes."
              />
            </div>
          ) : null}

          {isClaimed ? (
            <div className="mt-6">
              <StatusCard
                title="Already claimed"
                description="This ticket has already been claimed. If you think this is a mistake, contact support."
              />
            </div>
          ) : null}

          {isPaid && !isClaimed ? (
            <ClaimTicketForm
              tokenOrSessionId={tokenOrSessionId}
              defaultEmail={customerEmail}
              defaultName={customerName}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}

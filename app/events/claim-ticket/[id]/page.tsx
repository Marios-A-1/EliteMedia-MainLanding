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
          <h1 className="text-center text-3xl font-bold text-neutral-900">
            Κράτα τη θέση σου
          </h1>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Χρησιμοποίησε το ID συνεδρίας πληρωμής για να συνεχίσεις.
          </p>
          <div className="mt-8">
            <StatusCard
              title="Πρόβλημα με τον σύνδεσμο"
              description={
                tokenError === "expired"
                  ? "Ο σύνδεσμος έχει λήξει. Χρησιμοποίησε το ID συνεδρίας πληρωμής."
                  : "Ο σύνδεσμος δεν είναι έγκυρος. Χρησιμοποίησε το ID συνεδρίας πληρωμής."
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
          <h1 className="text-center text-3xl font-bold text-neutral-900">
            Κράτα τη θέση σου
          </h1>
          <div className="mt-8">
            <StatusCard
              title="Δεν βρέθηκε συνεδρία"
              description="Δεν μπορέσαμε να βρούμε το ID συνεδρίας πληρωμής. Έλεγξε τον σύνδεσμο."
            />
          </div>
        </div>
      </main>
    );
  }

  const ticketTier = resolveTicketTier(session);
  const normalizedTier = ticketTier?.toString().toLowerCase();
  const resolvedTier =
    normalizedTier?.includes("vip")
      ? "vip"
      : normalizedTier?.includes("regular")
        ? "regular"
        : null;
  const isPaid = isPaidSession(session);
  const isClaimed = session.metadata?.claimed === "true";
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? undefined;
  const customerName = session.customer_details?.name ?? undefined;

  return (
    <main className="min-h-screen bg-neutral-950/5 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-center text-3xl font-bold text-neutral-900">
          Κράτα τη θέση σου
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Συμπλήρωσε τα στοιχεία σου για να ολοκληρώσεις την καταχώρηση.
        </p>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              Συνεδρία: {session.id}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              Κατηγορία: {ticketTier}
            </span>
          </div>

          {!isPaid ? (
            <div className="mt-6">
              <StatusCard
                title="Η πληρωμή εκκρεμεί"
                description="Δεν έχει επιβεβαιωθεί ακόμη η πληρωμή. Αν πλήρωσες με ασύγχρονη μέθοδο, δοκίμασε ξανά σε λίγα λεπτά."
              />
            </div>
          ) : null}

          {isClaimed ? (
            <div className="mt-6">
              <StatusCard
                title="Ήδη καταχωρήθηκε"
                description="Αυτό το εισιτήριο έχει ήδη καταχωρηθεί."
              />
            </div>
          ) : null}

          {isPaid && !isClaimed ? (
            resolvedTier ? (
              <ClaimTicketForm
                sessionId={session.id}
                tier={resolvedTier}
                defaultEmail={customerEmail}
                defaultName={customerName}
              />
            ) : (
              <StatusCard
                title="Δεν βρέθηκε κατηγορία"
                description="Δεν μπορέσαμε να προσδιορίσουμε αν είναι Regular ή VIP. Χρησιμοποίησε τους νέους συνδέσμους."
              />
            )
          ) : null}
        </div>
      </div>
    </main>
  );
}
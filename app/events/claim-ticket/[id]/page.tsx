import Stripe from "stripe";

import ClaimTicketShell, { StatusCard } from "../ClaimTicketShell";
import ClaimTicketForm from "./ClaimTicketForm";
import { verifyClaimToken } from "@/lib/claimToken";
import { getStripe, isPaidSession, resolveTicketTier } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const isStripeSessionId = (value: string) => value.startsWith("cs_");

type PageProps = {
  params: Promise<{ id: string }>;
};

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
      <ClaimTicketShell subtitle="Χρησιμοποίησε το ID συνεδρίας πληρωμής για να συνεχίσεις.">
        <StatusCard
          title="Πρόβλημα με τον σύνδεσμο"
          description={
            tokenError === "expired"
              ? "Ο σύνδεσμος έχει λήξει. Χρησιμοποίησε το ID συνεδρίας πληρωμής."
              : "Ο σύνδεσμος δεν είναι έγκυρος. Χρησιμοποίησε το ID συνεδρίας πληρωμής."
          }
        />
      </ClaimTicketShell>
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
      <ClaimTicketShell>
        <StatusCard
          title="Δεν βρέθηκε συνεδρία"
          description="Δεν μπορέσαμε να βρούμε το ID συνεδρίας πληρωμής. Έλεγξε τον σύνδεσμο."
        />
      </ClaimTicketShell>
    );
  }

  const ticketTier = resolveTicketTier(session);
  const normalizedTier = ticketTier?.toString().trim().toLowerCase();
  const resolvedTier = normalizedTier?.includes("vip")
    ? "vip"
    : normalizedTier?.includes("regular")
      ? "regular"
      : normalizedTier?.includes("online")
        ? "online"
        : null;

  const isPaid = isPaidSession(session);
  const isClaimed = session.metadata?.claimed === "true";
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? undefined;
  const customerName = session.customer_details?.name ?? undefined;

  return (
    <ClaimTicketShell subtitle="Συμπλήρωσε τα στοιχεία σου για να ολοκληρώσεις την καταχώρηση.">
      <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-neutral-600">
        <span className="rounded-full border border-neutral-200 bg-neutral-50/90 px-3 py-1">
          Συνεδρία: {session.id}
        </span>
        <span className="rounded-full border border-amber-200 bg-amber-50/90 px-3 py-1 text-amber-700">
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
          <div className="mt-6">
            <StatusCard
              title="Δεν βρέθηκε κατηγορία"
              description="Δεν μπορέσαμε να προσδιορίσουμε αν είναι Regular, VIP ή Online. Χρησιμοποίησε τους νέους συνδέσμους."
            />
          </div>
        )
      ) : null}
    </ClaimTicketShell>
  );
}

import { CalendarPlus2, MapPinned } from "lucide-react";

import ClaimTicketShell, { StatusCard } from "../ClaimTicketShell";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import { getStripe, isPaidSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

const isStripeSessionId = (value: string) => value.startsWith("cs_");

const hasValidClaimContext = async (sessionId: string) => {
  if (!isStripeSessionId(sessionId)) {
    return false;
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!isPaidSession(session)) {
      return false;
    }

    return session.metadata?.claimed === "true";
  } catch (error) {
    console.error("Failed to validate claim context for thank-you page", error);
    return false;
  }
};

const FallbackState = () => (
  <ClaimTicketShell subtitle="Δεν μπορέσαμε να επιβεβαιώσουμε αυτόν τον σύνδεσμο.">
    <StatusCard
      title="Δεν βρέθηκε καταχώρηση"
      description="Επέστρεψε στις εκδηλώσεις και δοκίμασε ξανά από το πιο πρόσφατο email ή τη ροή πληρωμής."
    />
    <a
      href="/events"
      className="event-brand-cta mt-6 inline-flex items-center justify-center rounded-2xl px-5 py-4 text-sm font-black"
    >
      Πίσω στις εκδηλώσεις
    </a>
  </ClaimTicketShell>
);

export default async function ClaimThankYouPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id?.trim();

  if (!sessionId) {
    return <FallbackState />;
  }

  const isValidClaim = await hasValidClaimContext(sessionId);
  if (!isValidClaim) {
    return <FallbackState />;
  }

  return (
    <ClaimTicketShell
      title="Το εισιτήριό σου κατοχυρώθηκε ✅"
      subtitle="Στην είσοδο, δείξε τον κωδικό εισιτηρίου που θα λάβεις στο email επιβεβαίωσης. Το link για το Zoom θα σταλεί με email μία ημέρα πριν το event και ξανά 2 ώρες πριν ξεκινήσει."
    >
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
          <div className="text-center md:text-left">
            <p className="text-sm font-black text-blue-600">
              Σύνοψη Εκδήλωσης
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-950">
              {EVENT_CONFIG.EVENT_TITLE}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-neutral-700">
              {EVENT_CONFIG.EVENT_SUBTITLE}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={EVENT_CONFIG.GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="event-brand-cta claim-ticket-cta--flat inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black"
            >
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Οδηγίες Διαδρομής
            </a>
            <a
              href={EVENT_CONFIG.GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="event-brand-cta claim-ticket-cta--flat inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-black"
            >
              <CalendarPlus2 className="h-4 w-4" aria-hidden="true" />
              Add to Calendar
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/80 bg-white/80 p-3 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <div className="aspect-[16/11] overflow-hidden rounded-xl">
            <iframe
              title={`${EVENT_CONFIG.EVENT_LOCATION_NAME} map`}
              src={EVENT_CONFIG.GOOGLE_MAPS_EMBED_URL}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-4">
            <p className="text-sm font-black text-neutral-500">
              Ημερομηνία &amp; ώρα ({EVENT_CONFIG.TIMEZONE})
            </p>
            <p className="mt-1 font-black text-neutral-950">
              {EVENT_CONFIG.EVENT_DATETIME_LABEL} στις {EVENT_CONFIG.EVENT_TIME_LABEL}
            </p>
          </div>
        </div>
      </div>
    </ClaimTicketShell>
  );
}

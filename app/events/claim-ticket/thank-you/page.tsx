import { CalendarPlus2, MapPinned } from "lucide-react";

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
  <main className="min-h-screen bg-neutral-950/5 pt-16 pb-16 -mt-14">
    <div className="mx-auto max-w-3xl px-4">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <h1 className="text-3xl font-bold text-neutral-900">
          Δεν βρέθηκε καταχώρηση
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Δεν μπορέσαμε να επιβεβαιώσουμε αυτόν τον σύνδεσμο. Επέστρεψε στην
          αρχική σελίδα και δοκίμασε ξανά από το πιο πρόσφατο email ή τη ροή
          πληρωμής.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
        >
          Αρχική Σελίδα
        </a>
      </div>
    </div>
  </main>
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
    <main className="min-h-screen bg-neutral-950/5 pt-16 pb-16 -mt-14">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
              Το εισιτήριό σου κατοχυρώθηκε ✅
            </h1>
            <p className="mt-3 text-base text-neutral-600">
              Τα λέμε στο event. Αποθήκευσέ το για να μην το ξεχάσεις.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 shadow-sm">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-amber-600">
                  Σύνοψη Εκδήλωσης
                </p>
                <h2 className="mt-3 text-2xl font-bold text-neutral-900">
                  {EVENT_CONFIG.EVENT_TITLE}
                </h2>
                <p className="mt-2 text-sm text-neutral-700">
                  {EVENT_CONFIG.EVENT_SUBTITLE}
                </p>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-700">
                <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-neutral-500">
                    Ημερομηνία &amp; ώρα ({EVENT_CONFIG.TIMEZONE})
                  </p>
                  <p className="mt-1 font-semibold text-neutral-900">
                    {EVENT_CONFIG.EVENT_DATETIME_LABEL}
                  </p>
                </div>

              </div>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={EVENT_CONFIG.GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400 bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105"
                >
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                  Οδηγίες Διαδρομής
                </a>
                <a
                  href={EVENT_CONFIG.GOOGLE_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50"
                >
                  <CalendarPlus2 className="h-4 w-4" aria-hidden="true" />
                  Προσθήκη στο Google Calendar
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

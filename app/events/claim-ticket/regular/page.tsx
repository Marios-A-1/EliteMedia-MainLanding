import ClaimTicketForm from "../[id]/ClaimTicketForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

const MissingSession = () => (
  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-6 text-sm text-neutral-700">
    <h2 className="text-lg font-semibold text-neutral-900">Λείπει το ID συνεδρίας</h2>
    <p className="mt-2 text-sm text-neutral-600">
      Πρόσθεσε <span className="font-semibold">?session_id=cs_...</span> στο URL.
    </p>
    <a
      href="/events"
      className="mt-4 inline-flex items-center text-sm font-semibold text-amber-700"
    >
      Πίσω στις εκδηλώσεις
    </a>
  </div>
);

export default async function ClaimRegularPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  return (
    <main className="min-h-screen bg-neutral-950/5 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-center text-3xl font-bold text-neutral-900">
          Κράτα τη θέση σου
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Εισιτήριο Regular
        </p>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          {sessionId ? (
            <ClaimTicketForm tier="regular" sessionId={sessionId} />
          ) : (
            <MissingSession />
          )}
        </div>
      </div>
    </main>
  );
}
import ClaimTicketForm from "../[id]/ClaimTicketForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

const MissingSession = () => (
  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 p-6 text-sm text-neutral-700">
    <h2 className="text-lg font-semibold text-neutral-900">Missing session ID</h2>
    <p className="mt-2 text-sm text-neutral-600">
      Add <span className="font-semibold">?session_id=cs_...</span> to the URL.
    </p>
    <a
      href="/events"
      className="mt-4 inline-flex items-center text-sm font-semibold text-amber-700"
    >
      Back to events
    </a>
  </div>
);

export default async function ClaimRegularPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  return (
    <main className="min-h-screen bg-neutral-950/5 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-neutral-900">Claim your ticket</h1>
        <p className="mt-2 text-sm text-neutral-600">Regular ticket</p>

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
import ClaimTicketShell, { StatusCard } from "../ClaimTicketShell";
import ClaimTicketForm from "../[id]/ClaimTicketForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{ session_id?: string }>;
};

const MissingSession = () => (
  <StatusCard
    title="Λείπει το ID συνεδρίας"
    description="Πρόσθεσε ?session_id=cs_... στο URL ή γύρνα στις εκδηλώσεις για να ξεκινήσεις ξανά."
  />
);

export default async function ClaimVipPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  return (
    <ClaimTicketShell
      subtitle="Εισιτήριο VIP. Συμπλήρωσε τα στοιχεία σου για να ολοκληρώσεις την καταχώρηση."
    >
      {sessionId ? (
        <ClaimTicketForm tier="vip" sessionId={sessionId} />
      ) : (
        <MissingSession />
      )}
    </ClaimTicketShell>
  );
}

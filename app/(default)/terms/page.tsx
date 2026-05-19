import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Thymiolas Event",
  description:
    "Terms of Service for Thymiolas Event website and event purchases.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-black text-[#172554]">{title}</h2>
      <div className="space-y-2 text-sm font-semibold leading-6 text-[#1e3a8a]/85">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="event-page-shell w-full px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-blue-200/80 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-700 shadow-[0_12px_30px_rgba(37,99,235,0.08)] backdrop-blur">
            Legal
          </p>
          <h1 className="section-heading pb-3 text-3xl font-black sm:text-4xl">
            Terms of Service
          </h1>
          <p className="section-description mx-auto max-w-2xl text-sm sm:text-base">
            Last updated: February 23, 2026
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-blue-200/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.13)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.58))]" />

          <div className="relative space-y-6">
          <Section title="Use of this site">
            <p>
              By using this website, you agree to use it lawfully and not interfere
              with its operation, security, or other users.
            </p>
          </Section>

          <Section title="Events and ticket purchases">
            <p>
              Event details, pricing, availability, and schedules may change. Ticket
              purchases are processed through third-party payment providers.
            </p>
            <p>
              You are responsible for providing accurate contact information when
              purchasing or claiming a ticket.
            </p>
          </Section>

          <Section title="Refunds and cancellations">
            <p>
              Refund, cancellation, and transfer rules (if any) are determined by the
              event terms presented at purchase or communicated by Thymiolas Event.
            </p>
          </Section>

          <Section title="Third-party services">
            <p>
              This site may include third-party tools or embedded content (such as
              payment providers, video players, and analytics/advertising services).
              We are not responsible for third-party websites or services.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the maximum extent allowed by law, Thymiolas Event is not
              liable for indirect or consequential damages arising from use of the
              site or event participation.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:admin@aicareer.gr"
                className="font-black text-blue-700 underline underline-offset-2 transition hover:text-sky-500"
              >
                admin@aicareer.gr
              </a>
              .
            </p>
          </Section>

          <p className="rounded-2xl border border-blue-200/80 bg-blue-50/85 p-4 text-xs font-bold leading-5 text-blue-900">
            These terms are a simple starter and should be reviewed for your event
            rules, refunds, and governing law.
          </p>
          </div>
        </div>
      </div>
    </main>
  );
}

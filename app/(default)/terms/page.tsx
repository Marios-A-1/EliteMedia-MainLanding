import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Elite Media",
  description: "Terms of Service for Elite Media website and event purchases.",
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
      <h2 className="text-lg font-semibold text-[#2b2216]">{title}</h2>
      <div className="space-y-2 text-sm leading-6 text-[#5b4a2a]">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[#eadfbe] bg-white/80 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-[#2b2216] sm:text-3xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-[#5b4a2a]">
          Last updated: February 23, 2026
        </p>

        <div className="mt-8 space-y-6">
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
              event terms presented at purchase or communicated by Elite Media.
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
              To the maximum extent allowed by law, Elite Media is not liable for
              indirect or consequential damages arising from use of the site or event
              participation.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:admin@elite-media.gr"
                className="font-medium text-[#2b2216] underline underline-offset-2"
              >
                admin@elite-media.gr
              </a>
              .
            </p>
          </Section>

          <p className="rounded-xl bg-[#fff7dd] p-3 text-xs leading-5 text-[#5b4a2a]">
            These terms are a simple starter and should be reviewed for your event
            rules, refunds, and governing law.
          </p>
        </div>
      </div>
    </main>
  );
}

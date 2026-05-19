import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Thymiolas Event",
  description:
    "Privacy Policy for Thymiolas Event website and event ticket flows.",
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

export default function PrivacyPage() {
  return (
    <main className="event-page-shell w-full px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-blue-200/80 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-700 shadow-[0_12px_30px_rgba(37,99,235,0.08)] backdrop-blur">
            Legal
          </p>
          <h1 className="section-heading pb-3 text-3xl font-black sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="section-description mx-auto max-w-2xl text-sm sm:text-base">
            Last updated: February 23, 2026
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-blue-200/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.13)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.58))]" />

          <div className="relative space-y-6">
          <Section title="What we collect">
            <p>
              We may collect personal information you provide to us, including your
              name, email address, phone number, and payment-related details when you
              book or claim an event ticket.
            </p>
            <p>
              We also collect technical and usage data through cookies and similar
              technologies (for example analytics/advertising tools and video embeds).
            </p>
          </Section>

          <Section title="How we use your information">
            <p>
              We use your information to process ticket purchases, confirm bookings,
              send event-related emails, support customers, and improve our website
              and marketing performance.
            </p>
          </Section>

          <Section title="Third parties we use">
            <p>
              We use third-party services such as payment processors (e.g. Stripe),
              email providers, spreadsheet/storage tools, video hosting (e.g. Vimeo),
              and advertising/measurement tools (e.g. Meta).
            </p>
            <p>
              These providers may process data on our behalf according to their own
              terms and privacy policies.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              We keep personal data only as long as needed for event operations,
              customer support, legal/accounting obligations, and legitimate business
              records.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Depending on your location, you may have rights to access, correct,
              delete, or object to certain processing of your personal data.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              For privacy requests, contact us at{" "}
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
            This is a simple starter policy and may need legal review for your
            business, jurisdictions, and exact tools/configuration.
          </p>
          </div>
        </div>
      </div>
    </main>
  );
}

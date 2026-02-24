import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Elite Media",
  description: "Privacy Policy for Elite Media website and event ticket flows.",
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[#eadfbe] bg-white/80 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-[#2b2216] sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-[#5b4a2a]">
          Last updated: February 23, 2026
        </p>

        <div className="mt-8 space-y-6">
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
                href="mailto:admin@elite-media.gr"
                className="font-medium text-[#2b2216] underline underline-offset-2"
              >
                admin@elite-media.gr
              </a>
              .
            </p>
          </Section>

          <p className="rounded-xl bg-[#fff7dd] p-3 text-xs leading-5 text-[#5b4a2a]">
            This is a simple starter policy and may need legal review for your
            business, jurisdictions, and exact tools/configuration.
          </p>
        </div>
      </div>
    </main>
  );
}

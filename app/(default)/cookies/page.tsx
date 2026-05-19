import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Thymiolas Event",
  description: "Cookie Policy for Thymiolas Event website.",
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

export default function CookiePolicyPage() {
  return (
    <main className="event-page-shell w-full px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mx-auto mb-3 inline-flex rounded-full border border-blue-200/80 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-700 shadow-[0_12px_30px_rgba(37,99,235,0.08)] backdrop-blur">
            Legal
          </p>
          <h1 className="section-heading pb-3 text-3xl font-black sm:text-4xl">
            Cookie Policy
          </h1>
          <p className="section-description mx-auto max-w-2xl text-sm sm:text-base">
            Last updated: February 23, 2026
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-blue-200/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.13)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88),rgba(239,246,255,0.58))]" />

          <div className="relative space-y-6">
          <Section title="What are cookies">
            <p>
              Cookies are small text files stored on your device when you visit a
              website. They can help the site work, remember preferences, and measure
              performance.
            </p>
          </Section>

          <Section title="How we use cookies">
            <p>We may use cookies and similar technologies for:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Site functionality and security</li>
              <li>Payment and checkout flow support</li>
              <li>Analytics and performance measurement</li>
              <li>Advertising and conversion tracking (including Meta tools)</li>
              <li>Embedded media playback (including Vimeo)</li>
            </ul>
          </Section>

          <Section title="Third-party cookies">
            <p>
              Some cookies may be set by third-party services we use, such as Stripe,
              Meta/Facebook, and Vimeo, when their tools or content are loaded on the
              site.
            </p>
          </Section>

          <Section title="Managing cookies">
            <p>
              You can manage or delete cookies through your browser settings. Blocking
              some cookies may affect parts of the site, including checkout and video
              playback.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about cookies:{" "}
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
            Note: if you target EU/EEA/UK visitors, a cookie consent banner is
            typically required before loading non-essential cookies.
          </p>
          </div>
        </div>
      </div>
    </main>
  );
}

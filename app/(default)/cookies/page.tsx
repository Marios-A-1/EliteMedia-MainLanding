import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Elite Media",
  description: "Cookie Policy for Elite Media website.",
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

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[#eadfbe] bg-white/80 p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-[#2b2216] sm:text-3xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-[#5b4a2a]">
          Last updated: February 23, 2026
        </p>

        <div className="mt-8 space-y-6">
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
                href="mailto:admin@elite-media.gr"
                className="font-medium text-[#2b2216] underline underline-offset-2"
              >
                admin@elite-media.gr
              </a>
              .
            </p>
          </Section>

          <p className="rounded-xl bg-[#fff7dd] p-3 text-xs leading-5 text-[#5b4a2a]">
            Note: if you target EU/EEA/UK visitors, a cookie consent banner is
            typically required before loading non-essential cookies.
          </p>
        </div>
      </div>
    </main>
  );
}

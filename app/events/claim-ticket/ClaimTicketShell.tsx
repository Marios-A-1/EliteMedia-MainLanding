import type { ReactNode } from "react";

import PixelBlast from "@/components/PixelBlast";

type ClaimTicketShellProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

export const StatusCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-2xl border border-amber-200/70 bg-amber-50/80 p-5 text-sm text-neutral-700 shadow-[0_12px_30px_rgba(180,83,9,0.08)]">
    <h2 className="text-lg font-black text-neutral-950">{title}</h2>
    <p className="mt-2 text-sm font-semibold leading-relaxed text-neutral-600">
      {description}
    </p>
  </div>
);

export default function ClaimTicketShell({
  title = "Κράτα τη θέση σου",
  subtitle,
  children,
}: ClaimTicketShellProps) {
  return (
    <main className="event-page-shell -mt-14 min-h-screen pt-14">
      <div className="event-page-pixel-blast-bg" aria-hidden="true">
        <PixelBlast
          color="#3b7bde"
          pixelSize={4}
          patternScale={2.4}
          patternDensity={1.12}
          speed={0.96}
          transparent
          edgeFade={0.18}
          enableRipples={false}
        />
      </div>

      <section className="flex min-h-screen items-start justify-center px-4 py-16 sm:px-6 md:py-20">
        <div className="w-full max-w-3xl">
          <div className="text-center">
            {/* <a
              href="/events"
              className="mb-5 inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-amber-700 shadow-sm transition hover:border-amber-300 hover:bg-white"
            >
              Πίσω στην αρχική 
            </a> */}
            <h1 className="text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-3 max-w-xl text-base font-bold leading-relaxed text-neutral-600 sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/78 p-5 shadow-[0_24px_70px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-7 md:p-8">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

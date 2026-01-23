import type { ReactNode } from "react";
import CountDown from "@/components/CountDown";

type CtaContent = {
  heading?: ReactNode;
  cta?: {
    label?: ReactNode;
    href?: string;
  };
};

type CtaProps = {
  content?: CtaContent;
};

export default function Cta({ content }: CtaProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
        aria-hidden="true"
      >
      </div>
      <div className="max-w6xl mx-auto px-4 sm:px-6">
        <div className="py-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="section-heading pb-6 md:pb-8"
              data-aos="fade-up"
            >
              {content?.heading ?? <>Χτίσε το content που ταιριάζει στο brand σου</>}
            </h2>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div
                className="mt-8 flex w-full justify-center"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <CountDown freeLabel={content?.cta?.label} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

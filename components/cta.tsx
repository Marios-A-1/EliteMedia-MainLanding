import type { ReactNode } from "react";
import { OfferCtaButton } from "@/components/CountDown";
import BlurText from "@/components/BlurText";

type CtaContent = {
  heading?: ReactNode;
  cta?: {
    label?: ReactNode;
    expiredLabel?: ReactNode;
    href?: string;
  };
};

type CtaProps = {
  content?: CtaContent;
  triggerLeadPopup?: boolean;
  leadSource?: string;
};

export default function Cta({
  content,
  triggerLeadPopup = false,
  leadSource,
}: CtaProps) {
  const headingText =
    content?.heading ??
    "Χτίσε το content που ταιριάζει στο brand σου";

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
            <BlurText
              as="h2"
              className="section-heading pb-6 md:pb-8"
              delay={50}
              animateBy="words"
              direction="top"
            >
              {headingText}
            </BlurText>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
            <div className="mt-8 flex w-full justify-center">
              <OfferCtaButton
                freeLabel={content?.cta?.label}
                expiredLabel={content?.cta?.expiredLabel ?? content?.cta?.label}
                href={content?.cta?.href}
                triggerLeadPopup={triggerLeadPopup}
                leadSource={leadSource}
                animationThreshold={-0.1}
                animationDelay={0.15}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

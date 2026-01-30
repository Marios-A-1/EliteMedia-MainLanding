"use client";

import LazyVimeo from "@/components/lazy-vimeo";
import { useCallback, useRef, useState, type ReactNode } from "react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import { OfferCountdownTimer, OfferCtaButton } from "@/components/CountDown";
import OfferCountdownPopup from "@/components/OfferCountdownPopup";
import RotatingText from "./RotatingText";

type HeroContent = {
  title?: ReactNode;
  titleText?: string;
  highlightWords?: string[];
  description?: ReactNode;
  videoId?: string;
  videoTitle?: string;
  videoParams?: string;
  ctaDescription?: string;
  ctaLabel?: ReactNode;
  ctaHref?: string;
  offerPopupTriggerSeconds?: number;
  ctaNode?: ReactNode;
};

type HeroHomeProps = {
  content?: HeroContent;
};


export default function HeroHome({ content }: HeroHomeProps) {
  const titleText = content?.titleText;
  const highlightWords = content?.highlightWords;
  const popupTriggerSeconds = content?.offerPopupTriggerSeconds ?? 0;
  const popupTriggeredRef = useRef(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBadgeVisible, setIsBadgeVisible] = useState(false);
  const highlightWordSet = highlightWords ? new Set(highlightWords) : null;

  const handleTimeUpdate = useCallback(
    (seconds: number) => {
      if (popupTriggeredRef.current || popupTriggerSeconds <= 0) {
        return;
      }

      if (seconds >= popupTriggerSeconds) {
        popupTriggeredRef.current = true;
        setIsPopupOpen(true);
      }
    },
    [popupTriggerSeconds]
  );

  return (
    <section className="relative px-4 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-20 lg:-mt-30">
        {/* Hero content */}
        <div className="py-10 md:py-20">
          {/* Section header */}
          <div className="pb-8 text-center md:pb-20">
            {/* <div className="mb-4 flex justify-center" data-aos="fade-up">
              <Image src={logo} alt="Elite Media logo" width={96} height={96} />
            </div> */}
            <BlurText
              as="h1"
              text={titleText}
              delay={50}
              animateBy="words"
              direction="top"
              className="section-heading justify-center pb-4 text-3xl font-bold leading-tight md:pb-5 md:text-5xl md:leading-normal"
              spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
              getSpanClassName={
                highlightWordSet
                  ? (segment) =>
                      highlightWordSet.has(segment)
                        ? "bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
                        : "text-black"
                  : undefined
              }
            >
              {content?.title ?? titleText}
            </BlurText>
            <div className="mx-auto max-w-3xl">
              <AnimatedContent ease = 'power3.out' duration={1.5} delay={0.3} distance={100}>
                <p className="section-description mb-6 lg:px-24 md:mb-8">
                  {content?.description}
                </p>
                {/* <RotatingText
                  texts={['Ως Αρχάριος', 'Στην Ελλάδα.', 'Το 2026']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-amber-400 justify-self-center text-white text-2xl w-50 overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                /> */}
              </AnimatedContent>
            </div>
          </div>
          <AnimatedContent duration={1.5} delay={0.6} distance={100}>
            <div className="gradient-border mx-auto w-full max-w-full -mt-3 lg:mb-8 mb-14 md:mt-[-50px] md:mb-[50px] md:max-w-2xl">
              <div className="gradient-border__inner aspect-video w-full shadow-2xl">
                <LazyVimeo
                  videoId={content?.videoId ?? "1128212394"}
                  title={content?.videoTitle ?? "Main landing page video"}
                  params={content?.videoParams ?? "autoplay=0&title=0&byline=0&portrait=0"}
                  className="h-full w-full"
                  onTimeUpdate={
                    popupTriggerSeconds > 0 ? handleTimeUpdate : undefined
                  }
                />
              </div>
            </div>
          </AnimatedContent>
              <p
                className="-mt-4 mb-3 hidden text-center text-xs text-[#5b4a2a] md:mt-6 md:block"
>
                {content?.ctaDescription}
              </p>
          <div className="mt-8 flex w-full justify-center mb-25 lg:mb-12">
            {content?.ctaNode ?? <OfferCtaButton />}
          </div>
          <OfferCountdownPopup
            open={isPopupOpen}
            onClose={() => {
              setIsPopupOpen(false);
              setIsBadgeVisible(true);
            }}
          />
          {isBadgeVisible ? (
            <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6 lg:right-8 lg:top-8">
              <div className="flex items-center gap-2 rounded-full border-2 border-amber-300/60 bg-white/80 px-3 py-2 text-2xl font-semibold text-neutral-900 shadow-lg md:gap-3 md:px-5 md:py-3 md:text-3xl lg:px-6 lg:py-3">
                <OfferCountdownTimer className="text-sm text-neutral-900 md:text-base lg:text-lg" />
              </div>
            </div>
          ) : null}
        </div>
              <p
                className="-mt-4 mb-3 text-center text-xs text-[#5b4a2a] md:mt-6 lg:hidden"
                data-aos="fade-up"
                data-aos-delay={200}>
                {content?.ctaDescription}
              </p>
        
      </div>
    </section>
  );
}

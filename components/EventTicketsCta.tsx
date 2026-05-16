"use client";

import { useEffect, useState, type MouseEvent } from "react";

import AnimatedContent from "@/components/AnimatedContent";
import { openEventLeadPopup } from "@/utils/eventLeadPopup";

type EventTicketsCtaProps = {
  label?: string;
  triggerLeadPopup?: boolean;
  leadSource?: string;
  playOnMount?: boolean;
  animationThreshold?: number;
  animationDelay?: number;
};

const DEFAULT_LABEL = "Μάθε περισσότερα";
const REMAINING_SUFFIX = "θέσεις ακόμα";

export default function EventTicketsCta({
  label = DEFAULT_LABEL,
  triggerLeadPopup = false,
  leadSource,
  playOnMount = false,
  animationThreshold = 0.35,
  animationDelay = 0.9,
}: EventTicketsCtaProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadRemaining = async () => {
      try {
        const response = await fetch("/api/events/seats");
        const data = (await response.json()) as { remaining?: number };
        if (isMounted && typeof data.remaining === "number") {
          setRemaining(data.remaining);
        }
      } catch {
        if (isMounted) {
          setRemaining(null);
        }
      }
    };

    void loadRemaining();

    return () => {
      isMounted = false;
    };
  }, []);

  const baseButtonClassName =
    "btn cursor-pointer font-black px-5 py-3 text-lg rounded-[1rem] group w-auto hover:brightness-90 sm:w-auto md:px-10 md:py-4 md:text-lg";
  const primaryButtonClassName =
    "event-brand-cta";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!triggerLeadPopup) {
      return;
    }

    event.preventDefault();
    openEventLeadPopup(leadSource);
  };

  return (
    <AnimatedContent
      className="w-full sm:w-auto flex justify-center"
      threshold={playOnMount ? -100 : animationThreshold}
      delay={playOnMount ? 0 : animationDelay}
      duration={2.0}
      playOnMount={playOnMount}
    >
      <div className="flex flex-col items-center">
        <a
          href="#event-offer-cards"
          onClick={handleClick}
          className={`${baseButtonClassName} ${primaryButtonClassName}`}
        >
          {label}
        </a>
        <span className="mt-2 text-sm font-medium text-[#6b5b3a]" aria-live="polite">
          {remaining ?? "—"}/100 {REMAINING_SUFFIX}
        </span>
      </div>
    </AnimatedContent>
  );
}

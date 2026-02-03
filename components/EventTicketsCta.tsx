"use client";

import { useEffect, useState } from "react";

import AnimatedContent from "@/components/AnimatedContent";

type EventTicketsCtaProps = {
  label?: string;
};

const DEFAULT_LABEL = "\u039a\u03c1\u03ac\u03c4\u03b1 \u03c4\u03b7\u03bd \u03b8\u03ad\u03c3\u03b7 \u03c3\u03bf\u03c5";
const REMAINING_SUFFIX = "\u03b8\u03ad\u03c3\u03b5\u03b9\u03c2 \u03b1\u03ba\u03cc\u03bc\u03b1";

export default function EventTicketsCta({ label = DEFAULT_LABEL }: EventTicketsCtaProps) {
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
    "btn cursor-pointer font-bold px-5 py-3 text-lg rounded-[1rem] group w-auto hover:brightness-90 sm:w-auto md:px-10 md:py-4 md:text-lg";
  const primaryButtonClassName =
    "bg-linear-to-r from-amber-500 to-amber-300 bg-[length:100%_auto] text-[#2b2216]";

  return (
    <AnimatedContent
      className="w-full sm:w-auto flex justify-center"
      threshold={-100}
      delay={0.9}
      duration={2.0}
    >
      <div className="flex flex-col items-center">
        <a
          href="#event-offer-cards"
          className={`${baseButtonClassName} ${primaryButtonClassName}`}
        >
          {label}
        </a>
        <span className="mt-2 text-sm font-medium text-[#6b5b3a]" aria-live="polite">
          {remaining ?? "\u2014"}/100 {REMAINING_SUFFIX}
        </span>
      </div>
    </AnimatedContent>
  );
}

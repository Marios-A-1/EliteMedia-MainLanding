"use client";

import AnimatedContent from "@/components/AnimatedContent";

type EventTicketsCtaProps = {
  label?: string;
};

export default function EventTicketsCta({
  label = "Κράτα την θέση σου",
}: EventTicketsCtaProps) {
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
      <a
        href="#event-offer-cards"
        className={`${baseButtonClassName} ${primaryButtonClassName}`}
      >
        {label}
      </a>
    </AnimatedContent>
  );
}

"use client";

import { useState } from "react";
import AnimatedContent from "@/components/AnimatedContent";
import { useOfferCountdownState } from "@/components/CountDown";

const fallbackLink = "mailto:hello@elitemedia.com";
const resolveEnvLink = (value: string | undefined, fallback: string) =>
  value && value.trim().length > 0 ? value : fallback;

const REGULAR_EARLY_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_REGULAR_LINK,
  fallbackLink
);
const REGULAR_LATE_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_REGULAR_LINK_EXPIRED,
  fallbackLink
);
const VIP_EARLY_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_VIP_LINK,
  fallbackLink
);
const VIP_LATE_LINK = resolveEnvLink(
  process.env.NEXT_PUBLIC_EVENTS_VIP_LINK_EXPIRED,
  fallbackLink
);

const resolveLink = (isExpired: boolean, early: string, late: string) =>
  isExpired ? late : early;

type EventTicketsCtaProps = {
  label?: string;
};

export default function EventTicketsCta({
  label = "Κράτα την θέση σου",
}: EventTicketsCtaProps) {
  const [open, setOpen] = useState(false);
  const { isExpired } = useOfferCountdownState();

  const regularHref = resolveLink(isExpired, REGULAR_EARLY_LINK, REGULAR_LATE_LINK);
  const vipHref = resolveLink(isExpired, VIP_EARLY_LINK, VIP_LATE_LINK);

  const baseButtonClassName =
    "btn cursor-pointer font-bold px-5 py-3 text-lg rounded-[1rem] group w-auto hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg";
  const primaryButtonClassName =
    "bg-linear-to-r from-amber-500 to-amber-300 bg-[length:100%_auto] text-[#2b2216]";

  return (
    <>
      <AnimatedContent className="w-full sm:w-auto flex justify-center" threshold={-100} delay={0.9} duration={2.0}>
        <button
          type="button"
          className={`${baseButtonClassName} ${primaryButtonClassName}`}
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
      </AnimatedContent>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-[24px] border border-amber-200/50 bg-white/90 p-6 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-neutral-500 hover:text-neutral-800"
              aria-label="Close ticket selection"
            >
              X
            </button>
            <h3 className="text-2xl font-bold text-neutral-900">Επίλεξε εισιτήριο</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Οι επιλογές αλλάζουν μετά τις πρώτες 48 ώρες.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href={regularHref}
                className="btn font-bold px-5 py-3 text-base rounded-[1rem] w-full bg-amber-100 text-[#2b2216] hover:brightness-105"
              >
                Regular
              </a>
              <a
                href={vipHref}
                className="btn font-bold px-5 py-3 text-base rounded-[1rem] w-full bg-amber-500 text-[#2b2216] hover:brightness-105"
              >
                VIP
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";

const STORAGE_KEY = "offerStartTimestamp";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
const STRIPE_20_EURO_LINK =
  process.env.NEXT_PUBLIC_STRIPE_20_EURO_LINK ??
  "https://buy.stripe.com/REPLACE_ME";

type CountDownProps = {
  freeLabel?: ReactNode;
  expiredLabel?: ReactNode;
};

export default function OfferCountdown({
  freeLabel,
  expiredLabel,
}: CountDownProps) {
  const [targetDate, setTargetDate] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let startTimestamp: number;

    if (!stored) {
      startTimestamp = Date.now();
      localStorage.setItem(STORAGE_KEY, String(startTimestamp));
    } else {
      startTimestamp = Number(stored);
      if (!Number.isFinite(startTimestamp)) {
        startTimestamp = Date.now();
      }
    }

    const target = startTimestamp + OFFER_DURATION_MS;
    setTargetDate(target);
    if (Date.now() > target) {
      setIsExpired(true);
    }
  }, []);

  useEffect(() => {
    if (targetDate === null) {
      return;
    }
    if (Date.now() > targetDate) {
      setIsExpired(true);
    }
  }, [targetDate]);

  const ctaHref = isExpired ? STRIPE_20_EURO_LINK : "/schedule-call";
  const ctaLabel = isExpired
    ? expiredLabel ?? <>Κλέισε Συμβουλευτική</>
    : freeLabel ?? <>Κλέισε Δωρεάν Συμβουλευτική</>;

  const renderer = useMemo(
    () =>
      ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
        const totalHours = days * 24 + hours;
        const pad = (value: number) => String(value).padStart(2, "0");
        if (completed) {
          return (
          <span className="text-2xl -mb-2 pb-2 font-bold ">00:00:00</span>);
        }
        return (
          <span className="text-2xl -mb-2 pb-2 font-bold ">
            {pad(totalHours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        );
      },
    []
  );

  return (
    <div className="flex w-full flex-col items-center gap-3 text-center -mt-5 sm:w-auto border-0 border-amber-300/80  rounded-3xl">
      {targetDate !== null && !isExpired && (
        <div className="-mb-2">
        {/* <div className="flex flex-col items-center gap-1 rounded-2xl px-6 py-  bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"> */}
        <div className="flex flex-col items-center gap-1 rounded-2xl px-6 py- text-neutral-900">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] ">
          </p>
          <Countdown
            date={targetDate}
            onComplete={() => setIsExpired(true)}
            renderer={renderer}
          />
        </div>
        </div>
      )}
      {targetDate !== null && isExpired && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">
          
        </p>
      )}
      <a
        href={ctaHref}
        className="btn btn-shine font-bold px-5 py-3 text-sm rounded-[1rem] group w-full bg-linear-to-r from-amber-500 to-amber-300  bg-[length:100%_auto] text-[#2b2216] hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg"
        >
        {ctaLabel}
      </a>
    </div>
  );
}

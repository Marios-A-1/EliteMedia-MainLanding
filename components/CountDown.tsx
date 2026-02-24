"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import AnimatedContent from "@/components/AnimatedContent";
import { openEventLeadPopup } from "@/utils/eventLeadPopup";

const STORAGE_KEY = "offerStartTimestamp";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
export const STRIPE_20_EURO_LINK =
  process.env.NEXT_PUBLIC_STRIPE_20_EURO_LINK

type OfferCountdownState = {
  targetDate: number | null;
  isExpired: boolean;
  markExpired: () => void;
};

export function useOfferCountdownState(): OfferCountdownState {
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
        localStorage.setItem(STORAGE_KEY, String(startTimestamp));
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

    const remainingMs = targetDate - Date.now();
    if (remainingMs <= 0) {
      setIsExpired(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsExpired(true);
    }, remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [targetDate]);

  const markExpired = () => setIsExpired(true);

  return { targetDate, isExpired, markExpired };
}

type OfferCtaButtonProps = {
  freeLabel?: ReactNode;
  expiredLabel?: ReactNode;
  className?: string;
  buttonClassName?: string;
  disableAnimation?: boolean;
  href?: string;
  triggerLeadPopup?: boolean;
  leadSource?: string;
};

export function OfferCtaButton({
  freeLabel,
  expiredLabel,
  className,
  buttonClassName,
  disableAnimation = false,
  href,
  triggerLeadPopup = false,
  leadSource,
}: OfferCtaButtonProps) {
  const { isExpired } = useOfferCountdownState();

  const ctaHref =
    href ?? (isExpired ? STRIPE_20_EURO_LINK : "https://calendly.com/emilios-siar/elitemedia");
  const ctaLabel = isExpired
    ? expiredLabel ?? <>Κλείσε Συμβουλευτική</>
    : freeLabel ?? <>Κλείσε Συμβουλευτική</>;

  const baseButtonClassName =
    "btn cursor-pointer font-bold px-5 py-3 text-lg rounded-[1rem] group w-auto hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg";
  const defaultColorClassName =
    "bg-linear-to-r from-amber-500 to-amber-300 bg-[length:100%_auto] text-[#2b2216]";
  const resolvedButtonClassName = [
    baseButtonClassName,
    buttonClassName ? "" : defaultColorClassName,
    buttonClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!triggerLeadPopup) {
      return;
    }

    event.preventDefault();
    openEventLeadPopup(leadSource);
  };

  if (disableAnimation) {
    return (
      <a
        href={triggerLeadPopup ? "#" : ctaHref}
        onClick={handleClick}
        className={resolvedButtonClassName}
      >
        {ctaLabel}
      </a>
    );
  }

  return (
    <AnimatedContent
      className={className ?? "w-full sm:w-auto flex justify-center"}
      threshold={-100}
      delay={0.9}
      duration={2.0}
    >
      <a
        href={triggerLeadPopup ? "#" : ctaHref}
        onClick={handleClick}
        className={resolvedButtonClassName}
      >
        {ctaLabel}
      </a>
    </AnimatedContent>
  );
}

type OfferCountdownTimerProps = {
  className?: string;
};

const buildCountdownRenderer = (className?: string) => {
  const baseClassName = "text-2xl -mb-2 pb-2 font-bold";
  const resolvedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    const totalHours = days * 24 + hours;
    const pad = (value: number) => String(value).padStart(2, "0");

    if (completed) {
      return <span className={resolvedClassName}>00:00:00</span>;
    }

    return (
      <span className={resolvedClassName}>
        {pad(totalHours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  };
};

export function OfferCountdownTimer({ className }: OfferCountdownTimerProps) {
  const { targetDate, markExpired } = useOfferCountdownState();
  const renderer = useMemo(() => buildCountdownRenderer(className), [className]);

  if (targetDate === null) {
    return null;
  }

  return (
    <Countdown
      date={targetDate}
      onComplete={markExpired}
      renderer={renderer}
    />
  );
}

export default OfferCtaButton;

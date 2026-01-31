"use client";

import { useMemo } from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import useEventOfferCountdown from "@/utils/useEventOfferCountdown";

type EventOfferCountdownTimerProps = {
  className?: string;
  targetDate?: number | null;
  onComplete?: () => void;
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

export default function EventOfferCountdownTimer({
  className,
  targetDate,
  onComplete,
}: EventOfferCountdownTimerProps) {
  const { targetDate: hookTargetDate, markExpired } = useEventOfferCountdown();
  const renderer = useMemo(() => buildCountdownRenderer(className), [className]);
  const resolvedTargetDate = targetDate ?? hookTargetDate;
  const handleComplete = onComplete ?? markExpired;

  if (resolvedTargetDate === null) {
    return null;
  }

  return (
    <Countdown
      date={resolvedTargetDate}
      onComplete={handleComplete}
      renderer={renderer}
    />
  );
}

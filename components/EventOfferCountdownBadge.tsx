"use client";

import EventOfferCountdownTimer from "@/components/EventOfferCountdownTimer";
import useEventOfferCountdown from "@/utils/useEventOfferCountdown";

export default function EventOfferCountdownBadge() {
  const { targetDate, markExpired } = useEventOfferCountdown();

  if (!targetDate) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6 lg:right-8 lg:top-8">
      <div className="flex items-center gap-2 rounded-full border border-amber-400/70 bg-gray/35 px-3 py-2 text-2xl font-semibold text-neutral-900 shadow-[0_12px_30px_rgba(15,23,42,0.18)] backdrop-blur-md md:gap-3 md:px-5 md:py-3 md:text-3xl lg:px-6 lg:py-3">
        <EventOfferCountdownTimer
          className="text-sm text-neutral-900 md:text-base lg:text-lg"
          targetDate={targetDate}
          onComplete={markExpired}
        />
      </div>
    </div>
  );
}

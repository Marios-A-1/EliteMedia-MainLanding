"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import EventOfferCountdownBadge from "@/components/EventOfferCountdownBadge";
import EventOfferCountdownPopup from "@/components/EventOfferCountdownPopup";
import { startEventOfferCountdown } from "@/utils/useEventOfferCountdown";

type EventOfferCountdownControllerProps = {
  sectionId?: string;
  popupHeading?: ReactNode;
  popupMessage?: ReactNode;
  popupCtaLabel?: ReactNode;
  popupCtaHref?: string;
  popupCtaHrefExpired?: string;
  triggerLeadPopup?: boolean;
  leadSource?: string;
};

export default function EventOfferCountdownController({
  sectionId = "tickets",
  popupHeading,
  popupMessage,
  popupCtaLabel,
  popupCtaHref,
  popupCtaHrefExpired,
  triggerLeadPopup = false,
  leadSource,
}: EventOfferCountdownControllerProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) {
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasTriggeredRef.current) {
          return;
        }

        hasTriggeredRef.current = true;
        const { didStart } = startEventOfferCountdown();
        if (didStart) {
          setIsPopupOpen(true);
        }
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -60% 0px" }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [sectionId]);

  return (
    <>
      <EventOfferCountdownBadge />
      <EventOfferCountdownPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        heading={popupHeading}
        message={popupMessage}
        ctaLabel={popupCtaLabel}
        ctaHref={popupCtaHref}
        ctaHrefExpired={popupCtaHrefExpired}
        triggerLeadPopup={triggerLeadPopup}
        leadSource={leadSource}
      />
    </>
  );
}

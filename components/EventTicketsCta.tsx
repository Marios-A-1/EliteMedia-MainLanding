"use client";

import { useState, type MouseEvent } from "react";
import AnimatedContent from "@/components/AnimatedContent";
import useEventOfferCountdown from "@/utils/useEventOfferCountdown";
import {
  REGULAR_EARLY_LINK,
  REGULAR_LATE_LINK,
  VIP_EARLY_LINK,
  VIP_LATE_LINK,
  resolveEventTicketLink,
} from "@/utils/eventOfferLinks";

type EventTicketsCtaProps = {
  label?: string;
};

export default function EventTicketsCta({
  label = "Κράτα την θέση σου",
}: EventTicketsCtaProps) {
  const [open, setOpen] = useState(false);
  const [loadingTier, setLoadingTier] = useState<"regular" | "vip" | null>(null);
  const { isExpired } = useEventOfferCountdown();

  const handleCheckout = async (
    event: MouseEvent<HTMLAnchorElement>,
    tier: "regular" | "vip",
    fallbackHref: string
  ) => {
    event.preventDefault();
    if (loadingTier) {
      return;
    }

    setLoadingTier(tier);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketTier: tier }),
      });

      const data = (await response.json().catch(() => null)) as
        | { url?: string }
        | null;

      if (response.ok && data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("Failed to create checkout session");
    } catch (error) {
      window.location.href = fallbackHref;
    } finally {
      setLoadingTier(null);
    }
  };

  const regularHref = resolveEventTicketLink(
    isExpired,
    REGULAR_EARLY_LINK,
    REGULAR_LATE_LINK
  );
  const vipHref = resolveEventTicketLink(
    isExpired,
    VIP_EARLY_LINK,
    VIP_LATE_LINK
  );

  const baseButtonClassName =
    "btn cursor-pointer font-bold  px-5 py-3 text-lg rounded-[1rem] group w-auto hover:brightness-90 sm:w-auto md:px-10 md:py-4 md:text-lg";
  const primaryButtonClassName =
    "bg-linear-to-r from-amber-500 to-amber-300 bg-[length:100%_auto] text-[#2b2216]";
  const selectionBaseClassName =
    "btn font-bold px-5 py-3 text-base rounded-[1rem] w-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const selectionRegularClassName =
    "border border-amber-400/ text-[#2b2216] hover:bg-amber-50 focus-visible:ring-amber-300";
  const selectionVipClassName =
    "border-3 border-amber-400 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-[#2b2216] shadow-[0_10px_26px_rgba(245,158,11,0.35)] hover:brightness-105 focus-visible:ring-amber-400";

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
                onClick={(event) => handleCheckout(event, "regular", regularHref)}
                aria-disabled={loadingTier === "regular"}
                className={`${selectionBaseClassName} ${selectionRegularClassName}`}
              >
                {loadingTier === "regular" ? "Redirecting..." : "Regular"}
              </a>
              <a
                href={vipHref}
                onClick={(event) => handleCheckout(event, "vip", vipHref)}
                aria-disabled={loadingTier === "vip"}
                className={`${selectionBaseClassName} ${selectionVipClassName}`}
              >
                {loadingTier === "vip" ? "Redirecting..." : "VIP"}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

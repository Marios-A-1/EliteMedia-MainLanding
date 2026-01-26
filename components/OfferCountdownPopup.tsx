"use client";

import type { ReactNode } from "react";
import { OfferCountdownTimer } from "@/components/CountDown";

type OfferCountdownPopupProps = {
  open: boolean;
  onClose: () => void;
  heading?: ReactNode;
  message?: ReactNode;
};

export default function OfferCountdownPopup({
  open,
  onClose,
  heading,
  message,
}: OfferCountdownPopupProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/70 bg-white/95 p-6 text-center shadow-2xl"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-neutral-200 bg-white/90 px-2 py-1 text-xs font-bold text-neutral-500 hover:text-neutral-800"
          aria-label="Close offer timer"
        >
          X
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Limited-time offer
        </p>
        <h3 className="mt-2 text-lg font-bold text-neutral-900 sm:text-xl">
          {heading ?? "You have this much time left before the offer expires"}
        </h3>
        <div className="mt-4 flex justify-center">
          <OfferCountdownTimer className="text-3xl text-neutral-900" />
        </div>
        {message ? (
          <p className="mt-3 text-xs text-neutral-600">{message}</p>
        ) : null}
      </div>
    </div>
  );
}

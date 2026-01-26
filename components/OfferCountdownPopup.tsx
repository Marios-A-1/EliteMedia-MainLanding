"use client";

import type { ReactNode } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import AnimatedContent from "@/components/AnimatedContent";
import { OfferCountdownTimer, OfferCtaButton } from "@/components/CountDown";

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
      <AnimatedContent
        className="relative w-full max-w-md"
        distance={380}
        reverse
        duration={1.4}
        ease="power3.out"
        delay={0}
        threshold={1}
        playOnMount
      >
      <div role="dialog" aria-modal="true" className="relative w-full max-w-md">
        <ElectricBorder
          color="#fcc76d"
          speed={1.0}
          chaos={0.05}
          style={{ borderRadius: 24 }}
        >
          <div className="relative overflow-hidden rounded-[24px] bg-white/35 p-6 text-center">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-amber-200/70 blur-3xl" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/16 px-3 py-1 text-xs font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
              aria-label="Close offer timer"
            >
              X
            </button>
            {/* <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
              OFFER
            </p> */}
            <h3 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-2xl">
              {heading ?? "Έχεις ακόμα"}
            </h3>
            <div className="mt-4 w-fit justify-self-center flex justify-center border-0 border-amber-400 py-2 px-5 rounded-[1rem] bg-white/20">
              <OfferCountdownTimer className="text-3xl text-neutral-900" />
            </div>
            {/* <h3 className="mt-5 text-xl font-bold text-neutral-900 sm:text-xl">
              {heading ?? "Για να την κλείσεις δωρεάν συμβουλευτική."}
            </h3> */}
            {message ? <p className="mt-3 text-xs text-neutral-600">{message}</p> : null}
            <div className="mt-5 flex flex-col items-center gap-3">
              <OfferCtaButton freeLabel={<>Πάρε την Προσφορά</>} className="opacity-5" buttonClassName="bg-amber-400/30 text-white hover:brightness-110" disableAnimation />
            </div>
          </div>
        </ElectricBorder>
      </div>
      </AnimatedContent>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

const STORAGE_KEY = "offerStartTimestamp";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
const STRIPE_20_EURO_LINK ="https://buy.stripe.com/4gMcN5eyg7T067mfRuffy02"
  process.env.NEXT_PUBLIC_STRIPE_20_EURO_LINK 

export default function ScheduleCallClient() {
  const searchParams = useSearchParams();
  const [isExpired, setIsExpired] = useState(false);

  const isPaid = searchParams.get("paid") === "true";

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }

    const startTimestamp = Number(stored);
    if (!Number.isFinite(startTimestamp)) {
      return;
    }

    const targetDate = startTimestamp + OFFER_DURATION_MS;
    if (Date.now() > targetDate) {
      setIsExpired(true);
    }
  }, []);

  const canBook = isPaid || !isExpired;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <BlurText
          as="h1"
          className="section-heading pb-4"
          delay={250}
          animateBy="words"
          direction="top"
        >
          Schedule your call
        </BlurText>
        <AnimatedContent ease="power3.out" duration={1.5} delay={0.3} distance={100}>
          <p className="section-description">
            {canBook
              ? "You are cleared to book your strategy call."
              : "Free calls are no longer available. Complete payment to proceed."}
          </p>
        </AnimatedContent>
        <div className="mt-8 flex justify-center">
          <a
            href={canBook ? "mailto:admin@elite-media.gr" : STRIPE_20_EURO_LINK}
            className="btn btn-shine font-bold px-5 py-3 text-sm rounded-[1rem] group w-fullbg-[linear-gradient(to_right,var(--color-amber-300),var(--color-amber-400),var(--color-amber-400))] bg-[length:200%_auto] text-[#2b2216] hover:brightness-105 sm:w-auto md:px-10 md:py-4 md:text-lg"
          >
            {canBook ? "Book your call" : "Pay EUR 20 to book your call"}
          </a>
        </div>
      </div>
    </section>
  );
}

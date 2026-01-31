"use client"
import type { ReactNode } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import useEventOfferCountdown from "@/utils/useEventOfferCountdown";
import {
  REGULAR_EARLY_LINK,
  REGULAR_LATE_LINK,
  VIP_EARLY_LINK,
  VIP_LATE_LINK,
  resolveEventTicketLink,
} from "@/utils/eventOfferLinks";

export type OfferPriceLine = {
  label: string;
  amount: string;
  strike?: boolean;
  highlight?: boolean;
  kind?: "value" | "normal" | "offer";
};

export type OfferCard = {
  title: ReactNode;
  subtitle?: ReactNode;
  priceLines?: OfferPriceLine[];
  ctaLabel?: ReactNode;
  ctaHref?: string;
  ctaHrefExpired?: string;
  features?: ReactNode[];
  highlight?: boolean;
};

export type OfferCardsContent = {
  sectionId?: string;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  offers?: OfferCard[];
};

const DEFAULT_OFFERS: OfferCard[] = [
  {
    title: "Κανονικό",
    subtitle: "Standard access",
    priceLines: [
      { label: "ΑΞΙΑ", amount: "200€", strike: true, kind: "value" },
      {
        label: "ΚΑΝΟΝΙΚΗ ΤΙΜΗ",
        amount: "99€",
        strike: true,
        kind: "normal",
      },
      { label: "ΠΡΟΣΦΟΡΑ", amount: "49€", highlight: true, kind: "offer" },
    ],
    ctaLabel: "Get Normal",
    ctaHref: REGULAR_EARLY_LINK,
    ctaHrefExpired: REGULAR_LATE_LINK,
    features: [
      "Πρόσβαση στο 4ωρο masterclass",
      "Καθαρή επιλογή κατεύθυνσης με κριτήριο",
      "Networking μετά το event με άτομα σαν κι εσένα",
      "Slides + PowerPoints σε PDF στο email για να τα εφαρμόσεις",
    ],
  },
  {
    title: "VIP",
    subtitle: "Priority access",
    priceLines: [
      { label: "ΑΞΙΑ", amount: "300€", strike: true, kind: "value" },
      {
        label: "ΚΑΝΟΝΙΚΗ ΤΙΜΗ",
        amount: "150€",
        strike: true,
        kind: "normal",
      },
      { label: "ΠΡΟΣΦΟΡΑ", amount: "99€", highlight: true, kind: "offer" },
    ],
    ctaLabel: "Get VIP",
    ctaHref: VIP_EARLY_LINK,
    ctaHrefExpired: VIP_LATE_LINK,
    features: [
      "Όλα όσα περιλαμβάνει το Normal Ticket",
      "Priority check-in",
      "VIP θέσεις / καλύτερη εμπειρία μέσα στην αίθουσα",
      "Extra networking / καλύτερη πρόσβαση σε γνωριμίες",
    ],
    highlight: true,
  },
];

const DEFAULT_CONTENT: OfferCardsContent = {
  sectionId: "event-offer-cards",
  eyebrow: "Tickets",
  heading: "Διάλεξε εισιτήριο",
  description: "Δύο επιλογές. Ίδιο roadmap, ίδιο περιβάλλον, απλά διάλεξε αν θες την πιο “VIP” εμπειρία.",
  offers: DEFAULT_OFFERS,
};

export default function OfferCards({ content }: { content?: OfferCardsContent }) {
  const mergedContent = content ?? DEFAULT_CONTENT;
  const offers = mergedContent.offers ?? DEFAULT_OFFERS;
  const { isExpired } = useEventOfferCountdown();

  return (
    <section
      id={mergedContent.sectionId ?? "event-offer-cards"}
      className="relative mt-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            {mergedContent.eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">
                {mergedContent.eyebrow}
              </p>
            ) : null}
            <h2 className="section-heading pb-3">{mergedContent.heading}</h2>
            {mergedContent.description ? (
              <p className="section-description">{mergedContent.description}</p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {offers.map((offer, offerIndex) => {
              const resolvedPriceLines = offer.priceLines
                ? isExpired
                  ? offer.priceLines
                      .filter((line) => line.kind !== "offer")
                      .map((line) =>
                        line.kind === "normal"
                          ? { ...line, strike: false, highlight: true }
                          : line
                      )
                  : offer.priceLines
                : undefined;
              const resolvedCtaHref = offer.ctaHref
                ? resolveEventTicketLink(
                    isExpired,
                    offer.ctaHref,
                    offer.ctaHrefExpired ?? offer.ctaHref
                  )
                : undefined;
              const card = (
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border p-6 shadow-lg transition ${
                    offer.highlight
                      ? "border-amber-400/80 bg-amber-200/30 shadow-[0_20px_45px_rgba(245,158,11,0.18)]"
                      : "border-amber-200/60 bg-amber-50/70"
                  }`}
                >
                  {offer.highlight ? (
                    <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-amber-700">
                      Best value
                    </span>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {offer.title}
                    </h3>
                    {offer.subtitle ? (
                      <p className="text-sm font-semibold text-neutral-600">
                        {offer.subtitle}
                      </p>
                    ) : null}
                  </div>
                  {resolvedPriceLines?.length ? (
                    <div className="mt-4 flex flex-col gap-2">
                      {resolvedPriceLines.map((line, lineIndex) => (
                        <div
                          key={`offer-${offerIndex}-price-${lineIndex}`}
                          className={`font-black ${
                            line.highlight
                              ? "text-2xl text-amber-500/90 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]"
                              : "text-xl text-gray-500 line-through decoration-2 decoration-gray-500"
                          }`}
                        >
                          {line.label} {line.amount}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {offer.features?.length ? (
                    <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                      {offer.features.map((feature, featureIndex) => (
                        <li
                          key={`offer-${offerIndex}-feature-${featureIndex}`}
                          className="flex gap-3"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {offer.ctaLabel ? (
                    resolvedCtaHref ? (
                      <a
                        href={resolvedCtaHref}
                        className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105"
                      >
                        {offer.ctaLabel}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105"
                      >
                        {offer.ctaLabel}
                      </button>
                    )
                  ) : null}
                </div>
              );

              if (!offer.highlight) {
                return (
                  <div key={`offer-${offerIndex}`} className="h-full">
                    {card}
                  </div>
                );
              }

              return (
                <ElectricBorder
                  key={`offer-${offerIndex}`}
                  color="#f5b640"
                  speed={0.6}
                  chaos={0.08}
                  borderRadius={16}
                  className="h-full"
                >
                  {card}
                </ElectricBorder>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

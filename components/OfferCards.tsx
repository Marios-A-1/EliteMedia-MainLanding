import type { ReactNode } from "react";

export type OfferCard = {
  title: ReactNode;
  subtitle?: ReactNode;
  price?: ReactNode;
  ctaLabel?: ReactNode;
  features?: ReactNode[];
  highlight?: boolean;
};

export type OfferCardsContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  offers?: OfferCard[];
};

const DEFAULT_OFFERS: OfferCard[] = [
  {
    title: "Normal Ticket",
    subtitle: "Standard access",
    price: "EUR XX",
    ctaLabel: "Get Normal",
    features: [
      "Feature placeholder 1",
      "Feature placeholder 2",
      "Feature placeholder 3",
      "Feature placeholder 4",
    ],
  },
  {
    title: "VIP Ticket",
    subtitle: "Priority access",
    price: "EUR XX",
    ctaLabel: "Get VIP",
    features: [
      "VIP feature placeholder 1",
      "VIP feature placeholder 2",
      "VIP feature placeholder 3",
      "VIP feature placeholder 4",
    ],
    highlight: true,
  },
];

const DEFAULT_CONTENT: OfferCardsContent = {
  eyebrow: "Tickets",
  heading: "Διάλεξε εισιτήριο",
  description: "Δύο επιλογές. Ίδιο roadmap, ίδιο περιβάλλον, απλά διάλεξε αν θες την πιο “VIP” εμπειρία.",
  offers: DEFAULT_OFFERS,
};

export default function OfferCards({ content }: { content?: OfferCardsContent }) {
  const mergedContent = content ?? DEFAULT_CONTENT;
  const offers = mergedContent.offers ?? DEFAULT_OFFERS;

  return (
    <section className="relative mt-12">
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
            {offers.map((offer, offerIndex) => (
              <div
                key={`offer-${offerIndex}`}
                className={`relative overflow-hidden rounded-2xl border p-6 shadow-lg transition ${
                  offer.highlight
                    ? "border-amber-400/80 bg-amber-50/70 shadow-[0_20px_45px_rgba(245,158,11,0.18)]"
                    : "border-amber-200/60 bg-white/90"
                }`}
              >
                {offer.highlight ? (
                  <span className="mb-4 inline-flex items-center rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
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
                {offer.price ? (
                  <div className="mt-4 text-3xl font-bold text-neutral-900">
                    {offer.price}
                  </div>
                ) : null}

                {offer.features?.length ? (
                  <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                    {offer.features.map((feature, featureIndex) => (
                      <li key={`offer-${offerIndex}-feature-${featureIndex}`} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {offer.ctaLabel ? (
                  <button
                    type="button"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-amber-300 bg-amber-100 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:brightness-105"
                  >
                    {offer.ctaLabel}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

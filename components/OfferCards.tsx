"use client"
import { useState, type ReactNode, type MouseEvent } from "react";
import ElectricBorder from "@/components/ElectricBorder";
import useEventOfferCountdown from "@/utils/useEventOfferCountdown";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import {
  ONLINE_STATIC_LINK,
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
  keepPriceStaticOnExpire?: boolean;
  ctaLabel?: ReactNode;
  ctaHref?: string;
  ctaHrefExpired?: string;
  features?: ReactNode[];
  highlight?: boolean;
  checkoutTier?: "regular" | "vip";
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
    title: "Online",
    subtitle: "Remote access",
    keepPriceStaticOnExpire: true,
    priceLines: [
      { label: "ΑΞΙΑ", amount: "99€", strike: true, kind: "value" },
      {
        label: "ΚΑΝΟΝΙΚΗ ΤΙΜΗ",
        amount: "49€",
        strike: true,
        kind: "normal",
      },
      { label: "ΤΙΜΗ", amount: "20€", highlight: true, kind: "offer" },
    ],
    ctaLabel: "Πάρε Online",
    ctaHref: ONLINE_STATIC_LINK,
    ctaHrefExpired: ONLINE_STATIC_LINK,
    features: [
      "Live online πρόσβαση μέσω Zoom",
      "Ιδανικό αν δεν μπορείς να παρευρεθείς στον χώρο",
    ],
  },
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
    ctaLabel: "Πάρε Κανονικό",
    ctaHref: REGULAR_EARLY_LINK,
    ctaHrefExpired: REGULAR_LATE_LINK,
    checkoutTier: "regular",
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
    ctaLabel: "Πάρε VIP",
    ctaHref: VIP_EARLY_LINK,
    ctaHrefExpired: VIP_LATE_LINK,
    checkoutTier: "vip",
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
  description: "Τρεις επιλογές. Διάλεξε αν θες Regular, VIP ή Online.",
  offers: DEFAULT_OFFERS,
};

export default function OfferCards({ content }: { content?: OfferCardsContent }) {
  const mergedContent = content ?? DEFAULT_CONTENT;
  const offers = mergedContent.offers ?? DEFAULT_OFFERS;
  const { isExpired } = useEventOfferCountdown();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const ctaBaseClassName =
    "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const ctaVipClassName =
    "event-brand-cta focus-visible:ring-blue-400";
  const ctaRegularClassName =
    "event-brand-cta focus-visible:ring-blue-400";
  const ctaOnlineClassName =
    "event-brand-cta focus-visible:ring-blue-400";

  const handleCheckout = async (
    event: MouseEvent<HTMLAnchorElement>,
    tier: OfferCard["checkoutTier"],
    fallbackHref?: string
  ) => {
    if (!tier) {
      return;
    }

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
      if (fallbackHref) {
        window.location.href = fallbackHref;
      }
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section
      id={mergedContent.sectionId ?? "event-offer-cards"}
      className="relative mt-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-10 md:py-10">
          <div className="mx-auto max-w-2xl text-center">
            {mergedContent.eyebrow ? (
              <AnimatedContent
                ease="power3.out"
                duration={1}
                delay={0.15}
                distance={60}
                className="flex justify-center pb-3"
              >
                <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
                  <BlurText
                    as="span"
                    delay={50}
                    spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
                  >
                    {mergedContent.eyebrow}
                  </BlurText>
                </div>
              </AnimatedContent>
            ) : null}
            <AnimatedContent ease="power3.out" duration={1} delay={0.25} distance={60}>
              <h2 className="section-heading pb-3">{mergedContent.heading}</h2>
            </AnimatedContent>
            {mergedContent.description ? (
              <AnimatedContent ease="power3.out" duration={1} delay={0.35} distance={60}>
                <p className="section-description">{mergedContent.description}</p>
              </AnimatedContent>
            ) : null}
          </div>

          <div
            className={`mt-10 grid gap-6 ${
              offers.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            {offers.map((offer, offerIndex) => {
              const resolvedPriceLines = offer.priceLines
                ? isExpired && !offer.keepPriceStaticOnExpire
                  ? offer.priceLines.map((line) => {
                      if (line.kind === "normal") {
                        return { ...line, strike: false, highlight: true };
                      }
                      if (line.kind === "offer") {
                        return { ...line, strike: true, highlight: false };
                      }
                      return line;
                    })
                  : offer.priceLines
                : undefined;
              const resolvedCtaHref = offer.ctaHref
                ? resolveEventTicketLink(
                    isExpired,
                    offer.ctaHref,
                    offer.ctaHrefExpired ?? offer.ctaHref
                  )
                : undefined;
              const isLoading =
                loadingTier !== null && loadingTier === offer.checkoutTier;
              const isVip =
                offer.checkoutTier === "vip" || offer.highlight === true;
              const isRegular = offer.checkoutTier === "regular";
              const cardToneClassName = isVip
                ? "border-amber-400 bg-amber-100"
                : isRegular
                  ? "border-amber-400 bg-amber-100 shadow-[0_16px_34px_rgba(37,99,235,0.12)]"
                  : "border-amber-200 bg-amber-50";
              const ctaToneClassName = isVip
                ? ctaVipClassName
                : isRegular
                  ? ctaRegularClassName
                  : ctaOnlineClassName;
              const ctaClassName = `${ctaBaseClassName} ${
                ctaToneClassName
              }`;
              const card = (
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 shadow-lg transition ${cardToneClassName}`}
                >
                  {offer.highlight ? (
                    <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.05em] text-amber-700">
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
                              ? "text-2xl text-amber-500/90 drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]"
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
                    <div className="mt-auto pt-6">
                      <AnimatedContent
                        threshold={0.28}
                        delay={0.15 + offerIndex * 0.08}
                        duration={2.0}
                        className="w-full"
                      >
                        <a
                          href={resolvedCtaHref ?? "#"}
                          onClick={
                            offer.checkoutTier
                              ? (event) =>
                                  handleCheckout(
                                    event,
                                    offer.checkoutTier,
                                    resolvedCtaHref
                                  )
                              : undefined
                          }
                          aria-disabled={isLoading}
                          className={ctaClassName}
                        >
                          {isLoading ? "Redirecting..." : offer.ctaLabel}
                        </a>
                      </AnimatedContent>
                    </div>
                  ) : null}
                </div>
              );

              const animationDelay = 0.25 + offerIndex * 0.12;

              if (!offer.highlight) {
                return (
                  <AnimatedContent
                    key={`offer-${offerIndex}`}
                    ease="power3.out"
                    duration={1}
                    delay={animationDelay}
                    distance={80}
                    className="h-full"
                  >
                    <div className="h-full">{card}</div>
                  </AnimatedContent>
                );
              }

              return (
                <AnimatedContent
                  key={`offer-${offerIndex}`}
                  ease="power3.out"
                  duration={1}
                  delay={animationDelay}
                  distance={80}
                  className="h-full"
                >
                  <ElectricBorder
                    color="#3b82f6"
                    speed={0.6}
                    chaos={0.04}
                    borderRadius={16}
                    className="h-full overflow-hidden"
                  >
                    {card}
                  </ElectricBorder>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

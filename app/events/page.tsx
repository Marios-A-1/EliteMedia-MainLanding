import EventCommandHero from "@/components/EventCommandHero";
import PixelBlast from "@/components/PixelBlast";
import EventTicketsCta from "@/components/EventTicketsCta";
import Directions, { DirectionsContent } from "@/components/Directions";
import BreakdownTimeline, { BreakdownContent } from "@/components/BreakdownTimeline";
import EventDetails, { EventDetailsContent } from "@/components/EventDetails";
import EventDetails2, { EventDetails2Content } from "@/components/EventDetails2";
import OfferCards, { type OfferCardsContent } from "@/components/OfferCards";
import Cta from "@/components/cta";
import EventOfferCountdownController from "@/components/EventOfferCountdownController";
import EventLeadPopup from "@/components/EventLeadPopup";
import Footer from "@/components/ui/footer";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import {
  ONLINE_STATIC_LINK,
  REGULAR_EARLY_LINK,
  REGULAR_LATE_LINK,
  VIP_EARLY_LINK,
  VIP_LATE_LINK,
} from "@/utils/eventOfferLinks";

export const metadata = {
  title: EVENT_CONFIG.EVENT_TITLE,
  description:
    "Πρακτικό AI event για online income στην Ελλάδα με προσωπική εμπειρία, εφαρμόσιμες στρατηγικές και live Q&A.",
};

const eventHero = {
  brand: "THYMIOLAS",
  headline: <>Πώς Έβγαλα Χρήματα με το AI στην Ελλάδα</>,
  description: (
    <>
      Πραγματικό free value μέσα από προσωπική εμπειρία, πρακτικές γνώσεις και
      εφαρμόσιμες στρατηγικές γύρω από το AI και το online income στην Ελλάδα.
    </>
  ),
  dateLabel: "31/5",
  // locationLabel: EVENT_CONFIG.EVENT_LOCATION_TEXT,
  locationLabel: "Αθήνα",
  prompt: "Πώς μπορώ να βγάλω χρήματα με AI στην Ελλάδα;",
  roadmapItems: [
    {
      label: "Skill",
      title: "Διάλεξε AI skill",
      description:
        "Ξεκίνα από μία πρακτική ικανότητα που λύνει πραγματικό πρόβλημα.",
    },
    {
      label: "Offer",
      title: "Χτίσε απλό offer",
      description:
        "Μετέτρεψε το skill σε ξεκάθαρη πρόταση που μπορεί να πουληθεί.",
    },
    {
      label: "Outreach",
      title: "Βρες τα πρώτα leads",
      description:
        "Δες πώς προσεγγίζεις ανθρώπους και επιχειρήσεις στην Ελλάδα.",
    },
    {
      label: "First Income",
      title: "Δές αποτελέσματα",
      description:
        "Μάθε τι λειτούργησε πραγματικά και ποια βήματα κρατάς.",
    },
  ],
  ctaNode: (
    <EventTicketsCta
      label="Διάλεξε εισιτήριο"
      playOnMount
    />
  ),
};

const TicketsContent: OfferCardsContent = {
  sectionId: "event-offer-cards",
  eyebrow: "Tickets",
  heading: "Εισιτήρια",
  description:
    "Διάλεξε online access ή in-person access. Η ώρα και το venue θα ανακοινωθούν.",
  offers: [
    {
      title: "Online Access",
      subtitle: "Παρακολούθηση online",
      keepPriceStaticOnExpire: true,
      priceLines: [{ label: "ΤΙΜΗ", amount: "15€", highlight: true }],
      ctaLabel: "Πάρε Online",
      ctaHref: ONLINE_STATIC_LINK,
      ctaHrefExpired: ONLINE_STATIC_LINK,
      features: [
        "Πρόσβαση στο live event",
        "AI opportunities και πρακτικά βήματα",
        "Q&A session",
      ],
    },
    {
      title: "In-Person Access",
      subtitle: "Παρουσία στον χώρο",
      keepPriceStaticOnExpire: true,
      priceLines: [{ label: "ΤΙΜΗ", amount: "29€", highlight: true }],
      ctaLabel: "Πάρε In-Person",
      ctaHref: REGULAR_EARLY_LINK,
      ctaHrefExpired: REGULAR_LATE_LINK,
      checkoutTier: "regular",
      features: [
        "Όλα όσα περιλαμβάνει το online access",
        "Live εμπειρία στον χώρο",
        "Community, future access και networking",
      ],
    },
    {
      title: "VIP Spots",
      subtitle: "Premium in-person access",
      keepPriceStaticOnExpire: true,
      priceLines: [{ label: "ΤΙΜΗ", amount: "99€", highlight: true }],
      ctaLabel: "Πάρε VIP",
      ctaHref: VIP_EARLY_LINK,
      ctaHrefExpired: VIP_LATE_LINK,
      checkoutTier: "vip",
      features: [
        "Όλα όσα περιλαμβάνει το in-person access",
        "Best seats / καλύτερη εμπειρία μέσα στην αίθουσα",
        "Closer networking και καλύτερη πρόσβαση μετά το event",
      ],
      highlight: true,
    },
  ],
};

const CtaContent = {
  heading: "Μάθε πώς μπορείς να βγάλεις χρήματα με το AI στην Ελλάδα",
  cta: {
    label: <>Διάλεξε εισιτήριο</>,
    href: "#event-offer-cards",
  },
};

export default function EventsPage() {
  return (
    <main className="event-page-shell">
      <div className="event-page-pixel-blast-bg" aria-hidden="true">
        <PixelBlast
          color="#3b7bde"
          pixelSize={4}
          patternScale={2.4}
          patternDensity={1.12}
          speed={0.96}
          transparent
          edgeFade={0.18}
          enableRipples={false}
        />
      </div>
      <EventLeadPopup />
      {EVENT_CONFIG.ENABLE_EVENT_OFFER_COUNTDOWN ? (
        <EventOfferCountdownController
          triggerLeadPopup
          leadSource="events_countdown_popup"
        />
      ) : null}
      <EventCommandHero {...eventHero} />
      <EventDetails2 content={EventDetails2Content} />
      <div className="flex w-full justify-center px-4 pt-2 pb-8 lg:hidden">
        <EventTicketsCta
          label="Διάλεξε εισιτήριο"
          playOnMount
          animationDelay={0.15}
        />
      </div>
      <BreakdownTimeline content={BreakdownContent} />
      {/* <EventDetails content={EventDetailsContent} /> */}
      {/* <Directions content={DirectionsContent} /> */}
      <OfferCards content={TicketsContent} />
      <Cta
        content={CtaContent}
      />
      <Footer />
    </main>
  );
}

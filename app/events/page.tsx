import EventCommandHero from "@/components/EventCommandHero";
import PixelBlast from "@/components/PixelBlast";
import EventTicketsCta from "@/components/EventTicketsCta";
import Directions, { DirectionsContent } from "@/components/Directions";
import BreakdownTimeline, { BreakdownContent } from "@/components/BreakdownTimeline";
import EventDetails, { EventDetailsContent } from "@/components/EventDetails";
import OfferCards, { type OfferCardsContent } from "@/components/OfferCards";
import Cta from "@/components/cta";
import EventOfferCountdownController from "@/components/EventOfferCountdownController";
import EventLeadPopup from "@/components/EventLeadPopup";
import Footer from "@/components/ui/footer";
import { EVENT_CONFIG } from "@/lib/eventConfig";

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
      label="Δήλωσε ενδιαφέρον"
      triggerLeadPopup
      leadSource="events_hero_cta"
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
      features: [
        "Όλα όσα περιλαμβάνει το online access",
        "Live εμπειρία στον χώρο",
        "Community, future access και networking",
      ],
      highlight: true,
    },
  ],
};

const CtaContent = {
  heading: "Μάθε πώς μπορείς να βγάλεις χρήματα με το AI στην Ελλάδα",
  cta: {
    label: <>Δήλωσε ενδιαφέρον</>,
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
      {/* <OfferCards content={TicketsContent} /> */}
      <BreakdownTimeline content={BreakdownContent} />
      {/* <EventDetails content={EventDetailsContent} /> */}
      {/* <Directions content={DirectionsContent} /> */}
      <Cta
        content={CtaContent}
        triggerLeadPopup
        leadSource="events_bottom_cta"
      />
      <Footer />
    </main>
  );
}

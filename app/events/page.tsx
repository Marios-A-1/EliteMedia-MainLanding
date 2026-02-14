export const metadata = {
  title: "Elite Media Event",
  description:
    "Join the Elite Media Academy event and learn a practical roadmap to build your first 1,000 EUR online in 90 days.",
};

import Hero from "@/components/hero-home";
import ForbesQuote from "@/components/ForbesQuote";
import Carousel from "@/components/carousel";
import OldNew from "@/components/OldNew";
import Features from "@/components/features";
import ForYouIf, { ForYouIfContent } from "@/components/ForYouIf";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import EventTicketsCta from "@/components/EventTicketsCta";
import HowColumnsSection from "@/components/HowColumnsSection";
import OfferCards from "@/components/OfferCards";
import EventOfferCountdownController from "@/components/EventOfferCountdownController";
import { steps } from "framer-motion";
import Directions, { DirectionsContent } from "@/components/Directions";
import EventDetails, { EventDetailsContent } from "@/components/EventDetails";
import BreakdownTimeline, { BreakdownContent } from "@/components/BreakdownTimeline";
const eventsHero={
  title: <>Βγάλε τα πρώτα σου <br /> 1000€ online σε 90 μέρες </>,
  highlightWords: ["1000€", "90", "μέρες", "αρχάριος"],
  description: <>Ως Αρχάριος - Στην Ελλάδα - Το 2026</>,
  videoId: "1128212394",
  videoTitle: "Events video",
  videoParams: "autoplay=0&title=0&byline=0&portrait=0",
  ctaNode: <EventTicketsCta />,
  offerPopupCtaHref: "#event-offer-cards",
  
}
const HowColumnsSharedContent = {
  eyebrow: <>Γιατί εμάς</>,
  heading: <>Γιατί Elite Media Event?</>,
  subheading: <>Μιλήσαμε με δεκάδες άτομα 18–24 που θέλουν να ξεκινήσουν την πρώτη τους online επιχείρηση στην Ελλάδα — και είδαμε τα ίδια 5 προβλήματα να επαναλαμβάνονται ξανά και ξανά. Γι’ αυτό χτίσαμε το EliteMedia Academy Event</>
}
  const HowItWorksContent = {
  eyebrow: <>EliteMedia Academy Event</>,
  heading: <>Τα 5 κοινά προβλήματα</>,
  // description: <>που αντιμετωπίζουν νέοι 18–24 πριν ξεκινήσουν την πρώτη τους online επιχείρηση στην Ελλάδα — και πώς το λύνουμε με σύστημα.</>,
  steps: [
    {
      number: "01",
      title: "«Βλέπω 100 βίντεο… και στο τέλος δεν ξεκινάω τίποτα»",
      description: [
        "χάνεσαι σε υπερπληροφόρηση & “gurus”",
        "και αντί να προχωράς, απλά καταναλώνεις",
      ],
    },
    {
      number: "02",
      title: "«Δεν ξέρω τι να διαλέξω: AI, SMM, Sales, Freelancing…»",
      description: [
        "όλα ακούγονται σωστά",
        "αλλά χωρίς κριτήριο, αλλάζεις κατεύθυνση κάθε εβδομάδα",
      ],
    },
    {
      number: "03",
      title: "«Δουλεύουν αυτά στην Ελλάδα ή είναι μούφα;»",
      description: [
        "ο κύκλος σου λέει “βρες κανονική δουλειά”",
        "και εσύ μένεις με αμφιβολία και φόβο να εκτεθείς",
      ],
    },
    {
      number: "04",
      title: "«Νιώθω ότι όλοι προχωράνε κι εγώ είμαι πίσω»",
      description: [
        "βλέπεις άλλους να “ανεβαίνουν”",
        "και αρχίζεις να πιστεύεις ότι “κάτι δεν έχω”",
      ],
    },
    {
      number: "05",
      title: "«Το κάνω μόνος — χωρίς περιβάλλον, χωρίς feedback»",
      description: [
        "κανείς γύρω σου δεν το κυνηγάει σοβαρά",
        "και όταν δυσκολεύεσαι, δεν έχεις ποιος να σε σηκώσει",
      ],
    },
  ],
};

const HowWeDoItContent = {
  eyebrow: <>Το Σύστημα</>,
  heading: <>Πώς λειτουργούμε εμείς</>,
  // description: <>Για να φύγεις με μονοπάτι, skill και περιβάλλον — όχι άλλο μπέρδεμα.</>,
  steps: [
    {
      number: "01",
      title: "Δεν σε πνίγουμε με πληροφορία. Σου δίνουμε μονοπάτι.",
      description: [
        "φεύγεις με roadmap και καθαρά βήματα",
        "ώστε να ξέρεις ακριβώς “τι κάνω από αύριο”",
      ],
    },
    {
      number: "02",
      title: "Δεν σε αφήνουμε να μαντεύεις. Σου δείχνουμε επιλογές με κριτήριο.",
      description: [
        "AI / Πωλήσεις / Social Media Marketing / Freelancing",
        "και πώς να διαλέξεις μία που σου ταιριάζει για να την τρέξεις σωστά",
      ],
    },
    {
      number: "03",
      title: "Δεν πουλάμε “εύκολα λεφτά”. Χτίζουμε skill που πληρώνεται.",
      description: [
        "το αποτέλεσμα έρχεται όταν έχεις skill + εφαρμογή",
        "και όχι όταν κυνηγάς “μοντέλα” από TikTok",
      ],
    },
    {
      number: "04",
      title: "Δεν μένεις στη θεωρία. Σε βάζουμε σε εκτέλεση.",
      description: [
        "4 ώρες masterclass με πρακτικά βήματα",
        "0 → skill → 1ος πελάτης → πρώτα 1000€ online",
      ],
    },
    {
      number: "05",
      title: "Δεν το κάνεις μόνος. Παίρνεις περιβάλλον.",
      description: [
        "networking με εκατοντάδες άτομα σαν εσένα",
        "και παίρνεις και τα slides/PDF στο email για να εφαρμόσεις",
      ],
    },
  ],
};


const ForYouIFContent: ForYouIfContent = {
  eyebrow: <>Για ποιον είναι;</>,
  heading: <>Αυτό είναι για εσένα αν :</>,
  items: [
    {
      badge: <>✓</>,
      text: (
        <>Είσαι 16–27 και δεν έχεις βγάλει ακόμα ούτε 1€ online, αλλά ξέρεις ότι μπορείς.</>
      ),
    },
    {
      badge: <>✓</>,
      text: (
        <>Θέλεις έναν ξεκάθαρο τρόπο να βγάλεις τα πρώτα σου 1.000€ μέσα στις επόμενες 90 μέρες.</>
      ),
    },
    {
      badge: <>✓</>,
      text: (
        <>Σε ενδιαφέρει να μάθεις πώς βγάζουν λεφτά πραγματικοί επιχειρηματίες όχι θεωρίες.</>
      ),
    },
    // {
    //   badge: <>✓</>,
    //   text: (
    //     <>Θέλεις να δεις live παραδείγματα από άτομα που ξεκίνησαν από το μηδέν, όπως εσύ.</>
    //   ),
    // },
    {
      badge: <>✓</>,
      text: (
        <>Θέλεις καθοδήγηση, πλάνο και ξεκάθαρα βήματα — όχι motivation για 2 μέρες.</>
      ),
    },
  ],
};;

const TestimonialsContent = {
  eyebrow: <>Testimonials</>,
  heading: <>Πραγματικές Ιστορίες Επιτυχίας</>,
  description: <>Απο μέλη της Ακαδημίας που έχουν δημιουργήσει επιχειρήσεις και έχουν χτίσει κάτι δικό τους</>,
  items: [
  {
    id: 1,
    type: "video"as const,
    vimeo: "1128237096" ,
  },
  {
    id: 2,
    type: "video"as const,
    vimeo: "1128239662",
  },
  {
    id: 3,
    type: "video"as const,
    vimeo: "1128254048",
  },
  {
    id: 4,
    type: "video"as const,
    vimeo: "1128253975",
  },
  {
    id: 5,
    type: "video"as const,
    vimeo: "1128259535",
  },
  {
    id: 6,
    type: "video"as const,
    vimeo: "1128259812",
  },
  // {
  //   id: 8,
  //   type: "video"as const,
  //   vimeo: "1128237975",
  // },
]
};
const GoogleTestimonialsContent = {
  eyebrow: <section id="reviews">Reviews</section>,
  heading: < >Google Reviews</>,
  description: <>Απο συνεργασίες που έχουν μεταμορφώσει επιχειρήσεις και έχουν οδηγήσει σε μετρήσιμα αποτελέσματα.</>,
  items: [
  {
    id: 1,
    type: "google" as const,
    author: "Giorgos Pattakos",
      rating: 5,
      text: "Η συνεργασία μας με την Elite Media και το Team του Αιμίλιου είναι εξαιρετική. Υπάρχει επαγγελματισμός, συνέπεια και πραγματικό ενδιαφέρον για το αποτέλεσμα.Μέσα σε ελάχιστο διάστημα έχουμε αυξήσει τις πωλήσεις και τα νούμερά μας όπως ποτέ πριν. Δεν προτείνουν έτοιμες λύσεις, αλλά προσαρμόζουν τη στρατηγική στις ανάγκες μας και μετρούν κάθε βήμα. Τους εμπιστεύομαι γιατί φέρνουν απτό αποτέλεσμα και κρατούν σταθερή ποιότητα σε κάθε συνεργασία. Συστήνω ανεπιφύλακτα την ομάδα αυτή.",
  },
  {
    id: 2,
    type: "google" as const,
    author: "MARIA MARTZIVANOU",
      rating: 5,
      text: "Είχα την ευκαιρία να γνωρίσω την εταιρεία και τη δουλειά τους μέσα από τα βίντεο που δημιούργησαν για μένα και πραγματικά εντυπωσιάστηκα. Πρόκειται για μια ομάδα με φρέσκες ιδέες, επαγγελματισμό και αληθινή αγάπη γι’ αυτό που κάνει. Οι άνθρωποι πίσω από την εταιρεία είναι εξαιρετικοί: επικοινωνιακοί, δημιουργικοί, πάντα με διάθεση να ακούσουν και να προτείνουν λύσεις που ταιριάζουν στις ανάγκες",
  },
  {
    id: 4,
    type: "google" as const,
    author: "ΓΕΩΡΓΙΟΣ ΠΑΝΑΓΑΚΗΣ",
      rating: 5,
      text: "Εξαιρετική ομάδα με φιλότιμους, γεμάτους ενέργεια και πάνω από όλα πρωτοποριακές ιδέες ανθρώπους.Δεν είναι μια απλή συνεργασία, είναι δυναμική, διασκεδαστική και δημιουργική αλληλεπίδραση.Τους συστήνω ανεπιφύλακτα!",
  },
  {
    id: 5,
    type: "google" as const,
    author: "Theodore Arm",
      rating: 5,
      text: "Με τον Αιμίλιο ξεκινήσαμε το 2024 κάνοντας οργανικό περιεχόμενο σε μικρή συχνότητα και πλέον σχεδόν 2026 είναι ο ίδιος και η Elite media είναι βασικός πυλώνας σε ό,τι αφορά το digital marketing της Phao - stories around the table. Εχει συγκεντρώσει/οργανώσει μια φανταστική ομάδα από ανθρώπους που γουστάρουν την δουλειά τους και δίνουν τον καλύτερο τους εαυτό και πλέον η συνεργασία μας είναι win-win με ποιοτικά και ποσοτικά αποτελέσματα. 🙏 Συστήνω ανεπιφύλακτα!",
  },
  {
    id: 6,
    type: "google" as const,
    author: "ΟΛΓΑ ΤΖΕΤΖΗ",
      rating: 5,
      text: "Ομαδάρα Elite media!!! Νέοι ανθρωποι, δημιουτγικοί, αποτελεσματικοί με αγάπη για αυτό που κανουν! Πολύτιμη εμπειρία η συνεργασία μαζί τους!!! Οταν η δουλειά γίνεται … διασκέδαση!!! H πιο ελιτ…. Ομαδα όσον αφορά στην ποιότητα! Συστήνω ανεπιφύλακτα…. Elite media!!!❤️",
  },
  {
    id: 7,
    type: "google" as const,
    author: "Lina Iosifidou",
      rating: 5,
      text: "Η επιτυχία είναι σίγουρη σε κάθε συνεργασία μαζί τους ,με πολύ φρέσκιες ιδέες επίκαιρες και με πολύ δημιουργικότητα.Επαγγελματισμός και συνέπεια σε ό,τι κάνουν ,ευχαριστούμε πολύ για την πολύτιμη συνεργασία και που η επιχείρηση μας αναδείχτηκε μέσα από εσάς 👌👌👌",
  },
  {
    id: 8,
    type: "google" as const,
    author: "George Bouldis",
      rating: 5,
      text: "Επειτα από 1 χρόνο συνεργασίας μου με τον Αιμίλιο και όλη την ομάδα της EliteMedia έχω να πω μόνο τα καλύτερα. Ολη η ομάδα είναι πλήρως καταρτισμένη και γνωρίζουν πολύ καλά πως να κάνουν τη δουλειά τους και να πετύχουν τους στόχους που τους θέτει ο πελάτης. Έχουν έμπνευση, νέες ιδέες και πολύ όρεξη για δουλειά.",
  },
  {
    id: 9,
    type: "google" as const,
    author: "Αριστοφανης Πλεξιδας",
      rating: 5,
      text: "Άψογοι συνεργάτες σε όλα τα επίπεδα",
  },
]
};
const VALUE_BREAKDOWN_CONTENT = {
  items: [
    {
      label: 'Συνολική Αξία',
      amount: '997€',
      description: 'Συνολική αξία όλων όσων λαμβάνεις',
      strike: true,
    },
    {
      label: 'Κανονική Τιμή',
      amount: '497€',
      description: 'Με το πακέτο',
      strike: true,
    },
    {
      label: 'Προσφορά Σήμερα',
      amount: '1 €',
      description: 'Για τις επόμενες 48 ώρες',
      highlight: true,
    },
  ],
};
const CtaContent = {
  heading:"Μάθε πως να βγάζεις χρήματα Online",
  cta:{
    label: <>Κράτα την θέση σου</>,
    href: "#event-offer-cards",
  },
}
export default function EventsPage() {
  return (
    <>
      <EventOfferCountdownController />
      <Hero content={eventsHero}/>
      {/* <OldNew /> */}
      {/* <Features /> */}
      <ForYouIf content={ForYouIFContent}/>
      {/* <ForbesQuote /> */}
      <HowColumnsSection
        id="giati-elite-media"
        eyebrow={HowColumnsSharedContent.eyebrow}
        heading={HowColumnsSharedContent.heading}
        subheading={HowColumnsSharedContent.subheading}
        howItWorksContent={HowItWorksContent}
        howWeDoItContent={HowWeDoItContent}
      />
      <Directions content={DirectionsContent} />
      <BreakdownTimeline content={BreakdownContent} />
      <EventDetails content={EventDetailsContent} />
      <OfferCards />
      <Testimonials content={TestimonialsContent}/>
      <Cta content={CtaContent}/>
    </>
  );
}

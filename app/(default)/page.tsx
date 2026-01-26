export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};
import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import HowWeDoIt from "@/components/HowWeDoIt";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import ChromaGrid from "@/components/chroma-grid";
import Carousel from "@/components/carousel";
import OldNew from "@/components/OldNew";
import ForYouIf, { type ForYouIfContent } from "@/components/ForYouIf";
import ForbesQuote from "@/components/ForbesQuote";
import { Description } from "@headlessui/react";
import HowItWorks from "@/components/HowItWorks";
import ValueBreakdown from "@/components/ValueBreakdown";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

const HeroContent = {
  titleText: "Elite Signature Strategy",
  description: <>Η στρατηγική που αυξάνει τον τζίρο ελληνικών επιχειρήσεων μέσω των social media.</>,
  videoId: "1128212394",
  ctaDescription: "",
  ctaLabel: 'Κλείσε Συμβουλευτική',
  offerPopupTriggerSeconds: 20,
}

const HowWeDoItContent = {
  heading: <>Πώς Λειτουργούμε εμείς</>,
  // description: <>Δεν είμαστε άλλο ένα marketing agency. Είμαστε σύστημα απόδοσης. Κάθε πρόβλημα που μόλις διάβασες, το έχουμε ήδη λύσει.</>,
};

const HowItWorksContent ={
  heading: <>Τα 5 κοινά προβλήματα</>,
  // description: <>που αντιμετωπίζουν επιχειρηματίες πριν συνεργαστούνε με ένα social media marketing agency στην Ελλάδα το 2026</>,
};
const HowColumnsSharedContent = {
  eyebrow: <>Γιατί εμάς</>,
  heading: <>Γιατί Elite Media?</>,
  subheading: <>Κάναμε έρευνα και βρήκαμε ποια είναι τα 5 πιο κοινά προβλήματα που αντιμετωπίζουν οι επιχειρηματίες πριν συνεργαστούν με ένα Social Media Marketing Agency στην Ελλάδα — και χτίσαμε το σύστημά μας πάνω σε αυτά.</>,
};

const ForYouIFContent: ForYouIfContent = {
  eyebrow: <>Για ποίον είναι ?</>,
  heading: <>Αυτό είναι για εσένα αν</>,
  items: [
    {
      badge:  <>✓</>,
      text: (
        <>Θέλεις σοβαρά αποτελέσματα στα social και όχι απλά “ωραία posts”.</>
      ),
    },
    {
      badge: <>✓</>,
      text: <>Σε ενδιαφέρει να χτίσεις brand που πουλάει, όχι απλά να μαζεύεις like</>,
    },
    {
      badge: <>✓</>,
      text: <>Θέλεις να δουλεύεις με ανθρώπους που παίζουν στο ίδιο level με εσένα.</>,
    },
    {
      badge: <>✓</>,
      text: <>Θέλεις να ξέρεις γιατί δουλεύει κάτι — όχι απλά να σου λένε «εμπιστέψου μας»</>,
    },
  ],
};

const TestimonialsContent = {
  sectionId: "results",
  eyebrow: <>Testimonials</>,
  heading: <>Πραγματικές Ιστορίες Επιτυχίας</>,
  // description: <>Απο συνεργασίες που έχουν μεταμορφώσει επιχειρήσεις και έχουν οδηγήσει σε μετρήσιμα αποτελέσματα.</>,
  items: [
  {
    id: 1,
    type: "video"as const,
    vimeo: "1128240063" ,
  },
  {
    id: 2,
    type: "video"as const,
    vimeo: "1128239355",
  },
  {
    id: 4,
    type: "video"as const,
    vimeo: "1128240483",
  },
  {
    id: 5,
    type: "video"as const,
    vimeo: "1128237015",
  },
  {
    id: 6,
    type: "video"as const,
    vimeo: "1128234831",
  },
  {
    id: 7,
    type: "video"as const,
    vimeo: "1128235386",
  },
  {
    id: 8,
    type: "video"as const,
    vimeo: "1128237975",
  },
]
};
const GoogleTestimonialsContent = {
  sectionId: "reviews",
  eyebrow: <>Reviews</>,
  heading: <>Google Reviews</>,
  // description: <>Απο συνεργασίες που έχουν μεταμορφώσει επιχειρήσεις και έχουν οδηγήσει σε μετρήσιμα αποτελέσματα.</>,
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
      amount: '20€',
      description: 'Με το πακέτο',
      strike: true,
    },
    {
      label: 'Προσφορά Σήμερα',
      amount: 'ΔΩΡΕΑΝ',
      description: 'Για τις επόμενες 48 ώρες',
      highlight: true,
    },
  ],
};




export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero content={HeroContent}/>
      {/* <ForYouIf content={ForYouIFContent} />  */}
      <ForbesQuote />
      <div id="giati-elite-media" className="mt-24">
        <div className="mx-auto max-w-2xl text-center ">
           <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
            <BlurText
              as="span"
              delay={50}
              spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
            >
              {HowColumnsSharedContent.eyebrow}
            </BlurText>
          </div>
          </div>
        <div className="mx-auto w-full max-w-[1100px]  px-4 sm:px-6">
          <div className=" pb-8 text-center">
            <BlurText
              as="h2"
              className="section-heading text-neutral-900 pb-4"
              delay={50}
              animateBy="words"
              direction="top"
            >
              {HowColumnsSharedContent.heading}
            </BlurText>
            {/* <div className="rounded-2xl border-2 border-amber-400 bg-amber-500/20 px-4 py-6"> */}
            <AnimatedContent ease="power3.out" duration={1.1} delay={0.3} distance={100}>
              <p className="section-description ">
                {HowColumnsSharedContent.subheading}
              </p>
            </AnimatedContent>
          {/* </div> */}
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-0 lg:items-start">
            <HowItWorks content={HowItWorksContent} />
            <HowWeDoIt content={HowWeDoItContent} />
          </div>
        </div>
      </div>
      <Testimonials content={TestimonialsContent}/>
      <Testimonials content={GoogleTestimonialsContent}/>
      <Workflows />
      <ValueBreakdown content={VALUE_BREAKDOWN_CONTENT} />
      {/* <Features /> */}
      {/* <OldNew /> */}
      {/* <ChromaGrid items={partners} className="my-6 flex-1 md:my-10" /> */}
      <Cta />
    </>
  );
}

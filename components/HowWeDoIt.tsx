"use client";

import { Timeline } from "antd";
import type { CSSProperties, ReactNode } from "react";

const STEPS = [
  {
    number: "01",
    title: "Αναλαμβάνουμε όλο το σύστημα από το μηδέν",
    description: [
      "στρατηγική",
      "περιεχόμενο",
      "funnels",
      "tracking",
      "Εσύ απλά εγκρίνεις.",
    ],
  },
  {
    number: "02",
    title: "Βγάζουμε ξεκάθαρο “ποιον πουλάμε & γιατί αγοράζει”",
    description: [
      "ιδανικός πελάτης",
      "pains",
      "objections",
      "triggers → για να μιλάμε σωστά και να μην πετάμε content στον αέρα.",
    ],
  },
  {
    number: "03",
    title: "Στήνουμε το brand σου να “γράφει” άμεσα",
    description: [
      "positioning",
      "μήνυμα",
      "γωνίες επικοινωνίας",
      "διαφορά από τον ανταγωνισμό.",
    ],
  },
  {
    number: "04",
    title: "Φτιάχνουμε business/marketing plan ανά μήνα & τρίμηνο",
    description: [
      "Στόχοι (ραντεβού/πωλήσεις)",
      "offers",
      "events",
      "πλάνο δράσης",
      "τι μετράμε.",
    ],
  },
  {
    number: "05",
    title: "Χτίζουμε τη διαδρομή Viewer → Lead → Πελάτης",
    description: [
      "ξεκάθαρο funnel (DM / form / call / checkout)",
      "ώστε κάθε reel να οδηγεί κάπου.",
    ],
  },
  {
    number: "06",
    title: "Βάζουμε AI αυτοματισμούς που κλείνουν χρόνο & δεν χάνουν leads",
    description: [
      "comment keywords",
      "auto-DM",
      "qualifying flows",
      "follow-ups.",
    ],
  },
  {
    number: "07",
    title: "Παράγουμε το content γρήγορα & σωστά",
    description: [
      "hooks",
      "σενάρια",
      "reels",
      "posts",
      "stories",
      "long form όπου χρειάζεται για authority.",
    ],
  },
  {
    number: "08",
    title: "Αναλαμβάνουμε γύρισμα + editing + “signature style”",
    description: [
      "επαγγελματική εικόνα",
      "αναγνωρίσιμο look",
      "consistency που χτίζει εμπιστοσύνη..",
    ],
  },
  {
    number: "09",
    title: "Ανεβάζουμε εμείς παντού, στις σωστές ώρες",
    description: [
      "scheduling",
      "captions",
      "CTAs",
      "hashtags",
      "ροή προς το funnel (όχι random posting).",
    ],
  },
  {
    number: "10",
    title: "Μετράμε, κάνουμε report και βελτιώνουμε κάθε μήναs",
    description: [
      "τι έφερε views",
      "τι έφερε DMs",
      "τι έφερε ραντεβού/πωλήσεις",
      "κόβουμε τα άχρηστα",
      "διπλασιάζουμε τα winners (και όπου χρειάζεται, ενισχύουμε με ads/events).",
    ],
  },
];


type HowWeDoItStep = {
  number: string;
  title: ReactNode;
  description: ReactNode;
};

type HowWeDoItContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  steps?: HowWeDoItStep[];
};

type HowWeDoItProps = {
  content?: HowWeDoItContent;
};

export default function HowWeDoIt({ content }: HowWeDoItProps) {
  return (
    <section id="how-we-do-it" className="how-we-do-it py-14 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl pb-8 text-center md:pb-12">
          <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-400/50">
            <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
              {content?.eyebrow}
            </span>
          </div>
          <h2 className="section-heading pb-3 text-neutral-900">
            {content?.heading }
          </h2>
          <p className="text-base pb-4 text-neutral-700 md:text-lg">
            {content?.description}
          </p>
        </div>
        <div className="flex justify-center px-10 ">
          <Timeline
            className="how-we-do-it-timeline w-full max-w-[760px] sm:w-auto"
            items={(content?.steps ?? STEPS).map((step) => ({
              key: step.number,
              color: "var(--color-gold-500)",
              dot: (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[color:var(--color-gold-500)] bg-transparent text-sm font-medium text-[var(--color-gold-accent)]"
                  style={{
                    "--color-gold-ui-300": "var(--color-gold-200)",
                    "--color-gold-accent": "var(--color-gold-700)",
                    backgroundColor: "var(--color-gold-200)",
                  } as CSSProperties}
                >
                  {step.number}
                </div>
              ),
              children: (
                <div className="pb-1 pl-2">
                  <h3 className="text-base font-semibold text-neutral-900 md:text-lg">
                    {step.title}
                  </h3>
                  {Array.isArray(step.description) && (
                    <ul className="mt-2 space-y-1.5 text-sm text-neutral-700 md:text-base">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}

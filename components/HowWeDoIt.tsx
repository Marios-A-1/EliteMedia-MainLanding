"use client";

import { Timeline } from "antd";
import type { CSSProperties, ReactNode } from "react";



const STEPS = [
  {
    number: "01",
    title: "«Μου μιλάνε για προβολές, αλλά εγώ θέλω πελάτες»",
    description: [
      "σου μιλάνε για views & reach",
      "εσύ χρειάζεσαι τζίρο",
      "οι οργανικές προβολές δεν φέρνουν απαραίτητα πελάτες",
      "χωρίς σύστημα μετατροπής → τα views μένουν νούμερα",
      "αυτό που λείπει είναι το funnel",
    ],
  },
  {
    number: "02",
    title: "«Δεν θέλω να γίνω κλόουν σαν τους ανταγωνιστές μου»",
    description: [
      "φοβάσαι ότι το περιεχόμενο θα σε γελοιοποιήσει",
      "νιώθεις ότι κανείς δεν σε ακούει",
      "βλέπεις competitors να κάνουν θόρυβο",
      "εσύ περιμένεις να χτυπήσει το τηλέφωνο",
      "και φοβάσαι ότι θα είναι… η εφορία",
    ],
  },
  {
    number: "03",
    title: "«Ντρέπομαι να βγω στην κάμερα»",
    description: [
      "ανασφάλεια μπροστά στον φακό",
      "λογικό αν είναι η πρώτη σου φορά",
      "το πρόβλημα ξεκινά όταν το agency δεν σε κάνει να νιώθεις άνετα",
      "η ανασφάλεια περνάει στο βίντεο",
      "υπάρχουν τρόποι να διορθωθεί",
    ],
  },
  {
    number: "04",
    title: "«Μου ζητάνε συνέχεια πράγματα, δεν έχω χρόνο»",
    description: [
      "υποτίθεται ότι στα αναλαμβάνουν όλα",
      "αλλά ζητάνε κωδικούς, logos, φόρμες, βίντεο",
      "πολλές διαδικασίες περνάνε από εσένα",
      "χάνεις χρόνο αντί να κερδίζεις",
      "με σύστημα θα αρκούσαν 10’ την ημέρα",
    ],
  },
  {
    number: "05",
    title: "«Δεν υπάρχει πλάνο, απλά ανεβάζουμε βίντεο»",
    description: [
      "δεν βλέπεις πώς σε βοηθάει επιχειρηματικά",
      "έκανες marketing για να αυξήσεις τζίρο",
      "μπήκες στα social λόγο ανταγωνισμού",
      "όχι για random content",
      "αυτό που χρειάζεσαι είναι σύστημα, όχι posts",
    ],
  },
  {
    number: "06",
    title: "«Δεν ξέρω τίποτα και φοβάμαι ότι θα με κοροϊδέψουν»",
    description: [
      "reports με views και likes",
      "δικαιολογίες τύπου ‘algorithm update’",
      "δεν καταλαβαίνεις τι σημαίνουν τα νούμερα",
      "νιώθεις εκτός ελέγχου",
      "χωρίς διαφάνεια δεν υπάρχει εμπιστοσύνη",
    ],
  },
  {
    number: "07",
    title: "«Το agency δεν καταλαβαίνει τον κλάδο μου»",
    description: [
      "κανείς δεν ξέρει τη δουλειά σου όπως εσύ",
      "δυσκολεύεσαι να τους εμπιστευτείς",
      "δεν γνωρίζουν τον κλάδο από μέσα",
      "ό,τι κι αν σου πουν δεν σε πείθει",
      "και σε αυτό… έχεις δίκιο",
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold-500  bg-amber-200/30 text-sm font-medium text-(--color-gold-accent)"
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

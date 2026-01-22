"use client";

import { Timeline } from "antd";
import type { CSSProperties, ReactNode } from "react";



const STEPS = [
  {
    number: "01",
    title: "Δεν πουλάμε προβολές. Στήνουμε πελατομηχανή.",
    description: [
      "δεν μετράμε επιτυχία σε views και reach. Mετράμε ραντεβού, leads και τζίρο",
    ],
  },
  {
    number: "02",
    title: "Δεν σε κάνουμε κλόουν. Χτίζουμε κύρος.",
    description: [
      "το περιεχόμενο δεν χρειάζεται να είναι γελοίο για να αποδίδει, χτίζουμε authority - όχι θόρυβο",
    ],
  },
  {
    number: "03",
    title: "Δεν σε πετάμε στην κάμερα. Σε καθοδηγούμε.",
    description: [
      "ξέρουμε ότι η κάμερα δεν είναι φυσική για όλους. Υπάρχει δομή, καθοδήγηση και εναλλακτικές όταν χρειάζεται",
    ],
  },
  {
    number: "04",
    title: "Δεν σου τρώμε χρόνο. Σου τον επιστρέφουμε.",
    description: [
      "δεν περνάνε όλα από εσένα, υπάρχει ξεκάθαρη διαδικασία και ελάχιστη εμπλοκή",
    ],
  },
  {
    number: "05",
    title: "Δεν ανεβάζουμε απλά βίντεο. Εκτελούμε πλάνο.",
    description: [
      "κάθε μήνας έχει στόχο & κάθε βίντεο έχει ρόλο, κάνουμε marketing για να μεγαλώνεις",

    ],
  },
  // {
  //   number: "06",
  //   title: "Δεν κρυβόμαστε πίσω από αλγορίθμους. Εξηγούμε τα πάντα.",
  //   description: [
  //     "ξέρεις τι γίνεται και γιατί γίνεται",
  //     "ξέρεις τι αποδίδει και τι όχι",
  //   ],
  // },
  // {
  //   number: "07",
  //   title: "Δεν παριστάνουμε ότι ξέρουμε τον κλάδο σου. Τον μαθαίνουμε.",
  //   description: [
  //     "ξεκινάμε από εσένα και τη δουλειά σου",
  //     "το πλάνο προσαρμόζεται σε εσένα, όχι το αντίστροφο",
  //   ],
  // },
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
      <div className="mx-auto w-full max-w-[1100px] -px-1 sm:px-8 lg:pr-5">
        <div className="mx-auto max-w-2xl pb-8 text-center md:pb-12">
          {/* <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400/50">
            <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
              {content?.eyebrow}
            </span>
          </div> */}
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
                  className="flex h-9 w-9 mt-4 items-center justify-center rounded-full border-2 border-gold-500  bg-amber-200/60 text-sm font-medium text-neutral-600"
                >
                  {step.number}
                </div>
              ),
              children: (
                <div className="pb-1 pl-2">
                  <h3 className="text-lg font-semibold text-neutral-900 md:text-lg">
                    {step.title}
                  </h3>
                  {Array.isArray(step.description) && (
                    <ul className="mt-2 space-y-1.5 text-sm text-neutral-700 md:text-base">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)] flex-shrink-0" /> */}
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

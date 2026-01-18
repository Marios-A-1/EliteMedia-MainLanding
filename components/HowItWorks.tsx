"use client";

import { Timeline } from "antd";
import type { CSSProperties, ReactNode } from "react";

const STEPS = [
  {
    number: "01",
    title: "Attention (Κάνουμε το σωστό κοινό να σταματήσει)",
    description:
      "Παίρνουμε την προσοχή τους με reels/posts που χτυπάνε κατευθείαν στο “πόνο” και στο αποτέλεσμα. Δεν κυνηγάμε views. Κυνηγάμε τους σωστούς ανθρώπους.",
  },
  {
    number: "02",
    title: "Trust (Ρίχνουμε άμυνες & κλειδώνουμε εμπιστοσύνη)”",
    description:
      "Τους κάνουμε να νιώσουν: “οκ, αυτοί ξέρουν”. Με proof, behind the scenes και περιεχόμενο που εκπαιδεύει χωρίς να κουράζει. Δεν πείθουμε με λόγια. Πείθουμε με σήματα αξιοπιστίας.",
  },
  {
    number: "03",
    title: "Convert (Μετατρέπουμε το hype σε έσοδα, έξυπνα)",
    description:
      "Μόνο όταν είναι έτοιμοι, τους οδηγούμε στην διαδικασία πωλήσεις και τους κλείνουμε πελάτες έμμεσα και στρατηγικά, όχι πιεστικά. Όλη η κίνηση καταγράφεται, βελτιώνεται και γίνεται μηχανή που ανεβαίνει κάθε μήνα.",
  },
];

type HowItWorksStep = {
  number: string;
  title: ReactNode;
  description: ReactNode;
};

type HowItWorksContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  steps?: HowItWorksStep[];
};

type HowItWorksProps = {
  content?: HowItWorksContent;
};

export default function HowItWorks({ content }: HowItWorksProps) {
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
                  <p className="mt-2 text-sm text-neutral-700 md:text-base">
                    {step.description}
                  </p>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}

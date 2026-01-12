"use client";

import { Timeline } from "antd";
import type { CSSProperties } from "react";

const STEPS = [
  {
    number: "01",
    title: "Business Plan & Στρατηγική",
    description:
      "Ορίζουμε στόχους, κοινό και positioning ώστε κάθε ενέργεια να υπηρετεί ξεκάθαρα το business αποτέλεσμα.",
  },
  {
    number: "02",
    title: "Σενάρια & Μηνύματα",
    description:
      "Γράφουμε σενάρια βασισμένα σε ψυχολογία, hooks και storytelling — όχι τυχαίο περιεχόμενο.",
  },
  {
    number: "03",
    title: "Βιντεοληψία",
    description:
      "Καθοδηγούμε ή αναλαμβάνουμε τη λήψη ώστε το υλικό να είναι έτοιμο για απόδοση, όχι απλώς “ωραίο”.",
  },
  {
    number: "04",
    title: "Μοντάζ",
    description:
      "Ρυθμός, cuts, captions και δομή σχεδιασμένα για retention και conversion.",
  },
  {
    number: "05",
    title: "Revisions & Fine-Tuning",
    description:
      "Βελτιστοποιούμε λεπτομέρειες, μήνυμα και pacing μέχρι να είναι έτοιμο για κοινό και αλγόριθμο.",
  },
  {
    number: "06",
    title: "Ανέβασμα & Διανομή",
    description:
      "Ανεβαίνει τη σωστή στιγμή, στη σωστή πλατφόρμα, με το σωστό context.",
  },
];

export default function HowWeDoIt() {
  return (
    <section id="how-we-do-it" className="how-we-do-it py-14 md:py-24">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl pb-8 text-center md:pb-12">
          <h2 className="section-heading pb-3 text-neutral-900">
            Πώς το κάνουμε πράξη
          </h2>
          <p className="text-base text-neutral-700 md:text-lg">
            Από τη στρατηγική μέχρι το τελικό upload — με ξεκάθαρο σύστημα.
          </p>
        </div>
        <div className="flex justify-center px-10 ">
          <Timeline
            className="how-we-do-it-timeline w-full max-w-[760px] sm:w-auto"
            items={STEPS.map((step) => ({
              key: step.number,
              color: "var(--color-gold-500)",
              dot: (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[color:var(--color-gold-500)] bg-transparent text-sm font-medium text-[var(--color-gold-accent)]"
                  style={{
                    "--color-gold-ui-300": "var(--color-gold-200)",
                    "--color-gold-accent": "var(--color-gold-700)",
                    backgroundColor: "transparent",
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

"use client";

import { Timeline } from "antd";
import type { CSSProperties, ReactNode } from "react";



const STEPS = [
  {
    number: "01",
    title: "«Μου μιλάνε για προβολές, αλλά εγώ θέλω πελάτες»",
    description: [
      "σου μιλάνε για views & reach. Εσύ χρειάζεσαι τζίρο",
    ],
  },
  {
    number: "02",
    title: "«Δεν θέλω να γίνω κλόουν σαν τους ανταγωνιστές μου»",
    description: [
      "φοβάσαι ότι το περιεχόμενο θα σε γελοιοποιήσει & νιώθεις ότι κανείς δεν σε ακούει",
    ],
  },
  {
    number: "03",
    title: "«Ντρέπομαι να βγω στην κάμερα»",
    description: [
      "Aνασφάλεια μπροστά στον φακό. Tο πρόβλημα ξεκινά όταν το agency δεν σε κάνει να νιώθεις άνετα",
    ],
  },
  {
    number: "04",
    title: "«Μου ζητάνε συνέχεια πράγματα, δεν έχω χρόνο»",
    description: [
      "χάνεις χρόνο αντί να κερδίζεις, ενω με σύστημα θα αρκούσαν 10’ την ημέρα",
    ],
  },
  {
    number: "05",
    title: "«Δεν υπάρχει πλάνο, απλά ανεβάζουμε βίντεο»",
    description: [
      "δεν βλέπεις πώς σε βοηθάει επιχειρηματικά γιατι αυτό που χρειάζεσαι είναι σύστημα, όχι posts",
   
    ],
  },
  // {
  //   number: "06",
  //   title: "«Δεν ξέρω τίποτα και φοβάμαι ότι θα με κοροϊδέψουν»",
  //   description: [
  //     "δεν καταλαβαίνεις τι σημαίνουν τα νούμερα & χωρίς διαφάνεια δεν υπάρχει εμπιστοσύνη",
  //   ],
  // },
  // {
  //   number: "07",
  //   title: "«Το agency δεν καταλαβαίνει τον κλάδο μου»",
  //   description: [
  //     "κανείς δεν ξέρει τη δουλειά σου όπως εσύ & για αυτο δυσκολεύεσαι να τους εμπιστευτείς",

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
    <section id="how-it-works" className="how-it-works py-14 md:py-24">
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
            className="how-it-works-timeline w-full max-w-[760px] sm:w-auto"
            items={(content?.steps ?? STEPS).map((step) => ({
              key: step.number,
              color: "#fff",
              dot: (
                <div
                  className="flex h-9 w-9 mt-4 items-center justify-center rounded-full border-2 border-[#e34e4e] bg-[#c869695e]  text-sm font-medium text-neutral-700"
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
                    <ul className="mt-3 space-y-1.5 text-sm text-neutral-700 md:text-base">
                      {step.description.map((item, i) => (
                        <li key={i} className="flex gap-2 ">
                          {/* <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-900 flex-shrink-0" /> */}
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

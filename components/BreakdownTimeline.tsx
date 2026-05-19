"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

gsap.registerPlugin(ScrollTrigger);

export type BreakdownStep = {
  time: string;
  title: ReactNode;
  subtitle: ReactNode;
};

export type BreakdownContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  steps: BreakdownStep[];
};

export const BreakdownContent: BreakdownContent = {
  eyebrow: <>Structure</>,
  heading: <>Πώς θα κυλήσει το event</>,
  description: (
    <>
      Η ροή βασίζεται στο brief: value, προσωπική ιστορία, πρακτικά AI βήματα,
      CTA και live Q&A.
    </>
  ),
  steps: [
    {
      time: "01",
      title: "Εισαγωγή",
      subtitle: "Welcome, τι θα πάρεις από το event και short hype & positioning.",
    },
    {
      time: "02",
      title: "Storytelling",
      subtitle:
        "Η προσωπική ιστορία, από την αρχή μέχρι τα πρώτα αποτελέσματα και τι λειτούργησε στην Ελλάδα.",
    },
    {
      time: "03",
      title: "Πώς το κάνεις πράξη",
      subtitle:
        "Οι AI ευκαιρίες που ανοίγουν σήμερα, τα πρακτικά lessons, και τα βήματα για να ξεκινήσεις με καθαρό πλάνο και σωστό mindset.",
    },
    {
      time: "04",
      title: "Το επόμενο βήμα",
      subtitle:
        "Μπες στη λίστα για τις επόμενες ευκαιρίες, πρόσβαση στο community, ενημέρωση για το πρόγραμμα και προτεραιότητα σε future access.",
    },
    {
      time: "05",
      title: "Q&A Session",
      subtitle: "Live ερωτήσεις και απαντήσεις.",
    },
  ],
};

type BreakdownTimelineProps = {
  content?: BreakdownContent;
};

export default function BreakdownTimeline({ content }: BreakdownTimelineProps) {
  const agendaRef = useRef<HTMLDivElement>(null);
  const mergedContent = content ?? BreakdownContent;
  const steps = mergedContent.steps?.length
    ? mergedContent.steps
    : BreakdownContent.steps;

  useEffect(() => {
    const agenda = agendaRef.current;
    if (!agenda) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray<HTMLElement>(".event-agenda__item", agenda);
    const cards = gsap.utils.toArray<HTMLElement>(".event-agenda__card", agenda);
    const dots = gsap.utils.toArray<HTMLElement>(".event-agenda__dot", agenda);
    const line = agenda.querySelector<HTMLElement>(".event-agenda__line");

    if (prefersReducedMotion) {
      gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
      gsap.set([...cards, ...dots], {
        autoAlpha: 1,
        clearProps: "transform",
      });
      if (line) {
        gsap.set(line, { scaleY: 1 });
      }
      return;
    }

    let media: gsap.MatchMedia | undefined;

    const context = gsap.context(() => {
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: agenda,
              start: "top 78%",
              end: "bottom 62%",
              scrub: true,
            },
          }
        );
      }

      const animateItems = (resolveX: (index: number) => number) => {
        items.forEach((item, index) => {
          const card = item.querySelector<HTMLElement>(".event-agenda__card");
          const dot = item.querySelector<HTMLElement>(".event-agenda__dot");
          const x = resolveX(index);

          if (card) {
            gsap.fromTo(
              card,
              { autoAlpha: 0, x, scale: 0.96 },
              {
                autoAlpha: 1,
                x: 0,
                scale: 1,
                duration: 0.82,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (dot) {
            gsap.fromTo(
              dot,
              { autoAlpha: 0, scale: 0.55 },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.48,
                ease: "back.out(2.2)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          ScrollTrigger.create({
            trigger: item,
            start: "top 82%",
            end: "bottom 38%",
            onEnter: () => item.classList.add("is-active"),
            onEnterBack: () => item.classList.add("is-active"),
            onLeaveBack: () => item.classList.remove("is-active"),
          });
        });
      };

      media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        animateItems((index) => (index % 2 === 0 ? -92 : 92));
      });
      media.add("(max-width: 767px)", () => {
        animateItems(() => 64);
      });
    }, agenda);

    return () => {
      media?.revert();
      context.revert();
    };
  }, []);

  return (
    <section id="breakdown" className="mt-30 mb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 ">
        <div className="pb-8 text-center md:pb-12 ">
          {/* <div className="flex justify-center pb-3">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
              <BlurText
                as="span"
                delay={50}
                spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
              >
                {mergedContent.eyebrow}
              </BlurText>
            </div>
          </div> */}
          <BlurText
            as="h2"
            className="section-heading pb-4"
            delay={50}
            animateBy="words"
            direction="top"
          >
            {mergedContent.heading}
          </BlurText>
          {mergedContent.description ? (
            <AnimatedContent ease="power3.out" duration={1.1} delay={0.3} distance={80}>
              <p className="section-description mx-auto max-w-3xl">
                {mergedContent.description}
              </p>
            </AnimatedContent>
          ) : null}
        </div>
        <AnimatedContent ease="power3.out" duration={1} delay={0.3} distance={80}>
          <div
            ref={agendaRef}
            className="event-agenda"
            style={{ ["--agenda-count" as string]: steps.length } as CSSProperties}
          >
            <span className="event-agenda__line" aria-hidden="true" />
            <ol className="event-agenda__list">
              {steps.map((item, index) => (
                <li
                  className="event-agenda__item"
                  style={{ ["--agenda-index" as string]: index }}
                  key={`${item.time}-${index}`}
                >
                  <div className="event-agenda__dot" aria-hidden="true">
                    <span />
                  </div>
                  <article className="event-agenda__card">
                    {/* <span className="event-agenda__number">{item.time}</span> */}
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

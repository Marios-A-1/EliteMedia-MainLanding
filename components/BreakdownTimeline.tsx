"use client";

import type { ReactNode } from "react";
import { Timeline, Typography } from "antd";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

const { Text, Title } = Typography;

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
  eyebrow: <>Breakdown</>,
  heading: <>Breakdown</>,
  description: <>Δες αναλυτικά πώς θα κυλήσει η μέρα — για να ξέρεις ακριβώς τι γίνεται, πότε.</>,
  steps: [
    {
      time: "12:00 – 12:30",
      title: "Mindset",
      subtitle: "Διαμόρφωσε τη σωστή νοοτροπία για συγκέντρωση, συνέπεια και αποτελεσματική εφαρμογή.",
    },
    {
      time: "12:30 – 13:00",
      title: "Όλοι οι τρόποι για online χρήματα",
      subtitle:
        "AI / Πωλήσεις / SMM / Freelancing — Διαλέγεις έναν.",
    },
    {
      time: "13:00 – 14:30",
      title: "Το μονοπάτι σου προς την επιτυχία",
      subtitle: "Τι χτίζεις πρώτα και γιατί.",
    },
    {
      time: "14:30 – 15:30",
      title: "1ος πελάτης (outreach / πωλήσεις)",
      subtitle:
        "Πώς βρίσκεις το ν πρώτο πελάτη + τα πρώτα σου βήματα",
    },
    {
      time: "15:30 – 16:00",
      title: "Πως να πετύχεις GUARANTEED",
      subtitle: "Φεύγεις με ξεκάθαρο πλάνο για να πας προς τα πρώτα σου 1000€ online.",
    },
    {
      time: "16:00 – 17:30",
      title: "Networking",
      subtitle: "Γνώρισε πάνω απο 100 επιχειρηματίες και χτίσε συνεργασίες με άλλα άτομα σαν και εσένα.",
    },
    {
      time: "17:30+",
      title: "Πάμε για φαγητό (όσοι θέλουμε)",
      subtitle: "Networking dinner με επιχειρηματίες",
    },
  ],
};

type BreakdownTimelineProps = {
  content?: BreakdownContent;
};

export default function BreakdownTimeline({ content }: BreakdownTimelineProps) {
  const mergedContent = content ?? BreakdownContent;
  const steps = mergedContent.steps?.length
    ? mergedContent.steps
    : BreakdownContent.steps;
  const timelineSteps = steps;

  return (
    <section id="breakdown" className="mt-30 mb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 ">
        <div className="pb-8 text-center md:pb-12 ">
          <div className="flex justify-center pb-3">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-amber-400 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-amber-400">
              <BlurText
                as="span"
                delay={50}
                spanClassName="bg-linear-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent"
              >
                {mergedContent.eyebrow}
              </BlurText>
            </div>
          </div>
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
        <div className="bg-amber-200/30 py-10 px-8 rounded-2xl max-w-2xl mx-auto">
          <Timeline
            className="event-details-timeline-mobile breakdown-timeline "
            items={timelineSteps.map((item) => ({
              key: item.time,
              color: "var(--color-amber-400)",
              dot: (
                <span className="event-details-timeline-dot gradient-border">
                  <span className="gradient-border__inner" />
                </span>
              ),
              children: (
                <div className="breakdown-timeline-item pb-2 mb-4">
                  <span className="breakdown-time !text-md !font-bold !text-neutral-600 !-mb-2">{item.time}</span>
                  <Title
                    level={5}
                    className="!m-0 !text-xl !font-bold  !bg-linear-to-r !from-amber-500 !to-amber-400 !bg-clip-text !text-transparent "
                  >
                    {item.title}
                  </Title>
                  <Text className="!text-lg !font-semibold text-neutral-600">{item.subtitle}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </AnimatedContent>
      </div>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import { CalendarDays, Clock, MapPin, type LucideIcon } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import { EVENT_CONFIG } from "@/lib/eventConfig";

type EventDetails2IconKey = "calendar" | "pin" | "clock";

export type EventDetails2Fact = {
  iconKey: EventDetails2IconKey;
  label: ReactNode;
  value: ReactNode;
};

export type EventDetails2Content = {
  sectionId?: string;
  eyebrow?: ReactNode;
  headline?: ReactNode;
  description?: ReactNode;
  facts: EventDetails2Fact[];
};

export const EventDetails2Content: EventDetails2Content = {
  sectionId: "event-details-2",
  eyebrow: <>Event Details</>,
  headline: <>Πληροφορίες</>,
  description: (
    <>
      {/* Η ημερομηνία, η τοποθεσία και η ώρα συγκεντρωμένα πριν διαλέξεις το
      εισιτήριό σου. */}
    </>
  ),
  facts: [
    {
      iconKey: "calendar",
      label: "Ημερομηνία",
      value: EVENT_CONFIG.EVENT_DATETIME_LABEL,
    },
    {
      iconKey: "pin",
      label: "Τοποθεσία",
      value: EVENT_CONFIG.EVENT_LOCATION_TEXT,
    },
    {
      iconKey: "clock",
      label: "Ώρα",
      value: EVENT_CONFIG.EVENT_TIME_LABEL,
    },
  ],
};

const ICONS: Record<EventDetails2IconKey, LucideIcon> = {
  calendar: CalendarDays,
  pin: MapPin,
  clock: Clock,
};

type EventDetails2Props = {
  content?: EventDetails2Content;
};

export default function EventDetails2({ content }: EventDetails2Props) {
  const mergedContent = content ?? EventDetails2Content;
  const facts = mergedContent.facts?.length
    ? mergedContent.facts
    : EventDetails2Content.facts;

  return (
    <section id={mergedContent.sectionId ?? "event-details-2"} className="event-details2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-8 text-center md:pb-12">
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
            {mergedContent.headline}
          </BlurText>
          {mergedContent.description ? (
            <AnimatedContent ease="power3.out" duration={1.1} delay={0.3} distance={80}>
              <p className="section-description mx-auto max-w-3xl">
                {mergedContent.description}
              </p>
            </AnimatedContent>
          ) : null}
        </div>

        <div className="event-details2__grid">
          {facts.map((fact, index) => {
            const Icon = ICONS[fact.iconKey];

            return (
              <AnimatedContent
                key={`${fact.iconKey}-${index}`}
                ease="power3.out"
                duration={1}
                delay={0.2 + index * 0.08}
                distance={70}
                threshold={0.35}
                className="h-full"
              >
                <article className="event-details2__card">
                  <span className="event-details2__icon">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="event-details2__label">{fact.label}</span>
                  <strong>{fact.value}</strong>
                </article>
              </AnimatedContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}

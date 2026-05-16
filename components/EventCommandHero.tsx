"use client";

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Bot,
  BrainCircuit,
  CalendarDays,
  Clock,
  MapPin,
  Network,
  Send,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import AnimatedContent from "./AnimatedContent";
import ProfileCard from "./ProfileCard";

export type EventCommandHeroRoadmapItem = {
  label: string;
  title: string;
  description: string;
};

export type EventCommandHeroProps = {
  brand: string;
  headline: ReactNode;
  description?: ReactNode;
  ctaNode: ReactNode;
  dateLabel: ReactNode;
  locationLabel: ReactNode;
  prompt: string;
  roadmapItems: EventCommandHeroRoadmapItem[];
};

const ROADMAP_ICONS = [BrainCircuit, Sparkles, Send, Zap];

type CtaAnimationOverrides = {
  playOnMount?: boolean;
  animationThreshold?: number;
  animationDelay?: number;
};

const HERO_EVENT_DETAILS = [
  {
    label: "Ημερομηνία",
    value: "Κυριακή 31 Μαΐου 2026",
    icon: CalendarDays,
  },
  {
    label: "Τοποθεσία",
    value: "Στριγγάρη 5, 173 43",
    icon: MapPin,
  },
  {
    label: "Ώρα",
    value: "Θα ανακοινωθεί",
    icon: Clock,
  },
];

function EventDetailCards({
  animated = false,
  threshold = 0.25,
}: {
  animated?: boolean;
  threshold?: number;
}) {
  return (
    <>
      {HERO_EVENT_DETAILS.map((detail, index) => {
        const Icon = detail.icon;
        const card = (
          <article
            className="event-command-hero__detail-card"
            style={{ ["--detail-index" as string]: index }}
            key={detail.label}
          >
            <span className="event-command-hero__detail-icon">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="event-command-hero__detail-label">
              {detail.label}
            </span>
            <strong>{detail.value}</strong>
          </article>
        );

        if (!animated) return card;

        return (
          <AnimatedContent
            key={detail.label}
            ease="power3.out"
            duration={1}
            delay={0.2 + index * 0.08}
            distance={70}
            threshold={threshold}
            className="h-full"
          >
            {card}
          </AnimatedContent>
        );
      })}
    </>
  );
}

export default function EventCommandHero({
  brand,
  headline,
  description,
  ctaNode,
  dateLabel,
  locationLabel,
  prompt,
  roadmapItems,
}: EventCommandHeroProps) {
  const renderCta = (overrides: CtaAnimationOverrides) => {
    if (!isValidElement(ctaNode)) {
      return ctaNode;
    }

    return cloneElement(ctaNode as ReactElement<CtaAnimationOverrides>, overrides);
  };

  return (
    <section className="event-command-hero relative isolate overflow-hidden pt-10 pb-14 md:pt-14 md:pb-20">
      <div className="event-command-hero__header relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
        <h1 className="event-command-hero__title mx-auto max-w-4xl text-4xl font-black leading-[1.02] text-[#07111f] sm:text-5xl lg:text-6xl">
          <span className="event-command-hero__brand">{brand}</span>
          <span className="event-command-hero__headline">{headline}</span>
        </h1>
      </div>

      <div className="event-command-hero__content grid w-full items-start gap-10 p-4 pt-8 lg:pt-12">
        <div className="event-command-hero__host-stack relative z-10 flex flex-col items-center text-center">
          <div className="event-command-hero__profile">
            <ProfileCard
              avatarUrl="/images/thymiollaswebp.webp"
              miniAvatarUrl="/images/thymiolas-avatar-small.jpg"
              name="Thymios M."
              title="Event Host"
              handle="thymiolas.gr"
              status="31/5 - Athens"
              contactText="AI Event"
              className="event-command-hero__profile-card"
              innerGradient="linear-gradient(145deg, rgba(29, 78, 216, 0.86) 0%, rgba(14, 165, 233, 0.56) 46%, rgba(7, 17, 31, 0.92) 100%)"
              behindGlowColor="rgba(56, 189, 248, 0.48)"
              behindGlowSize="46%"
              onContactClick={() => {}}
              iconUrl="/images/code-pattern.png"
            />
          </div>

          <div className="event-command-hero__cta event-command-hero__cta--mobile mt-7 flex w-full justify-center px-4 lg:hidden">
            {renderCta({ playOnMount: true })}
          </div>

          <div className="event-command-hero__details-stack event-command-hero__details-stack--mobile lg:hidden">
            <div className="event-command-hero__details-panel">
              <EventDetailCards animated />
            </div>
          </div>

        </div>

        <div className="event-command-hero__panel-wrap">
          <div className="event-command-hero__panel">
            <div className="event-command-hero__panel-topbar">
              <div className="flex items-center gap-2">
                <span className="event-command-hero__window-dot" />
                <span className="event-command-hero__window-dot" />
                <span className="event-command-hero__window-dot" />
              </div>
              <div className="event-command-hero__panel-title">
                <Terminal className="h-4 w-4" aria-hidden="true" />
                <span>income-roadmap.ai</span>
              </div>
            </div>

            <div className="event-command-hero__prompt">
              <div className="event-command-hero__prompt-icon">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <span className="event-command-hero__prompt-label">Prompt</span>
                <p>{prompt}</p>
              </div>
            </div>

            <div className="event-command-hero__path" aria-hidden="true">
              <Network className="h-5 w-5" />
              <span />
            </div>

            <div className="event-command-hero__roadmap">
              {roadmapItems.map((item, index) => {
                const Icon = ROADMAP_ICONS[index % ROADMAP_ICONS.length];

                return (
                  <article
                    className="event-command-hero__roadmap-card"
                    style={{ ["--card-index" as string]: index }}
                    key={`${item.label}-${item.title}`}
                  >
                    <div className="event-command-hero__roadmap-icon">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span>{item.label}</span>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="event-command-hero__cta event-command-hero__cta--mobile-after-roadmap mt-7 flex w-full justify-center px-4 lg:hidden">
        {renderCta({
          playOnMount: false,
          animationThreshold: -0.05,
          animationDelay: 0.15,
        })}
      </div>

      <div className="event-command-hero__cta event-command-hero__cta--desktop mt-6 hidden w-full justify-center px-4 lg:-mt-10 lg:flex">
        {renderCta({ playOnMount: true })}
      </div>

      <div className="event-command-hero__details-stack event-command-hero__details-stack--desktop hidden lg:block">
        <div className="event-command-hero__details-panel  lg:mt-24">
          <EventDetailCards animated threshold={0.35} />
        </div>
      </div>
    </section>
  );
}

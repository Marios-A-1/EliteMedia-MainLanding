"use client";

import type { ReactNode } from "react";
import { Card, Tag, Typography } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  TeamOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import { EVENT_CONFIG } from "@/lib/eventConfig";

const { Text } = Typography;

type IconKey = "calendar" | "pin" | "clock" | "users" | "file" | "fieldtime";

export type EventDetailsFact = {
  iconKey: IconKey;
  label: ReactNode;
  value: ReactNode;
};

export type EventDetailsContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  facts: EventDetailsFact[];
  badgeText?: ReactNode;
};

export const EventDetailsContent: EventDetailsContent = {
  eyebrow: <>Event Details</>,
  heading: <>Πληροφορίες Event</>,
  description: (
    <>
      Free value από προσωπική εμπειρία, πρακτικές γνώσεις και εφαρμόσιμες
      στρατηγικές για AI και online income στην Ελλάδα.
    </>
  ),
  facts: [
    { iconKey: "calendar", label: "Ημερομηνία", value: EVENT_CONFIG.EVENT_DATETIME_LABEL },
    { iconKey: "pin", label: "Τοποθεσία", value: EVENT_CONFIG.EVENT_LOCATION_TEXT },
    { iconKey: "clock", label: "Ώρα", value: EVENT_CONFIG.EVENT_TIME_LABEL },
    { iconKey: "fieldtime", label: "Online Access", value: "20€" },
    { iconKey: "users", label: "In-Person Access", value: "50€" },
    { iconKey: "file", label: "Focus", value: "AI + online income" },
  ],
  badgeText: "Θα πάρεις πρακτικά βήματα, mindset και live Q&A.",
};

const ICONS: Record<IconKey, ReactNode> = {
  calendar: <CalendarOutlined />,
  pin: <EnvironmentOutlined />,
  clock: <ClockCircleOutlined />,
  users: <TeamOutlined />,
  file: <FileTextOutlined />,
  fieldtime: <FieldTimeOutlined />,
};

type EventDetailsProps = {
  content?: EventDetailsContent;
};

export default function EventDetails({ content }: EventDetailsProps) {
  const mergedContent = content ?? EventDetailsContent;
  const facts = mergedContent.facts?.length
    ? mergedContent.facts
    : EventDetailsContent.facts;
  return (
    <section id="event-details" className="mt-16 mb-16">
      <div className="mx-auto max-w-6xl px-4  mt-26 sm:px-6">
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
            {mergedContent.heading}
          </BlurText>
          {/* <AnimatedContent ease="power3.out" duration={1.1} delay={0.3} distance={80}>
            <p className="section-description mx-auto max-w-3xl">
              {mergedContent.description}
            </p>
          </AnimatedContent> */}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, index) => (
            <AnimatedContent
              key={`${fact.label}-${index}`}
              ease="power3.out"
              duration={1}
              delay={0.2 + index * 0.08}
              distance={70}
              className="h-full"
            >
              <Card
                className="event-details-card event-details-card--fact h-full"
                styles={{
                  body: {
                    padding: 10,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  },
                }}
              >
                <div className="gradient-border gradient-border--icon">
                  <div className="gradient-border__inner flex h-16 w-16 items-center justify-center rounded-full text-2xl foont-black text-amber-500 shadow-sm">
                    {ICONS[fact.iconKey]}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Text className="!text-md font-semibold !text-neutral-600">
                    {fact.label}
                  </Text>
                  <Text className="!text-lg font-bold text-neutral-900">{fact.value}</Text>
                </div>
              </Card>
            </AnimatedContent>
          ))}
        </div>

        {/* <div className="flex justify-center mt-30 pt-6 pb-10">
          <Tag className="event-details-tag !m-0 rounded-full px-4 py-1 text-sm font-semibold">
            {mergedContent.badgeText}
          </Tag>
        </div> */}
      </div>
    </section>
  );
}

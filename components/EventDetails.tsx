"use client";

import type { ReactNode } from "react";
import { Card, Col, Row, Tag, Typography } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

const { Text, Title } = Typography;

type IconKey = "calendar" | "pin" | "clock" | "users" | "file";

export type EventDetailsFact = {
  iconKey: IconKey;
  label: ReactNode;
  value: ReactNode;
};

export type EventDetailsAgendaItem = {
  time: string;
  title: ReactNode;
  description: ReactNode;
};

export type EventDetailsContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  facts: EventDetailsFact[];
  badgeText?: ReactNode;
  agenda: EventDetailsAgendaItem[];
};

export const EventDetailsContent: EventDetailsContent = {
  eyebrow: <>Event Details</>,
  heading: <>1/3/2026 — Αθήνα (Δάφνη)</>,
  description: (
    <>
      4 ώρες masterclass για να φύγεις με roadmap + επόμενο βήμα. Μετά, networking
      με άτομα σαν κι εσένα.
    </>
  ),
  facts: [
    { iconKey: "calendar", label: "Ημερομηνία", value: "1 Μαρτίου 2026" },
    { iconKey: "pin", label: "Τοποθεσία", value: "Αθήνα — Δάφνη" },
    { iconKey: "clock", label: "Διάρκεια", value: "4 ώρες " },
    { iconKey: "users", label: "Μετά το Event", value: "Networking" },
    { iconKey: "file", label: "Υλικό", value: "Slides / PDF" },
  ],
  badgeText: "Θα πάρεις όλη την παρουσίαση + PowerPoints σε PDF για να τα εφαρμόσεις.",
  agenda: [
    {
      time: "0:00–0:30",
      title: "Διάλεξε κατεύθυνση με κριτήριο",
      description:
        "AI / Πωλήσεις / SMM / Freelancing — διαλέγεις 1 και σταματάς να μαντεύεις.",
    },
    {
      time: "0:30–2:00",
      title: "Roadmap + Skill που πληρώνεται",
      description:
        "Τι χτίζεις πρώτα και γιατί — για να πας από αρχάριο σε εκτέλεση.",
    },
    {
      time: "2:00–3:30",
      title: "1ος πελάτης (outreach / πωλήσεις)",
      description:
        "Πώς βρίσκεις τον πρώτο πελάτη και τι κάνεις για να κλείσεις αποτέλεσμα.",
    },
    {
      time: "3:30–4:00",
      title: "Plan + επόμενα βήματα",
      description:
        "Φεύγεις με ξεκάθαρο πλάνο για να πας προς τα πρώτα σου 1000€ online.",
    },
  ],
};

const ICONS: Record<IconKey, ReactNode> = {
  calendar: <CalendarOutlined />,
  pin: <EnvironmentOutlined />,
  clock: <ClockCircleOutlined />,
  users: <TeamOutlined />,
  file: <FileTextOutlined />,
};

type EventDetailsProps = {
  content?: EventDetailsContent;
};

export default function EventDetails({ content }: EventDetailsProps) {
  const mergedContent = content ?? EventDetailsContent;
  const facts = mergedContent.facts?.length
    ? mergedContent.facts
    : EventDetailsContent.facts;
  const agenda = mergedContent.agenda?.length
    ? mergedContent.agenda
    : EventDetailsContent.agenda;

  return (
    <section id="event-details" className="mt-16 mb-20">
      <div className="mx-auto max-w-6xl px-4  mt-26 sm:px-6">
        <div className="pb-8 text-center md:pb-12">
          <div className="flex justify-center pb-4">
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
          <AnimatedContent ease="power3.out" duration={1.1} delay={0.3} distance={80}>
            <p className="section-description mx-auto max-w-3xl">
              {mergedContent.description}
            </p>
          </AnimatedContent>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {facts.map((fact, index) => (
            <Card
              key={`${fact.label}-${index}`}
              className="event-details-card event-details-card--fact"
              styles={{
                body: {
                  padding: 16,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                },
              }}
            >
              <div className="gradient-border gradient-border--icon">
                <div className="gradient-border__inner flex h-12 w-12 items-center justify-center rounded-full text-xl foont-black text-amber-500 shadow-sm">
                  {ICONS[fact.iconKey]}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Text className="text-xs font-semibold text-neutral-500">
                  {fact.label}
                </Text>
                <Text className="text-sm font-bold text-neutral-900">{fact.value}</Text>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-30 pt-6 pb-10">
          <Tag className="event-details-tag !m-0 rounded-full px-4 py-1 text-sm font-semibold">
            {mergedContent.badgeText}
          </Tag>
        </div>

        <Row gutter={[16, 16]}>
          {agenda.map((item) => (
            <Col key={item.time} xs={24} md={12} lg={6}>
              <Card
                className="event-details-card event-details-card--agenda"
                styles={{
                  body: {
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  },
                }}
              >
                <Tag className="event-details-time-tag !m-0 w-fit rounded-full px-3 py-0.5 text-xs font-semibold">
                  {item.time}
                </Tag>
                <Title level={5} className="!m-0 !text-base !font-bold text-neutral-900">
                  {item.title}
                </Title>
                <Text className="text-sm text-neutral-600 truncate">
                  {item.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

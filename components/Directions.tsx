"use client";

import type { ReactNode } from "react";
import { Row, Col, Card, Typography } from "antd";
import {
  RobotOutlined,
  DollarOutlined,
  VideoCameraOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

const { Title, Paragraph, Text } = Typography;

type DirectionKey = "ai" | "sales" | "smm" | "freelance";

export type DirectionsDetailsSection = {
  title: ReactNode;
  items: ReactNode[];
};

export type DirectionsItem = {
  key: DirectionKey;
  title: ReactNode;
  icon: ReactNode;
  subtitle: ReactNode;
  forWho: ReactNode[];
  paysWith: ReactNode[];
  firstWin: ReactNode;
  details?: {
    sections: DirectionsDetailsSection[];
  };
};

export type DirectionsContent = {
  sectionId?: string;
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  items: DirectionsItem[];
};

export const DirectionsContent: DirectionsContent = {
  sectionId: "directions",
  eyebrow: <>Κατευθύνσεις</>,
  heading: <>Οι 4 τρόποι να εξελιχθείς επαγγελματικά</>,
  description: (
    <>
      Δεν θα μιλήσουμε για ένα μονο business model. Θα δεις τις βασικές κατευθύνσεις και θα
      καταλάβεις ποιό σου ταιριάζει.
    </>
  ),
  items: [
    {
      key: "ai",
      title: "AI",
      icon: <RobotOutlined />,
      subtitle: "Χτίζεις λύσεις/αυτοματισμούς που λύνουν πρόβλημα σε business.",
      forWho: [
        "σου αρέσει το tech",
        "σου αρέσει να φτιάχνεις συστήματα",
        "θες B2B υπηρεσίες",
      ],
      paysWith: ["setup fee", "μηνιαίο retainer", "automation packages"],
      firstWin: "Κλείνεις 1 μικρό AI automation για 300–800€.",
      details: {
        sections: [
          {
            title: "Τι θα κάνεις πρακτικά",
            items: [
              "βρίσκεις 1 επαναλαμβανόμενο πρόβλημα (π.χ. leads, follow-ups, reports)",
              "φτιάχνεις ένα απλό automation/agent",
              "το πουλάς ως υπηρεσία (setup + μηνιαίο)",
            ],
          },
          {
            title: "Κλασικά λάθη",
            items: [
              "πας για ‘τέλειο product’ αντί για μικρή υπηρεσία",
              "δεν ορίζεις ξεκάθαρο deliverable",
              "χρεώνεις πολύ φθηνά χωρίς όριο scope",
            ],
          },
          {
            title: "Plan 48 ωρών (για να ξεκινήσεις)",
            items: [
              "διάλεξε 1 niche problem (π.χ. ‘lead follow-up’)",
              "φτιάξε demo (Loom + 1 screenshot)",
              "στείλε 30 DMs/emails με offer ‘setup σε 48h’",
            ],
          },
        ],
      },
    },
    {
      key: "sales",
      title: "Πωλήσεις",
      icon: <DollarOutlined />,
      subtitle:
        "Μαθαίνεις να κλείνεις πελάτες/ραντεβού και πληρώνεσαι για αποτέλεσμα.",
      forWho: [
        "είσαι social",
        "δεν σε πειράζει να μιλάς με κόσμο",
        "θες γρήγορα skill που πληρώνεται",
      ],
      paysWith: ["commission", "appointment setting fee", "closing fee"],
      firstWin: "Κλείνεις 5–10 ραντεβού για έναν business.",
      details: {
        sections: [
          {
            title: "Τι θα κάνεις πρακτικά",
            items: [
              "μαθαίνεις script/structure για outreach",
              "κλείνεις ραντεβού ή κάνεις closing για προσφορές",
              "παίρνεις αμοιβή ανά αποτέλεσμα",
            ],
          },
          {
            title: "Κλασικά λάθη",
            items: [
              "μιλάς γενικά χωρίς offer",
              "δεν κάνεις follow-up",
              "δεν κρατάς pipeline (CRM/Google Sheet)",
            ],
          },
          {
            title: "Plan 48 ωρών (για να ξεκινήσεις)",
            items: [
              "γράψε 1 απλό offer (π.χ. ‘κλείνω 10 ραντεβού / μήνα’)",
              "φτιάξε 1 script + 1 follow-up",
              "κάνε outreach σε 30–50 businesses",
            ],
          },
        ],
      },
    },
    {
      key: "smm",
      title: "Social Media Marketing",
      icon: <VideoCameraOutlined />,
      subtitle: "Φέρνεις πελάτες/τζίρο μέσω content + ads + funnel (όχι απλά posts).",
      forWho: [
        "σου αρέσει content",
        "θες να δουλέψεις με επιχειρήσεις",
        "αντέχεις consistency",
      ],
      paysWith: ["monthly retainer", "performance bonus", "content packages"],
      firstWin: "Κλείνεις 1 client με 400–1200€/μήνα.",
      details: {
        sections: [
          {
            title: "Τι θα κάνεις πρακτικά",
            items: [
              "στήνεις offer + funnel (απλό)",
              "φτιάχνεις content που οδηγεί σε leads",
              "μετράς & βελτιώνεις (όχι vanity metrics)",
            ],
          },
          {
            title: "Κλασικά λάθη",
            items: [
              "ανεβάζεις random content χωρίς στόχο",
              "δεν υπάρχει funnel/CTA",
              "δεν μετράς leads/ραντεβού",
            ],
          },
          {
            title: "Plan 48 ωρών (για να ξεκινήσεις)",
            items: [
              "διάλεξε 1 κλάδο (π.χ. barber, gym, dentist)",
              "φτιάξε 3 hooks + 5 reels ideas",
              "στείλε 20 DM με mini audit + offer",
            ],
          },
        ],
      },
    },
    {
      key: "freelance",
      title: "Freelancing",
      icon: <ToolOutlined />,
      subtitle: "Πουλάς 1 ξεκάθαρη υπηρεσία (editing, design, dev, copywriting).",
      forWho: [
        "θες γρήγορα να ξεκινήσεις",
        "έχεις ήδη 1 μικρό skill",
        "σου αρέσει delivery",
      ],
      paysWith: ["project fee", "packages", "retainer"],
      firstWin: "Παίρνεις 1 project 150–500€.",
      details: {
        sections: [
          {
            title: "Τι θα κάνεις πρακτικά",
            items: [
              "διαλέγεις 1 υπηρεσία (1-liner)",
              "φτιάχνεις 2–3 δείγματα",
              "κάνεις outreach / platforms / referrals",
            ],
          },
          {
            title: "Κλασικά λάθη",
            items: [
              "προσφέρεις ‘όλα’ αντί για 1 πράγμα",
              "δεν έχεις portfolio",
              "δεν βάζεις διαδικασία παράδοσης",
            ],
          },
          {
            title: "Plan 48 ωρών (για να ξεκινήσεις)",
            items: [
              "γράψε 1-liner υπηρεσίας (π.χ. ‘Short-form edits για IG/TT’)",
              "φτιάξε 2 samples (πριν/μετά)",
              "στείλε 30 outreach μηνύματα",
            ],
          },
        ],
      },
    },
  ],
};

type DirectionsProps = {
  content?: DirectionsContent;
};

export default function Directions({ content }: DirectionsProps) {
  const mergedContent = content ?? DirectionsContent;
  const items = mergedContent.items?.length
    ? mergedContent.items
    : DirectionsContent.items;

  return (
    <section id={mergedContent.sectionId ?? "directions"} className="mt-16 mb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </svg>
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
          <AnimatedContent
            ease="power3.out"
            duration={1.1}
            delay={0.3}
            distance={80}
          >
            <p className="section-description mx-auto max-w-3xl">
              {mergedContent.description}
            </p>
          </AnimatedContent>
        </div>

        <Row gutter={[0, 64]} className="directions-grid">
          {items.map((item, index) => {
            return (
              <Col
                key={item.key}
                xs={24}
                md={12}
                className="!px-0 flex justify-center"
                style={{ paddingInline: 0 }}
              >
                <AnimatedContent
                  ease="power3.out"
                  duration={0.9}
                  delay={0.1 + index * 0.08}
                  distance={40}
                >
                  <div
                    className="directions-card h-full"
                    style={{
                      ["--gb-radius" as string]: "1.5rem",
                      ["--gb-border" as string]: "5px",
                    }}
                  >
                    <Card
                      hoverable={false}
                      className="border-0 text-center bg-amber-200/30! shadow-none !-mb-10"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "24px",
                        border: "none",
                        boxShadow: "none",
                      }}
                      styles={{
                        body: {
                          padding: "24px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 18,
                          alignItems: "center",
                        },
                      }}
                    >
                      <div className="flex flex-col gap-2 text-center">
                        <div className="gradient-border gradient-border--icon self-center gradient-icon">
                          <div className="gradient-border__inner flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black">
                            {item.icon}
                          </div>
                        </div>
                        <Title
                          level={4}
                          className="!text-xl !font-bold !bg-linear-to-r !from-amber-500 !to-amber-400 !bg-clip-text !text-transparent"
                          style={{ margin: 0 }}
                        >
                          {item.title}
                        </Title>
                        <Paragraph className="!text-lg !text-neutral-500" style={{ margin: 0 }}>
                          <Text className="section-description !text-lg !text-neutral-00 !font-semmmibold" style={{ margin: 0 }}>
                            {item.subtitle}
                          </Text>
                        </Paragraph>
                      </div>
                  </Card>
                </div>
                </AnimatedContent>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}


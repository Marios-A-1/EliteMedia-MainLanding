import { Suspense } from "react";
import ScheduleCallClient from "./schedule-call-client";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";

export default function ScheduleCallPage() {
  return (
    <Suspense
      fallback={
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <BlurText
              as="h1"
              className="section-heading pb-4"
              delay={250}
              animateBy="words"
              direction="top"
            >
              Schedule your call
            </BlurText>
            <AnimatedContent ease="power3.out" duration={1.5} delay={0.3} distance={100}>
              <p className="section-description">Loading your booking status...</p>
            </AnimatedContent>
          </div>
        </section>
      }
    >
      <ScheduleCallClient />
    </Suspense>
  );
}

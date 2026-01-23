import { Suspense } from "react";
import ScheduleCallClient from "./schedule-call-client";

export default function ScheduleCallPage() {
  return (
    <Suspense
      fallback={
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <h1 className="section-heading pb-4">Schedule your call</h1>
            <p className="section-description">Loading your booking status...</p>
          </div>
        </section>
      }
    >
      <ScheduleCallClient />
    </Suspense>
  );
}

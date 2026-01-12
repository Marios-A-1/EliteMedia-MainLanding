"use client";

import { useRef, useState, type TouchEvent } from "react";
import LazyVimeo from "@/components/lazy-vimeo";

type Testimonial = {
  id: number;
  vimeo: string;
  quote: string;
  author: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    vimeo: "1128240063",
    quote:
      "Elite Media took our launch from good to unforgettable. Their narrative and cinematic edits made every message feel premium.",
    author: "Jess Harper",
    role: "Founder, Vertex Labs",
  },
  {
    id: 2,
    vimeo: "1128235386",
    quote:
      "They shaped our story faster than we imagined and the engagement jumped within the first week of the campaign.",
    author: "Marco Reyes",
    role: "Head of Performance, Northwind",
  },
  {
    id: 3,
    vimeo: "1128237096",
    quote:
      "Every clip feels custom and intentional. The team’s process feels equal parts craft and strategy.",
    author: "Priya Kulkarni",
    role: "Creative Director, Polar Labs",
  },
  {
    id: 4,
    vimeo: "1128234831",
    quote:
      "They surfaced insights we didn’t know existed. Everything from the edit to the copy screams premium.",
    author: "Artem Havel",
    role: "Product Lead, Nova Collective",
  },
  {
    id: 5,
    vimeo: "1128239355",
    quote:
      "We finally have a partner that understands how to move fast without sacrificing detail.",
    author: "Leah Patel",
    role: "Marketing Lead, Radial Grid",
  },
];

export default function TestimonialsCarousel() {
  const [focus, setFocus] = useState(0);
  const total = TESTIMONIALS.length;
  const prev = () => setFocus((current) => (current - 1 + total) % total);
  const next = () => setFocus((current) => (current + 1) % total);
  const activeTestimonial = TESTIMONIALS[focus] ?? TESTIMONIALS[0];
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    if (startX === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") return;
    const deltaX = touchEndX - startX;
    const swipeThreshold = 50;
    if (Math.abs(deltaX) < swipeThreshold) {
      touchStartX.current = null;
      return;
    }

    if (deltaX > 0) {
      prev();
    } else {
      next();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="results"
      className="flex w-full scroll-mt-[80px] flex-col items-center justify-center space-y-6 py-12 md:py-24"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center space-y-8">
          <div className="mx-auto max-w-3xl pb-6 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
              Testimonials
              </span>
            </div>
            <h2 className="section-heading pb-4">
              Πραγματικές Ιστορίες Επιτυχίας
            </h2>
          </div>
          <div
            className="relative mx-auto mt-6 md:mt-12 flex w-full max-w-225 items-center justify-center px-2 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prev}
              className="absolute -left-10 hidden h-10 w-10 items-center justify-center rounded-full border-3 border-indigo-900 bg-primary/15 text-indigo-700 transition hover:border-indigo-300/60 hover:text-indigo-400 hover:bg-primary/15 sm:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <div className="lg:-mt-25 relative h-80 w-full max-w-75 md:h-155 md:max-w-160">
              {TESTIMONIALS.map((testimonial, index) => {
                const offset = calculateOffset(index, focus, total);
                const hidden = Math.abs(offset) > 1;
                const clampedOffset = Math.max(Math.min(offset, 1), -1);
                const isActive = offset === 0;

                return (
                  <div
                    key={testimonial.id}
                    className="absolute left-83/100 top-9/10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-500 ease-out lg:top-10/10 lg:left-15/20"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${clampedOffset * 90}%) scale(${
                        isActive ? 1 : 0.85
                      })`,
                      opacity: hidden ? 0 : isActive ? 1 : 0.4,
                      filter: isActive ? "none" : "blur(1px)",
                      zIndex: isActive ? 3 : 1,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-white/90 shadow-2xl shadow-primary/30">
                      <LazyVimeo
                        videoId={testimonial.vimeo}
                        title={`Testimonial video ${testimonial.id}`}
                        className="aspect-[9/16] w-[200px] md:w-[320px] pointer-events-none sm:pointer-events-auto"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={next}
              className="absolute -right-10 hidden h-10 w-10 items-center justify-center rounded-full border-3 border-indigo-900 bg-primary/15 text-indigo-700 transition hover:border-indigo-300/60 hover:text-indigo-400 hover:bg-primary/15 sm:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setFocus(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${focus === index ? "bg-primary" : "bg-border"}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
          {/* <div className="space-y-4 text-center">
            <p className="text-base text-[#5b4a2a] md:text-lg">{activeTestimonial.quote}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
              {activeTestimonial.author} — {activeTestimonial.role}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              {["Strategy", "Content", "Production"].map((badge) => (
                <span key={badge} className="rounded-full border border-border/60 bg-primary/15 px-3 py-1.5 md:px-4 md:py-2">
                  {badge}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

function calculateOffset(index: number, focus: number, total: number) {
  let offset = index - focus;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 14 4 8l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m6 14 6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

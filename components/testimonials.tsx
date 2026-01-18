"use client";

import { useRef, useState, type TouchEvent, type ReactNode } from "react";
import LazyVimeo from "@/components/lazy-vimeo";

/* =======================
   Types
======================= */

type VideoTestimonial = {
  id: number;
  type: "video";
  vimeo: string;
};

type GoogleTestimonial = {
  id: number;
  type: "google";
  author: string;
  rating: number;
  text: string;
};

type Testimonial = VideoTestimonial | GoogleTestimonial;

type TestimonialsContent = {
  eyebrow?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  items?: Testimonial[];
};

type TestimonialsProps = {
  content?: TestimonialsContent;
};

/* =======================
   Static fallback (optional)
======================= */

const TESTIMONIALS: Testimonial[] = [
  // example google review
  {
    id: 1,
    type: "google",
    author: "Γιώργος Π.",
    rating: 5,
    text: "Απίστευτη συνεργασία. Results από τον πρώτο μήνα.",
  },
];

/* =======================
   Component
======================= */

export default function TestimonialsCarousel({ content }: TestimonialsProps) {
  const [focus, setFocus] = useState(0);
  const testimonials = content?.items ?? TESTIMONIALS;
  const total = testimonials.length;

  const prev = () => setFocus((current) => (current - 1 + total) % total);
  const next = () => setFocus((current) => (current + 1) % total);

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

    if (Math.abs(deltaX) < swipeThreshold) return;

    deltaX > 0 ? prev() : next();
    touchStartX.current = null;
  };

  return (
    <section
      id="results"
      className="flex w-full scroll-mt-[80px] flex-col items-center justify-center space-y-6 py-12 md:py-24"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center space-y-8">
          {/* Heading */}
          <div className="mx-auto max-w-3xl pb-6 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-400/50">
              <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
                {content?.eyebrow}
              </span>
            </div>
            <h2 className="section-heading pb-3">{content?.heading}</h2>
            <p className="text-base pb-4 text-neutral-700 md:text-lg">
              {content?.description}
            </p>
          </div>

          {/* Carousel */}
          <div
            className="relative mx-auto mt-6 md:mt-12 flex w-full max-w-225 items-center justify-center px-2 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
             onClick={prev}
             className={`absolute -left-10 hidden h-10 w-10 items-center justify-center rounded-full border-3 bg-gold-200/50 border-indigo-300 text-indigo-300 transition hover:border-indigo-300/60 hover:text-indigo-400 hover:bg-gold-200 sm:flex
               ${testimonials[focus]?.type === "google" ? "top-3/8 -translate-y-1/2" : "top-9/10 lg:top-5/10 -translate-y-1/2"}
             `}
             aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>

            <div className="lg:mt-5 mt-45 relative h-80 w-full max-w-75 md:h-155 md:max-w-160">
              {testimonials.map((testimonial, index) => {
                const offset = calculateOffset(index, focus, total);
                const hidden = Math.abs(offset) > 1;
                const clampedOffset = Math.max(Math.min(offset, 1), -1);
                const isActive = offset === 0;

                return (
                  <div
                    key={testimonial.id}
                    className={`absolute left-83/100 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-500 ease-out lg:left-15/20
                      ${testimonial.type === "google" ? "top-0 translate-y-0" : "top-9/10 lg:top-10/10"}
                    `}style={{
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
                      {testimonial.type === "video" ? (
                        <LazyVimeo
                          videoId={testimonial.vimeo}
                          title={`Testimonial video ${testimonial.id}`}
                          className="aspect-[9/16] w-[200px] md:w-[320px]"
                        />
                      ) : (
                        <GoogleReviewCard review={testimonial} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={next}
              className={`absolute -right-10 hidden h-10 w-10 items-center justify-center rounded-full border-3 bg-gold-200/50 border-indigo-300 text-indigo-300 transition hover:border-indigo-300/60 hover:text-indigo-400 hover:bg-gold-200 sm:flex
                ${testimonials[focus]?.type === "google" ? "top-3/8 -translate-y-1/2" : "top-9/10 lg:top-5/10 -translate-y-1/2"}
              `}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================
   Helpers
======================= */

function calculateOffset(index: number, focus: number, total: number) {
  let offset = index - focus;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

/* =======================
   Google Review Card
======================= */

function GoogleReviewCard({ review }: { review: GoogleTestimonial }) {
  return (
    <div className="flex w-[300px] md:w-[420px] flex-col justify-between p-6">
      <div>
        <div className="flex items-center gap-2 pb-3">
          <GoogleIcon />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < review.rating} />
            ))}
          </div>
        </div>
        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
          “{review.text}”
        </p>
      </div>
      <div className="pt-4 text-sm font-medium text-neutral-900">
        {review.author}
      </div>
    </div>
  );
}

/* =======================
   Icons
======================= */

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.6 20.1H42V20H24v8h11.3C33.6 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1 7.3 2.7l5.7-5.7C33.5 6.5 28.9 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-8 19-20 0-1.3-.1-2.6-.4-3.9z"
    />
  </svg>
);

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#facc15" : "none"} stroke="#facc15">
    <path
      strokeWidth="1.5"
      d="M12 17.3l-6.2 3.7 1.7-7.1L2 8.9l7.2-.6L12 1.7l2.8 6.6 7.2.6-5.5 5 1.7 7.1z"
    />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 14 4 8l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="m6 14 6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

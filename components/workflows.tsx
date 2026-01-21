"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import WorflowImg01 from "@/public/images/logo.webp";
import WorflowImg02 from "@/public/images/logo.webp";
import WorflowImg03 from "@/public/images/logo.webp";
import Spotlight from "@/components/spotlight";
import { CheckCheckIcon, CircleCheckIcon } from "lucide-react";
import ValueBreakdown from "./ValueBreakdown";

const ELITE_SIGNATURE_BENEFITS = [
  {
    text: "Τα αρχεία ανάλυσης όλων των επιτυχημένων λογαριασμών της στρατηγικής ",
    price: "9€",
  },
  {
    text: "Δωρεάν οδηγός για το πώς να επιλέξεις σωστά ένα social media agency στην Ελλάδα",
    price: "9€",
  },
  {
    text: "Λίστα με τα καλύτερα agencies στην Ελλάδα που έχουμε εκπαιδεύσει",
    price: "9€",
  },
  {
    text: "Ολοκληρωμένος οδηγός social media marketing (1 ώρα) για να το κάνεις μόνος σου",
    price: "9€",
  },
  {
    text: "Πρόσβαση στο Elite Signature Strategy",
    price: "297€",
  },
  {
    text: "2 συμβουλευτικές κλήσεις με ειδικό της ομάδας για εφαρμογή της στρατηγικής",
    price: "397€",
  },
  {
    text: "24/7 πρόσβαση σε ειδικό της ομάδας για οποιαδήποτε απορία",
    price: "99€",
  },
  {
    text: "Πρόταση συνεργασίας από την EliteMedia αν πληροίς τα κριτήρια",
    price: "49€",
  },
];

export default function Workflows() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateActiveIndex = () => {
      frame = 0;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let nextIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveIndex);
    };

    updateActiveIndex();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="services" className="scroll-mt-20 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-8 md:pb-20">
          <div className="justify-self-center md:justify-self-center  sm:justify-self-center  pb-4">
          <div className="inline-flex items-center   gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-400/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-400/50">
            <span className="inline-flex bg-linear-to-r from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
              Offer
            </span>
          </div>
          </div>
          {/* Section header */}
          <div 
            className="
              mx-auto w-full rounded-xl py-12 px-3 lg:px-8
              bg-gradient-to-br
              from-amber-300/20
              via-amber-400/10
              to-amber-500/25
              shadow-[0_0_40px_rgba(245,158,11,0.12)]
              ">
          <div className="grid gap-10 px-6 lg:grid-cols-[1fr_1.6fr] lg:items-start ">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mx-auto max-w-3xl pb-8 md:pb-20 lg:mx-0">
            <h2 className="section-heading pb-4 ">
              H προσφορά μας
            </h2>

          </div>
          <Spotlight
            ref={containerRef}
            className="hide-scrollbar group mx-auto flex max-w-full snap-x snap-mandatory items-stretch gap-0 overflow-x-auto pb-4 scroll-smooth md:grid md:max-w-sm md:overflow-visible md:snap-none md:pb-0 md:gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:px-0 lg:py-0"
          >
            {/* Card 3 */}
            <div className="flex w-full shrink-0 snap-center justify-center align-middle md:contents">
              <a
                data-spotlight-item
                ref={(el) => {
                  itemRefs.current[2] = el;
                }}
                className="group/card relative h-full w-[85%] shrink-0 overflow-hidden rounded-2xl bg-[#ffb93f]v p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/50 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500/70 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 sm:w-[70%] md:w-auto md:shrink lg:w-full"
                href="#0"
              >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#ffe7bc]_after:absolute_after:inset-0_after:bg-linear-to-br_after:from-[#f4c74e]/20_after:via-transparent/40_after:to-[#f4c74e]/15">
              
                {/* Image */}
                <Image
                style={{padding:66}}
                  className="inline-flex"
                  src={WorflowImg03}
                  width={350}
                  height={288}
                  alt="Workflow 03"
                />
                {/* Content */}
                <div className="p-4 md:p-6">
                  {/* <div className="mb-3">
                      <span className="
                      inline-flex items-center
                      rounded-full
                      bg-[#ffd079]
                      px-3 py-0.5
                      text-xs font-medium
                      tracking-wide
                      text-(--color-gold-accent)
                    "><span className="text-[#5b4a2a]">
                        Elite Signature 
                      </span>
                    </span>
                  </div> */}
                </div>
              </div>
              </a>
              
            </div>
          </Spotlight>
          </div>

          {/* LIST */}
                
                
                <ul className="space-y-3 text-sm text-[#5b4a2a] md:text-base">
                <p className="text-lg text-center  md:text-lg         bg-gradient-to-br
        from-amber-200
        via-amber-400
        via-amber-500
        to-amber-700
        bg-clip-text text-transparent
        drop-shadow-[0_2px_10px_rgba(245,158,11,0.35)]">
                  Τι παίρνεις
                </p>
                  {ELITE_SIGNATURE_BENEFITS.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* Bullet */}
                      <div 
                      className="relative w-full rounded-xl border-2 border-amber-400 bg-[#ffffffb0] px-5 py-4 text-left min-h-[90%] "
                      >
                      <CircleCheckIcon className="absolute top-[40%] left-3 h-5 w-5 shrink-0 rounded-full text-[#f2b100] lg:left-3 lg:top-[35%]" />
                  
                      {/* Text */}
                      <span className="block w-full pr-15 pl-5  text-left leading-relaxed lg:px-4 lg:pr-18 lg:pl-8">
                        {item.text}
                      </span>
                  
                      {/* Price tag */}
                      <span
                        className="
                        shrink-0
                        absolute
                        top-[40%]
                        right-3
                        rounded-full
                        bg-[#ffd079]
                        px-2.5
                        py-0.5
                        text-xs
                        font-medium
                        text-[#5b4a2a]
                        whitespace-nowrap
                        
                        "
                        >
                        αξία {item.price}
                      </span>
                  </div>
                    </li>
                  ))}
                </ul>
            </div>       
         </div>
        </div>
      </div>
    </section>
  );
}

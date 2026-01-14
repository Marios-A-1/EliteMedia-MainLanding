"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Logo from "./logo";

const NAV_LINKS = [
  {
    id: "how-it-works",
    label: "Τι Αναλαμβάνουμε",
  },
  {
    id: "how-we-do-it",
    label: "Πώς δουλεύει",
  },
  {
    id: "results",
    label: "Αποτελέσματα",
  },
];

const SCROLL_OFFSET = 80;
const SCROLL_DURATION = 600;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Header() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const updateActive = () => {
      const marker = SCROLL_OFFSET + 12;
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom >= marker;
      });
      setActiveSection(active?.id ?? null);
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(
    () => () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    },
    []
  );

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    if (window.history?.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: targetTop });
      return;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startY = window.scrollY;
    const delta = targetTop - startY;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + delta * eased);
      if (elapsed < SCROLL_DURATION) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  return (
    <header className="fixed inset-x-0 top-2 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-4 rounded-2xl border border-[#f1d79e]/70 bg-white/80 px-4 backdrop-blur-3xl shadow-[0_10px_24px_rgba(145,105,20,0.18)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(120deg,rgba(244,199,78,0.35),rgba(255,255,255,0))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-10 text-sm md:flex lg:gap-12"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => handleAnchorClick(event, link.id)}
                className={`relative px-10 py-2 whitespace-nowrap text-[#5b4a2a] transition hover:text-[#2b2216] after:pointer-events-none after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[#f4c74e]/70 after:shadow-[0_0_12px_rgba(244,199,78,0.35)] after:transition after:transform ${
                  activeSection === link.id
                    ? "text-[#2b2216] after:scale-x-100 after:opacity-100"
                    : "after:scale-x-100 items-center after:opacity-0 hover:after:opacity-60"
                }`}
                aria-current={activeSection === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end ml-20 -mr-2">
            <a
              href="mailto:hello@elitemedia.com"
              className="btn px-4 py-2 rounded-[1rem] group w-full animate-[gradient-pause_7s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gold-500),var(--color-indigo-200),var(--color-gold-500))] bg-[length:200%_auto] text-[#2b2216] shadow-[0_10px_25px_rgba(145,105,20,0.25)] hover:brightness-105 sm:w-auto"
            >
              Επικοινωνήστε μαζί μας
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}


"use client";

import React, { useRef, useState, useEffect } from "react";
import useMousePosition from "@/utils/useMousePosition";

type SpotlightProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(function Spotlight(
  { children, className = "", ...rest }: SpotlightProps,
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const spotlightItems = Array.from(
      containerRef.current.querySelectorAll("[data-spotlight-item]"),
    ) as HTMLElement[];
    const fallbackItems = Array.from(containerRef.current.children).map(
      (el) => el as HTMLElement,
    );
    setBoxes(spotlightItems.length ? spotlightItems : fallbackItems);
  }, []);

  useEffect(() => {
    initContainer();
    window.addEventListener("resize", initContainer);

    return () => {
      window.removeEventListener("resize", initContainer);
    };
  }, [boxes]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition]);

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth;
      containerSize.current.h = containerRef.current.offsetHeight;
    }
  };

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { w, h } = containerSize.current;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      const inside = x < w && x > 0 && y < h && y > 0;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
        boxes.forEach((box) => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
          box.style.setProperty("--mouse-x", `${boxX}px`);
          box.style.setProperty("--mouse-y", `${boxY}px`);
        });
      }
    }
  };

  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof ref === "function") {
      ref(node);
      return;
    }
    if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div className={className} ref={setRefs} {...rest}>
      {children}
    </div>
  );
});

export default Spotlight;

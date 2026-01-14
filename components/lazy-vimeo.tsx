"use client";

import { useEffect, useRef, useState } from "react";

type LazyVimeoProps = {
  videoId: string;
  title: string;
  className?: string;
  params?: string;
  thumbnailAlt?: string;
  thumbnailUrl?: string;
  rootMargin?: string;
  allow?: string;
};

const DEFAULT_ALLOW = "autoplay; fullscreen; picture-in-picture";

const buildVimeoSrc = (videoId: string, params?: string) => {
  if (!params) return `https://player.vimeo.com/video/${videoId}`;
  return `https://player.vimeo.com/video/${videoId}?${params}`;
};

export default function LazyVimeo({
  videoId,
  title,
  className,
  params,
  thumbnailAlt,
  thumbnailUrl,
  rootMargin = "200px 0px",
  allow = DEFAULT_ALLOW,
}: LazyVimeoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoad) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  const iframeSrc = buildVimeoSrc(videoId, params);
  const posterSrc = thumbnailUrl ?? "/images/hero-image-01.jpg";
  const posterAlt = thumbnailAlt ?? title;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={iframeSrc}
          title={title}
          className="h-full w-full border-0"
          allow={allow}
          allowFullScreen
          loading="lazy"
          frameBorder={0}
        />
      ) : (
        <button
          type="button"
          className="block h-full w-full border-0 bg-transparent p-0"
          onClick={() => setShouldLoad(true)}
          aria-label={`Load video: ${title}`}
        >
          <img
            src={posterSrc}
            alt={posterAlt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </button>
      )}
    </div>
  );
}

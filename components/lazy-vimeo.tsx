"use client";

import { useEffect, useId, useRef, useState } from "react";

type LazyVimeoProps = {
  videoId: string;
  title: string;
  className?: string;
  iframeClassName?: string;
  params?: string;
  forceLoad?: boolean;
  playOnLoad?: boolean;
  command?: "play" | "pause";
  commandToken?: number;
  onTimeUpdate?: (seconds: number) => void;
  thumbnailAlt?: string;
  thumbnailUrl?: string;
  rootMargin?: string;
  allow?: string;
};

const DEFAULT_ALLOW = "autoplay; fullscreen; picture-in-picture";

type VimeoMessage = {
  event?: string;
  data?: {
    seconds?: number;
  };
  player_id?: string;
};

const parseVimeoMessage = (data: unknown): VimeoMessage | null => {
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as VimeoMessage;
    } catch {
      return null;
    }
  }

  if (typeof data === "object" && data !== null) {
    return data as VimeoMessage;
  }

  return null;
};

const buildVimeoSrc = (videoId: string, params?: string) => {
  if (!params) return `https://player.vimeo.com/video/${videoId}`;
  return `https://player.vimeo.com/video/${videoId}?${params}`;
};

const mergeVimeoParams = (params?: string, overrides?: Record<string, string>) => {
  if (!overrides || Object.keys(overrides).length === 0) return params;
  const search = new URLSearchParams(params ?? "");
  Object.entries(overrides).forEach(([key, value]) => {
    search.set(key, value);
  });
  const merged = search.toString();
  return merged.length ? merged : undefined;
};

export default function LazyVimeo({
  videoId,
  title,
  className,
  iframeClassName,
  params,
  forceLoad = false,
  playOnLoad = false,
  command,
  commandToken,
  onTimeUpdate,
  thumbnailAlt,
  thumbnailUrl,
  rootMargin = "200px 0px",
  allow = DEFAULT_ALLOW,
}: LazyVimeoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const pendingCommandRef = useRef<"play" | "pause" | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerId = useId().replace(/:/g, "");

  useEffect(() => {
    if (forceLoad) {
      setShouldLoad(true);
    }
  }, [forceLoad]);

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

  const postMessage = (payload: Record<string, unknown>) => {
    const targetWindow = iframeRef.current?.contentWindow;
    if (!targetWindow) return false;
    targetWindow.postMessage(payload, "*");
    return true;
  };

  const postCommand = (nextCommand: "play" | "pause") =>
    postMessage({ method: nextCommand });

  useEffect(() => {
    if (!shouldLoad || !command) return;
    if (!isIframeReady) {
      pendingCommandRef.current = command;
      return;
    }
    postCommand(command);
  }, [command, commandToken, isIframeReady, shouldLoad]);

  useEffect(() => {
    if (!onTimeUpdate || !isIframeReady) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const message = parseVimeoMessage(event.data);
      if (!message || message.event !== "timeupdate") return;
      if (message.player_id && message.player_id !== playerId) return;
      const seconds = message.data?.seconds;
      if (typeof seconds === "number") {
        onTimeUpdate(seconds);
      }
    };

    window.addEventListener("message", handleMessage);
    postMessage({ method: "addEventListener", value: "timeupdate" });

    return () => window.removeEventListener("message", handleMessage);
  }, [isIframeReady, onTimeUpdate, playerId]);

  const shouldAutoplay = playOnLoad && !isIframeReady;
  const resolvedParams = shouldAutoplay
    ? mergeVimeoParams(params, { autoplay: "1", muted: "1", playsinline: "1" })
    : params;
  const needsApi = Boolean(command) || Boolean(onTimeUpdate);
  const iframeParams = needsApi
    ? mergeVimeoParams(resolvedParams, { api: "1", player_id: playerId })
    : resolvedParams;
  const iframeSrc = buildVimeoSrc(videoId, iframeParams);
  const posterSrc = thumbnailUrl ?? "/images/hero-image-01.jpg";
  const posterAlt = thumbnailAlt ?? title;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={title}
          id={playerId}
          className={`h-full w-full border-0 ${iframeClassName ?? ""}`}
          allow={allow}
          allowFullScreen
          loading="lazy"
          frameBorder={0}
          onLoad={() => {
            setIsIframeReady(true);
            const pending = pendingCommandRef.current;
            if (pending) {
              postCommand(pending);
              pendingCommandRef.current = null;
            }
          }}
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

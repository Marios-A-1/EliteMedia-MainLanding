import { useEffect, useState } from "react";

const STORAGE_KEY = "eventsOfferStartTimestamp";
const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
const EVENT_OFFER_START_EVENT = "events-offer-start";

const readStoredStart = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }
  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : null;
};

const initCountdown = (
  startTimestamp: number,
  setTargetDate: (value: number) => void,
  setIsExpired: (value: boolean) => void
) => {
  const target = startTimestamp + OFFER_DURATION_MS;
  setTargetDate(target);
  if (Date.now() > target) {
    setIsExpired(true);
  }
};

export const startEventOfferCountdown = () => {
  if (typeof window === "undefined") {
    return { didStart: false, startTimestamp: null as number | null };
  }

  let startTimestamp = readStoredStart();
  let didStart = false;

  if (!startTimestamp) {
    startTimestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, String(startTimestamp));
    didStart = true;
  }

  window.dispatchEvent(
    new CustomEvent(EVENT_OFFER_START_EVENT, { detail: { startTimestamp } })
  );

  return { didStart, startTimestamp };
};

const useEventOfferCountdown = () => {
  const [targetDate, setTargetDate] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const storedStart = readStoredStart();
    if (storedStart) {
      initCountdown(storedStart, setTargetDate, setIsExpired);
      return;
    }

    const handleStart = (event: Event) => {
      const customEvent = event as CustomEvent<{ startTimestamp?: number }>;
      const startTimestamp =
        customEvent.detail?.startTimestamp ?? readStoredStart();
      if (!startTimestamp) {
        return;
      }
      initCountdown(startTimestamp, setTargetDate, setIsExpired);
    };

    window.addEventListener(EVENT_OFFER_START_EVENT, handleStart);
    return () => window.removeEventListener(EVENT_OFFER_START_EVENT, handleStart);
  }, []);

  useEffect(() => {
    if (targetDate === null) {
      return;
    }

    const remainingMs = targetDate - Date.now();
    if (remainingMs <= 0) {
      setIsExpired(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsExpired(true);
    }, remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [targetDate]);

  const markExpired = () => setIsExpired(true);

  return { targetDate, isExpired, markExpired };
};

export default useEventOfferCountdown;

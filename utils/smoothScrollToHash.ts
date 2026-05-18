const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export const smoothScrollToHash = (hash: string, duration = 950) => {
  if (typeof window === "undefined" || !hash.startsWith("#")) {
    return false;
  }

  const target = document.querySelector(hash);
  if (!target) {
    return false;
  }

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY;
  const distance = targetY - startY;
  const startTime = window.performance.now();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }

    window.history.replaceState(null, "", hash);
  };

  window.requestAnimationFrame(step);
  return true;
};

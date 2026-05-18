const findHashTarget = (hash: string) => {
  const rawId = hash.slice(1);
  let decodedId = rawId;

  try {
    decodedId = decodeURIComponent(rawId);
  } catch {
    decodedId = rawId;
  }

  return document.getElementById(decodedId) ?? document.querySelector(hash);
};

export const smoothScrollToHash = (hash: string) => {
  if (typeof window === "undefined" || !hash.startsWith("#")) {
    return false;
  }

  const target = findHashTarget(hash);
  if (!target) {
    return false;
  }

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", hash);
  }

  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });

  return true;
};

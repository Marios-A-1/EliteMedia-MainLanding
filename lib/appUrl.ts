const normalizeUrl = (url: string) => url.replace(/\/+$/, "");

export const getAppUrl = () => {
  const rawUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (!rawUrl) {
    throw new Error("APP_URL is not set");
  }
  return normalizeUrl(rawUrl);
};
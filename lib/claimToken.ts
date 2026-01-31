import crypto from "crypto";

export type ClaimTokenPayload = {
  sid: string;
  iat: number;
  exp: number;
};

type VerifyResult =
  | { valid: true; payload: ClaimTokenPayload }
  | { valid: false; reason: "invalid" | "expired"; payload?: ClaimTokenPayload };

const TOKEN_TTL_DAYS = 30;

const getClaimTokenSecret = () => {
  const secret = process.env.CLAIM_TOKEN_SECRET;
  if (!secret) {
    throw new Error("CLAIM_TOKEN_SECRET is not set");
  }
  return secret;
};

const base64UrlEncode = (value: string) =>
  Buffer.from(value, "utf8").toString("base64url");

const base64UrlDecode = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

const signPayload = (payload: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(payload).digest("base64url");

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const createClaimToken = (sessionId: string, now = Date.now()) => {
  const issuedAt = Math.floor(now / 1000);
  const expiresAt = issuedAt + TOKEN_TTL_DAYS * 24 * 60 * 60;
  const payload: ClaimTokenPayload = {
    sid: sessionId,
    iat: issuedAt,
    exp: expiresAt,
  };
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(payloadEncoded, getClaimTokenSecret());
  return `${payloadEncoded}.${signature}`;
};

export const verifyClaimToken = (
  token: string,
  now = Date.now()
): VerifyResult => {
  if (!token || !token.includes(".")) {
    return { valid: false, reason: "invalid" };
  }

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) {
    return { valid: false, reason: "invalid" };
  }

  const expectedSignature = signPayload(payloadEncoded, getClaimTokenSecret());
  if (!safeEqual(signature, expectedSignature)) {
    return { valid: false, reason: "invalid" };
  }

  let payload: ClaimTokenPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadEncoded)) as ClaimTokenPayload;
  } catch {
    return { valid: false, reason: "invalid" };
  }

  if (!payload?.sid || typeof payload.iat !== "number") {
    return { valid: false, reason: "invalid" };
  }

  const nowSeconds = Math.floor(now / 1000);
  if (typeof payload.exp === "number" && payload.exp < nowSeconds) {
    return { valid: false, reason: "expired", payload };
  }

  return { valid: true, payload };
};
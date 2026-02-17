import "server-only";
import crypto from "node:crypto";

type MetaPurchaseEventInput = {
  eventId: string;
  email?: string;
  fbc?: string;
  fbp?: string;
  value?: number;
  currency?: string;
};

type MetaUserData = {
  em?: string;
  fbc?: string;
  fbp?: string;
  external_id: string;
};

type MetaCustomData = {
  value?: number;
  currency?: string;
};

const META_GRAPH_VERSION = "v22.0";

const normalizeText = (value?: string) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const hashForMeta = (value?: string) => {
  const normalized = normalizeText(value)?.toLowerCase();
  if (!normalized) {
    return undefined;
  }
  return crypto.createHash("sha256").update(normalized).digest("hex");
};

const normalizeCurrency = (value?: string) => {
  const normalized = normalizeText(value);
  return normalized ? normalized.toUpperCase() : undefined;
};

const getMetaConfig = () => {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return null;
  }
  return { pixelId, accessToken };
};

export const sendMetaPurchaseEvent = async ({
  eventId,
  email,
  fbc,
  fbp,
  value,
  currency,
}: MetaPurchaseEventInput) => {
  const config = getMetaConfig();
  if (!config) {
    return { sent: false, skipped: "missing_meta_env" as const };
  }

  const userData: MetaUserData = {
    external_id: hashForMeta(eventId) ?? eventId,
  };

  const hashedEmail = hashForMeta(email);
  if (hashedEmail) {
    userData.em = hashedEmail;
  }

  const normalizedFbc = normalizeText(fbc);
  if (normalizedFbc) {
    userData.fbc = normalizedFbc;
  }

  const normalizedFbp = normalizeText(fbp);
  if (normalizedFbp) {
    userData.fbp = normalizedFbp;
  }

  const customData: MetaCustomData = {};
  if (typeof value === "number" && Number.isFinite(value)) {
    customData.value = value;
  }

  const normalizedCurrency = normalizeCurrency(currency);
  if (normalizedCurrency) {
    customData.currency = normalizedCurrency;
  }

  const payload: {
    data: Array<{
      event_name: "Purchase";
      event_time: number;
      action_source: "website";
      event_id: string;
      user_data: MetaUserData;
      custom_data?: MetaCustomData;
    }>;
    test_event_code?: string;
  } = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: eventId,
        user_data: userData,
        custom_data:
          Object.keys(customData).length > 0 ? customData : undefined,
      },
    ],
  };

  const testEventCode = normalizeText(process.env.META_TEST_EVENT_CODE);
  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const endpoint = new URL(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${config.pixelId}/events`
  );
  endpoint.searchParams.set("access_token", config.accessToken);

  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Meta CAPI request failed (${response.status}): ${errorBody}`);
  }

  return { sent: true as const };
};


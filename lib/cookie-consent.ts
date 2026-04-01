export const COOKIE_CONSENT_NAME = "psb_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const COOKIE_CONSENT_OPEN_EVENT = "psb-cookie-consent:open";
export const COOKIE_CONSENT_UPDATED_EVENT = "psb-cookie-consent:updated";

export type CookieConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export function createCookieConsent(
  overrides?: Partial<Pick<CookieConsentPreferences, "analytics" | "marketing">>,
): CookieConsentPreferences {
  return {
    necessary: true,
    analytics: overrides?.analytics ?? false,
    marketing: overrides?.marketing ?? false,
    updatedAt: new Date().toISOString(),
  };
}

export function serializeCookieConsent(
  preferences: CookieConsentPreferences,
): string {
  return encodeURIComponent(JSON.stringify(preferences));
}

export function parseCookieConsent(
  value: string | undefined | null,
): CookieConsentPreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<CookieConsentPreferences>;

    if (
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function readCookieConsentFromCookieString(
  cookieString: string,
): CookieConsentPreferences | null {
  const segments = cookieString
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const match = segments.find((segment) =>
    segment.startsWith(`${COOKIE_CONSENT_NAME}=`),
  );

  if (!match) {
    return null;
  }

  return parseCookieConsent(match.slice(COOKIE_CONSENT_NAME.length + 1));
}

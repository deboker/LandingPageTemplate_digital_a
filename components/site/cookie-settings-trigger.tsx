"use client";

import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent";
import type { Locale } from "@/lib/locales";

type CookieSettingsTriggerProps = {
  locale: Locale;
  className?: string;
};

export function CookieSettingsTrigger({
  locale,
  className,
}: CookieSettingsTriggerProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))}
      className={className}
    >
      {locale === "sk" ? "Spravovať cookies" : "Manage cookies"}
    </button>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  COOKIE_CONSENT_MAX_AGE,
  COOKIE_CONSENT_NAME,
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_UPDATED_EVENT,
  createCookieConsent,
  readCookieConsentFromCookieString,
  serializeCookieConsent,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";
import type { Locale } from "@/lib/locales";

type CookieConsentProps = {
  locale: Locale;
};

type OptionalPreferences = Pick<
  CookieConsentPreferences,
  "analytics" | "marketing"
>;

type ConsentCopy = {
  title: string;
  description: string;
  detailTitle: string;
  necessaryTitle: string;
  necessaryDescription: string;
  analyticsTitle: string;
  analyticsDescription: string;
  marketingTitle: string;
  marketingDescription: string;
  policyLink: string;
  policyLabel: string;
  reject: string;
  acceptAll: string;
  customize: string;
  save: string;
  close: string;
  alwaysOn: string;
  disabledHint: string;
};

export function CookieConsent({ locale }: CookieConsentProps) {
  const copy = useMemo<ConsentCopy>(
    () =>
      locale === "sk"
        ? {
            title: "Používame cookies len po tvojom súhlase.",
            description:
              "Nevyhnutný cookie si pamätá tvoju voľbu. Analytické a marketingové cookies zostávajú vypnuté, kým ich výslovne nepovolíš.",
            detailTitle: "Nastavenia cookies",
            necessaryTitle: "Nevyhnutné",
            necessaryDescription:
              "Zabezpečujú základnú funkčnosť webu a uloženie tvojej voľby súhlasu.",
            analyticsTitle: "Analytické",
            analyticsDescription:
              "Pomáhajú merať návštevnosť a výkon webu. Bez tvojho súhlasu ostávajú vypnuté.",
            marketingTitle: "Marketingové",
            marketingDescription:
              "Používajú sa na reklamné platformy a remarketing. Bez tvojho súhlasu ostávajú vypnuté.",
            policyLink: `/${locale}/cookies`,
            policyLabel: "Zásady cookies",
            reject: "Odmietnuť voliteľné",
            acceptAll: "Prijať všetko",
            customize: "Nastaviť",
            save: "Uložiť výber",
            close: "Zavrieť",
            alwaysOn: "Vždy zapnuté",
            disabledHint: "Aktuálne neaktívne bez súhlasu",
          }
        : {
            title: "We use cookies only after your consent.",
            description:
              "A necessary cookie remembers your choice. Analytics and marketing cookies stay off until you explicitly enable them.",
            detailTitle: "Cookie settings",
            necessaryTitle: "Necessary",
            necessaryDescription:
              "They keep the website working and store your consent preference.",
            analyticsTitle: "Analytics",
            analyticsDescription:
              "They help measure traffic and site performance. They remain off without your consent.",
            marketingTitle: "Marketing",
            marketingDescription:
              "They are used for advertising platforms and remarketing. They remain off without your consent.",
            policyLink: `/${locale}/cookies`,
            policyLabel: "Cookie policy",
            reject: "Reject optional",
            acceptAll: "Accept all",
            customize: "Customize",
            save: "Save selection",
            close: "Close",
            alwaysOn: "Always active",
            disabledHint: "Currently inactive without consent",
          },
    [locale],
  );

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState<OptionalPreferences>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setIsMounted(true);

    const existing = readCookieConsentFromCookieString(document.cookie);

    if (existing) {
      setPreferences({
        analytics: existing.analytics,
        marketing: existing.marketing,
      });
    } else {
      setIsVisible(true);
    }

    const openSettings = () => {
      const latest = readCookieConsentFromCookieString(document.cookie);

      setPreferences({
        analytics: latest?.analytics ?? false,
        marketing: latest?.marketing ?? false,
      });
      setIsVisible(true);
      setIsExpanded(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openSettings);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openSettings);
    };
  }, []);

  if (!isMounted || !isVisible) {
    return null;
  }

  const savePreferences = (nextPreferences: OptionalPreferences) => {
    const consent = createCookieConsent(nextPreferences);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${COOKIE_CONSENT_NAME}=${serializeCookieConsent(consent)}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
    window.dispatchEvent(
      new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, {
        detail: consent,
      }),
    );

    setPreferences(nextPreferences);
    setIsVisible(false);
    setIsExpanded(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="pointer-events-auto mx-auto w-full max-w-5xl overflow-hidden rounded-[1.7rem] border border-slate-900/10 bg-white/92 shadow-[0_28px_80px_rgba(15,23,42,0.18)] backdrop-blur">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {copy.detailTitle}
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {copy.title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {copy.description}{" "}
                <Link
                  href={copy.policyLink}
                  className="font-semibold text-slate-950 underline underline-offset-4"
                >
                  {copy.policyLabel}
                </Link>
              </p>
            </div>

            {!isExpanded ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    savePreferences({ analytics: false, marketing: false })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
                >
                  {copy.reject}
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
                >
                  {copy.customize}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    savePreferences({ analytics: true, marketing: true })
                  }
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {copy.acceptAll}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    savePreferences({
                      analytics: preferences.analytics,
                      marketing: preferences.marketing,
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {copy.save}
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
                >
                  {copy.close}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    savePreferences({ analytics: false, marketing: false })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20"
                >
                  {copy.reject}
                </button>
              </div>
            )}
          </div>

          {isExpanded ? (
            <div className="grid gap-3">
              <ConsentCard
                title={copy.necessaryTitle}
                description={copy.necessaryDescription}
                stateLabel={copy.alwaysOn}
                checked
                disabled
                onChange={() => undefined}
              />
              <ConsentCard
                title={copy.analyticsTitle}
                description={copy.analyticsDescription}
                stateLabel={copy.disabledHint}
                checked={preferences.analytics}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    analytics: checked,
                  }))
                }
              />
              <ConsentCard
                title={copy.marketingTitle}
                description={copy.marketingDescription}
                stateLabel={copy.disabledHint}
                checked={preferences.marketing}
                onChange={(checked) =>
                  setPreferences((current) => ({
                    ...current,
                    marketing: checked,
                  }))
                }
              />
            </div>
          ) : (
            <div className="grid gap-3">
              <CompactCard
                title={copy.necessaryTitle}
                description={copy.necessaryDescription}
              />
              <CompactCard
                title={copy.analyticsTitle}
                description={copy.analyticsDescription}
              />
              <CompactCard
                title={copy.marketingTitle}
                description={copy.marketingDescription}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-4">
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function ConsentCard({
  title,
  description,
  stateLabel,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  stateLabel: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-950">{title}</p>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {stateLabel}
        </p>
      </div>

      <span className="relative mt-1 inline-flex shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-slate-950 peer-disabled:bg-slate-300/80" />
        <span className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

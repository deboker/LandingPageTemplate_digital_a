import Image from "next/image";
import Link from "next/link";
import { CookieSettingsTrigger } from "@/components/site/cookie-settings-trigger";
import type { FooterContent, NavItem } from "@/lib/landing-page";
import type { Locale } from "@/lib/locales";

type SiteFooterProps = {
  locale: Locale;
  footer: FooterContent;
  navigation: NavItem[];
};

export function SiteFooter({ locale, footer, navigation }: SiteFooterProps) {
  const quickLinks = navigation.slice(0, 5);
  const legalLinks =
    locale === "sk"
      ? [
          {
            label: "Zásady cookies",
            href: `/${locale}/cookies`,
          },
          {
            label: "GDPR a ochrana súkromia",
            href: null,
          },
          {
            label: "Obchodné podmienky",
            href: null,
          },
          {
            label: "Reklamačný poriadok",
            href: null,
          },
        ]
      : [
          {
            label: "Cookie policy",
            href: `/${locale}/cookies`,
          },
          {
            label: "Privacy policy",
            href: null,
          },
          {
            label: "Terms and conditions",
            href: null,
          },
          {
            label: "Refund policy",
            href: null,
          },
        ];

  return (
    <footer className="px-6 pb-8 pt-4 sm:px-8 lg:px-14 xl:px-20 2xl:px-24">
      <div className="mx-auto grid w-full max-w-none gap-4 rounded-[2rem] border border-slate-900/8 bg-white/72 p-4 shadow-[0_16px_48px_rgba(15,23,42,0.05)] lg:grid-cols-[1.15fr_1fr_0.95fr]">
        <div className="rounded-[1.6rem] border border-slate-900/8 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden bg-transparent shadow-none">
              <Image
                src="/logo_box_wash.png"
                alt={footer.brandName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {footer.brandName}
              </p>
              <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
                {locale === "sk"
                  ? "Samoobslužná umyvárka pre psíkov a mačky"
                  : "Self-service wash for dogs and cats"}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            {footer.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-900/8 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {locale === "sk" ? "Vstup cez kód" : "Code entry"}
            </span>
            <span className="rounded-full border border-slate-900/8 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {locale === "sk" ? "Online rezervácia" : "Online booking"}
            </span>
            <span className="rounded-full border border-slate-900/8 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {locale === "sk" ? "Čistý box" : "Clean wash box"}
            </span>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-slate-900/8 bg-white px-6 py-6 shadow-[0_12px_36px_rgba(15,23,42,0.04)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {locale === "sk" ? "Rýchle odkazy" : "Quick links"}
            </p>
            <div className="mt-4 grid gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1rem] border border-slate-900/8 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-900/8 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {locale === "sk" ? "Právne podstránky" : "Legal pages"}
            </p>
            <div className="mt-4 grid gap-2">
              <CookieSettingsTrigger
                locale={locale}
                className="flex items-center justify-between rounded-[1rem] border border-slate-900/8 bg-slate-950 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              />
              {legalLinks.map((item) => (
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-[1rem] border border-slate-900/8 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-950"
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {locale === "sk" ? "otvoriť" : "open"}
                    </span>
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-[1rem] border border-dashed border-slate-900/10 bg-slate-50/80 px-4 py-3 text-sm text-slate-700"
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {locale === "sk" ? "čoskoro" : "soon"}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-slate-900/8 bg-slate-950 px-6 py-6 text-white shadow-[0_18px_48px_rgba(15,23,42,0.14)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            {locale === "sk" ? "Kontakt" : "Contact"}
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
            {locale === "sk"
              ? "Napíš, zavolaj alebo sa rovno objednaj."
              : "Write, call or book your visit."}
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href={`tel:${footer.phone.replace(/\s+/g, "")}`}
              className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-4 transition-colors hover:bg-white/12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                {locale === "sk" ? "Telefón" : "Phone"}
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {footer.phone}
              </p>
            </Link>

            <Link
              href={`mailto:${footer.email}`}
              className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-4 transition-colors hover:bg-white/12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                E-mail
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {footer.email}
              </p>
            </Link>

            <Link
              href={
                footer.website.startsWith("http")
                  ? footer.website
                  : `https://${footer.website}`
              }
              className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-4 transition-colors hover:bg-white/12"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Web
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {footer.website}
              </p>
            </Link>

            <div className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                {locale === "sk" ? "Lokalita" : "Location"}
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {footer.location}
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-white/62">
            {locale === "sk"
              ? "Ak potrebuješ poradiť s rezerváciou alebo vstupom do boxu, ozvi sa a doladíme to."
              : "If you need help with booking or access to the wash box, get in touch and we will sort it out."}
          </p>
        </div>
      </div>
    </footer>
  );
}

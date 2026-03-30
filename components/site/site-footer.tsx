import Link from "next/link";
import type { FooterContent } from "@/lib/landing-page";
import { localeLabels, locales, type Locale } from "@/lib/locales";

type SiteFooterProps = {
  locale: Locale;
  footer: FooterContent;
};

export function SiteFooter({ locale, footer }: SiteFooterProps) {
  return (
    <footer className="px-6 pb-8 pt-4 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[1.8rem] border border-slate-900/8 bg-white/72 px-6 py-6 shadow-[0_16px_48px_rgba(15,23,42,0.05)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Digital A
          </p>
          <p className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
            {footer.tagline}
          </p>
          <p className="text-sm text-slate-600">
            <Link href={`mailto:${footer.email}`} className="hover:text-slate-950">
              {footer.email}
            </Link>{" "}
            • {footer.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                item === locale
                  ? "bg-slate-950 text-white"
                  : "border border-slate-900/8 bg-white text-slate-700 hover:text-slate-950"
              }`}
            >
              {localeLabels[item]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

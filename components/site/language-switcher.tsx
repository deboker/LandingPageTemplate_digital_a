import Link from "next/link";
import { localeLabels, locales, type Locale } from "@/lib/locales";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-900/8 bg-white/84 p-1">
      {locales.map((item) => {
        const active = item === locale;

        return (
          <Link
            key={item}
            href={`/${item}`}
            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              active
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            {localeLabels[item]}
          </Link>
        );
      })}
    </div>
  );
}

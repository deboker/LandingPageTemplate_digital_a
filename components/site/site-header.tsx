import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/lib/landing-page";
import type { Locale } from "@/lib/locales";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  brandName: string;
  navigation: NavItem[];
  primaryCta: {
    label: string;
    href: string;
  };
};

export function SiteHeader({
  locale,
  brandName,
  navigation,
  primaryCta,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-6 pt-4 sm:px-8 lg:px-14 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-none items-center justify-between gap-6 rounded-full border border-slate-900/8 bg-white/74 px-4 py-3 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden bg-transparent shadow-none">
            <Image
              src="/logo_box_wash.png"
              alt={brandName}
              width={40}
              height={40}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {brandName}
            </p>
            <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
              {locale === "sk"
                ? "Samoobslužná umyvárka pre psov"
                : "Self-service dog wash"}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <Link
            href={primaryCta.href}
            className="hidden rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
          >
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}

import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/site/cookie-consent";
import { isLocale } from "@/lib/locales";
import { MAINTENANCE_MODE } from "@/lib/maintenance";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      {children}
      {!MAINTENANCE_MODE && <CookieConsent locale={locale} />}
    </>
  );
}

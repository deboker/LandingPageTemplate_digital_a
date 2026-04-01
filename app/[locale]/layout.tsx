import { notFound } from "next/navigation";
import { CookieConsent } from "@/components/site/cookie-consent";
import { isLocale } from "@/lib/locales";

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
      <CookieConsent locale={locale} />
    </>
  );
}

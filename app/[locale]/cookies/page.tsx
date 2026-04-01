import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CookieSettingsTrigger } from "@/components/site/cookie-settings-trigger";
import { getLandingPage } from "@/lib/landing-page";
import { COOKIE_CONSENT_NAME, COOKIE_CONSENT_MAX_AGE } from "@/lib/cookie-consent";
import { isLocale, locales, type Locale } from "@/lib/locales";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const pageCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    intro: string;
    sections: Array<{
      title: string;
      body: string;
    }>;
    categories: Array<{
      title: string;
      description: string;
      state: string;
    }>;
    cookieTitle: string;
    cookieDescription: string;
    backLabel: string;
    contactLabel: string;
  }
> = {
  sk: {
    title: "Zásady cookies",
    description:
      "Informácie o tom, aké cookies web používa, na aký účel a ako môžeš svoj súhlas kedykoľvek zmeniť.",
    intro:
      "Na tomto webe používame iba také cookies, ktoré sú potrebné pre základnú funkčnosť, alebo ktoré výslovne povolíš cez cookie nastavenia.",
    sections: [
      {
        title: "Ako pracujeme so súhlasom",
        body:
          "Voliteľné analytické a marketingové cookies ostávajú vypnuté, kým ich aktívne nepovolíš. Tvoju voľbu si pamätáme pomocou nevyhnutného first-party cookie.",
      },
      {
        title: "Ako môžeš voľbu zmeniť",
        body:
          "Nastavenia cookies otvoríš kedykoľvek cez odkaz Spravovať cookies vo footeri. Tam môžeš voliteľné kategórie zapnúť alebo vypnúť.",
      },
    ],
    categories: [
      {
        title: "Nevyhnutné cookies",
        description:
          "Sú potrebné na uloženie tvojej voľby súhlasu a na základné fungovanie webu.",
        state: "Aktívne vždy",
      },
      {
        title: "Analytické cookies",
        description:
          "Použijú sa až po tvojom súhlase, ak na web neskôr doplníme meranie návštevnosti alebo výkonu.",
        state: "Predvolene vypnuté",
      },
      {
        title: "Marketingové cookies",
        description:
          "Použijú sa až po tvojom súhlase, ak na web neskôr doplníme reklamné alebo remarketingové nástroje.",
        state: "Predvolene vypnuté",
      },
    ],
    cookieTitle: "Aktuálne používaný cookie",
    cookieDescription:
      "Tento web aktuálne potrebuje len jeden nevyhnutný cookie na uloženie tvojho nastavenia súhlasu.",
    backLabel: "Späť na web",
    contactLabel: "Kontakt pre otázky k ochrane súkromia",
  },
  en: {
    title: "Cookie policy",
    description:
      "Information about which cookies the website uses, why they are used, and how you can change your consent at any time.",
    intro:
      "This website only uses cookies that are required for core functionality or that you explicitly allow through the cookie settings.",
    sections: [
      {
        title: "How consent works",
        body:
          "Optional analytics and marketing cookies stay disabled until you actively enable them. Your choice is remembered through a necessary first-party cookie.",
      },
      {
        title: "How to change your choice",
        body:
          "You can reopen the cookie settings at any time through the Manage cookies link in the footer. There you can enable or disable optional categories.",
      },
    ],
    categories: [
      {
        title: "Necessary cookies",
        description:
          "They are required to store your consent choice and keep the website working properly.",
        state: "Always active",
      },
      {
        title: "Analytics cookies",
        description:
          "They are only used after your consent if we later add traffic or performance measurement tools.",
        state: "Off by default",
      },
      {
        title: "Marketing cookies",
        description:
          "They are only used after your consent if we later add advertising or remarketing tools.",
        state: "Off by default",
      },
    ],
    cookieTitle: "Cookie currently used",
    cookieDescription:
      "At the moment, this website only needs one necessary cookie to remember your consent settings.",
    backLabel: "Back to website",
    contactLabel: "Privacy contact",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = pageCopy[locale];

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/cookies`,
      languages: {
        sk: "/sk/cookies",
        en: "/en/cookies",
      },
    },
  };
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = pageCopy[locale];
  const { content } = await getLandingPage(locale);

  return (
    <main className="site-shell min-h-screen px-6 py-10 sm:px-8 lg:px-14 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-[2rem] border border-slate-900/8 bg-white/78 p-8 shadow-[0_18px_56px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Pet Spa Box
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {copy.intro}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              {copy.backLabel}
            </Link>
            <CookieSettingsTrigger
              locale={locale}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-white"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {copy.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.8rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <section
          id="cookie-details"
          className="rounded-[2rem] border border-slate-900/8 bg-white/76 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Cookies
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {copy.cookieTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            {copy.cookieDescription}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {copy.categories.map((category) => (
              <article
                key={category.title}
                className="rounded-[1.5rem] border border-slate-900/8 bg-slate-50 px-5 py-5"
              >
                <p className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                  {category.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {category.state}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-900/8 bg-slate-950 text-white">
            <div className="grid gap-px bg-white/10 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.8fr]">
              <div className="bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                Cookie
              </div>
              <div className="bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                {locale === "sk" ? "Kategória" : "Category"}
              </div>
              <div className="bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                {locale === "sk" ? "Platnosť" : "Retention"}
              </div>
              <div className="bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                {locale === "sk" ? "Účel" : "Purpose"}
              </div>

              <div className="bg-slate-950/94 px-4 py-4 text-sm font-semibold text-white">
                {COOKIE_CONSENT_NAME}
              </div>
              <div className="bg-slate-950/94 px-4 py-4 text-sm text-white/78">
                {locale === "sk" ? "Nevyhnutné" : "Necessary"}
              </div>
              <div className="bg-slate-950/94 px-4 py-4 text-sm text-white/78">
                {locale === "sk"
                  ? `${Math.round(COOKIE_CONSENT_MAX_AGE / 86400)} dní`
                  : `${Math.round(COOKIE_CONSENT_MAX_AGE / 86400)} days`}
              </div>
              <div className="bg-slate-950/94 px-4 py-4 text-sm text-white/78">
                {locale === "sk"
                  ? "Uloženie voľby súhlasu s cookies"
                  : "Stores the user's cookie consent choice"}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.8rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {copy.contactLabel}
          </p>
          <p className="mt-4 text-base leading-8 text-slate-600">
            <Link
              href={`mailto:${content.footer.email}`}
              className="font-semibold text-slate-950 underline underline-offset-4"
            >
              {content.footer.email}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

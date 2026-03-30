import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/site/fade-in";
import { Float } from "@/components/site/float";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getLandingPage } from "@/lib/landing-page";
import { isLocale, locales, type Locale } from "@/lib/locales";

const languageAlternates = {
  sk: "/sk",
  en: "/en",
} as const;

const openGraphLocales: Record<Locale, string> = {
  sk: "sk_SK",
  en: "en_US",
};

const primaryButtonClass =
  "inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-slate-800";

const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-900 transition-transform duration-300 hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-white";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
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

  const { content } = await getLandingPage(locale);

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: `/${locale}`,
      locale: openGraphLocales[locale],
      type: "website",
    },
    twitter: {
      title: content.seo.title,
      description: content.seo.description,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const { content, source } = await getLandingPage(locale);
  const cmsNotice =
    locale === "sk"
      ? "Zatiaľ beží lokálny demo obsah. Keď v Sanity vytvoríš dokument typu landingPage pre tento jazyk, frontend ho načíta automaticky."
      : "Demo content is active for now. Once you create a landingPage document in Sanity for this locale, the frontend will use it automatically.";

  return (
    <div lang={locale} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(129,220,255,0.26),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[32rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,108,0.2),transparent_58%)] blur-3xl" />

      <SiteHeader
        locale={locale}
        navigation={content.navigation}
        primaryCta={content.hero.primaryCta}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-20 pt-8 sm:px-8 lg:px-10 lg:pt-10">
        <FadeIn className="relative overflow-hidden rounded-[2.25rem] border border-slate-900/8 bg-white/70 px-6 py-8 shadow-[0_28px_100px_rgba(15,23,42,0.08)] backdrop-blur xl:px-10 xl:py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,255,255,0.52))]" />
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span className="rounded-full border border-slate-900/8 bg-white/80 px-4 py-2 text-[11px]">
                  {content.hero.eyebrow}
                </span>
                {source === "fallback" ? (
                  <span className="rounded-full bg-lime-200 px-4 py-2 text-[11px] text-slate-950">
                    {locale === "sk" ? "Sanity ready" : "Sanity ready"}
                  </span>
                ) : (
                  <span className="rounded-full bg-sky-200 px-4 py-2 text-[11px] text-slate-950">
                    {locale === "sk" ? "CMS live" : "CMS live"}
                  </span>
                )}
              </div>

              <div className="max-w-3xl space-y-5">
                <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
                  {content.hero.titlePrefix}{" "}
                  <span className="display-font text-slate-900 italic">
                    {content.hero.titleAccent}
                  </span>{" "}
                  {content.hero.titleSuffix}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
                  {content.hero.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={content.hero.primaryCta.href}
                  className={primaryButtonClass}
                >
                  {content.hero.primaryCta.label}
                </Link>
                <Link
                  href={content.hero.secondaryCta.href}
                  className={secondaryButtonClass}
                >
                  {content.hero.secondaryCta.label}
                </Link>
              </div>

              {source === "fallback" ? (
                <p className="max-w-2xl rounded-[1.5rem] border border-dashed border-slate-900/12 bg-white/65 px-5 py-4 text-sm leading-7 text-slate-600">
                  {cmsNotice}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                {content.hero.proof.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-900/8 bg-white/82 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:pl-6">
              <Float className="rounded-[2rem] border border-slate-900/8 bg-[#0f172a] p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.22)]">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                  <span>{locale === "sk" ? "Launch stack" : "Launch stack"}</span>
                  <span>
                    {locale === "sk"
                      ? "Predajný systém"
                      : "Selling system"}
                  </span>
                </div>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                      {locale === "sk" ? "Technológia" : "Technology"}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                      Next.js 16, Tailwind 4, Motion, Sanity
                    </p>
                    <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
                      {locale === "sk"
                        ? "Rýchly app router základ, premyslená informačná architektúra a editácia obsahu bez zásahu do kódu."
                        : "A fast app router stack, conversion-focused information architecture and content editing without code changes."}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {content.hero.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5"
                      >
                        <p className="text-3xl font-semibold tracking-[-0.05em]">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-white/70">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Float>

              <div className="grid gap-4 md:grid-cols-2">
                <Float
                  amplitude={8}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/82 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {locale === "sk" ? "Use cases" : "Use cases"}
                  </p>
                  <div className="mt-4 space-y-3">
                    {content.highlights.slice(0, 2).map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-3"
                      >
                        <p className="font-semibold text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Float>

                <Float
                  amplitude={12}
                  className="rounded-[1.7rem] border border-slate-900/8 bg-white/82 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {locale === "sk" ? "Editor scope" : "Editor scope"}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {content.cms.items.slice(0, 5).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3">
                    {content.process.slice(0, 2).map((step, index) => (
                      <div
                        key={step.title}
                        className="rounded-[1.2rem] border border-slate-900/8 bg-slate-50 px-4 py-3"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {locale === "sk" ? "Krok" : "Step"} 0{index + 1}
                        </p>
                        <p className="mt-2 font-semibold text-slate-950">
                          {step.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </Float>
              </div>
            </div>
          </div>
        </FadeIn>

        <section className="grid gap-4 md:grid-cols-3">
          {content.hero.metrics.map((metric, index) => (
            <FadeIn
              key={metric.label}
              delay={index * 0.08}
              className="rounded-[1.7rem] border border-slate-900/8 bg-white/72 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
            >
              <p className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {metric.label}
              </p>
            </FadeIn>
          ))}
        </section>

        <FadeIn className="flex flex-wrap gap-3 rounded-[1.7rem] border border-slate-900/8 bg-white/68 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.04)]">
          {content.proofStrip.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-900/8 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </FadeIn>

        <section id="overview" className="grid gap-8">
          <SectionLead
            eyebrow={locale === "sk" ? "Kde template funguje najlepšie" : "Where this template performs best"}
            title={
              locale === "sk"
                ? "Postavené pre digitálne kampane, ktoré potrebujú vyzerať draho a ísť rýchlo live."
                : "Built for digital campaigns that need to look premium and launch fast."
            }
            description={
              locale === "sk"
                ? "Sekcie sú navrhnuté tak, aby zvládli lead gen, launch, službové ponuky aj produktové microsite bez veľkého prekopávania dizajnu."
                : "The sections are structured to handle lead generation, offer pages, launches and product microsites without redesigning the whole site."
            }
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {content.highlights.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.08}
                className="rounded-[1.8rem] border border-slate-900/8 bg-white/76 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.05)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  0{index + 1}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {item.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="features" className="grid gap-8">
          <SectionLead
            eyebrow={locale === "sk" ? "Prečo to predáva lepšie" : "Why it sells better"}
            title={
              locale === "sk"
                ? "Kombinácia marketingovej logiky, rýchlosti a editácie pre klienta."
                : "A blend of marketing logic, speed and client-friendly editing."
            }
            description={
              locale === "sk"
                ? "Nie je to len pekný layout. Je to základ, ktorý už ráta s opakovanými CTA, FAQ, proof blokmi, SEO a obsahovou údržbou po launchi."
                : "This is more than a polished layout. It already accounts for repeated CTAs, proof blocks, SEO and ongoing content updates after launch."
            }
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.features.map((feature, index) => (
              <FadeIn
                key={feature.title}
                delay={index * 0.06}
                className="rounded-[1.8rem] border border-slate-900/8 bg-white/78 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {feature.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="process" className="grid gap-8">
          <SectionLead
            eyebrow={locale === "sk" ? "Ako s tým pracovať" : "How to work with it"}
            title={
              locale === "sk"
                ? "Od prvého konceptu po live web bez chaosu v obsahu."
                : "From first concept to a live site without content chaos."
            }
            description={
              locale === "sk"
                ? "Proces počíta s tým, že marketing, copy a klient budú robiť zmeny aj po nasadení. Preto je štruktúra modulárna a CMS vrstva pripravená."
                : "The flow assumes that marketing, copy and the client will keep changing the site after launch. That is why the structure is modular and CMS-first."
            }
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {content.process.map((step, index) => (
              <FadeIn
                key={step.title}
                delay={index * 0.08}
                className="rounded-[1.8rem] border border-slate-900/8 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.2)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                  {locale === "sk" ? "Krok" : "Step"} 0{index + 1}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/72">
                  {step.description}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <FadeIn
          id="cms"
          className="grid gap-8 rounded-[2rem] border border-slate-900/8 bg-white/74 p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {content.cms.eyebrow}
            </p>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {content.cms.title}
            </h2>
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {content.cms.description}
            </p>
            <p className="rounded-[1.4rem] border border-dashed border-slate-900/12 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
              {content.cms.note}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.cms.items.map((item, index) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-slate-900/8 bg-slate-50 px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {locale === "sk" ? "Pole" : "Field"} 0{index + 1}
                </p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-slate-950">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <section id="faq" className="grid gap-8">
          <SectionLead
            eyebrow="FAQ"
            title={
              locale === "sk"
                ? "Otázky, ktoré pri tomto template riešiš hneď na začiatku."
                : "Questions you will want answered before shipping this template."
            }
            description={
              locale === "sk"
                ? "Odpovede sú postavené tak, aby si mal jasno, čo je pripravené teraz a čo môžeš doplniť až v ďalšej iterácii."
                : "These answers make it clear what is already production-ready and what can wait for the next iteration."
            }
          />

          <div className="grid gap-4">
            {content.faq.map((item, index) => (
              <FadeIn
                key={item.question}
                delay={index * 0.05}
                className="rounded-[1.5rem] border border-slate-900/8 bg-white/78 px-6 py-5 shadow-[0_16px_48px_rgba(15,23,42,0.04)]"
              >
                <details className="group">
                  <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-0.02em] text-slate-950">
                    {item.question}
                  </summary>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-slate-600">
                    {item.answer}
                  </p>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        <FadeIn
          id="contact"
          className="overflow-hidden rounded-[2.2rem] border border-slate-900/8 bg-slate-950 px-6 py-8 text-white shadow-[0_34px_90px_rgba(15,23,42,0.2)] sm:px-8 sm:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                {locale === "sk" ? "Final CTA" : "Final CTA"}
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {content.finalCta.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                {content.finalCta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.finalCta.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {content.finalCta.primaryCta.label}
              </Link>
              <Link
                href={content.finalCta.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/12"
              >
                {content.finalCta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </FadeIn>
      </main>

      <SiteFooter locale={locale} footer={content.footer} />
    </div>
  );
}

function SectionLead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {eyebrow}
        </p>
        <div className="h-px w-24 bg-slate-900/10" />
      </div>
      <div className="space-y-4">
        <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}

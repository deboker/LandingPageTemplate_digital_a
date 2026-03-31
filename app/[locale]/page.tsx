import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/site/fade-in";
import { Float } from "@/components/site/float";
import { ContactRail } from "@/components/site/contact-rail";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const socialImage = {
  url: `${siteUrl}/box_wash_social.webp`,
  width: 1536,
  height: 1024,
  alt: "Psí SPA Box social preview",
} as const;

const uiCopy: Record<Locale, { stepLabel: string }> = {
  sk: { stepLabel: "Krok" },
  en: { stepLabel: "Step" },
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
      siteName: "Psí SPA Box",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [socialImage.url],
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const { content } = await getLandingPage(locale);
  const ui = uiCopy[locale];
  const galleryItems = content.gallery.items;

  return (
    <div lang={locale} className="site-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(129,220,255,0.26),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[32rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,108,0.2),transparent_58%)] blur-3xl" />

      <SiteHeader
        locale={locale}
        brandName={content.footer.brandName}
        navigation={content.navigation}
        primaryCta={content.hero.primaryCta}
      />
      <ContactRail
        locale={locale}
        footer={content.footer}
        primaryCta={content.hero.primaryCta}
      />

      <main className="mx-auto flex w-full max-w-none flex-col gap-16 px-6 pb-20 pt-8 sm:px-8 lg:px-14 lg:pt-10 xl:px-20 2xl:px-24">
        <FadeIn className="relative overflow-hidden rounded-[2.25rem] border border-slate-900/8 bg-white/70 px-6 py-8 shadow-[0_28px_100px_rgba(15,23,42,0.08)] backdrop-blur xl:px-10 xl:py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,255,255,0.52))]" />
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span className="rounded-full border border-slate-900/8 bg-white/80 px-4 py-2 text-[11px]">
                  {content.hero.eyebrow}
                </span>
                <span className="rounded-full bg-sky-200 px-4 py-2 text-[11px] text-slate-950">
                  {content.hero.badge}
                </span>
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
              <Float className="group relative overflow-hidden rounded-[2rem] border border-slate-900/8 bg-slate-950 shadow-[0_24px_90px_rgba(15,23,42,0.22)]">
                  <div className="absolute inset-0">
                    <Image
                      src={galleryItems[0].imageUrl}
                      alt={galleryItems[0].alt}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.72))]" />
                </div>

                <div className="relative flex min-h-[25rem] flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">
                    <span>{content.hero.panelEyebrow}</span>
                    <span>{content.hero.panelStatus}</span>
                  </div>

                  <div className="max-w-lg space-y-4">
                    <span className="inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur">
                      {content.hero.panelKicker}
                    </span>
                    <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      {content.hero.panelTitle}
                    </p>
                    <p className="max-w-md text-sm leading-7 text-white/78">
                      {content.hero.panelDescription}
                    </p>
                  </div>
                </div>
              </Float>

              <div className="grid gap-4 md:grid-cols-2">
                <Float
                  amplitude={8}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-slate-900/8 bg-white/82 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={galleryItems[1].imageUrl}
                      alt={galleryItems[1].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 768px) 22vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.8))]" />
                  </div>
                  <div className="relative flex min-h-[15rem] flex-col justify-end p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      {content.gallery.sideHighlightsTitle}
                    </p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                      {galleryItems[1].title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      {galleryItems[1].subtitle}
                    </p>
                  </div>
                </Float>

                <Float
                  amplitude={12}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-slate-900/8 bg-white/82 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={galleryItems[2].imageUrl}
                      alt={galleryItems[2].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 768px) 22vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18),rgba(15,23,42,0.82))]" />
                  </div>
                  <div className="relative flex min-h-[15rem] flex-col justify-between p-5 text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                        {content.gallery.sideIncludedTitle}
                      </p>
                      <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                        {galleryItems[2].title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/78">
                        {galleryItems[2].subtitle}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.cms.items.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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

        <section className="grid gap-8">
          <SectionLead
            eyebrow={content.gallery.eyebrow}
            title={content.gallery.title}
            description={content.gallery.description}
          />

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            {galleryItems.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.08}
                className={`group relative overflow-hidden rounded-[1.9rem] border border-slate-900/8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${
                  index === 0 ? "min-h-[27rem]" : "min-h-[20rem]"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes={
                    index === 0
                      ? "(min-width: 1024px) 38vw, 100vw"
                      : "(min-width: 1024px) 25vw, 100vw"
                  }
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.74))]" />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <p className="text-2xl font-semibold tracking-[-0.03em]">
                    {item.title}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-7 text-white/80">
                    {item.subtitle}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="overview" className="grid gap-8">
          <SectionLead
            eyebrow={content.overviewSection.eyebrow}
            title={content.overviewSection.title}
            description={content.overviewSection.description}
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
            eyebrow={content.featuresSection.eyebrow}
            title={content.featuresSection.title}
            description={content.featuresSection.description}
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
            eyebrow={content.processSection.eyebrow}
            title={content.processSection.title}
            description={content.processSection.description}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {content.process.map((step, index) => (
              <FadeIn
                key={step.title}
                delay={index * 0.08}
                className="rounded-[1.8rem] border border-slate-900/8 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.2)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                  {ui.stepLabel} 0{index + 1}
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
          id="pricing"
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
                  {content.cms.itemLabel} 0{index + 1}
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
            eyebrow={content.faqSection.eyebrow}
            title={content.faqSection.title}
            description={content.faqSection.description}
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
                {content.finalCta.eyebrow}
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

      <SiteFooter
        locale={locale}
        footer={content.footer}
        navigation={content.navigation}
      />
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

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

const pageCopy: Record<
  Locale,
  {
    heroBadge: string;
    heroPanel: {
      eyebrow: string;
      status: string;
      kicker: string;
      title: string;
      description: string;
    };
    sideHighlightsTitle: string;
    sideIncludedTitle: string;
    overview: {
      eyebrow: string;
      title: string;
      description: string;
    };
    features: {
      eyebrow: string;
      title: string;
      description: string;
    };
    process: {
      eyebrow: string;
      title: string;
      description: string;
    };
    pricing: {
      itemLabel: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      description: string;
      items: Array<{
        title: string;
        subtitle: string;
        alt: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
    };
    finalCtaEyebrow: string;
  }
> = {
  sk: {
    heroBadge: "Vstup cez kód",
    heroPanel: {
      eyebrow: "Ako to funguje",
      status: "Vstup cez kód",
      kicker: "Pripravené pre teba",
      title: "Prídeš so psom, zadáš kód a box je tvoj.",
      description:
        "Žiadne preberanie kľúčov ani čakanie na personál. Online rezervácia, kód do mobilu a rýchla samoobslužná návšteva, keď ti to sedí.",
    },
    sideHighlightsTitle: "Najčastejšie situácie",
    sideIncludedTitle: "V boxe máš",
    overview: {
      eyebrow: "Poznáš tento scenár?",
      title: "Psík je špinavý, ale doma sa ti nechce robiť ďalšiu malú povodeň.",
      description:
        "Po prechádzke v daždi, po lese alebo po blate potrebuješ rýchle riešenie. Umyješ ho u nás a domov ideš bez neporiadku v kúpeľni.",
    },
    features: {
      eyebrow: "Prečo ľudia prídu práve sem",
      title: "Jednoduché, čisté a bez zbytočného stresu pre teba aj psa.",
      description:
        "Súkromný box, vybavenie pripravené na mieste a žiadne upratovanie doma. Presne preto sa sem ľudia vracajú znovu.",
    },
    process: {
      eyebrow: "Ako to funguje",
      title: "Rezervácia, kód, otvoríš dvere a vybavené.",
      description:
        "Vyberieš si čas, príde ti kód do mobilu a na mieste nič neriešiš. Len prídeš, otvoríš box a umyješ psíka.",
    },
    pricing: {
      itemLabel: "V cene",
    },
    gallery: {
      eyebrow: "Ako to u nás vyzerá",
      title: "Miesto, kde psíka umyješ rýchlo, pohodlne a bez chaosu doma.",
      description:
        "Prídeš, otvoríš box, umyješ psíka, vysušíš ho a ideš ďalej. Žiadna mokrá kúpeľňa, chlpy vo vani ani ďalšie upratovanie doma.",
      items: [
        {
          title: "Pohodlné umytie",
          subtitle: "Teplá voda, priestor a pokoj na kúpanie bez stresu.",
          alt: "Veľký pes pri kúpaní v čistom umývacom priestore.",
        },
        {
          title: "Čistý a spokojný výsledok",
          subtitle: "Po návšteve odchádzaš s čistým psom, nie s ďalšou robotou doma.",
          alt: "Čistý a upravený malý pes po starostlivosti.",
        },
        {
          title: "Detailná starostlivosť",
          subtitle: "Rýchle opláchnutie aj dôkladnejšia údržba podľa potreby.",
          alt: "Detail starostlivosti o srsť psa pri úprave.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Otázky, ktoré si ľudia kladú skôr, než prídu prvý raz.",
      description:
        "Všetko podstatné o vstupe, rezervácii aj vybavení nájdeš tu na jednom mieste.",
    },
    finalCtaEyebrow: "Rezervácia",
  },
  en: {
    heroBadge: "Code access",
    heroPanel: {
      eyebrow: "How it works",
      status: "Code entry",
      kicker: "Ready for your visit",
      title: "You arrive with your dog, enter the code and the box is yours.",
      description:
        "No key handover and no waiting for staff. Online booking, code on your phone and a fast self-service visit whenever it suits you.",
    },
    sideHighlightsTitle: "Typical situations",
    sideIncludedTitle: "Inside the box",
    overview: {
      eyebrow: "Know this feeling?",
      title: "The dog is dirty, but you do not want to flood your bathroom again.",
      description:
        "After rain, mud or a long walk you need a fast solution. Wash your dog here and go home without turning your bathroom into a mess.",
    },
    features: {
      eyebrow: "Why people choose this",
      title: "Simple, clean and much less stressful for you and your dog.",
      description:
        "A private box, ready-to-use equipment and no cleanup waiting at home. That is exactly why people come back.",
    },
    process: {
      eyebrow: "How it works",
      title: "Book, get the code, open the door and you are in.",
      description:
        "Choose a time, receive the code on your phone and arrive without dealing with staff or keys. Just open the door and start.",
    },
    pricing: {
      itemLabel: "Included",
    },
    gallery: {
      eyebrow: "What it feels like",
      title: "A place where you can wash your dog quickly, comfortably and without the mess at home.",
      description:
        "You arrive, unlock the box, wash your dog, dry the coat and leave. No wet bathroom, no hair in the tub and no extra cleanup waiting at home.",
      items: [
        {
          title: "Comfortable wash",
          subtitle: "Warm water, space and a calmer experience for both of you.",
          alt: "Large dog being washed in a clean bathing area.",
        },
        {
          title: "Clean result",
          subtitle: "You leave with a clean dog instead of another cleanup task at home.",
          alt: "Small clean dog after grooming care.",
        },
        {
          title: "Practical care",
          subtitle: "From a quick rinse to more complete maintenance when needed.",
          alt: "Close-up of dog coat care during grooming.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions people ask before their first visit.",
      description:
        "Everything important about access, booking and equipment is here in one place.",
    },
    finalCtaEyebrow: "Booking",
  },
};

const photoGallery = [
  {
    src: "https://cdn.pixabay.com/photo/2016/02/03/23/24/dog-1178365_1280.jpg",
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565683_1280.jpg",
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565682_1280.jpg",
  },
] as const;

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

  const { content } = await getLandingPage(locale);
  const copy = pageCopy[locale];

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
                  {copy.heroBadge}
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
                    src={photoGallery[0].src}
                    alt={copy.gallery.items[0].alt}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.72))]" />
                </div>

                <div className="relative flex min-h-[25rem] flex-col justify-between p-6 text-white">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72">
                    <span>{copy.heroPanel.eyebrow}</span>
                    <span>{copy.heroPanel.status}</span>
                  </div>

                  <div className="max-w-lg space-y-4">
                    <span className="inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur">
                      {copy.heroPanel.kicker}
                    </span>
                    <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      {copy.heroPanel.title}
                    </p>
                    <p className="max-w-md text-sm leading-7 text-white/78">
                      {copy.heroPanel.description}
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
                      src={photoGallery[1].src}
                      alt={copy.gallery.items[1].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 768px) 22vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.8))]" />
                  </div>
                  <div className="relative flex min-h-[15rem] flex-col justify-end p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      {copy.sideHighlightsTitle}
                    </p>
                    <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                      {copy.gallery.items[1].title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/78">
                      {copy.gallery.items[1].subtitle}
                    </p>
                  </div>
                </Float>

                <Float
                  amplitude={12}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-slate-900/8 bg-white/82 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={photoGallery[2].src}
                      alt={copy.gallery.items[2].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      sizes="(min-width: 768px) 22vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18),rgba(15,23,42,0.82))]" />
                  </div>
                  <div className="relative flex min-h-[15rem] flex-col justify-between p-5 text-white">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                        {copy.sideIncludedTitle}
                      </p>
                      <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                        {copy.gallery.items[2].title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/78">
                        {copy.gallery.items[2].subtitle}
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
            eyebrow={copy.gallery.eyebrow}
            title={copy.gallery.title}
            description={copy.gallery.description}
          />

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            {copy.gallery.items.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.08}
                className={`group relative overflow-hidden rounded-[1.9rem] border border-slate-900/8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ${
                  index === 0 ? "min-h-[27rem]" : "min-h-[20rem]"
                }`}
              >
                <Image
                  src={photoGallery[index].src}
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
            eyebrow={copy.overview.eyebrow}
            title={copy.overview.title}
            description={copy.overview.description}
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
            eyebrow={copy.features.eyebrow}
            title={copy.features.title}
            description={copy.features.description}
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
            eyebrow={copy.process.eyebrow}
            title={copy.process.title}
            description={copy.process.description}
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
                  {copy.pricing.itemLabel} 0{index + 1}
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
            eyebrow={copy.faq.eyebrow}
            title={copy.faq.title}
            description={copy.faq.description}
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
                {copy.finalCtaEyebrow}
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

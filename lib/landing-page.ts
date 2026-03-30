import { cache } from "react";
import type { Locale } from "@/lib/locales";
import { defaultLocale } from "@/lib/locales";
import { fetchSanityData } from "@/lib/sanity/client";
import { landingPageQuery } from "@/lib/sanity/queries";

export type NavItem = {
  label: string;
  href: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Highlight = {
  title: string;
  description: string;
};

export type Feature = {
  eyebrow: string;
  title: string;
  description: string;
};

export type Step = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FooterContent = {
  tagline: string;
  email: string;
  location: string;
};

export type LandingPageData = {
  locale: Locale;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  navigation: NavItem[];
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    metrics: Metric[];
    proof: string[];
  };
  highlights: Highlight[];
  features: Feature[];
  process: Step[];
  cms: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    note: string;
  };
  proofStrip: string[];
  faq: FaqItem[];
  finalCta: {
    title: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  footer: FooterContent;
};

export type LandingPagePayload = {
  content: LandingPageData;
  source: "sanity" | "fallback";
};

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type PartialDeep<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? Array<PartialDeep<U>>
    : {
        [K in keyof T]?: PartialDeep<T[K]>;
      };

const fallbackContent: Record<Locale, LandingPageData> = {
  sk: {
    locale: "sk",
    seo: {
      title: "Landing page template pre Digital A",
      description:
        "Moderný Next.js landing page template pre digitálne kampane, lead gen, launch weby a služby. Dvojjazyčný, SEO-ready a napojený na Sanity.",
      keywords: [
        "landing page template",
        "next.js template",
        "sanity cms",
        "lead generation web",
        "digital a",
      ],
    },
    navigation: [
      { label: "Prehľad", href: "#overview" },
      { label: "Bloky", href: "#features" },
      { label: "Proces", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#contact" },
    ],
    hero: {
      eyebrow: "Landing page template pre predaj a kampane",
      titlePrefix: "Predajný web pre",
      titleAccent: "výkonné kampane",
      titleSuffix: "a moderné launch stránky.",
      description:
        "Premium template v Next.js pre digitálne agentúry, služby a lead gen ponuky. Pripravený na SEO, dvojjazyčný routing, animované sekcie a Sanity editáciu pre klienta.",
      primaryCta: {
        label: "Chcem custom verziu",
        href: "#contact",
      },
      secondaryCta: {
        label: "Pozrieť bloky",
        href: "#features",
      },
      metrics: [
        {
          value: "48h",
          label: "na prvý ostrý launch, keď máš pripravený obsah a brand assets",
        },
        {
          value: "2",
          label: "jazyky pripravené hneď od začiatku bez duplikovania projektu",
        },
        {
          value: "100%",
          label: "obsahu vie meniť editor cez Sanity bez zásahu do layoutu",
        },
      ],
      proof: [
        "SK + EN routing",
        "SEO metadata a sitemap",
        "Motion microinteractions",
        "Sanity-ready content model",
      ],
    },
    highlights: [
      {
        title: "Lead generation funnels",
        description:
          "Pre služby, konzultácie, kliniky alebo B2B ponuky, kde treba jasne odkomunikovať value a dostať návštevníka ku CTA.",
      },
      {
        title: "Service offer pages",
        description:
          "Pre agentúry, štúdiá a expert brandy, ktoré predávajú audit, správu kampaní, redesign alebo strategické balíky.",
      },
      {
        title: "Launch microsites",
        description:
          "Pre nové produkty, waitlisty, event landingy a limitované kampane, kde rýchlosť a vizuálny dojem rozhodujú.",
      },
    ],
    features: [
      {
        eyebrow: "Positioning",
        title: "Hero, ktorý rovno komunikuje ponuku",
        description:
          "Headline, subheadline a CTA flow sú postavené tak, aby sa návštevník nestratil a hneď pochopil, čo dostane.",
      },
      {
        eyebrow: "Proof",
        title: "Sekcie na dôveru a rozhodovanie",
        description:
          "FAQ, proof strip, opakované CTA a modularita pre ďalšie bloky držia konverznú logiku aj pri dlhšom predajnom texte.",
      },
      {
        eyebrow: "Performance",
        title: "Rýchly stack pre výkon aj SEO",
        description:
          "Next.js App Router, server rendering, metadata API, sitemap a robots sú pripravené od začiatku namiesto dodatočného lepenia.",
      },
      {
        eyebrow: "Content",
        title: "Klientsky editovateľný obsah cez Sanity",
        description:
          "Hero copy, bloky, FAQ, CTA a kontakty môže meniť marketing alebo account bez otvárania kódu.",
      },
      {
        eyebrow: "Localization",
        title: "Jedna štruktúra pre dva jazyky",
        description:
          "Samostatné `/sk` a `/en` routy zjednodušujú indexáciu, interné prelinkovanie aj budúce rozširovanie obsahu.",
      },
      {
        eyebrow: "Design system",
        title: "Moderný vzhľad bez generického startup UI",
        description:
          "Typografia, mäkké sklenené surfaces a kontrolované animácie robia z template drahšie pôsobiaci základ.",
      },
    ],
    process: [
      {
        title: "Vyber ponuku a primárny conversion goal",
        description:
          "Najprv sa rozhodne, či stránka predáva audit, call, lead magnet alebo produktový launch. Tomu sa potom prispôsobí headline a CTA hierarchia.",
      },
      {
        title: "Naplň copy a bloky cez Sanity alebo fallback dáta",
        description:
          "Môžeš štartovať aj bez CMS. Keď vytvoríš content model v Sanity, tie isté sekcie sa budú plniť z editor rozhrania.",
      },
      {
        title: "Launchni a iteruj podľa výkonu",
        description:
          "Template je pripravený na ďalšie sekcie, prípadne tracking, formuláre, case studies a lokálne SEO rozšírenia.",
      },
    ],
    cms: {
      eyebrow: "Sanity content layer",
      title: "Obsah sa dá spravovať bez toho, aby si rozbil dizajn.",
      description:
        "Frontend počíta s dokumentom typu `landingPage` pre každý jazyk. Keď ho v Sanity vytvoríš, hero, bloky, FAQ a CTA sa začnú načítavať z CMS.",
      items: [
        "SEO title a meta description",
        "Navigácia a CTA labely",
        "Hero texty a metriky",
        "Feature cards",
        "Process steps",
        "FAQ otázky a odpovede",
      ],
      note:
        "Project ID je už predpripravené na `ypdwbs5t`. Stačí doplniť dataset a podľa README si nahodiť document schema.",
    },
    proofStrip: [
      "Next.js App Router",
      "Tailwind CSS v4",
      "Motion for React",
      "Sanity CMS",
      "Bilingual SEO routing",
      "Metadata API",
      "Sitemap + robots",
      "Reusable sections",
    ],
    faq: [
      {
        question: "Musím mať Sanity hneď od prvého dňa?",
        answer:
          "Nie. Template funguje aj s lokálnym fallback obsahom. Sanity vrstvu zapneš až keď vytvoríš dataset a dokument typu `landingPage`.",
      },
      {
        question: "Viem použiť len jeden jazyk?",
        answer:
          "Áno. Stačí pracovať len s `/sk` alebo `/en` route. Dvojjazyčná štruktúra je pripravená, ale nie je povinná.",
      },
      {
        question: "Je to pripravené aj pre SEO a marketing kampane?",
        answer:
          "Áno. Projekt má metadata, sitemap, robots, čisté URL pre jazyky a server-rendered obsah. To je dobrý základ pre organiku aj paid traffic landingy.",
      },
      {
        question: "Kde zmením farby, fonty a brand feeling?",
        answer:
          "Základné tokens sú v `app/globals.css`, layoutové a copy sekcie v `app/[locale]/page.tsx` a obsahové fallback dáta v `lib/landing-page.ts`.",
      },
    ],
    finalCta: {
      title: "Spusti ďalší predajný landing bez skladania projektu od nuly.",
      description:
        "Template je pripravený na custom doplnenia ako formuláre, event tracking, ďalšie sekcie, referencie alebo prepojenie s ďalšími kanálmi v rámci Digital A.",
      primaryCta: {
        label: "Začať s týmto základom",
        href: "mailto:hello@digital-a.sk",
      },
      secondaryCta: {
        label: "Pozrieť Sanity setup",
        href: "https://www.sanity.io/manage",
      },
    },
    footer: {
      tagline:
        "Template system pre launch weby, lead gen a premium service landing pages.",
      email: "hello@digital-a.sk",
      location: "Bratislava / remote",
    },
  },
  en: {
    locale: "en",
    seo: {
      title: "Landing page template for Digital A",
      description:
        "A modern Next.js landing page template for campaign launches, lead generation and premium service offers. Bilingual, SEO-ready and Sanity-connected.",
      keywords: [
        "landing page template",
        "next.js marketing template",
        "sanity cms website",
        "campaign landing page",
        "digital a",
      ],
    },
    navigation: [
      { label: "Overview", href: "#overview" },
      { label: "Blocks", href: "#features" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Landing page template for growth and launches",
      titlePrefix: "A selling website for",
      titleAccent: "high-intent campaigns",
      titleSuffix: "and premium offer pages.",
      description:
        "A premium Next.js starter for agencies, service brands and lead generation offers. Ready for SEO, bilingual routing, animated sections and Sanity editing.",
      primaryCta: {
        label: "I want a custom version",
        href: "#contact",
      },
      secondaryCta: {
        label: "See the blocks",
        href: "#features",
      },
      metrics: [
        {
          value: "48h",
          label: "to a strong first launch when your copy and brand assets are ready",
        },
        {
          value: "2",
          label: "locales available from day one without duplicating the codebase",
        },
        {
          value: "100%",
          label: "of the core marketing copy can move into Sanity for editors",
        },
      ],
      proof: [
        "SK + EN routing",
        "SEO metadata and sitemap",
        "Motion microinteractions",
        "Sanity-ready content model",
      ],
    },
    highlights: [
      {
        title: "Lead generation funnels",
        description:
          "Built for service brands, consultants, clinics or B2B offers that need clear positioning and focused calls to action.",
      },
      {
        title: "Service offer pages",
        description:
          "Useful for agencies, studios and expert brands selling audits, retainers, redesigns or strategic service packages.",
      },
      {
        title: "Launch microsites",
        description:
          "A strong fit for new products, waitlists, events and time-sensitive campaigns where speed and design quality matter.",
      },
    ],
    features: [
      {
        eyebrow: "Positioning",
        title: "A hero section that explains the offer fast",
        description:
          "The headline, subheadline and CTA flow are structured to reduce friction and tell the visitor exactly what they are about to get.",
      },
      {
        eyebrow: "Proof",
        title: "Trust-building sections around the main CTA",
        description:
          "FAQ, proof strips, repeated calls to action and modular content blocks keep the conversion logic intact on longer pages.",
      },
      {
        eyebrow: "Performance",
        title: "A fast stack for search and campaign traffic",
        description:
          "Next.js App Router, server rendering, metadata, sitemap and robots are included from the start instead of being patched in later.",
      },
      {
        eyebrow: "Content",
        title: "Client-friendly editing through Sanity",
        description:
          "Hero copy, feature cards, FAQ, CTA labels and contact details can move to the CMS so the team can iterate safely.",
      },
      {
        eyebrow: "Localization",
        title: "One structure, two language routes",
        description:
          "Separate `/sk` and `/en` pages make indexing, internal linking and content expansion simpler over time.",
      },
      {
        eyebrow: "Design system",
        title: "A modern visual language without generic startup UI",
        description:
          "Intentional typography, soft glass surfaces and controlled motion help the template feel more premium from the first view.",
      },
    ],
    process: [
      {
        title: "Choose the offer and the conversion goal",
        description:
          "Start by deciding whether the page sells a strategy call, audit, lead magnet or launch. The headline and CTA hierarchy should support that single goal.",
      },
      {
        title: "Fill the content through Sanity or fallback data",
        description:
          "You can launch without the CMS first. When your content model is ready in Sanity, the same sections can be managed from the editor interface.",
      },
      {
        title: "Launch and iterate based on performance",
        description:
          "The template is ready for future tracking, forms, extra sections, case studies and local SEO expansion when the campaign grows.",
      },
    ],
    cms: {
      eyebrow: "Sanity content layer",
      title: "Editors can update the page without breaking the design.",
      description:
        "The frontend expects a `landingPage` document per locale. Once that exists in Sanity, hero copy, blocks, FAQ and CTA copy are read from the CMS.",
      items: [
        "SEO title and meta description",
        "Navigation and CTA labels",
        "Hero copy and metrics",
        "Feature cards",
        "Process steps",
        "FAQ entries",
      ],
      note:
        "The project already points to the Sanity project ID `ypdwbs5t`. Add the dataset in your env file and create the schema described in the README.",
    },
    proofStrip: [
      "Next.js App Router",
      "Tailwind CSS v4",
      "Motion for React",
      "Sanity CMS",
      "Bilingual SEO routing",
      "Metadata API",
      "Sitemap + robots",
      "Reusable sections",
    ],
    faq: [
      {
        question: "Do I need Sanity from day one?",
        answer:
          "No. The template works with local fallback content first. You can switch to Sanity as soon as the dataset and `landingPage` schema are ready.",
      },
      {
        question: "Can I use only one language?",
        answer:
          "Yes. You can work only with `/sk` or `/en`. The bilingual structure is ready but not mandatory.",
      },
      {
        question: "Is this ready for SEO and marketing traffic?",
        answer:
          "Yes. The project includes metadata, sitemap, robots, clean locale URLs and server-rendered content, which is a strong baseline for both organic and paid traffic.",
      },
      {
        question: "Where do I change the colors, fonts and brand style?",
        answer:
          "The global design tokens live in `app/globals.css`, the layout and sections live in `app/[locale]/page.tsx`, and the fallback content is stored in `lib/landing-page.ts`.",
      },
    ],
    finalCta: {
      title: "Launch the next sales page without rebuilding the project from scratch.",
      description:
        "This starter is already structured for future additions like forms, event tracking, more sections, references or broader Digital A integrations.",
      primaryCta: {
        label: "Start with this base",
        href: "mailto:hello@digital-a.sk",
      },
      secondaryCta: {
        label: "Open Sanity setup",
        href: "https://www.sanity.io/manage",
      },
    },
    footer: {
      tagline:
        "A template system for launch sites, lead generation and premium service landing pages.",
      email: "hello@digital-a.sk",
      location: "Bratislava / remote",
    },
  },
};

const hasItems = <T,>(value?: Array<T>) => Array.isArray(value) && value.length > 0;

function mergeLandingPage(
  fallback: LandingPageData,
  incoming: PartialDeep<LandingPageData>,
): LandingPageData {
  return {
    ...fallback,
    ...incoming,
    locale: fallback.locale,
    seo: {
      ...fallback.seo,
      ...incoming.seo,
      keywords: hasItems(incoming.seo?.keywords)
        ? (incoming.seo?.keywords as string[])
        : fallback.seo.keywords,
    },
    navigation: hasItems(incoming.navigation)
      ? (incoming.navigation as NavItem[])
      : fallback.navigation,
    hero: {
      ...fallback.hero,
      ...incoming.hero,
      primaryCta: {
        ...fallback.hero.primaryCta,
        ...incoming.hero?.primaryCta,
      },
      secondaryCta: {
        ...fallback.hero.secondaryCta,
        ...incoming.hero?.secondaryCta,
      },
      metrics: hasItems(incoming.hero?.metrics)
        ? (incoming.hero?.metrics as Metric[])
        : fallback.hero.metrics,
      proof: hasItems(incoming.hero?.proof)
        ? (incoming.hero?.proof as string[])
        : fallback.hero.proof,
    },
    highlights: hasItems(incoming.highlights)
      ? (incoming.highlights as Highlight[])
      : fallback.highlights,
    features: hasItems(incoming.features)
      ? (incoming.features as Feature[])
      : fallback.features,
    process: hasItems(incoming.process)
      ? (incoming.process as Step[])
      : fallback.process,
    cms: {
      ...fallback.cms,
      ...incoming.cms,
      items: hasItems(incoming.cms?.items)
        ? (incoming.cms?.items as string[])
        : fallback.cms.items,
    },
    proofStrip: hasItems(incoming.proofStrip)
      ? (incoming.proofStrip as string[])
      : fallback.proofStrip,
    faq: hasItems(incoming.faq)
      ? (incoming.faq as FaqItem[])
      : fallback.faq,
    finalCta: {
      ...fallback.finalCta,
      ...incoming.finalCta,
      primaryCta: {
        ...fallback.finalCta.primaryCta,
        ...incoming.finalCta?.primaryCta,
      },
      secondaryCta: {
        ...fallback.finalCta.secondaryCta,
        ...incoming.finalCta?.secondaryCta,
      },
    },
    footer: {
      ...fallback.footer,
      ...incoming.footer,
    },
  };
}

export const getLandingPage = cache(
  async (locale: Locale): Promise<LandingPagePayload> => {
    const fallback = fallbackContent[locale] ?? fallbackContent[defaultLocale];

    const content = await fetchSanityData<PartialDeep<LandingPageData> | null>({
      query: landingPageQuery,
      params: { locale },
      fallback: null,
    });

    if (!content) {
      return {
        content: fallback,
        source: "fallback",
      };
    }

    return {
      content: mergeLandingPage(fallback, content),
      source: "sanity",
    };
  },
);

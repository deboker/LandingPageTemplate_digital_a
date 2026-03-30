import { cache } from "react";
import type { Locale } from "@/lib/locales";
import { defaultLocale } from "@/lib/locales";
import { landingPageDocumentIds } from "@/sanity/project";
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
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
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

function isPlaceholderString(value: string) {
  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();
  const legacyFallbackMarkers = [
    "landing page template",
    "sanity ready",
    "premium template v next.js",
    "premium template in next.js",
    "predajný web pre",
    "sales landing page for",
    "výkonné kampane",
    "vykonne kampane",
    "moderné launch stránky",
    "modern launch pages",
  ];

  if (trimmed.length === 0) {
    return true;
  }

  if (/^d{2,}$/i.test(trimmed) || /^x{2,}$/i.test(trimmed)) {
    return true;
  }

  if (/^(test|todo|placeholder|null)$/i.test(lower)) {
    return true;
  }

  if (legacyFallbackMarkers.some((marker) => lower.includes(marker))) {
    return true;
  }

  return false;
}

function sanitizeWithFallback<T>(incoming: T | undefined, fallback: T): T {
  if (incoming === undefined || incoming === null) {
    return fallback;
  }

  if (typeof fallback === "string") {
    const value = typeof incoming === "string" ? incoming : String(incoming);
    return (isPlaceholderString(value) ? fallback : value) as T;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return fallback;
    }

    const template = fallback[0];
    const sanitized = incoming.map((item, index) =>
      sanitizeWithFallback(item, (fallback[index] ?? template) as typeof item),
    );

    return (sanitized.length > 0 ? sanitized : fallback) as T;
  }

  if (typeof fallback === "object" && fallback !== null) {
    const source =
      typeof incoming === "object" && incoming !== null
        ? (incoming as Record<string, unknown>)
        : {};
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(fallback as Record<string, unknown>)) {
      result[key] = sanitizeWithFallback(
        source[key] as never,
        (fallback as Record<string, unknown>)[key] as never,
      );
    }

    return result as T;
  }

  return incoming;
}

const fallbackContent: Record<Locale, LandingPageData> = {
  sk: {
    locale: "sk",
    seo: {
      title: "Psí SPA Box | Samoobslužná umyvárka pre psov 24/7",
      description:
        "Prídeš so psom, otvoríš dvere kódom z mobilu, umyješ ho, vysušíš a ideš ďalej. Jednoduchá samoobslužná psia umyvárka s rezerváciou 24/7.",
      keywords: [
        "psia umyvarka",
        "samoobsluzna umyvaren pre psov",
        "umyvanie psov",
        "psi spa",
        "dog wash bratislava",
      ],
    },
    navigation: [
      { label: "Prečo k nám", href: "#overview" },
      { label: "V boxe", href: "#features" },
      { label: "Cenník", href: "#pricing" },
      { label: "Ako to funguje", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#contact" },
    ],
    hero: {
      eyebrow: "Samoobslužná psia umyvárka s prístupom cez kód",
      titlePrefix: "Prídeš, zadáš kód a",
      titleAccent: "umyješ psíka",
      titleSuffix: "bez neporiadku doma.",
      description:
        "Po prechádzke, po blate alebo pred návštevou. Rezervuješ si slot online, kód dostaneš do mobilu a v čistom boxe psíka rýchlo umyješ aj vysušíš bez chaosu v kúpeľni.",
      primaryCta: {
        label: "Rezervovať slot",
        href: "#pricing",
      },
      secondaryCta: {
        label: "Ako to funguje",
        href: "#process",
      },
      metrics: [
        {
          value: "24/7",
          label: "rezervácia a vstup, keď ti to vyhovuje, bez čakania na personál",
        },
        {
          value: "30 min",
          label: "komfortný slot na umytie a vysušenie jedného psa bez naháňania",
        },
        {
          value: "od 12 €",
          label: "jednoduchý vstup bez členstva, len rezervácia a kód do mobilu",
        },
      ],
      proof: [
        "Vstup cez kód z mobilu",
        "Teplá voda a sušenie",
        "Bez upratovania doma",
        "Súkromný box len pre teba a psa",
      ],
    },
    highlights: [
      {
        title: "Doma ostáva vaňa plná chlpov, blata a vody",
        description:
          "Po každom kúpaní musíš riešiť uteráky, podlahu, odtok a chlpy všade okolo. Namiesto rýchleho umytia z toho vznikne ďalšia robota.",
      },
      {
        title: "Veľkého psa je doma ťažké pohodlne umyť",
        description:
          "Zdvihnúť psa do vane, udržať ho v malej kúpeľni a potom ho doma ešte vysušiť je nepohodlné pre teba aj preňho.",
      },
      {
        title: "Po prechádzke potrebuješ rýchle riešenie, nie logistiku",
        description:
          "Prídeš zo špinavej prechádzky, z lesa alebo z dažďa a chceš mať psa čistého za chvíľu, nie zablatiť celý byt cestou domov.",
      },
    ],
    features: [
      {
        eyebrow: "Súkromie",
        title: "Box máš počas rezervácie len pre seba a psa",
        description:
          "Žiadne rady, žiadne nervózne čakanie. V pokoji si nastavíš tempo, dáš psovi pauzu a nemusíš sa cítiť, že niekomu zavadziaš.",
      },
      {
        eyebrow: "Prístup",
        title: "Vstupuješ cez jednorazový kód z mobilu",
        description:
          "Rezervácia prebehne online a kód ti príde do mobilu. Na mieste nič neriešiš, len prídeš, otvoríš dvere a ideš na to.",
      },
      {
        eyebrow: "Vybavenie",
        title: "Teplá voda, ručná sprcha a pohodlný umývací priestor",
        description:
          "Psíka umyješ v priestore navrhnutom na kúpanie, nie v improvizovanej domácej kúpeľni. Menej stresu, menej chaosu.",
      },
      {
        eyebrow: "Sušenie",
        title: "Po umytí ho rovno vysušíš a odchádzaš čistý",
        description:
          "Nemusíš odchádzať s mokrým psom do auta ani domov. Umytie a sušenie vybavíš na jednom mieste a v jednom slote.",
      },
      {
        eyebrow: "Čistota",
        title: "Doma ti neostane blato, pena ani upchatý odtok",
        description:
          "Celý neporiadok zostane tam, kde má. Ty si domov odnesieš len čistého a spokojného psa.",
      },
      {
        eyebrow: "Komfort",
        title: "Vhodné po bežnej prechádzke aj po poriadnom blatovom výlete",
        description:
          "Či ide len o rýchle opláchnutie labiek alebo kompletné kúpanie, box máš pripravený na každodennú aj náročnejšiu údržbu.",
      },
    ],
    process: [
      {
        title: "Rezervuješ si voľný slot online",
        description:
          "Vyberieš si čas, ktorý ti sedí. Žiadne telefonovanie ani čakanie na potvrdenie od personálu.",
      },
      {
        title: "Do mobilu ti príde jednorazový vstupný kód",
        description:
          "Pred návštevou dostaneš kód, ktorým otvoríš dvere. Na mieste nič nevybavuješ, len prídeš a ideš dnu.",
      },
      {
        title: "Prídeš so psom, umyješ ho a podľa potreby vysušíš",
        description:
          "Všetko dôležité máš pripravené v boxe. Ty si len zvolíš tempo a postaráš sa o psa bez stresu.",
      },
      {
        title: "Odchádzaš bez neporiadku doma a bez zbytočných komplikácií",
        description:
          "Namiesto upratovania kúpeľne sadneš do auta s čistým psom a pokračuješ v dni ďalej.",
      },
    ],
    cms: {
      eyebrow: "Cenník",
      title: "30 minút v boxe za 12 €. Všetko dôležité už máš pripravené.",
      description:
        "Žiadne členstvo, žiadne komplikované balíčky. Rezervuješ si len slot, prídeš so psom a postaráš sa oň v čistom pripravenom priestore.",
      items: [
        "30 minút umývania a sušenia",
        "Teplá voda a ručná sprcha",
        "Šampón a základná kozmetika",
        "Výkonný sušič",
        "Prístup cez jednorazový kód",
        "Čistý box pripravený na tvoj príchod",
      ],
      note:
        "Ak máš veľké alebo veľmi chlpaté plemeno, rezervuj si dva sloty za sebou pre úplný komfort.",
    },
    proofStrip: [
      "Samoobsluha 24/7",
      "Prístupový kód do mobilu",
      "Teplá voda",
      "Výkonný sušič",
      "Šampón v cene",
      "Bez blata doma",
      "Aj pre väčšie plemená",
      "Rýchle a jednoduché použitie",
    ],
    faq: [
      {
        question: "Ako sa dostanem dnu?",
        answer:
          "Po rezervácii ti príde do mobilu jednorazový kód. Ten zadáš pri dverách a box sa ti otvorí na tvoj rezervovaný čas.",
      },
      {
        question: "Musím si priniesť vlastný šampón alebo fén?",
        answer:
          "Základné vybavenie aj sušenie máš pripravené na mieste. Ak má tvoj pes špeciálnu kozmetiku, môžeš si priniesť aj vlastnú.",
      },
      {
        question: "Zvládnem tam umyť aj väčšieho psa?",
        answer:
          "Áno, box je navrhnutý tak, aby bol pohodlný aj pri väčších psoch. Pri veľmi chlpatých alebo veľkých plemenách odporúčame rezervovať si dlhší čas.",
      },
      {
        question: "Čo ak potrebujem rezerváciu zmeniť alebo zrušiť?",
        answer:
          "Podmienky zmeny alebo zrušenia rezervácie si nastavíš podľa svojho rezervačného systému. Na webe ich potom môžeš jednoducho doplniť aj do FAQ alebo cenníka.",
      },
    ],
    finalCta: {
      title: "Po prechádzke, po daždi alebo pred návštevou. Box čaká pripravený.",
      description:
        "Rezervuj si čas, otvor dvere kódom z mobilu a vybav kúpanie rýchlo, čisto a bez stresu pre seba aj psa.",
      primaryCta: {
        label: "Rezervovať termín",
        href: "#pricing",
      },
      secondaryCta: {
        label: "Zavolať",
        href: "tel:+421903555321",
      },
    },
    footer: {
      brandName: "Psí SPA Box",
      tagline:
        "Samoobslužná umyvárka pre psov s prístupom cez mobilný kód. Rýchlo, čisto a bez chaosu doma.",
      email: "info@psispabox.sk",
      phone: "+421 903 555 321",
      location: "Bratislava",
    },
  },
  en: {
    locale: "en",
    seo: {
      title: "Dog SPA Box | Self-service dog wash 24/7",
      description:
        "Arrive with your dog, open the door with the code on your phone, wash, dry and leave without turning your bathroom into a mess. Simple self-service dog wash access 24/7.",
      keywords: [
        "self service dog wash",
        "dog wash box",
        "wash your dog",
        "dog spa",
        "dog wash bratislava",
      ],
    },
    navigation: [
      { label: "Why us", href: "#overview" },
      { label: "Inside the box", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How it works", href: "#process" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Self-service dog wash with mobile code access",
      titlePrefix: "Arrive, enter the code and",
      titleAccent: "wash your dog",
      titleSuffix: "without the mess at home.",
      description:
        "After a muddy walk or before a visit. Book a time online, get a code on your phone and wash plus dry your dog in a clean private box without turning your bathroom into chaos.",
      primaryCta: {
        label: "Book a slot",
        href: "#pricing",
      },
      secondaryCta: {
        label: "How it works",
        href: "#process",
      },
      metrics: [
        {
          value: "24/7",
          label: "booking and access whenever it works for you, without waiting for staff",
        },
        {
          value: "30 min",
          label: "a comfortable slot to wash and dry one dog without rushing",
        },
        {
          value: "from €12",
          label: "simple access without membership, just a booking and a code on your phone",
        },
      ],
      proof: [
        "Mobile door code",
        "Warm water and drying",
        "No cleanup at home",
        "Private box for you and your dog",
      ],
    },
    highlights: [
      {
        title: "Your bathroom ends up full of fur, water and mud",
        description:
          "What should be a quick wash becomes another cleaning session with towels everywhere, a wet floor and a messy drain.",
      },
      {
        title: "Washing a big dog at home is awkward and uncomfortable",
        description:
          "Lifting a dog into a tub, keeping them steady in a small bathroom and drying them afterwards is uncomfortable for both of you.",
      },
      {
        title: "After a walk you need a fast solution, not more logistics",
        description:
          "Whether it is rain, mud or snow, you want your dog clean quickly instead of bringing the mess all the way home.",
      },
    ],
    features: [
      {
        eyebrow: "Privacy",
        title: "The box is yours for the entire reservation",
        description:
          "No queues, no pressure, no one watching. You set the pace and give your dog space to calm down if needed.",
      },
      {
        eyebrow: "Access",
        title: "Enter with a one-time code sent to your phone",
        description:
          "The booking happens online and the code arrives before your visit. At the location you simply unlock the door and start.",
      },
      {
        eyebrow: "Equipment",
        title: "Warm water, hand shower and a comfortable wash area",
        description:
          "You wash your dog in a space designed for it, not in an improvised home bathroom. Less stress, less mess.",
      },
      {
        eyebrow: "Drying",
        title: "Wash and dry in one visit",
        description:
          "You do not have to leave with a wet dog or finish the job at home. Everything happens in one clean stop.",
      },
      {
        eyebrow: "Cleanliness",
        title: "No fur, mud or water left behind in your own bathroom",
        description:
          "The mess stays where it belongs. You leave with a clean dog instead of another cleanup job waiting at home.",
      },
      {
        eyebrow: "Comfort",
        title: "Great after regular walks and the really muddy ones too",
        description:
          "From a quick rinse of dirty paws to a full wash, the box is set up for everyday care and for the messier days.",
      },
    ],
    process: [
      {
        title: "Book an available slot online",
        description:
          "Pick the time that works for you. No calls, no waiting for manual confirmation.",
      },
      {
        title: "Receive a one-time door code on your phone",
        description:
          "Before the visit you get the access code. At the location you simply enter it and walk in.",
      },
      {
        title: "Arrive with your dog, wash and dry as needed",
        description:
          "Everything essential is prepared inside the box. You just focus on your dog and move at your own pace.",
      },
      {
        title: "Leave without taking the mess back home",
        description:
          "Instead of cleaning your bathroom afterwards, you leave with a clean dog and get on with your day.",
      },
    ],
    cms: {
      eyebrow: "Pricing",
      title: "30 minutes in the box for €12. Everything essential is ready for you.",
      description:
        "No membership and no complicated packages. You simply reserve a slot, arrive with your dog and use the prepared self-service wash box.",
      items: [
        "30 minutes of washing and drying",
        "Warm water and hand shower",
        "Shampoo and basic care products",
        "Powerful dryer",
        "Single-use access code",
        "A clean box ready when you arrive",
      ],
      note:
        "If you have a large or very fluffy breed, reserve two slots in a row for extra comfort.",
    },
    proofStrip: [
      "Self-service 24/7",
      "Access code on your phone",
      "Warm water",
      "Powerful dryer",
      "Shampoo included",
      "No mess at home",
      "Works for larger breeds",
      "Fast and simple to use",
    ],
    faq: [
      {
        question: "How do I get inside?",
        answer:
          "After booking you receive a one-time code on your phone. Enter it at the door and the box opens for your reserved time.",
      },
      {
        question: "Do I need to bring my own shampoo or dryer?",
        answer:
          "Basic equipment and drying are ready on site. If your dog needs special cosmetics, you can still bring your own products.",
      },
      {
        question: "Can I wash a larger dog there?",
        answer:
          "Yes. The box is designed to stay comfortable even with larger dogs. For very fluffy or large breeds we recommend booking a longer time.",
      },
      {
        question: "What if I need to cancel or move my booking?",
        answer:
          "You can define the cancellation rules in your reservation system and then show them clearly on the site in the FAQ or pricing note.",
      },
    ],
    finalCta: {
      title: "After a walk, after the rain or before guests arrive, the box is ready.",
      description:
        "Reserve a time, unlock the door with your phone code and handle the wash quickly, cleanly and without stress for you or your dog.",
      primaryCta: {
        label: "Book now",
        href: "#pricing",
      },
      secondaryCta: {
        label: "Call us",
        href: "tel:+421903555321",
      },
    },
    footer: {
      brandName: "Dog SPA Box",
      tagline:
        "A self-service dog wash with access by mobile code. Fast, clean and much easier than doing it at home.",
      email: "info@dogspabox.com",
      phone: "+421 903 555 321",
      location: "Bratislava",
    },
  },
};

const hasItems = <T,>(value?: Array<T>) => Array.isArray(value) && value.length > 0;

function mergeLandingPage(
  fallback: LandingPageData,
  incoming: PartialDeep<LandingPageData>,
): LandingPageData {
  const merged: LandingPageData = {
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

  return sanitizeWithFallback(merged, fallback);
}

export const getLandingPage = cache(
  async (locale: Locale): Promise<LandingPagePayload> => {
    const fallback = fallbackContent[locale] ?? fallbackContent[defaultLocale];

    const content = await fetchSanityData<PartialDeep<LandingPageData> | null>({
      query: landingPageQuery,
      params: { documentId: landingPageDocumentIds[locale] },
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

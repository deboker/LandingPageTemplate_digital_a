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

export type SectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
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

export type GalleryItem = {
  title: string;
  subtitle: string;
  alt: string;
  imageUrl: string;
};

export type LocationItem = {
  title: string;
  badge: string;
  description: string;
  address: string;
  mapEmbedUrl: string;
};

export type FooterContent = {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
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
    badge: string;
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    panelEyebrow: string;
    panelStatus: string;
    panelKicker: string;
    panelTitle: string;
    panelDescription: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    metrics: Metric[];
    proof: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    sideHighlightsTitle: string;
    sideIncludedTitle: string;
    items: GalleryItem[];
  };
  overviewSection: SectionIntro;
  highlights: Highlight[];
  featuresSection: SectionIntro;
  features: Feature[];
  processSection: SectionIntro;
  process: Step[];
  cms: {
    eyebrow: string;
    title: string;
    description: string;
    itemLabel: string;
    items: string[];
    note: string;
  };
  locations: {
    eyebrow: string;
    title: string;
    description: string;
    items: LocationItem[];
  };
  proofStrip: string[];
  faqSection: SectionIntro;
  faq: FaqItem[];
  finalCta: {
    eyebrow: string;
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
      title: "Pet Spa Box | Samoobslužná umyvárka pre psíkov a mačky 24/7",
      description:
        "Prídeš s miláčikom, otvoríš dvere kódom z mobilu, umyješ ho, vysušíš a ideš ďalej. Jednoduchá samoobslužná umyvárka pre psíkov a mačky s rezerváciou 24/7.",
      keywords: [
        "psia umyvarka",
        "samoobsluzna umyvaren pre psikov a macky",
        "umyvanie zvierat",
        "pet spa",
        "dog wash bratislava",
        "cat wash bratislava",
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
      badge: "Vstup cez kód",
      eyebrow: "Samoobslužná umyvárka pre psíkov a mačky s prístupom cez kód",
      titlePrefix: "Prídeš, zadáš kód a",
      titleAccent: "umyješ miláčika",
      titleSuffix: "bez neporiadku doma.",
      description:
        "Po prechádzke, po blate alebo pred návštevou. Rezervuješ si slot online, kód dostaneš do mobilu a v čistom boxe pohodlne umyješ psíka aj mačku bez chaosu v kúpeľni.",
      panelEyebrow: "Ako to funguje",
      panelStatus: "Vstup cez kód",
      panelKicker: "Pripravené pre teba",
      panelTitle: "Prídeš s miláčikom, zadáš kód a box je tvoj.",
      panelDescription:
        "Žiadne preberanie kľúčov ani čakanie na personál. Online rezervácia, kód do mobilu a rýchla samoobslužná návšteva, keď ti to sedí.",
      primaryCta: {
        label: "Rezervovať slot",
        href: "#booking",
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
          label:
            "komfortný slot na umytie a vysušenie jedného miláčika bez naháňania",
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
        "Pre psíkov aj mačky",
      ],
    },
    gallery: {
      eyebrow: "Ako to u nás vyzerá",
      title: "Miesto, kde umyješ psíka aj mačku rýchlo, pohodlne a bez chaosu doma.",
      description:
        "Prídeš, otvoríš box, umyješ miláčika, vysušíš ho a ideš ďalej. Žiadna mokrá kúpeľňa, chlpy vo vani ani ďalšie upratovanie doma.",
      sideHighlightsTitle: "Najčastejšie situácie",
      sideIncludedTitle: "V boxe máš",
      items: [
        {
          title: "Pohodlné umytie",
          subtitle: "Teplá voda, priestor a pokoj na kúpanie bez stresu.",
          alt: "Veľký pes pri kúpaní v čistom umývacom priestore.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/02/03/23/24/dog-1178365_1280.jpg",
        },
        {
          title: "Čistý a spokojný výsledok",
          subtitle:
            "Po návšteve odchádzaš s čistým miláčikom, nie s ďalšou robotou doma.",
          alt: "Čistý a upravený malý pes po starostlivosti.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565683_1280.jpg",
        },
        {
          title: "Detailná starostlivosť",
          subtitle: "Rýchle opláchnutie aj dôkladnejšia údržba podľa potreby.",
          alt: "Detail starostlivosti o srsť psa pri úprave.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565682_1280.jpg",
        },
      ],
    },
    overviewSection: {
      eyebrow: "Poznáš tento scenár?",
      title:
        "Miláčik je špinavý, ale doma sa ti nechce robiť ďalšiu malú povodeň.",
      description:
        "Po prechádzke v daždi, po lese alebo po blate potrebuješ rýchle riešenie. Umyješ ho u nás a domov ideš bez neporiadku v kúpeľni.",
    },
    highlights: [
      {
        title: "Doma ostáva vaňa plná chlpov, blata a vody",
        description:
          "Po každom kúpaní musíš riešiť uteráky, podlahu, odtok a chlpy všade okolo. Namiesto rýchleho umytia z toho vznikne ďalšia robota.",
      },
      {
        title: "Aj väčšieho psíka alebo nepokojnejšiu mačku je doma ťažké pohodlne umyť",
        description:
          "Dostať zviera do vane, udržať ho v malej kúpeľni a potom ho doma ešte vysušiť je nepohodlné pre teba aj preňho.",
      },
      {
        title: "Po prechádzke potrebuješ rýchle riešenie, nie logistiku",
        description:
          "Prídeš zo špinavej prechádzky, z lesa alebo z dažďa a chceš mať miláčika čistého za chvíľu, nie zablatiť celý byt cestou domov.",
      },
    ],
    featuresSection: {
      eyebrow: "Prečo ľudia prídu práve sem",
      title: "Jednoduché, čisté a bez zbytočného stresu pre teba aj tvojho miláčika.",
      description:
        "Súkromný box, vybavenie pripravené na mieste a žiadne upratovanie doma. Presne preto sa sem ľudia vracajú znovu.",
    },
    features: [
      {
        eyebrow: "Súkromie",
        title: "Box máš počas rezervácie len pre seba a svojho miláčika",
        description:
          "Žiadne rady, žiadne nervózne čakanie. V pokoji si nastavíš tempo, dáš zvieraťu pauzu a nemusíš sa cítiť, že niekomu zavadziaš.",
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
          "Miláčika umyješ v priestore navrhnutom na kúpanie, nie v improvizovanej domácej kúpeľni. Menej stresu, menej chaosu.",
      },
      {
        eyebrow: "Sušenie",
        title: "Po umytí ho rovno vysušíš a odchádzaš čistý",
        description:
          "Nemusíš odchádzať s mokrým miláčikom do auta ani domov. Umytie a sušenie vybavíš na jednom mieste a v jednom slote.",
      },
      {
        eyebrow: "Čistota",
        title: "Doma ti neostane blato, pena ani upchatý odtok",
        description:
          "Celý neporiadok zostane tam, kde má. Ty si domov odnesieš len čistého a spokojného miláčika.",
      },
      {
        eyebrow: "Komfort",
        title: "Vhodné po bežnej prechádzke aj po poriadnom blatovom výlete",
        description:
          "Či ide len o rýchle opláchnutie labiek alebo kompletné kúpanie, box máš pripravený na každodennú aj náročnejšiu údržbu.",
      },
    ],
    processSection: {
      eyebrow: "Ako to funguje",
      title: "Rezervácia, kód, otvoríš dvere a vybavené.",
      description:
        "Vyberieš si čas, príde ti kód do mobilu a na mieste nič neriešiš. Len prídeš, otvoríš box a umyješ miláčika.",
    },
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
        title: "Prídeš s miláčikom, umyješ ho a podľa potreby vysušíš",
        description:
          "Všetko dôležité máš pripravené v boxe. Ty si len zvolíš tempo a postaráš sa o miláčika bez stresu.",
      },
      {
        title: "Odchádzaš bez neporiadku doma a bez zbytočných komplikácií",
        description:
          "Namiesto upratovania kúpeľne sadneš do auta s čistým miláčikom a pokračuješ v dni ďalej.",
      },
    ],
    cms: {
      eyebrow: "Cenník",
      title: "30 minút v boxe za 12 €. Všetko dôležité už máš pripravené.",
      description:
        "Žiadne členstvo, žiadne komplikované balíčky. Rezervuješ si len slot, prídeš s miláčikom a postaráš sa oň v čistom pripravenom priestore.",
      itemLabel: "V cene",
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
    locations: {
      eyebrow: "Kde nás nájdeš",
      title:
        "Máme dve umyvárne v Bratislave. Vyber si Petržalku alebo Ružinov.",
      description:
        "Obe prevádzky fungujú rovnako jednoducho. Rezervuješ si slot online, prídeš s miláčikom a otvoríš dvere kódom z mobilu.",
      items: [
        {
          title: "Pet Spa Box Petržalka",
          badge: "Juh Bratislavy",
          description:
            "Praktická voľba pre Petržalku a okolie, keď chceš rýchlo vybaviť umytie po prechádzke bez chaosu doma.",
          address: "Petržalka, Bratislava",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d166.49042733747763!2d17.102717879201023!3d48.11319024478081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1774957019453!5m2!1sen!2suk",
        },
        {
          title: "Pet Spa Box Ružinov",
          badge: "Východ a širšie centrum",
          description:
            "Ideálne miesto pre Ružinov a okolie, ak chceš mať čistého psíka alebo mačku bez mokrej kúpeľne a ďalšieho upratovania.",
          address: "Ružinov, Bratislava",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d166.33920054243941!2d17.159672526015374!3d48.159847081819656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1774957101845!5m2!1sen!2suk",
        },
      ],
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
    faqSection: {
      eyebrow: "FAQ",
      title: "Otázky, ktoré si ľudia kladú skôr, než prídu prvý raz.",
      description:
        "Všetko podstatné o vstupe, rezervácii aj vybavení nájdeš tu na jednom mieste.",
    },
    faq: [
      {
        question: "Ako sa dostanem dnu?",
        answer:
          "Po rezervácii ti príde do mobilu jednorazový kód. Ten zadáš pri dverách a box sa ti otvorí na tvoj rezervovaný čas.",
      },
      {
        question: "Musím si priniesť vlastný šampón alebo fén?",
        answer:
          "Základné vybavenie aj sušenie máš pripravené na mieste. Ak má tvoj miláčik špeciálnu kozmetiku, môžeš si priniesť aj vlastnú.",
      },
      {
        question: "Zvládnem tam umyť aj väčšieho psíka alebo mačku?",
        answer:
          "Áno. Box je navrhnutý tak, aby bol pohodlný aj pri väčších psíkoch. Pri mačkách odporúčame návštevu len vtedy, ak sú zvyknuté na kúpanie a manipuláciu s vodou.",
      },
      {
        question: "Čo ak potrebujem rezerváciu zmeniť alebo zrušiť?",
        answer:
          "Podmienky zmeny alebo zrušenia rezervácie si nastavíš podľa svojho rezervačného systému. Na webe ich potom môžeš jednoducho doplniť aj do FAQ alebo cenníka.",
      },
    ],
    finalCta: {
      eyebrow: "Rezervácia",
      title: "Po prechádzke, po daždi alebo pred návštevou. Box čaká pripravený.",
      description:
        "Rezervuj si čas, otvor dvere kódom z mobilu a vybav kúpanie rýchlo, čisto a bez stresu pre seba aj miláčika.",
      primaryCta: {
        label: "Rezervovať termín",
        href: "#booking",
      },
      secondaryCta: {
        label: "Zavolať",
        href: "tel:+421903555321",
      },
    },
    footer: {
      brandName: "Pet Spa Box",
      tagline:
        "Samoobslužná umyvárka pre psíkov a mačky s prístupom cez mobilný kód. Rýchlo, čisto a bez chaosu doma.",
      email: "info@petspabox.com",
      phone: "+421 903 555 321",
      website: "www.petspabox.com",
      location: "Bratislava",
    },
  },
  en: {
    locale: "en",
    seo: {
      title: "Pet Spa Box | Self-service wash for dogs and cats 24/7",
      description:
        "Arrive with your pet, open the door with the code on your phone, wash, dry and leave without turning your bathroom into a mess. A simple self-service wash for dogs and cats, available 24/7.",
      keywords: [
        "self service pet wash",
        "dog and cat wash",
        "wash your pet",
        "pet spa",
        "dog wash bratislava",
        "cat wash bratislava",
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
      badge: "Code access",
      eyebrow: "Self-service wash for dogs and cats with mobile code access",
      titlePrefix: "Arrive, enter the code and",
      titleAccent: "wash your pet",
      titleSuffix: "without the mess at home.",
      description:
        "After a muddy walk or before a visit. Book a time online, get a code on your phone and wash plus dry your dog or cat in a clean private box without turning your bathroom into chaos.",
      panelEyebrow: "How it works",
      panelStatus: "Code entry",
      panelKicker: "Ready for your visit",
      panelTitle: "You arrive with your pet, enter the code and the box is yours.",
      panelDescription:
        "No key handover and no waiting for staff. Online booking, code on your phone and a fast self-service visit whenever it suits you.",
      primaryCta: {
        label: "Book a slot",
        href: "#booking",
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
          label: "a comfortable slot to wash and dry one pet without rushing",
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
        "For dogs and cats",
      ],
    },
    gallery: {
      eyebrow: "What it feels like",
      title:
        "A place where you can wash your dog or cat quickly, comfortably and without the mess at home.",
      description:
        "You arrive, unlock the box, wash your pet, dry the coat and leave. No wet bathroom, no hair in the tub and no extra cleanup waiting at home.",
      sideHighlightsTitle: "Typical situations",
      sideIncludedTitle: "Inside the box",
      items: [
        {
          title: "Comfortable wash",
          subtitle: "Warm water, space and a calmer experience for both of you.",
          alt: "Large dog being washed in a clean bathing area.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/02/03/23/24/dog-1178365_1280.jpg",
        },
        {
          title: "Clean result",
          subtitle:
            "You leave with a clean pet instead of another cleanup task at home.",
          alt: "Small clean dog after grooming care.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565683_1280.jpg",
        },
        {
          title: "Practical care",
          subtitle: "From a quick rinse to more complete maintenance when needed.",
          alt: "Close-up of dog coat care during grooming.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2022/11/02/17/39/dog-7565682_1280.jpg",
        },
      ],
    },
    overviewSection: {
      eyebrow: "Know this feeling?",
      title: "Your pet is dirty, but you do not want to flood your bathroom again.",
      description:
        "After rain, mud or a long walk you need a fast solution. Wash your pet here and go home without turning your bathroom into a mess.",
    },
    highlights: [
      {
        title: "Your bathroom ends up full of fur, water and mud",
        description:
          "What should be a quick wash becomes another cleaning session with towels everywhere, a wet floor and a messy drain.",
      },
      {
        title: "Washing a larger dog or a nervous cat at home is awkward and uncomfortable",
        description:
          "Getting an animal into a tub, keeping them steady in a small bathroom and drying them afterwards is uncomfortable for both of you.",
      },
      {
        title: "After a walk you need a fast solution, not more logistics",
        description:
          "Whether it is rain, mud or snow, you want your pet clean quickly instead of bringing the mess all the way home.",
      },
    ],
    featuresSection: {
      eyebrow: "Why people choose this",
      title: "Simple, clean and much less stressful for you and your pet.",
      description:
        "A private box, ready-to-use equipment and no cleanup waiting at home. That is exactly why people come back.",
    },
    features: [
      {
        eyebrow: "Privacy",
        title: "The box is yours for the entire reservation",
        description:
          "No queues, no pressure, no one watching. You set the pace and give your pet space to calm down if needed.",
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
          "You wash your pet in a space designed for it, not in an improvised home bathroom. Less stress, less mess.",
      },
      {
        eyebrow: "Drying",
        title: "Wash and dry in one visit",
        description:
          "You do not have to leave with a wet pet or finish the job at home. Everything happens in one clean stop.",
      },
      {
        eyebrow: "Cleanliness",
        title: "No fur, mud or water left behind in your own bathroom",
        description:
          "The mess stays where it belongs. You leave with a clean pet instead of another cleanup job waiting at home.",
      },
      {
        eyebrow: "Comfort",
        title: "Great after regular walks and the really muddy ones too",
        description:
          "From a quick rinse of dirty paws to a full wash, the box is set up for everyday care and for the messier days.",
      },
    ],
    processSection: {
      eyebrow: "How it works",
      title: "Book, get the code, open the door and you are in.",
      description:
        "Choose a time, receive the code on your phone and arrive without dealing with staff or keys. Just open the door and start.",
    },
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
        title: "Arrive with your pet, wash and dry as needed",
        description:
          "Everything essential is prepared inside the box. You just focus on your pet and move at your own pace.",
      },
      {
        title: "Leave without taking the mess back home",
        description:
          "Instead of cleaning your bathroom afterwards, you leave with a clean pet and get on with your day.",
      },
    ],
    cms: {
      eyebrow: "Pricing",
      title: "30 minutes in the box for €12. Everything essential is ready for you.",
      description:
        "No membership and no complicated packages. You simply reserve a slot, arrive with your pet and use the prepared self-service wash box.",
      itemLabel: "Included",
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
    locations: {
      eyebrow: "Where to find us",
      title:
        "You can choose between two wash locations in Bratislava: Petrzalka and Ruzinov.",
      description:
        "Both work the same simple way. Book a slot online, arrive with your pet and unlock the door with the code on your phone.",
      items: [
        {
          title: "Pet Spa Box Petrzalka",
          badge: "South Bratislava",
          description:
            "A practical option for Petrzalka and nearby areas when you want to handle the wash quickly after a walk and skip the mess at home.",
          address: "Petrzalka, Bratislava",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d166.49042733747763!2d17.102717879201023!3d48.11319024478081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1774957019453!5m2!1sen!2suk",
        },
        {
          title: "Pet Spa Box Ruzinov",
          badge: "East side and wider center",
          description:
            "A convenient choice for Ruzinov and nearby neighborhoods when you want a clean dog or cat without turning your bathroom into a wet cleanup project.",
          address: "Ruzinov, Bratislava",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d166.33920054243941!2d17.159672526015374!3d48.159847081819656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1774957101845!5m2!1sen!2suk",
        },
      ],
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
    faqSection: {
      eyebrow: "FAQ",
      title: "Questions people ask before their first visit.",
      description:
        "Everything important about access, booking and equipment is here in one place.",
    },
    faq: [
      {
        question: "How do I get inside?",
        answer:
          "After booking you receive a one-time code on your phone. Enter it at the door and the box opens for your reserved time.",
      },
      {
        question: "Do I need to bring my own shampoo or dryer?",
        answer:
          "Basic equipment and drying are ready on site. If your pet needs special cosmetics, you can still bring your own products.",
      },
      {
        question: "Can I wash a larger dog or a cat there?",
        answer:
          "Yes. The box is designed to stay comfortable even with larger dogs. Cats can be washed too, but we recommend it only if they are used to bathing and handling around water.",
      },
      {
        question: "What if I need to cancel or move my booking?",
        answer:
          "You can define the cancellation rules in your reservation system and then show them clearly on the site in the FAQ or pricing note.",
      },
    ],
    finalCta: {
      eyebrow: "Booking",
      title: "After a walk, after the rain or before guests arrive, the box is ready.",
      description:
        "Reserve a time, unlock the door with your phone code and handle the wash quickly, cleanly and without stress for you or your pet.",
      primaryCta: {
        label: "Book now",
        href: "#booking",
      },
      secondaryCta: {
        label: "Call us",
        href: "tel:+421903555321",
      },
    },
    footer: {
      brandName: "Pet Spa Box",
      tagline:
        "A self-service wash for dogs and cats with access by mobile code. Fast, clean and much easier than doing it at home.",
      email: "info@petspabox.com",
      phone: "+421 903 555 321",
      website: "www.petspabox.com",
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
    gallery: {
      ...fallback.gallery,
      ...incoming.gallery,
      items: hasItems(incoming.gallery?.items)
        ? fallback.gallery.items.map((item, index) => ({
            ...item,
            ...((incoming.gallery?.items?.[index] as GalleryItem | undefined) ??
              {}),
          }))
        : fallback.gallery.items,
    },
    overviewSection: {
      ...fallback.overviewSection,
      ...incoming.overviewSection,
    },
    highlights: hasItems(incoming.highlights)
      ? (incoming.highlights as Highlight[])
      : fallback.highlights,
    featuresSection: {
      ...fallback.featuresSection,
      ...incoming.featuresSection,
    },
    features: hasItems(incoming.features)
      ? (incoming.features as Feature[])
      : fallback.features,
    processSection: {
      ...fallback.processSection,
      ...incoming.processSection,
    },
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
    locations: {
      ...fallback.locations,
      ...incoming.locations,
      items: hasItems(incoming.locations?.items)
        ? fallback.locations.items.map((item, index) => ({
            ...item,
            ...((incoming.locations?.items?.[index] as LocationItem | undefined) ??
              {}),
          }))
        : fallback.locations.items,
    },
    proofStrip: hasItems(incoming.proofStrip)
      ? (incoming.proofStrip as string[])
      : fallback.proofStrip,
    faqSection: {
      ...fallback.faqSection,
      ...incoming.faqSection,
    },
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

# Sanity model for this frontend

This project now contains embedded Sanity Studio files directly in the repo.

## Studio path

- Local Studio URL: `http://localhost:3000/studio`

## Where the schema lives

- `sanity.config.ts`
- `sanity/structure.ts`
- `sanity/schemaTypes/`

The Studio exposes two fixed homepage editors:

- `Home Page SK` with document ID `landingPage-sk`
- `Home Page EN` with document ID `landingPage-en`

## Required document shape

```ts
type landingPage = {
  locale: "sk" | "en";
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  navigation: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    metrics: { value: string; label: string }[];
    proof: string[];
  };
  highlights: { title: string; description: string }[];
  features: {
    eyebrow: string;
    title: string;
    description: string;
  }[];
  process: { title: string; description: string }[];
  cms: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
    note: string;
  };
  proofStrip: string[];
  faq: { question: string; answer: string }[];
  finalCta: {
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  footer: {
    tagline: string;
    email: string;
    location: string;
  };
};
```

## Minimal workflow

1. Copy `.env.example` to `.env.local`.
2. Set the correct dataset in `.env.local`.
3. Run `npm run dev`.
4. Open `/studio`.
5. Fill the `Home Page SK` and `Home Page EN` documents section by section.

## GROQ query already used by the frontend

```groq
*[_type == "landingPage" && _id == $documentId][0]{
  locale,
  seo,
  navigation,
  hero,
  highlights,
  features,
  process,
  cms,
  proofStrip,
  faq,
  finalCta,
  footer
}
```

If a document is missing, the frontend automatically falls back to the local demo content in `lib/landing-page.ts`.

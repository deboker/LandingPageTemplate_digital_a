# Sanity model for this frontend

This frontend expects one document of type `landingPage` per locale.

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

1. Create a schema for `landingPage`.
2. Add a `locale` field with values `sk` and `en`.
3. Create one document for Slovak and one for English.
4. Copy `.env.example` to `.env.local` in this frontend repo.
5. Set the correct dataset in `.env.local`.
6. Run `npm run dev`.

## GROQ query already used by the frontend

```groq
*[_type == "landingPage" && locale == $locale][0]{
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

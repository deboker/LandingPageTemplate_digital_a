export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ypdwbs5t";

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-30";

export const studioBasePath = "/studio";

export const landingPageDocumentIds = {
  sk: "landingPage-sk",
  en: "landingPage-en",
} as const;

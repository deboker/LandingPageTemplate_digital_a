import { createClient } from "next-sanity";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ypdwbs5t",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-30",
  token: process.env.SANITY_API_READ_TOKEN,
};

export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: !sanityConfig.token,
  token: sanityConfig.token,
  perspective: sanityConfig.token ? "previewDrafts" : "published",
});

export async function fetchSanityData<T>({
  query,
  params,
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
}) {
  try {
    return (
      (await sanityClient.fetch<T>(query, params ?? {}, {
        next: { revalidate: 60 },
      })) ?? fallback
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Sanity fetch failed", error);
    }
    return fallback;
  }
}

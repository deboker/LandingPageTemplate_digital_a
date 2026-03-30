import { createClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/project";

export const sanityConfig = {
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
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

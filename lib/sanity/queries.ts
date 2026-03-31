import groq from "groq";

export const landingPageQuery = groq`*[_type == "landingPage" && _id == $documentId][0]{
  locale,
  seo,
  navigation,
  hero,
  gallery{
    ...,
    items[]{
      title,
      subtitle,
      alt,
      "imageUrl": image.asset->url
    }
  },
  overviewSection,
  highlights,
  featuresSection,
  features,
  processSection,
  process,
  cms,
  proofStrip,
  faqSection,
  faq,
  finalCta,
  footer
}`;

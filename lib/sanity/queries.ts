import groq from "groq";

export const landingPageQuery = groq`*[_type == "landingPage" && locale == $locale][0]{
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
}`;

import type { StructureResolver } from "sanity/structure";
import { landingPageDocumentIds } from "./project";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Website Content")
    .items([
      S.listItem()
        .id("landing-page-sk")
        .title("Home Page SK")
        .schemaType("landingPage")
        .child(
          S.document()
            .schemaType("landingPage")
            .documentId(landingPageDocumentIds.sk),
        ),
      S.listItem()
        .id("landing-page-en")
        .title("Home Page EN")
        .schemaType("landingPage")
        .child(
          S.document()
            .schemaType("landingPage")
            .documentId(landingPageDocumentIds.en),
        ),
    ]);

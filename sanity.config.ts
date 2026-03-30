import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { sanityDataset, sanityProjectId, studioBasePath } from "./sanity/project";
import { deskStructure } from "./sanity/structure";

const singletonDocumentIds = new Set(["landingPage-sk", "landingPage-en"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "Digital A Studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  basePath: studioBasePath,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      singletonDocumentIds.has(context.documentId ?? "")
        ? prev.filter(
            (action) =>
              action.action !== undefined &&
              singletonActions.has(action.action),
          )
        : prev,
    newDocumentOptions: (prev, context) =>
      context.creationContext.type === "global"
        ? prev.filter((templateItem) => templateItem.templateId !== "landingPage")
        : prev,
  },
});

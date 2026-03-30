import { defineCliConfig } from "sanity/cli";
import { sanityDataset, sanityProjectId } from "./sanity/project";

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
});

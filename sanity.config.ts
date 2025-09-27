import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  projectId: import.meta.env.SANITY_PROJECT_ID, // server-only
  dataset: import.meta.env.SANITY_DATASET,     // server-only
  plugins: [
    structureTool(),
  ],
  schema,
});
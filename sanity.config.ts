import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  projectId:"we90e4mg",
  dataset:"production",
  plugins: [
    structureTool(),
  ],
  schema,
});
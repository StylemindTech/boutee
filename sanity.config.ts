import React from "react";
import { defineConfig, definePlugin } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

const fullWidthStudio = definePlugin(() => ({
  name: "full-width-studio",
  components: {
    unstable__globalStyles: () => {
      const css = `
        /* Make the main form container span the full available width */
        [data-ui="Container"] {
          max-width: none !important;
        }
      `;
      return React.createElement("style", null, css);
    },
  },
}));

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID, // server-only
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,     // server-only
  plugins: [
    structureTool(),
    fullWidthStudio(),
  ],
  schema,
});

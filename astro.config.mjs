// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: "we90e4mg",
      dataset: "production",
      useCdn: true,
      apiVersion: "2025-01-10",
      studioBasePath: "/studio",
      stega: { studioUrl: "/studio" },
    }),
    react(),
  ],
  adapter: vercel({}),
});

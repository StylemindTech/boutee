// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.boutee.co.uk",
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
    sitemap(),
  ],
  adapter: vercel({}),
});

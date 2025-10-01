// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from "@sanity/astro";
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: "we90e4mg",     // Hardcoded directly
      dataset: "production",      // Hardcoded directly
      useCdn: true,
      apiVersion: "2025-01-10",
      studioBasePath: '/studio',
      stega: {
        studioUrl: "/studio",
      },
    }),
    react()
  ],    
  adapter: vercel({}),
});
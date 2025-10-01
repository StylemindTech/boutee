// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from "@sanity/astro";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
      dataset: process.env.PUBLIC_SANITY_DATASET || '',
      useCdn: true,
      apiVersion: "2024-10-01",
      studioBasePath: '/studio',
      stega: {
        studioUrl: "/studio",
      },
    }),
    react()
  ],
  adapter: vercel(),
});
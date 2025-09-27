// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sanity from "@sanity/astro";

import vercel from '@astrojs/vercel';
import { loadEnv } from "vite";
const { SANITY_PROJECT_ID } = loadEnv(process.env.SANITY_PROJECT_ID, process.cwd(), "");
const {SANITY_DATASET } = loadEnv(process.env.SANITY_DATASET, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
   output: "server", // important for SSR
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: '/studio',
      stega: {
        studioUrl: "/studio",      
      },
    }),react()],    
     adapter: vercel(),
});
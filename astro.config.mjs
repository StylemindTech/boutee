// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sanity from "@sanity/astro";

import vercel from '@astrojs/vercel';
import { loadEnv } from "vite";

// Load environment variables from .env file
const { PUBLIC_SANITY_PROJECT_ID } = loadEnv(process.env.PUBLIC_SANITY_PROJECT_ID, process.cwd(), "");
const { PUBLIC_SANITY_DATASET } = loadEnv(process.env.PUBLIC_SANITY_DATASET, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
   output: "server", // important for SSR
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: '/studio',
      stega: {
        studioUrl: "/studio",
        
      },
    }),react()],    
     adapter: vercel(),
});
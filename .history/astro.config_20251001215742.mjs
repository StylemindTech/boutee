// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from "@sanity/astro";
import vercel from '@astrojs/vercel';
import { loadEnv } from "vite";

// Correctly load environment variables
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "server", // important for SSR
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: env.we90e4mg,
      dataset: env.production,
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-10", // Using today's date
      studioBasePath: '/studio',
      stega: {
        studioUrl: "/studio",
      },
    }),
    react()
  ],    
  adapter: vercel({}), // Added empty config object here
});
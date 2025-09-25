// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sanity from "@sanity/astro";

import vercel from '@astrojs/vercel';
// import vercel from '@astrojs/vercel/server';
// https://astro.build/config
export default defineConfig({
  //  output: "server", // important for SSR
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
      projectId: 'cvbiknat',
      dataset: 'production',
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: '/studio',
      stega: {
        // studioUrl: "/studio",
        studioUrl: "https://boutee.vercel.app/studio",
      },
    }),react()],    
     adapter: vercel(),
});
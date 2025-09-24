// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// ✅ Use the server adapter for SSR
import vercel from '@astrojs/vercel/server';

// https://astro.build/config
export default defineConfig({
  output: "server", // important for SSR
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sanity({
      projectId: 'q7yn2bfx',
      dataset: 'production',
      useCdn: true,
      apiVersion: "2025-01-28",
      studioBasePath: '/studio',
      stega: {
        // Use absolute URL to avoid SSR crashes
        studioUrl: "https://boutee.vercel.app/studio",
      },
    }),
    react()
  ],
  adapter: vercel(),
});

import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: "we90e4mg",
  dataset: "production",
  apiVersion: "2025-01-10",
  useCdn: true,
});

const SITE = "https://www.boutee.co.uk";

export const GET: APIRoute = async () => {
  const slugs: string[] = await sanity.fetch(
    `*[_type=="post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
  );

  const staticUrls = [
    "/",
    "/how-it-works",
    "/faq",
    "/blog",
    "/privacy-policy",
    "/terms-of-service",
    "/inspiration",
    "/app",
    "/our-jewellers",
    "/our-technology",
    "/contact-us",
    "/about-us",
    "/for-jewellers",
  ];

  const urls = [
    ...staticUrls.map((p) => `${SITE}${p.endsWith("/") ? p : p + "/"}`),
    ...slugs.map((s) => `${SITE}/blog/${s}/`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // cache a bit to reduce Sanity calls; adjust as you like
      "Cache-Control": "public, max-age=300",
    },
  });
};

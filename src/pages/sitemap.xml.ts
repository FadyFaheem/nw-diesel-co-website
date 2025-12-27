import type { APIRoute } from "astro";

const siteUrl = "https://nwdieselco.com";

const staticPages = [
  "",
  "service-areas/",
  "service-areas/dfw/",
  // "service-areas/spokane/",
  "services/",
  "emergency/",
  "about/",
  "contact/",
  "privacy/",
  "terms/",
  "testimonials/",
  "gallery/",
  "careers/",
  "scheduling/",
  "additional-locations/",
  "sitemap/",
];

function getSiteUrl(path: string): string {
  return new URL(path, siteUrl).href;
}

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (path) => `  <url>
    <loc>${getSiteUrl(path)}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${path === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${
      path === "" ? "1.0" : path.includes("service-areas") ? "0.9" : "0.8"
    }</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};

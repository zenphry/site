import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const siteUrl = context.cloudflare?.env?.SITE_URL || "https://zenphry.com";

  const routes = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/services", priority: "0.9", changefreq: "weekly" },
    { path: "/services/diagnostic", priority: "0.9", changefreq: "monthly" },
    { path: "/services/foundation", priority: "0.8", changefreq: "monthly" },
    { path: "/services/growth", priority: "0.8", changefreq: "monthly" },
    { path: "/services/enterprise", priority: "0.8", changefreq: "monthly" },
    { path: "/services/technology", priority: "0.7", changefreq: "monthly" },
    { path: "/services/advisory", priority: "0.7", changefreq: "monthly" },
    { path: "/pricing", priority: "0.9", changefreq: "weekly" },
    { path: "/about", priority: "0.8", changefreq: "monthly" },
    { path: "/about/what-we-do", priority: "0.8", changefreq: "monthly" },
    { path: "/resources/how-it-works", priority: "0.8", changefreq: "monthly" },
    { path: "/resources/case-studies", priority: "0.7", changefreq: "weekly" },
    { path: "/resources/blog", priority: "0.6", changefreq: "weekly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

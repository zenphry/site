import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const isDev =
    context.cloudflare?.env?.ENVIRONMENT === "dev" ||
    context.cloudflare?.env?.ENVIRONMENT === "stg";

  const siteUrl = context.cloudflare?.env?.SITE_URL || "https://zenphry.com";

  const robotsTxt = isDev
    ? `# Development/Staging Environment - Block All Indexing
User-agent: *
Disallow: /`
    : `# Production Environment
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

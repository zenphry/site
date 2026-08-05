import type { LoaderFunctionArgs } from "react-router";
import { cloudflareContext } from "~/lib/cloudflare-context";

export async function loader({ context }: LoaderFunctionArgs) {
  const { env } = context.get(cloudflareContext);
  const isDev = env.ENVIRONMENT === "dev" || env.ENVIRONMENT === "stg";

  const siteUrl = env.SITE_URL || "https://zenphry.com";

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

import { route, index } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  // Homepage
  index("routes/_index.tsx"),

  // Services
  route("services", "routes/services._index.tsx"),
  route("services/diagnostic", "routes/services.diagnostic.tsx"),
  route("services/foundation", "routes/services.foundation.tsx"),
  route("services/growth", "routes/services.growth.tsx"),
  route("services/enterprise", "routes/services.enterprise.tsx"),
  route("services/technology", "routes/services.technology.tsx"),
  route("services/financial", "routes/services.financial.tsx"),
  route("services/advisory", "routes/services.advisory.tsx"),
  route("services/operational", "routes/services.operational.tsx"),
  route("services/organizational", "routes/services.organizational.tsx"),
  route("services/scale", "routes/services.scale.tsx"),

  // Core pages
  route("pricing", "routes/pricing.tsx"),
  route("about", "routes/about.tsx"),
  route("about/what-we-do", "routes/about.what-we-do.tsx"),
  route("about/team", "routes/about.team.tsx"),
  route("about/vision", "routes/about.vision.tsx"),
  route("resources/case-studies", "routes/resources.case-studies._index.tsx"),
  route(
    "resources/case-studies/:slug",
    "routes/resources.case-studies.$slug.tsx",
  ),
  route("resources/how-it-works", "routes/resources.how-it-works.tsx"),
  route("resources/blog", "routes/resources.blog.tsx"),
  route("resources/faq", "routes/resources.faq.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("contact", "routes/contact.tsx"),
  route("book-a-call", "routes/book-a-call.tsx"),
  route("thank-you", "routes/thank-you.tsx"),

  // Redirects
  route("case-studies", "routes/case-studies.tsx"),
  route("case-studies/:slug", "routes/case-studies.$slug.tsx"),
  route("how-it-works", "routes/how-it-works.tsx"),

  // SEO
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),

  // Actions
  route("action/set-theme", "routes/action.set-theme.tsx"),
] satisfies RouteConfig;

import { route, index } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export default [
  // Homepage
  index('routes/_index.tsx'),

  // Services
  route('services', 'routes/services._index.tsx'),
  route('services/diagnostic', 'routes/services.diagnostic.tsx'),
  route('services/foundation', 'routes/services.foundation.tsx'),
  route('services/growth', 'routes/services.growth.tsx'),
  route('services/enterprise', 'routes/services.enterprise.tsx'),
  route('services/technology', 'routes/services.technology.tsx'),
  route('services/advisory', 'routes/services.advisory.tsx'),

  // Core pages
  route('pricing', 'routes/pricing.tsx'),
  route('how-it-works', 'routes/how-it-works.tsx'),
  route('about', 'routes/about.tsx'),
  route('case-studies', 'routes/case-studies._index.tsx'),
  route('case-studies/:slug', 'routes/case-studies.$slug.tsx'),
  route('resources', 'routes/resources.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('book-a-call', 'routes/book-a-call.tsx'),
  route('thank-you', 'routes/thank-you.tsx'),

  // SEO
  route('sitemap.xml', 'routes/sitemap[.]xml.tsx'),
  route('robots.txt', 'routes/robots[.]txt.tsx'),
] satisfies RouteConfig;

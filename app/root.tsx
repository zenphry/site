import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "react-router";

import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "react-router";
import stylesheet from "./app.css?url";
import { getTheme } from "./lib/theme.server";
import { ThemeProvider } from "./lib/theme-provider";
import { ThemeScript } from "./components/theme-script";
import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { NewsletterCapture } from "./components/newsletter-capture";
import { BackgroundPulses } from "./components/background-pulses";
import { criticalCSS } from "./lib/critical-css";
import logoColor from "./assets/logo-color.png";

const SITE_URL = "https://zenphry.com";

// LocalBusiness JSON-LD structured data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Zenphry",
  url: SITE_URL,
  logo: `${SITE_URL}${logoColor}`,
  image: `${SITE_URL}${logoColor}`,
  description:
    "Operator-led business restructuring and transformation firm helping companies fix broken operations, realign teams, and build execution systems that scale.",
  slogan: "Restructure Operations. Realign Teams. Scale with Confidence.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Business Restructuring Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business Restructuring Diagnostic",
          description:
            "Identify root causes of inefficiency and execution breakdown",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Operational Restructuring",
          description:
            "Fix how work flows through your business with defined processes and measurable outcomes",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Organizational & Team Restructuring",
          description:
            "Realign people, roles, and decision-making structures for efficient execution",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technology & Systems Restructuring",
          description:
            "Fix, simplify, and rebuild the digital backbone so systems support execution",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Financial Execution Discipline",
          description:
            "Restructure how money is planned, tracked, and governed inside operations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth & Scale Readiness",
          description: "Prepare your business to grow without losing control",
        },
      },
    ],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "6160 Warren Parkway, Suite 100",
    addressLocality: "Frisco",
    addressRegion: "TX",
    postalCode: "75034",
    addressCountry: "US",
  },
  knowsAbout: [
    "Business Restructuring",
    "Operational Transformation",
    "Organizational Alignment",
    "Execution Systems",
    "Leadership Coaching",
  ],
};

export const links: LinksFunction = () => [
  // DNS prefetch for external domains
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },

  // Preconnect for critical external resources
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },

  // App stylesheet
  { rel: "stylesheet", href: stylesheet },

  // Favicons
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/android-chrome-192x192.png",
  },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const theme = await getTheme(request);
  const isDev =
    context.cloudflare?.env?.ENVIRONMENT === "dev" ||
    context.cloudflare?.env?.ENVIRONMENT === "stg";

  const turnstileSiteKey = context.cloudflare?.env?.TURNSTILE_SITE_KEY as
    | string
    | undefined;

  return { theme, isDev, turnstileSiteKey };
}

// SEO Protection: Add noindex meta tag for dev and stg environments
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.isDev) {
    return [
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow" },
    ];
  }
  return [];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const theme = data?.theme || "system";

  // Tailwind v4 dark mode: only add 'dark' class when needed
  const htmlClass = theme === "dark" ? "dark" : "";

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* Inline critical CSS for faster FCP */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Async font loading */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
          // @ts-expect-error onLoad is valid on link elements
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          />
        </noscript>

        {/* LocalBusiness structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <Meta />
        <Links />
        <ThemeScript theme={data?.theme || "system"} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <ThemeProvider specifiedTheme={theme || "system"}>
      {/* Pattern Background - Light Mode - Fixed to viewport */}
      <div
        className="fixed inset-0 z-0 dark:hidden"
        style={{
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(203,178,106,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203,178,106,0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(203,178,106,0.12) 0%, rgba(203,178,106,0.04) 50%, transparent 75%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      >
        <BackgroundPulses />
      </div>

      {/* Pattern Background - Dark Mode - Fixed to viewport */}
      <div
        className="fixed inset-0 z-0 hidden dark:block"
        style={{
          background: "#0f172a",
          backgroundImage: `
            linear-gradient(to right, rgba(203,178,106,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203,178,106,0.06) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(203,178,106,0.08) 0%, rgba(203,178,106,0.03) 50%, transparent 75%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      >
        <BackgroundPulses />
      </div>

      {/* Content */}
      <div className="min-h-screen w-full relative z-10 transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-28">
          <div
            className={
              isNavigating
                ? "opacity-50 transition-opacity duration-150"
                : "page-fade-in"
            }
          >
            <Outlet />
          </div>
        </main>
        {/* Bottom zone — hardcoded dark navy + grid, excluded from theming */}
        <div
          style={{
            background: "#0f172a",
            backgroundImage: `
              linear-gradient(to right, rgba(203,178,106,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(203,178,106,0.06) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(203,178,106,0.08) 0%, rgba(203,178,106,0.03) 50%, transparent 75%)
            `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
            position: "relative",
          }}
        >
          <NewsletterCapture />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <ThemeProvider specifiedTheme="system">
      <ThemeScript theme="system" />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <main id="main-content" className="pt-28 p-4 container mx-auto">
          <h1 className="text-4xl font-bold mb-4">{message}</h1>
          <p className="text-lg mb-4">{details}</p>
          {stack && (
            <pre className="w-full p-4 overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded">
              <code>{stack}</code>
            </pre>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

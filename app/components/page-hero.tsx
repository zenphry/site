import { BreadcrumbNav, type BreadcrumbItem } from "~/components/breadcrumb-nav";

interface PageHeroProps {
  headline: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ headline, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="min-h-[200px] md:min-h-[280px] bg-gray-950 dark:bg-gray-950 flex items-center">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <BreadcrumbNav items={breadcrumbs} />
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4 leading-tight">
            {headline}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

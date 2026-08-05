import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Cloud, Landmark, Network, Sparkles } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { solutions } from "~/lib/solutions";

export const meta: MetaFunction = () => [
  { title: "Business Technology Solutions | Zenphry" },
  {
    name: "description",
    content:
      "Private cloud, legal workspace, private AI, and secure connectivity solutions for growing organizations.",
  },
];

const icons = [Cloud, Landmark, Sparkles, Network];

const industrySolutions = solutions.filter(
  (solution) => solution.category === "industry",
);
const capabilitySolutions = solutions.filter(
  (solution) => solution.category === "capability",
);

export default function SolutionsIndex() {
  return (
    <div>
      <PageHero
        headline="Business Technology Solutions"
        subtitle="Practical private infrastructure, secure workspaces, private AI, and connectivity designed around how your team operates."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Zenphry delivers technology solutions where infrastructure and
              operations meet. Each engagement starts with the systems, people,
              data, and organizational risks shaping your work.
            </p>
          </div>

          <section className="max-w-5xl mx-auto mb-14">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Solutions by Industry
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Technology foundations built around the working demands of your
              industry.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industrySolutions.map((solution) => {
                const Icon = icons[solutions.indexOf(solution)];

                return (
                  <Card key={solution.slug} className="flex flex-col">
                    <CardHeader>
                      <Icon className="h-7 w-7 text-primary mb-2" />
                      <CardTitle>{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {solution.summary}
                      </p>
                      <Button asChild variant="outline" className="mt-auto">
                        <Link to={`/solutions/${solution.slug}`}>
                          Explore solution
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Solutions by Capability
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Shared technology capabilities for secure, well-run operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilitySolutions.map((solution) => {
                const Icon = icons[solutions.indexOf(solution)];

                return (
                  <Card key={solution.slug} className="flex flex-col">
                    <CardHeader>
                      <Icon className="h-7 w-7 text-primary mb-2" />
                      <CardTitle>{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {solution.summary}
                      </p>
                      <Button asChild variant="outline" className="mt-auto">
                        <Link to={`/solutions/${solution.slug}`}>
                          Explore solution
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <SectionCTA
        headline="Need a Technology Plan for Your Business?"
        supporting="Talk with Zenphry about the systems, access, and operating model your team needs."
        showDiagnostic={false}
      />
    </div>
  );
}

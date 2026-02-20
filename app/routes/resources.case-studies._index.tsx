import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Case Studies | Zenphry" },
    {
      name: "description",
      content:
        "Real-world scenarios of business restructuring and transformation outcomes.",
    },
  ];
};

const scenarios = [
  {
    slug: "saas-scaling",
    title: "SaaS Company Scaling Challenges",
    industry: "Software (SaaS)",
    situation:
      "Rapid growth led to operational chaos and declining customer satisfaction",
    outcome: "40% reduction in support tickets, 25% improvement in NPS",
  },
  {
    slug: "founder-bottleneck",
    title: "Founder Bottleneck Removal",
    industry: "Professional Services",
    situation:
      "Founder approval required for all decisions, blocking team execution",
    outcome: "Founder time freed up by 60%, team velocity doubled",
  },
  {
    slug: "enterprise-alignment",
    title: "Enterprise Departmental Alignment",
    industry: "Manufacturing",
    situation:
      "Siloed departments with conflicting priorities and redundant efforts",
    outcome: "30% cost reduction, 50% faster time-to-market",
  },
];

export default function CaseStudiesIndex() {
  return (
    <div>
      <PageHero
        headline="Case Studies"
        subtitle="Real-world scenarios of business restructuring and transformation outcomes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources/case-studies" },
          { label: "Case Studies" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {scenarios.map((scenario) => (
              <Card key={scenario.slug}>
                <CardHeader>
                  <CardTitle>{scenario.title}</CardTitle>
                  <CardDescription>{scenario.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        Situation:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {scenario.situation}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        Outcome:
                      </h4>
                      <p className="text-sm text-primary font-semibold">
                        {scenario.outcome}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-primary text-white hover:bg-primary/10 hover:text-white"
                    >
                      <Link to={`/resources/case-studies/${scenario.slug}`}>
                        Read Full Scenario
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SectionCTA
        headline="See How Zenphry Can Help Your Business"
        supporting="Every engagement starts with a diagnostic to identify exactly where execution is breaking down."
      />
    </div>
  );
}

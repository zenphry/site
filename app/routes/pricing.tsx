import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Pricing | Zenphry" },
    {
      name: "description",
      content:
        "Clear, transparent pricing for business restructuring services.",
    },
  ];
};

const tiers = [
  {
    name: "Diagnostic",
    duration: "2-3 weeks",
    investment: "Starting point",
    description: "Identify root causes before restructuring begins",
    included: [
      "Business health assessment",
      "Leadership interviews",
      "Workflow and process review",
      "Executive diagnostic report",
      "30-90 day roadmap",
    ],
    excluded: ["Implementation", "Ongoing support"],
    cta: "Request Diagnostic",
    href: "/services/diagnostic",
  },
  {
    name: "Foundation/Growth",
    duration: "4-12 weeks",
    investment: "Mid-tier engagement",
    description: "Stabilize and redesign operations",
    included: [
      "Org structure redesign",
      "Process maps and SOPs",
      "KPI framework",
      "Weekly execution cadence",
      "Implementation support",
    ],
    excluded: ["Multi-department transformation", "Change management"],
    cta: "Explore Services",
    href: "/services",
  },
  {
    name: "Enterprise",
    duration: "3-6 months",
    investment: "Full transformation",
    description: "Lead comprehensive organizational change",
    included: [
      "Cross-functional restructuring",
      "Change management",
      "Executive coaching",
      "Governance redesign",
      "Quarterly review framework",
    ],
    excluded: ["Legal or financial advisory"],
    cta: "Discuss Transformation",
    href: "/services/enterprise",
  },
];

export default function Pricing() {
  return (
    <div>
      <PageHero
        headline="Pricing"
        subtitle="Scoped engagements with clear outcomes. No long-term contracts, no surprise fees."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier, index) => (
              <Card
                key={index}
                className={index === 0 ? "border-primary border-2" : ""}
              >
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.duration}</CardDescription>
                  <div className="text-2xl font-bold text-primary mt-2">
                    {tier.investment}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-600 dark:text-gray-400">
                    {tier.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                      What is included:
                    </h4>
                    <ul className="space-y-2">
                      {tier.included.map((item, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                      What is NOT included:
                    </h4>
                    <ul className="space-y-2">
                      {tier.excluded.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          &bull; {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full">
                    <Link to={tier.href}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Not Sure Which Engagement is Right?"
        supporting="Start with the Restructuring Diagnostic to identify exactly what needs to change."
      />
    </div>
  );
}

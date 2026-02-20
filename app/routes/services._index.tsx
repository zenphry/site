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
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Services | Zenphry" },
    {
      name: "description",
      content:
        "Operational, organizational, and technology restructuring services for businesses at every stage.",
    },
  ];
};

const services = [
  {
    slug: "diagnostic",
    title: "Restructuring Diagnostic",
    duration: "2-3 weeks",
    whoItsFor: "All businesses needing clarity",
    description: "Identify root causes of inefficiency and execution breakdown",
  },
  {
    slug: "operational",
    title: "Operational Restructuring",
    duration: "Varies",
    whoItsFor: "Organizations with inconsistent execution",
    description:
      "Fix how work flows through your business with defined processes, execution rhythm, and measurable outcomes",
  },
  {
    slug: "organizational",
    title: "Organizational & Team Restructuring",
    duration: "Varies",
    whoItsFor: "Organizations with unclear roles or slow decisions",
    description:
      "Realign people, roles, and decision-making structures for efficient execution and scale",
  },
  {
    slug: "technology",
    title: "Technology & Systems Restructuring",
    duration: "Varies",
    whoItsFor: "Businesses with technology inefficiencies",
    description:
      "Fix, simplify, and rebuild the digital backbone so systems support execution",
  },
  {
    slug: "financial",
    title: "Financial Execution Discipline",
    duration: "Varies",
    whoItsFor: "Organizations with disconnected spending",
    description:
      "Restructure how money is planned, tracked, and governed inside day-to-day operations",
  },
  {
    slug: "scale",
    title: "Growth & Scale Readiness",
    duration: "Varies",
    whoItsFor: "Scaling companies preparing for growth",
    description:
      "Prepare your business to grow without losing control by building structure before scale",
  },
  {
    slug: "advisory",
    title: "Advisory Retainer",
    duration: "Ongoing",
    whoItsFor: "Post-restructuring optimization",
    description: "Sustain performance after restructuring",
  },
];

export default function ServicesIndex() {
  return (
    <div>
      <PageHero
        headline="Our Services"
        subtitle="Operator-led restructuring across operations, technology, finance, and organizational design."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.slug}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Who it is for:</strong> {service.whoItsFor}
                  </p>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                  {service.slug === "diagnostic" ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-primary text-white hover:bg-primary/10 hover:text-white"
                    >
                      <Link to={`/services/${service.slug}`}>
                        Get the Diagnostic
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/services/${service.slug}`}>Learn More</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The Restructuring Diagnostic is our recommended entry point for
              all clients.
            </p>
            <Button asChild size="lg">
              <Link to="/services/diagnostic">Get the Diagnostic</Link>
            </Button>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Ready to Start Restructuring?"
        supporting="Begin with a diagnostic to identify exactly where execution is breaking down."
      />
    </div>
  );
}

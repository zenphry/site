import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { PillarSection } from "~/components/pillar-section";
import { ArrowLeft } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Technology & Systems Restructuring | Zenphry" },
    {
      name: "description",
      content:
        "Fix, simplify, and rebuild the digital backbone of your business. Infrastructure, cloud, applications, automation, and internal tooling restructured for execution.",
    },
  ];
};

const pillars = [
  {
    number: 1,
    title: "Systems and Tool Assessment",
    items: [
      "Inventory all current tools and systems",
      "Identify redundancies, gaps, and inefficiencies",
      "Assess usage, adoption, and cost",
      "Review security and access controls",
      "Map tools to actual business workflows",
    ],
    extra: {
      label: "Technologies Reviewed",
      items: [
        "CRM platforms",
        "ERP and finance systems",
        "Project and delivery tools",
        "Communication and collaboration tools",
        "Custom internal applications",
      ],
    },
  },
  {
    number: 2,
    title: "CRM and ERP Implementation or Restructuring",
    items: [
      "Design CRM and ERP data models",
      "Configure pipelines, workflows, and automation",
      "Clean and migrate data",
      "Integrate systems with email, finance, and delivery tools",
      "Implement role-based access and governance",
      "Train teams and document usage",
    ],
  },
  {
    number: 3,
    title: "Cloud Infrastructure and Virtual Private Servers",
    items: [
      "Design cloud architectures aligned to workload needs",
      "Build and manage virtual private servers when required",
      "Implement networking, security, and access controls",
      "Optimize performance and cost",
      "Set up backups, monitoring, and disaster recovery",
    ],
    extra: {
      label: "Cloud Platforms",
      items: [
        "Amazon Web Services (AWS)",
        "Microsoft Azure",
        "Google Cloud Platform (GCP)",
      ],
    },
  },
  {
    number: 4,
    title: "DevOps and Delivery Enablement",
    items: [
      "Implement CI and CD pipelines",
      "Automate builds, testing, and deployments",
      "Introduce infrastructure as code",
      "Improve release reliability and speed",
      "Establish monitoring and alerting",
    ],
  },
  {
    number: 5,
    title: "Application Development and Enablement",
    items: [
      "Build internal or client-facing applications",
      "Extend or modernize existing applications",
      "Design APIs and integrations",
      "Implement authentication and authorization",
      "Ensure documentation and maintainability",
    ],
  },
  {
    number: 6,
    title: "Automation, Integrations, and Workflow Optimization",
    items: [
      "Automate approvals and handoffs",
      "Integrate CRM, ERP, and delivery tools",
      "Reduce manual data entry",
      "Implement alerts and notifications",
      "Build scalable integration flows",
    ],
  },
];

export default function ServiceTechnology() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="fixed bottom-4 left-4 z-50">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shadow-lg bg-white dark:bg-gray-900"
          >
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Technology & Systems Restructuring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Fix, simplify, and rebuild the digital backbone of your business so
            systems support execution instead of slowing teams down.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/book-a-call">Optimize Systems</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/book-a-call">Book a Strategy Call</Link>
            </Button>
          </div>
        </div>

        {/* What This Service Is */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What This Service Is
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Zenphry works across infrastructure, cloud, applications,
              automation, and internal tooling to create stable, scalable, and
              usable systems aligned with how your business operates.
            </p>
            <p>
              This is not software resale or tool implementation in isolation.
              It is system design, restructuring, and execution enablement.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            What Zenphry Delivers
          </h2>
          <PillarSection pillars={pillars} />
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Fix Your Systems?
          </h2>
          <p className="mb-6">
            If technology is slowing execution or creating risk, start with a
            strategy call to determine what needs to be restructured first.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

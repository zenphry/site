import type { MetaFunction } from "react-router";
import { PillarSection } from "~/components/pillar-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

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

const faqs = [
  {
    q: "Do you recommend or resell specific software?",
    a: "No. Zenphry does not resell software or take vendor commissions. Recommendations are based entirely on your operational needs, existing systems, and budget.",
  },
  {
    q: "Can you work with our existing systems?",
    a: "Yes. We start with a full assessment of what you have before recommending any changes. Many engagements involve restructuring and optimizing existing tools rather than replacing them.",
  },
  {
    q: "How long does a technology restructuring engagement take?",
    a: "Duration varies depending on scope. A systems assessment typically takes 2-3 weeks. Implementation engagements range from 6 to 16 weeks depending on complexity.",
  },
  {
    q: "Is this only for large organizations?",
    a: "No. We work with businesses of all sizes. Early-stage companies often benefit most from getting their systems right before scale exposes the gaps.",
  },
];

export default function ServiceTechnology() {
  return (
    <div>
      <PageHero
        headline="Technology & Systems Restructuring"
        subtitle="Fix, simplify, and rebuild the digital backbone so systems support execution instead of obstructing it."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Technology & Systems Restructuring" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
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

          {/* Who It Is For */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Who It Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Businesses with tools that create more work than they eliminate",
                "Organizations where teams work around systems instead of through them",
                "Companies with redundant or disconnected technology stacks",
                "Leadership teams with no visibility into operational technology costs",
                "Businesses preparing to scale and needing stable systems to support growth",
                "Teams where manual work could be automated but never has been",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-3 rounded text-gray-700 dark:text-gray-300 text-sm"
                >
                  &bull; {item}
                </div>
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              What Zenphry Delivers
            </h2>
            <PillarSection pillars={pillars} />
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Ready to Fix Your Systems?"
        supporting="If technology is slowing execution, we build the systems that remove friction and enable scale."
        showDiagnostic={true}
      />
    </div>
  );
}

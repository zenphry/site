import type { MetaFunction } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Check } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Operational Restructuring | Zenphry" },
    {
      name: "description",
      content:
        "Fix how work flows through your business. Zenphry restructures operations so work moves predictably, ownership is clear, and results are repeatable.",
    },
  ];
};

const pillars = [
  {
    name: "End-to-End Process Mapping",
    items: [
      "Identify critical workflows across the business",
      "Map current-state processes in full",
      "Expose bottlenecks, delays, and rework",
      "Highlight ownership gaps and handoff failures",
    ],
  },
  {
    name: "Workflow Redesign and Optimization",
    items: [
      "Redesign workflows to remove waste",
      "Simplify approvals and handoffs",
      "Align work to actual team capacity",
      "Reduce unnecessary meetings and coordination overhead",
    ],
  },
  {
    name: "Standard Operating Procedures (SOPs)",
    items: [
      "Document critical workflows in usable formats",
      "Define execution standards for repeatable work",
      "Create role-specific SOPs",
      "Ensure SOPs are accessible and adopted in practice",
    ],
  },
  {
    name: "Execution Cadence and Governance",
    items: [
      "Design execution rhythm across daily, weekly, and monthly cycles",
      "Define meeting purpose and expected outcomes",
      "Establish escalation paths and response protocols",
      "Align leadership review cycles to operational reality",
    ],
  },
  {
    name: "KPI Definition and Operational Visibility",
    items: [
      "Define operational KPIs connected to actual workflows",
      "Align metrics to execution outcomes",
      "Implement reporting and dashboards",
      "Train teams to use data in reviews and decisions",
    ],
  },
  {
    name: "Ownership and Accountability Alignment",
    items: [
      "Assign clear ownership to processes and outcomes",
      "Define accountability frameworks",
      "Align roles with actual responsibilities",
      "Reinforce ownership through cadence and governance",
    ],
  },
];

const faqs = [
  {
    q: "Will operational restructuring disrupt current operations?",
    a: "Engagements are designed to minimize disruption. We map current state before proposing any changes, and implementation is phased to keep operations running throughout.",
  },
  {
    q: "How do you handle resistance to process changes?",
    a: "Change resistance is expected and planned for. Zenphry works closely with leadership and team leads to understand root causes, communicate the rationale for change, and build adoption into every phase.",
  },
  {
    q: "What data or access do you need from us?",
    a: "Primarily interviews, process walk-throughs, and access to current documentation. We do not require full system access for most engagements. Most findings come from talking to the people doing the work.",
  },
  {
    q: "How is this different from hiring a COO?",
    a: "A COO is a permanent hire responsible for ongoing leadership. Zenphry is an operator-led restructuring engagement — we diagnose, redesign, implement, and hand off. The outcome is a set of systems, processes, and governance structures your leadership team can run independently.",
  },
];

export default function ServiceOperational() {
  return (
    <div>
      <PageHero
        headline="Operational Restructuring"
        subtitle="Fix how work flows through your business with defined processes, execution rhythm, and measurable outcomes."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Operational Restructuring" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
        {/* What This Service Is */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What This Service Is
          </h2>
          <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">
              Operational Restructuring focuses on fixing how work flows through
              the business. Zenphry restructures operations so work moves
              predictably, ownership is clear, and results are repeatable — not
              because teams work harder, but because the structure supports
              consistent execution.
            </p>
          </div>
        </div>

        {/* Who It Is For */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Organizations that miss deadlines despite hardworking teams",
              "Businesses that rely on tribal knowledge instead of documented processes",
              "Teams experiencing constant firefighting and escalations",
              "Organizations that struggle with handoffs between departments",
              "Businesses with no consistent execution cadence",
              "Leadership teams with no visibility into operational performance",
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

        {/* Service Pillars */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    {pillar.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {pillar.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* Final CTA */}
      <SectionCTA
        headline="Ready to Fix How Your Business Operates?"
        supporting="Start with a structured operational review. No long-term commitment required."
        showDiagnostic={true}
      />
    </div>
  );
}

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
    { title: "Organizational & Team Restructuring | Zenphry" },
    {
      name: "description",
      content:
        "Realign people, roles, and decision-making structures so your organization can execute efficiently and scale without friction.",
    },
  ];
};

const pillars = [
  {
    name: "Organizational Assessment and Role Clarity",
    items: [
      "Review org structure and reporting lines",
      "Assess role clarity and responsibility overlap",
      "Identify ownership gaps and execution bottlenecks",
      "Evaluate span of control and leadership capacity",
    ],
  },
  {
    name: "Target Organization Design",
    items: [
      "Design target org structure aligned to strategy",
      "Balance centralized and decentralized decision making",
      "Define leadership layers and reporting lines",
      "Ensure structure supports execution at scale",
    ],
  },
  {
    name: "Role Definition and Responsibility Mapping",
    items: [
      "Define role mandates and expected outcomes",
      "Clarify expectations and success measures",
      "Remove ambiguity and responsibility overlap",
      "Align roles to workflows and operational KPIs",
    ],
  },
  {
    name: "Decision Rights and Escalation Models",
    items: [
      "Define who decides, who contributes, and who executes",
      "Create decision rights frameworks for key processes",
      "Establish escalation paths and thresholds",
      "Reduce unnecessary approvals and leadership bottlenecks",
    ],
  },
  {
    name: "Team Operating Model and Ways of Working",
    items: [
      "Define how teams collaborate and hand off work",
      "Align team structure to operational workflows",
      "Establish working agreements and team norms",
      "Reduce coordination overhead and friction",
    ],
  },
  {
    name: "Leadership Alignment and Capability Enablement",
    items: [
      "Facilitate leadership alignment sessions",
      "Clarify leadership responsibilities and mandates",
      "Identify capability gaps and leadership overload",
      "Support leaders through organizational transition",
    ],
  },
];

const faqs = [
  {
    q: "Is this about layoffs or reducing headcount?",
    a: "No. Organizational restructuring at Zenphry is focused on how roles, responsibilities, and decision-making are structured — not headcount reduction. The goal is clarity and efficiency, not cuts.",
  },
  {
    q: "How do you handle team dynamics and organizational politics?",
    a: "We acknowledge them and plan for them. Org restructuring always surfaces tensions. Zenphry works closely with leadership to understand the human context and designs change approaches that are transparent and practical.",
  },
  {
    q: "Can this be done while the business is still growing rapidly?",
    a: "Yes — in fact, that is often the best time. Structural clarity built ahead of scale prevents the chaos that typically sets in when growth outpaces organizational design.",
  },
  {
    q: "What is the difference between this and an HR function?",
    a: "HR manages people processes, compliance, and culture. Zenphry restructures how organizations are designed to operate — roles, decision rights, workflows, and governance. The two are complementary, not the same.",
  },
];

export default function ServiceOrganizational() {
  return (
    <div>
      <PageHero
        headline="Organizational & Team Restructuring"
        subtitle="Realign people, roles, and decision-making structures for efficient execution."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Organizational & Team Restructuring" },
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
              Organizational and Team Restructuring focuses on realigning people,
              roles, and decision-making structures so the organization can execute
              efficiently and scale without friction. This is practical
              restructuring built around how work actually gets done — not
              headcount reduction or theoretical org design.
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
              "Organizations with unclear roles and overlapping responsibilities",
              "Businesses with over-reliance on founders or senior leaders",
              "Teams experiencing slow or inconsistent decision making",
              "Organizations where accountability is assumed but not defined",
              "Companies scaling without intentional organizational structure",
              "Teams working hard but not moving fast enough",
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
        headline="Ready to Realign Your Organization?"
        supporting="Build the structure that allows your team to execute with clarity."
        showDiagnostic={true}
      />
    </div>
  );
}

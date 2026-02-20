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
    { title: "Growth & Scale Readiness | Zenphry" },
    {
      name: "description",
      content:
        "Prepare your business to grow without losing control. Restructure your operating model, governance, and leadership cadence for sustainable, intentional scale.",
    },
  ];
};

const pillars = [
  {
    name: "Growth Readiness Assessment",
    items: [
      "Assess execution maturity across the organization",
      "Evaluate leadership capacity and existing bottlenecks",
      "Review structure, systems, and workflows for scale risk",
      "Identify the highest risks to sustainable growth",
    ],
  },
  {
    name: "Target Operating Model Design",
    items: [
      "Design a future-ready operating model",
      "Align structure, workflows, and systems to growth goals",
      "Define how work should flow at the next stage of scale",
      "Balance operational flexibility with governance and control",
    ],
  },
  {
    name: "Capacity and Resource Planning",
    items: [
      "Map workload to actual team capacity",
      "Define hiring and resourcing triggers",
      "Identify where automation or restructuring reduces headcount pressure",
      "Prevent over-hiring or under-resourcing during growth",
    ],
  },
  {
    name: "Governance and Escalation Frameworks",
    items: [
      "Define decision rights as the organization scales",
      "Establish escalation thresholds and response protocols",
      "Reduce leadership bottlenecks in growing teams",
      "Clarify what decisions sit where across the organization",
    ],
  },
  {
    name: "Leadership Cadence and KPI Packs",
    items: [
      "Design leadership review cadence for scale",
      "Define growth-relevant KPIs across functions",
      "Create executive KPI packs for consistent reviews",
      "Align leadership reviews to action, not just reporting",
    ],
  },
  {
    name: "Founder and Executive Dependency Reduction",
    items: [
      "Identify founder and executive execution bottlenecks",
      "Redesign ownership and delegation models",
      "Support leadership transition and empowerment",
      "Ensure organizational continuity without centralization",
    ],
  },
  {
    name: "Scale Enablement and Reinforcement",
    items: [
      "Support adoption of new structures and working models",
      "Reinforce accountability through governance cadence",
      "Monitor execution as scale increases",
      "Adjust the operating model as needs evolve",
    ],
  },
];

const faqs = [
  {
    q: "When is the right time to engage this service?",
    a: "Ideally before growth starts to strain your operations. If you are already experiencing scaling pains — frequent escalations, leadership bottlenecks, quality declining as volume increases — you need it now. The earlier you build the structure, the less damage growth causes.",
  },
  {
    q: "How is this different from a growth strategy consultant?",
    a: "Growth strategy consultants focus on where to grow — markets, products, channels. Zenphry focuses on how your organization operates at scale. This is operational and structural readiness, not market strategy.",
  },
  {
    q: "What if we are already experiencing rapid growth?",
    a: "We can work alongside active growth. Restructuring during rapid growth requires careful sequencing so we do not slow execution. We prioritize the highest-risk areas first and phase changes to minimize disruption.",
  },
  {
    q: "How does this work alongside existing leadership?",
    a: "Entirely in partnership with your leadership team. We do not replace leadership — we restructure the systems, governance, and operating models they work within, and transfer ownership fully by the end of the engagement.",
  },
];

export default function ServiceScale() {
  return (
    <div>
      <PageHero
        headline="Growth & Scale Readiness"
        subtitle="Build the operating foundation your company needs to scale past the next inflection point without chaos."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Growth & Scale Readiness" },
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
                Growth and Scale Readiness prepares a business to grow without
                losing control. Zenphry restructures the operating model,
                governance, systems, and leadership cadence so growth is
                intentional, controlled, and sustainable. This service is about
                building the structure before growth exposes the cracks.
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
                "Organizations growing quickly but feeling increasing operational strain",
                "Businesses experiencing frequent escalations as they scale",
                "Teams depending too heavily on founders or senior leaders",
                "Organizations lacking clarity on how to add headcount, systems, or capacity",
                "Businesses preparing for expansion into new markets or higher complexity",
                "Leadership teams who want growth without chaos, burnout, or loss of quality",
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

      <SectionCTA
        headline="Ready to Build for Scale?"
        supporting="Build the operating model that lets your business grow without breaking."
        showDiagnostic={true}
      />
    </div>
  );
}

import type { MetaFunction } from "react-router";

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
    { title: "FAQ | Zenphry" },
    {
      name: "description",
      content:
        "Answers to common questions about Zenphry's restructuring services, engagements, and approach.",
    },
  ];
};

const categories = [
  {
    heading: "About Zenphry",
    items: [
      {
        q: "What is Zenphry?",
        a: "Zenphry is an operator-led business restructuring firm. We help organizations fix their operations, realign their teams, rebuild their systems, and establish the governance and discipline needed to execute consistently and scale sustainably.",
      },
      {
        q: "How is Zenphry different from a traditional consulting firm?",
        a: "Traditional consulting firms typically deliver recommendations and leave. Zenphry implements. Our engagements are led by operators — people who have held operational and leadership roles inside real businesses — and we stay through implementation until the new structure is running and owned by your team.",
      },
      {
        q: "What industries does Zenphry work with?",
        a: "Zenphry works across industries. Operational, organizational, financial, and technology dysfunction is not industry-specific. Our frameworks apply to any business that needs to execute more consistently, scale more deliberately, or recover from operational breakdown.",
      },
      {
        q: "How long does a typical engagement take?",
        a: "It depends on scope. A Restructuring Diagnostic takes 2-3 weeks. Implementation engagements range from 4-6 weeks (Foundation) to 3-6 months (Enterprise Transformation). Technology and systems engagements vary by complexity.",
      },
      {
        q: "Can Zenphry work remotely?",
        a: "Yes. Zenphry engagements can be conducted fully remotely via video calls, asynchronous collaboration, and digital tools. On-site work is available where preferred or required.",
      },
    ],
  },
  {
    heading: "Services",
    items: [
      {
        q: "Where do I start if I am not sure what I need?",
        a: "Start with the Restructuring Diagnostic. It is a 2-3 week structured assessment that identifies root causes of operational breakdown, maps priorities, and gives you a clear roadmap before any implementation begins.",
      },
      {
        q: "Does Zenphry only work on one area at a time?",
        a: "Most engagements focus on one or two areas at a time to ensure depth and adoption. Trying to restructure operations, organization, and technology simultaneously is rarely effective. We scope engagements deliberately to get traction before expanding.",
      },
      {
        q: "What is the difference between Operational and Organizational Restructuring?",
        a: "Operational Restructuring focuses on how work flows — processes, workflows, SOPs, execution cadence. Organizational Restructuring focuses on people structures — roles, decision rights, reporting lines, accountability. They often happen together, but they address different root causes.",
      },
      {
        q: "Does Zenphry provide accounting, tax, or legal services?",
        a: "No. Zenphry's Financial Execution Discipline service focuses on the operational mechanics of financial governance — budgeting, spend controls, approval workflows, and KPIs. We do not provide accounting, tax advisory, legal, or investment services.",
      },
    ],
  },
  {
    heading: "Technology & Systems",
    items: [
      {
        q: "Does Zenphry recommend or resell specific software?",
        a: "No. Zenphry does not resell software or receive vendor commissions. All recommendations are based entirely on your operational needs, existing systems, and budget.",
      },
      {
        q: "Can Zenphry work with our existing systems rather than replacing them?",
        a: "Yes. Most technology engagements involve restructuring and optimizing existing tools rather than replacing them. We start with a full assessment of your current stack before recommending any changes.",
      },
      {
        q: "What cloud platforms does Zenphry work with?",
        a: "Zenphry works with Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We also work with on-premise and hybrid infrastructure depending on your environment.",
      },
    ],
  },
  {
    heading: "Engagements & Working Together",
    items: [
      {
        q: "How does a Zenphry engagement begin?",
        a: "Every engagement starts with a discovery call to understand your situation, challenges, and goals. From there, we define scope, agree on outcomes, and begin with a structured kickoff. No engagement starts without clear alignment on what success looks like.",
      },
      {
        q: "Will a restructuring engagement disrupt our current operations?",
        a: "Engagements are designed to minimize disruption. We map current state before proposing changes and phase implementation to keep operations running throughout. Change is managed, not forced.",
      },
      {
        q: "What happens after the engagement ends?",
        a: "Zenphry builds structures that your team owns and operates independently. We document everything, train your people, and hand off fully. Post-engagement support is available through the Advisory Retainer for teams that want ongoing oversight.",
      },
      {
        q: "Is the Restructuring Diagnostic required before other services?",
        a: "Recommended but not required. The Diagnostic ensures we focus on the right problems before committing to implementation. Some clients already know what needs to change and start directly with an implementation engagement.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div>
      <PageHero
        headline="Frequently Asked Questions"
        subtitle="Common questions about Zenphry, our services, and how engagements work."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources/faq" },
          { label: "FAQ" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {categories.map((category, ci) => (
              <div key={ci}>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
                  {category.heading}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, ii) => (
                    <AccordionItem key={ii} value={`${ci}-${ii}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent>{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Still Have Questions?"
        supporting="Schedule a conversation and we will walk you through exactly how an engagement would work for your situation."
        showDiagnostic={false}
      />
    </div>
  );
}

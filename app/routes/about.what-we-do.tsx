import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "What We Do | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry helps organizations fix execution breakdowns through operational restructuring, organizational alignment, and implementation support.",
    },
  ];
};

const triggerScenarios = [
  {
    title: "Growth has outpaced your operations",
    description:
      "Revenue is climbing but delivery is slipping. What worked at 10 people breaks at 50. Processes that were informal now cause bottlenecks.",
  },
  {
    title: "The founder is the bottleneck",
    description:
      "Every decision routes through one person. The team waits for approvals, and progress stalls whenever the founder is unavailable.",
  },
  {
    title: "Teams are busy but nothing ships",
    description:
      "Everyone is working hard but outcomes are unclear. Projects stall, priorities shift weekly, and accountability is murky.",
  },
  {
    title: "Departments operate in silos",
    description:
      "Sales, ops, and engineering have conflicting goals. Work gets duplicated, communication breaks down, and customers feel the friction.",
  },
  {
    title: "A restructuring or turnaround is needed",
    description:
      "Costs are out of control, margins are shrinking, or the business model needs rethinking. You need an operator, not a slide deck.",
  },
  {
    title: "Post-acquisition or leadership transition",
    description:
      "New leadership inherits a fragmented organization. Systems, teams, and priorities need to be realigned under a unified operating model.",
  },
];

const serviceAreas = [
  {
    title: "Operational Restructuring",
    description:
      "We diagnose and redesign how work gets done. Workflows, handoffs, tools, and processes are rebuilt to eliminate waste and restore execution speed.",
  },
  {
    title: "Organizational Alignment",
    description:
      "We clarify roles, decision-making authority, and accountability structures so every team member knows who owns what and what success looks like.",
  },
  {
    title: "Leadership & Governance Design",
    description:
      "We build governance cadences, meeting rhythms, and reporting structures that give leadership visibility and control without micromanagement.",
  },
  {
    title: "Technology & Systems Rationalization",
    description:
      "We audit your tech stack, eliminate redundancies, and ensure your tools support your operations instead of creating more complexity.",
  },
  {
    title: "Execution Frameworks",
    description:
      "We implement structured frameworks for planning, prioritization, and delivery so that strategy translates into measurable execution.",
  },
  {
    title: "Implementation Support",
    description:
      "We stay involved through execution. We do not hand off a plan and disappear. We work alongside your team until changes show up in results.",
  },
];

const doNotDoItems = [
  "We do not deliver slide decks and walk away. Every engagement includes implementation support.",
  "We are not a staffing agency. We restructure how your team works, not replace them.",
  "We do not offer generic business coaching or motivational advisory.",
  "We are not management consultants who bill for research. We are operators who fix what is broken.",
];

export default function WhatWeDo() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            What We Do
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Zenphry helps organizations fix execution breakdowns by
            restructuring how they operate, make decisions, and deliver results.
            We work with founders, executives, and leadership teams to replace
            chaos with clarity.
          </p>
        </div>

        {/* When Clients Work With Zenphry */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              When Clients Work With Zenphry
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Organizations typically engage us when they recognize one or more
              of these situations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {triggerScenarios.map((scenario, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {scenario.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Actually Do */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              What We Actually Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our work spans six core areas, tailored to each client's specific
              situation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviceAreas.map((area, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Do Not Do */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              What We Do Not Do
            </h2>
            <div className="space-y-4">
              {doNotDoItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50/75 dark:bg-gray-800/75 rounded-lg"
                >
                  <span className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0">
                    &mdash;
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Fix What is Broken?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Book a discovery call to discuss your specific situation and find
            out how Zenphry can help.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Book a Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

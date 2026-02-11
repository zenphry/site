import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { PillarSection } from "~/components/pillar-section";
import { ArrowLeft, Check } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Operational Restructuring | Zenphry" },
    {
      name: "description",
      content:
        "Restructure operations so work moves predictably, ownership is clear, and results are repeatable. Replace chaos with defined processes and measurable outcomes.",
    },
  ];
};

const whoItsFor = [
  "Miss deadlines despite hardworking teams",
  "Rely on tribal knowledge instead of clear processes",
  "Experience constant firefighting and escalation",
  "Struggle with handoffs between teams",
  "Have no consistent execution cadence",
  "Lack visibility into operational performance",
];

const pillars = [
  {
    number: 1,
    title: "End-to-End Process Mapping",
    items: [
      "Identify critical business workflows",
      "Map current-state processes across teams",
      "Expose bottlenecks, delays, and rework",
      "Highlight ownership gaps and handoff failures",
    ],
  },
  {
    number: 2,
    title: "Workflow Redesign and Optimization",
    items: [
      "Redesign workflows to remove waste",
      "Simplify approvals and handoffs",
      "Align work to actual capacity",
      "Reduce unnecessary meetings and rework",
    ],
  },
  {
    number: 3,
    title: "Standard Operating Procedures (SOPs)",
    items: [
      "Document critical workflows",
      "Define execution standards",
      "Create role-specific SOPs",
      "Ensure SOPs are usable and accessible",
    ],
  },
  {
    number: 4,
    title: "Execution Cadence and Governance",
    items: [
      "Design execution rhythm (daily, weekly, monthly)",
      "Define meeting purpose and outcomes",
      "Establish escalation paths",
      "Align leadership review cycles",
    ],
  },
  {
    number: 5,
    title: "KPI Definition and Operational Visibility",
    items: [
      "Define operational KPIs tied to execution",
      "Align metrics to workflows and outcomes",
      "Implement reporting and dashboards",
      "Train teams to use data in reviews",
    ],
  },
  {
    number: 6,
    title: "Ownership and Accountability Alignment",
    items: [
      "Assign clear ownership to processes",
      "Define accountability for outcomes",
      "Align roles with responsibilities",
      "Reinforce ownership through cadence",
    ],
  },
];

export default function ServiceFoundation() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="fixed bottom-4 left-4 z-50">
          <Button asChild variant="outline" size="sm" className="shadow-lg bg-white dark:bg-gray-900">
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Operational Restructuring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Fix how work flows through your business. Replace chaos with defined
            processes, execution rhythm, and measurable outcomes.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>

        {/* What This Service Is */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What This Service Is
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              When execution slows, deadlines slip, and teams spend more time
              coordinating than delivering, the issue is rarely effort. It is
              structure.
            </p>
            <p>
              Zenphry restructures operations so work moves predictably,
              ownership is clear, and results are repeatable.
            </p>
          </div>
        </div>

        {/* Who This Service Is For */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Who This Service Is For
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This service is designed for organizations that:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {whoItsFor.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-3">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {item}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            What Zenphry Actually Does
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Zenphry delivers Operational Restructuring across six operational
            pillars.
          </p>
          <PillarSection pillars={pillars} />
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Fix Your Operations?
          </h2>
          <p className="mb-6">
            If execution is inconsistent and teams are spending more time
            coordinating than delivering, start with a strategy call.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

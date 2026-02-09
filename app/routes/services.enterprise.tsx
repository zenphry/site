import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Check } from "lucide-react";

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

const whoItsFor = [
  "Have unclear roles and overlapping responsibilities",
  "Rely too heavily on founders or senior leaders",
  "Experience slow or inconsistent decision making",
  "Struggle with accountability across teams",
  "Are scaling without an intentional org structure",
  "Have teams working hard but not moving fast",
];

const pillars = [
  {
    number: 1,
    title: "Organizational Assessment and Role Clarity",
    items: [
      "Review current org structure and reporting lines",
      "Assess role clarity and overlap",
      "Identify ownership gaps and bottlenecks",
      "Evaluate span of control and workload balance",
    ],
  },
  {
    number: 2,
    title: "Target Organization Design",
    items: [
      "Design a target org structure aligned to strategy",
      "Balance centralized and decentralized decision making",
      "Define leadership layers and reporting lines",
      "Ensure structure supports current and near-term scale",
    ],
  },
  {
    number: 3,
    title: "Role Definition and Responsibility Mapping",
    items: [
      "Define role mandates and outcomes",
      "Clarify expectations and success measures",
      "Remove ambiguity and overlap",
      "Align roles to workflows and KPIs",
    ],
  },
  {
    number: 4,
    title: "Decision Rights and Escalation Models",
    items: [
      "Define who decides, who contributes, and who executes",
      "Create decision rights frameworks",
      "Establish escalation paths and thresholds",
      "Reduce unnecessary approvals and delays",
    ],
  },
  {
    number: 5,
    title: "Team Operating Model and Ways of Working",
    items: [
      "Define how teams collaborate and hand off work",
      "Align team structure to workflows",
      "Establish working agreements and norms",
      "Reduce coordination overhead",
    ],
  },
  {
    number: 6,
    title: "Leadership Alignment and Capability Enablement",
    items: [
      "Facilitate leadership alignment sessions",
      "Clarify leadership responsibilities",
      "Identify capability gaps and overload",
      "Support leaders through transition",
    ],
  },
];

export default function ServiceEnterprise() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Organizational & Team Restructuring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Realign people, roles, and decision-making structures so your
            organization can execute efficiently and scale without friction.
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
              When teams are unclear on ownership, leaders become bottlenecks,
              and decisions stall, performance suffers. Zenphry restructures
              organizations to create clarity, accountability, and momentum.
            </p>
            <p>
              This is not headcount reduction or theoretical org design. It is
              practical restructuring built around how work actually gets done.
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
            Zenphry delivers Organizational and Team Restructuring across core
            pillars.
          </p>
          <div className="space-y-10">
            {pillars.map((pillar) => (
              <div key={pillar.number}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {pillar.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white pt-1">
                    {pillar.title}
                  </h3>
                </div>
                <div className="ml-14 grid md:grid-cols-2 gap-3">
                  {pillar.items.map((item, index) => (
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
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Realign Your Organization?
          </h2>
          <p className="mb-6">
            If unclear roles or slow decisions are limiting performance, start
            with a strategy call to assess where restructuring will have the
            greatest impact.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Check, X } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Financial Execution Discipline | Zenphry" },
    {
      name: "description",
      content:
        "Restructure how money is planned, tracked, and governed inside day-to-day operations. Align spending with priorities and keep execution controlled.",
    },
  ];
};

const whoItsFor = [
  "Do not clearly understand where money is being spent",
  "Have budgets that do not reflect real operations",
  "Approve spending reactively instead of intentionally",
  "Lack visibility into cost drivers and inefficiencies",
  "Struggle to connect financial data to execution decisions",
  "Experience margin erosion without clear explanation",
];

const notIncluded = [
  "Accounting services",
  "Tax advisory",
  "Capital or debt restructuring",
  "Financial planning or investment advice",
  "Insolvency or legal services",
];

const pillars = [
  {
    number: 1,
    title: "Cost and Spend Visibility Mapping",
    items: [
      "Map costs to operational workflows",
      "Categorize spend by function, activity, and outcome",
      "Identify high-cost, low-value activities",
      "Expose hidden or uncontrolled spending patterns",
    ],
  },
  {
    number: 2,
    title: "Operational Budgeting and Forecasting Redesign",
    items: [
      "Redesign budgeting processes to reflect real operations",
      "Align budgets to teams, workflows, and capacity",
      "Simplify forecasting assumptions",
      "Reduce over-complex or unused budget models",
    ],
  },
  {
    number: 3,
    title: "Approval Workflows and Spend Controls",
    items: [
      "Design approval workflows tied to thresholds",
      "Define who can approve what and when",
      "Reduce unnecessary approvals",
      "Introduce controls without slowing execution",
    ],
  },
  {
    number: 4,
    title: "Financial Execution KPIs",
    items: [
      "Define KPIs that connect cost to execution",
      "Align metrics to operational outcomes",
      "Establish regular review cadence",
      "Ensure KPIs are actionable, not vanity metrics",
    ],
  },
  {
    number: 5,
    title: "Leadership Review Cadence and Governance",
    items: [
      "Establish regular financial execution reviews",
      "Align leadership discussions to data",
      "Separate operational decisions from reactive spending",
      "Create clear accountability for corrective action",
    ],
  },
  {
    number: 6,
    title: "Behavior and Decision Reinforcement",
    items: [
      "Reinforce disciplined spending behaviors",
      "Align incentives and accountability",
      "Support leaders through behavior change",
      "Ensure new processes are adopted",
    ],
  },
];

export default function ServiceFinancial() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Financial Execution Discipline
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Restructure how money is planned, tracked, and governed inside
            day-to-day operations so spending aligns with priorities and
            execution stays controlled.
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
              Many businesses do not have a finance problem. They have an
              execution problem tied to money.
            </p>
            <p>
              Costs are approved without context. Budgets are disconnected from
              operations. Leaders do not see where money is going until it is
              too late. Zenphry restructures the operational mechanics around
              financial decisions so spending aligns with priorities and
              execution stays controlled.
            </p>
            <p>
              This service improves financial clarity and discipline, not
              financial advisory outcomes.
            </p>
          </div>
        </div>

        {/* What This Service Is Not */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What This Service Is Not
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To be explicit and transparent, Zenphry does not provide:
          </p>
          <div className="space-y-2">
            {notIncluded.map((item, index) => (
              <div key={index} className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            We focus exclusively on operational financial execution.
          </p>
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
            Zenphry delivers Financial Execution Discipline across six execution
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
            Ready to Take Control of Financial Execution?
          </h2>
          <p className="mb-6">
            If spending is disconnected from priorities and budgets do not
            reflect real operations, start with a strategy call.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

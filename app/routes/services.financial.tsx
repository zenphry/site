import type { MetaFunction } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { PillarSection } from "~/components/pillar-section";
import { Check, X } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

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
    <div>
      <PageHero
        headline="Financial Execution Discipline"
        subtitle="Build budgeting systems, cost visibility, and financial review rhythms that give leadership real control."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Financial Execution Discipline" },
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
                Many businesses do not have a finance problem. They have an
                execution problem tied to money.
              </p>
              <p>
                Costs are approved without context. Budgets are disconnected
                from operations. Leaders do not see where money is going until
                it is too late. Zenphry restructures the operational mechanics
                around financial decisions so spending aligns with priorities
                and execution stays controlled.
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
                  <span className="text-gray-600 dark:text-gray-400">
                    {item}
                  </span>
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
              Zenphry delivers Financial Execution Discipline across six
              execution pillars.
            </p>
            <PillarSection pillars={pillars} />
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Ready to Take Control of Financial Execution?"
        supporting="If spending is disconnected from strategy, we build the systems that close that gap."
        showDiagnostic={true}
      />
    </div>
  );
}

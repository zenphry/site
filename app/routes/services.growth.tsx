import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { PillarSection } from "~/components/pillar-section";
import { ArrowLeft, Check } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Growth & Scale Readiness | Zenphry" },
    {
      name: "description",
      content:
        "Prepare your business to grow without losing control. Restructure the operating model, governance, systems, and leadership cadence for sustainable scale.",
    },
  ];
};

const whoItsFor = [
  "Are growing quickly but feel increasing operational strain",
  "Experience frequent escalations as the business scales",
  "Depend too heavily on founders or senior leaders",
  "Lack clarity on how to add headcount, systems, or capacity",
  "Are preparing for expansion, new markets, or higher complexity",
  "Want growth without chaos, burnout, or loss of quality",
];

const pillars = [
  {
    number: 1,
    title: "Growth Readiness Assessment",
    items: [
      "Assess current execution maturity",
      "Evaluate leadership capacity and bottlenecks",
      "Review structure, systems, and workflows",
      "Identify risks to scalability",
    ],
  },
  {
    number: 2,
    title: "Target Operating Model Design",
    items: [
      "Design a future-ready operating model",
      "Align structure, workflows, and systems to growth goals",
      "Define how work should flow at the next stage of scale",
      "Balance flexibility with control",
    ],
  },
  {
    number: 3,
    title: "Capacity and Resource Planning",
    items: [
      "Map workload to capacity",
      "Define hiring and resourcing triggers",
      "Identify where automation or restructuring reduces headcount pressure",
      "Prevent over-hiring or under-resourcing",
    ],
  },
  {
    number: 4,
    title: "Governance and Escalation Frameworks",
    items: [
      "Define decision rights as the organization scales",
      "Establish escalation thresholds",
      "Reduce leadership bottlenecks",
      "Clarify what decisions sit where",
    ],
  },
  {
    number: 5,
    title: "Leadership Cadence and KPI Packs",
    items: [
      "Design leadership review cadence",
      "Define scale-relevant KPIs",
      "Create executive KPI packs",
      "Align reviews to action, not reporting",
    ],
  },
  {
    number: 6,
    title: "Founder and Executive Dependency Reduction",
    items: [
      "Identify founder or executive bottlenecks",
      "Redesign ownership and delegation models",
      "Support leadership transition and empowerment",
      "Ensure continuity without centralization",
    ],
  },
  {
    number: 7,
    title: "Scale Enablement and Reinforcement",
    items: [
      "Support adoption of new structures",
      "Reinforce accountability through cadence",
      "Monitor execution as scale increases",
      "Adjust operating model as needed",
    ],
  },
];

export default function ServiceGrowth() {
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
            Growth & Scale Readiness
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Prepare your business to grow without losing control. Build the
            structure before growth exposes the cracks.
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
              Many organizations grow revenue before they grow structure. As a
              result, execution breaks down, leaders become bottlenecks, teams
              overload, systems fail to scale, and performance becomes
              unpredictable.
            </p>
            <p>
              Zenphry restructures the operating model, governance, systems, and
              leadership cadence so growth is intentional, controlled, and
              sustainable.
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
            Zenphry delivers Growth and Scale Readiness across seven execution
            pillars.
          </p>
          <PillarSection pillars={pillars} />
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Scale With Control?
          </h2>
          <p className="mb-6">
            If growth is creating strain and your structure is not keeping pace,
            start with a strategy call to assess what needs to change.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Book a Strategy Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

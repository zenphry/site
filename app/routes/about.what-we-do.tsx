import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { CheckCircle } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "About | Zenphry" },
    {
      name: "description",
      content:
        "Operator-led business restructuring with practical implementation focus.",
    },
  ];
};

export default function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            About Zenphry
          </h1>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Zenphry works with founders, executives, and leadership teams to
              restructure how their businesses operate. We focus on operational
              clarity, organizational alignment, and execution discipline.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Our work removes inefficiencies, restores accountability, and
              replaces chaos with systems that support growth.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We do not deliver slide decks and walk away. We diagnose problems,
              redesign operating models, and stay involved through
              implementation so results show up in execution.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What Makes Zenphry Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[
              "Operator-led and execution focused",
              "Structured frameworks, not generic advice",
              "Clear scope, measurable outcomes, accountability",
              "Built for real businesses, not theory",
              "Implementation support, not just recommendations",
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-start p-4">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Our Values
          </h2>
          <div className="space-y-4 mb-12">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Clarity
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We bring structure and visibility to chaos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Accountability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Everyone knows who owns what and what success looks like.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Execution
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We stay involved until changes show up in results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Measurable Outcomes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We track progress against clear KPIs and deliverables.
              </p>
            </div>
          </div>

          <div className="text-center bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Work Together?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book a discovery call to discuss your specific situation.
            </p>
            <Button asChild size="lg">
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
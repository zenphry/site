import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "About Zenphry | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry is an operator-led business restructuring firm helping companies fix broken operations, realign teams, and build execution systems that scale.",
    },
  ];
};

export default function About() {
  return (
    <div>
      <PageHero
        headline="About Zenphry"
        subtitle="Operator-led restructuring from people who have done this work from the inside."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-12">
              <p>
                Zenphry is a business restructuring firm that helps operators
                fix broken operations, realign teams, and build execution
                systems that scale. Every engagement is led by practitioners who
                have done this work from inside real organizations — not
                consultants observing from the outside.
              </p>
              <p>
                We work across operational restructuring, organizational design,
                technology systems, financial execution, and growth readiness.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                to="/about/what-we-do"
                className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg hover:border-primary border border-transparent transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What We Do
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  How Zenphry approaches restructuring engagements.
                </p>
              </Link>
              <Link
                to="/about/team"
                className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg hover:border-primary border border-transparent transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Team
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The operators leading Zenphry engagements.
                </p>
              </Link>
              <Link
                to="/about/vision"
                className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg hover:border-primary border border-transparent transition-colors"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Vision &amp; Values
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The principles that guide every engagement.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Work with Operators, Not Consultants"
        supporting="Every Zenphry engagement is led by practitioners with real operational experience."
        showDiagnostic={false}
      />
    </div>
  );
}

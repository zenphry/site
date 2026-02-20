import type { MetaFunction } from "react-router";

import { Card, CardContent } from "~/components/ui/card";
import { Check } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Vision & Values | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry exists to help businesses build the operational foundation to execute with clarity, accountability, and sustainable results.",
    },
  ];
};

const values = [
  {
    name: "Clarity",
    description:
      "Every engagement starts with a clear-eyed view of what is actually happening inside the business. We do not accept surface explanations. We find root causes.",
  },
  {
    name: "Accountability",
    description:
      "Restructuring without accountability is reorganization theater. We build ownership and accountability into every process, role, and governance structure we design.",
  },
  {
    name: "Execution",
    description:
      "Strategy without execution is noise. Zenphry is built around implementation — not recommendations left for someone else to figure out.",
  },
  {
    name: "Measurable Outcomes",
    description:
      "Every engagement defines what success looks like in measurable terms before work begins. We track outcomes, not activity.",
  },
];

const principles = [
  "We work inside the business, not above it",
  "We tell the truth about what we find, even when it is uncomfortable",
  "We build structures that survive after we leave",
  "We do not create dependency — we create capability",
  "We focus on what matters most, not what is easiest to fix",
  "We measure our success by what changes inside your organization",
];

export default function VisionPage() {
  return (
    <div>
      <PageHero
        headline="Vision & Values"
        subtitle="The principles that guide every engagement and every decision we make."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Values" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Vision */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Vision
            </h2>
            <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Zenphry exists to help businesses build the operational
                foundation to execute with clarity, accountability, and
                sustainable results.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Most businesses do not fail because of bad strategy. They fail
                because their operations, structure, and systems cannot support
                consistent execution. Zenphry restructures the foundation so
                that strategy can actually work.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We believe every business deserves to operate with the same
                structural discipline that high-performing organizations have
                built — regardless of size or stage.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      {value.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How We Operate */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              How We Operate
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-4 rounded"
                >
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Work with a Team That Shares These Values"
        supporting="If this is how you want to work — with clarity, accountability, and measurable outcomes — we should talk."
        showDiagnostic={false}
      />
    </div>
  );
}

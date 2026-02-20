import type { MetaFunction } from "react-router";

import { Card, CardContent } from "~/components/ui/card";
import { BookingModal } from "~/components/booking-modal";
import { Button } from "~/components/ui/button";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Team | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry is built by operators who have led restructuring from inside organizations — not consultants observing from the outside.",
    },
  ];
};

const values = [
  {
    label: "Operator-led",
    description:
      "Every engagement is led by people who have held operational and leadership roles inside real businesses. We know what execution looks like because we have done it.",
  },
  {
    label: "Practitioner-built",
    description:
      "Our frameworks are built from practice, not theory. Every tool, process, and model we use has been tested in real restructuring engagements.",
  },
  {
    label: "Outcome-focused",
    description:
      "We measure success by what changes inside your business — not by deliverables produced or hours billed.",
  },
  {
    label: "No overhead",
    description:
      "Zenphry operates lean. No large staffing pyramid, no account managers between you and the people doing the work.",
  },
];

export default function TeamPage() {
  return (
    <div>
      <PageHero
        headline="Built by Operators"
        subtitle="No consultants. No account managers. Just experienced operators who have done this work."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Who We Are */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Who We Are
            </h2>
            <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Zenphry brings together operators, practitioners, and
                specialists with direct experience leading operational,
                organizational, technology, and financial restructuring inside
                businesses at various stages of growth.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our team does not come from traditional management consulting.
                We come from inside the work — as COOs, heads of operations,
                technology leaders, and execution practitioners who have built
                and restructured organizations from the ground up.
              </p>
            </div>
          </div>

          {/* How We Work */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              How We Work
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leadership Placeholder */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Leadership
            </h2>
            <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Leadership profiles coming soon.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                In the meantime, book a call to speak directly with the team.
              </p>
            </div>
          </div>

          {/* Mid-page CTA */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <BookingModal>
              <Button size="lg">Book a Call</Button>
            </BookingModal>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Work Directly with the People Doing the Work"
        supporting="No account managers or intermediaries — you work directly with the operators running your engagement."
        showDiagnostic={false}
      />
    </div>
  );
}

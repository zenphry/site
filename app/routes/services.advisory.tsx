import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

export const meta: MetaFunction = () => {
  return [
    { title: "Advisory Services | Zenphry" },
    {
      name: "description",
      content:
        "Sustain performance after restructuring. Ongoing monthly engagement.",
    },
  ];
};

export default function ServiceAdvisory() {
  return (
    <div>
      <PageHero
        headline="Advisory Services"
        subtitle="Strategic advisory for founders and operators navigating complex business decisions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Advisory" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Content for Advisory Retainer service will be added here following
              the same pattern as the Diagnostic page.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-primary text-white hover:bg-primary/10 hover:text-white"
            >
              <Link to="/services">&larr; Back to Services</Link>
            </Button>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Explore Advisory Services"
        supporting="Strategic advisory tailored to your stage, your challenges, and your goals."
        showDiagnostic={false}
      />
    </div>
  );
}

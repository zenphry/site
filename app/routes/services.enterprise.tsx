import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Enterprise Transformation | Zenphry" },
    {
      name: "description",
      content:
        "Lead full-scale organizational transformation. 3-6 month engagement.",
    },
  ];
};

export default function ServiceEnterprise() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Enterprise Transformation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Lead full-scale organizational transformation. 3-6 months.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Discuss Enterprise Transformation</Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Content for Enterprise Transformation service will be added here
            following the same pattern as the Diagnostic page.
          </p>
          <Button asChild variant="outline">
            <Link to="/services">← Back to Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

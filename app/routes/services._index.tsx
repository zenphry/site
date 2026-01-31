import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Services | Zenphry" },
    {
      name: "description",
      content:
        "Operational, organizational, and technology restructuring services for businesses at every stage.",
    },
  ];
};

const services = [
  {
    slug: "diagnostic",
    title: "Restructuring Diagnostic",
    duration: "2-3 weeks",
    whoItsFor: "All businesses needing clarity",
    description: "Identify root causes of inefficiency and execution breakdown",
  },
  {
    slug: "foundation",
    title: "Foundation Restructure",
    duration: "4-6 weeks",
    whoItsFor: "Small businesses, early-stage startups",
    description: "Stabilize operations and introduce structure",
  },
  {
    slug: "growth",
    title: "Growth Restructure",
    duration: "8-12 weeks",
    whoItsFor: "Scaling companies, agencies",
    description: "Redesign operations to support scale",
  },
  {
    slug: "enterprise",
    title: "Enterprise Transformation",
    duration: "3-6 months",
    whoItsFor: "Mid-market, complex organizations",
    description: "Lead full-scale organizational transformation",
  },
  {
    slug: "technology",
    title: "Technology & Systems",
    duration: "Varies",
    whoItsFor: "Tech-heavy businesses",
    description: "Remove technology inefficiencies slowing execution",
  },
  {
    slug: "advisory",
    title: "Advisory Retainer",
    duration: "Ongoing",
    whoItsFor: "Post-restructuring optimization",
    description: "Sustain performance after restructuring",
  },
];

export default function ServicesIndex() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Business Restructuring Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Operational, organizational, and technology restructuring for
            businesses at every stage. From diagnostic assessments to full-scale
            transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.slug}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Who it is for:</strong> {service.whoItsFor}
                </p>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/services/${service.slug}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The Restructuring Diagnostic is our recommended entry point for all
            clients.
          </p>
          <Button asChild size="lg">
            <Link to="/services/diagnostic">Request the Diagnostic</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

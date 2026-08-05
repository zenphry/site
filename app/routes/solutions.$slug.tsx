import type { MetaFunction } from "react-router";
import { Link, useParams } from "react-router";
import { CheckCircle } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getSolution, solutions } from "~/lib/solutions";

export const meta: MetaFunction = ({ params }) => {
  const solution = getSolution(params.slug);

  if (!solution) {
    return [{ title: "Solution Not Found | Zenphry" }];
  }

  return [
    { title: `${solution.title} | Zenphry` },
    { name: "description", content: solution.summary },
  ];
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = getSolution(slug);

  if (!solution) {
    throw new Response("Not Found", { status: 404 });
  }

  return (
    <div>
      <PageHero
        headline={solution.title}
        subtitle={solution.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.label },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 space-y-4 text-gray-600 dark:text-gray-300">
            <p>{solution.description}</p>
          </div>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              What Zenphry Delivers
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {solution.outcomes.map((outcome) => (
                <Card key={outcome.title}>
                  <CardHeader>
                    <CardTitle className="text-lg">{outcome.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {outcome.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              Common Use Cases
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Practical applications for teams with similar operating needs.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {solution.useCases.map((useCase) => (
                <Card key={useCase.title}>
                  <CardHeader>
                    <CheckCircle className="h-5 w-5 text-primary mb-2" />
                    <CardTitle className="text-base">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {useCase.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {solution.faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <div className="max-w-4xl mx-auto text-center">
            <Button asChild size="lg">
              <Link to="/contact">Discuss this solution</Link>
            </Button>
          </div>

          <section className="max-w-5xl mx-auto mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Other Solutions
            </h2>
            <div className="flex flex-wrap gap-3">
              {solutions
                .filter((item) => item.slug !== solution.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    to={`/solutions/${item.slug}`}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>

      <SectionCTA
        headline={`Ready to Discuss ${solution.label}?`}
        supporting="Zenphry will help you define the technical scope, operational model, and next steps."
        showDiagnostic={false}
      />
    </div>
  );
}

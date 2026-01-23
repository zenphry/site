import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Case Studies | Zenphry' },
    {
      name: 'description',
      content: 'Real-world scenarios of business restructuring and transformation outcomes.',
    },
  ];
};

const scenarios = [
  {
    slug: 'saas-scaling',
    title: 'SaaS Company Scaling Challenges',
    industry: 'Software (SaaS)',
    situation: 'Rapid growth led to operational chaos and declining customer satisfaction',
    outcome: '40% reduction in support tickets, 25% improvement in NPS',
  },
  {
    slug: 'founder-bottleneck',
    title: 'Founder Bottleneck Removal',
    industry: 'Professional Services',
    situation: 'Founder approval required for all decisions, blocking team execution',
    outcome: 'Founder time freed up by 60%, team velocity doubled',
  },
  {
    slug: 'enterprise-alignment',
    title: 'Enterprise Departmental Alignment',
    industry: 'Manufacturing',
    situation: 'Siloed departments with conflicting priorities and redundant efforts',
    outcome: '30% cost reduction, 50% faster time-to-market',
  },
];

export default function CaseStudiesIndex() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-world scenarios demonstrating how Zenphry helps businesses restructure and
            transform. Names and details anonymized for client confidentiality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {scenarios.map((scenario) => (
            <Card key={scenario.slug}>
              <CardHeader>
                <CardTitle>{scenario.title}</CardTitle>
                <CardDescription>{scenario.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Situation:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {scenario.situation}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      Outcome:
                    </h4>
                    <p className="text-sm text-primary font-semibold">{scenario.outcome}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/case-studies/${scenario.slug}`}>Read Full Scenario</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            See How We Can Help Your Business
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every business is different. Book a call to discuss your specific challenges.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Schedule a Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

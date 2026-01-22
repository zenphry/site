import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { useLoaderData, Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  // Placeholder data - will be replaced with content system later
  const scenarios: Record<string, any> = {
    'saas-scaling': {
      title: 'SaaS Company Scaling Challenges',
      industry: 'Software (SaaS)',
      companySize: '50-100 employees',
      situation:
        'A fast-growing SaaS company experienced rapid customer acquisition but struggled with operational chaos. Support tickets increased 300%, customer satisfaction declined, and internal teams were overwhelmed.',
      rootCauses: [
        'No standardized onboarding process',
        'Support team lacked access to customer data',
        'Product and engineering worked in silos',
        'No clear escalation paths for critical issues',
      ],
      whatZenphryDid: [
        'Mapped end-to-end customer journey and identified bottlenecks',
        'Redesigned support workflows with proper tooling and access',
        'Created cross-functional alignment framework',
        'Implemented weekly operations review cadence',
      ],
      outcomes: [
        '40% reduction in support ticket volume',
        '25% improvement in Net Promoter Score',
        'Support resolution time decreased from 48hrs to 12hrs',
        'Customer churn reduced by 15%',
      ],
    },
    'founder-bottleneck': {
      title: 'Founder Bottleneck Removal',
      industry: 'Professional Services',
      companySize: '20-30 employees',
      situation:
        'Founder approval was required for all client decisions, vendor contracts, and hiring. Team productivity suffered as employees waited days for simple approvals.',
      rootCauses: [
        'Unclear decision-making authority',
        'No documented approval processes',
        'Founder lacked trust in team capabilities',
        'No financial controls or spending limits',
      ],
      whatZenphryDid: [
        'Defined clear decision-making authority by role and dollar amount',
        'Created approval matrix and documented processes',
        'Implemented financial controls and spending limits',
        'Coached founder on delegation and trust-building',
      ],
      outcomes: [
        'Founder time freed up by 60%',
        'Team velocity doubled (measured by project completion rate)',
        'Employee satisfaction increased significantly',
        'Revenue grew 35% within 6 months',
      ],
    },
    'enterprise-alignment': {
      title: 'Enterprise Departmental Alignment',
      industry: 'Manufacturing',
      companySize: '200-500 employees',
      situation:
        'Sales, operations, and engineering departments operated as separate entities with conflicting priorities. Redundant projects and misaligned incentives led to waste.',
      rootCauses: [
        'No shared strategic goals across departments',
        'Competing KPIs and incentive structures',
        'Lack of cross-functional communication',
        'Duplicate technology investments',
      ],
      whatZenphryDid: [
        'Facilitated cross-functional strategy alignment workshops',
        'Redesigned KPI framework with shared objectives',
        'Created governance model with regular cross-department reviews',
        'Rationalized technology stack and eliminated redundancies',
      ],
      outcomes: [
        '30% cost reduction through elimination of duplicate efforts',
        '50% faster time-to-market for new products',
        'Improved interdepartmental collaboration scores',
        'Technology costs reduced by 25%',
      ],
    },
  };

  const scenario = scenarios[slug as string];

  if (!scenario) {
    throw new Response('Not Found', { status: 404 });
  }

  return { scenario, slug };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.scenario.title} | Case Studies | Zenphry` },
    {
      name: 'description',
      content: data?.scenario.situation,
    },
  ];
};

export default function CaseStudyDetail() {
  const { scenario } = useLoaderData<typeof loader>();

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/case-studies"
            className="text-primary hover:underline mb-8 inline-block"
          >
            ← Back to Case Studies
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {scenario.title}
          </h1>

          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-12">
            <span>Industry: {scenario.industry}</span>
            <span>•</span>
            <span>Company Size: {scenario.companySize}</span>
          </div>

          {/* Situation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Situation</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{scenario.situation}</p>
          </section>

          {/* Root Causes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Root Causes Identified
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {scenario.rootCauses.map((cause: string, index: number) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="text-gray-700 dark:text-gray-300">• {cause}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What Zenphry Did */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              What Zenphry Did
            </h2>
            <div className="space-y-3">
              {scenario.whatZenphryDid.map((action: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 pt-1">{action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Outcomes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Outcomes & Metrics
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {scenario.outcomes.map((outcome: string, index: number) => (
                <Card key={index} className="border-primary">
                  <CardContent className="p-4">
                    <p className="text-primary font-semibold">{outcome}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Facing Similar Challenges?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book a discovery call to discuss how Zenphry can help your business.
            </p>
            <Button asChild size="lg">
              <Link to="/book-a-call">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

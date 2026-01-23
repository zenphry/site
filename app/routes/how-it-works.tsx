import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const meta: MetaFunction = () => {
  return [
    { title: 'How It Works | Zenphry' },
    {
      name: 'description',
      content:
        'The Zenphry 5-phase framework: Diagnose, Stabilize, Redesign, Implement, Sustain.',
    },
  ];
};

const phases = [
  {
    number: 1,
    name: 'Diagnose',
    description: 'Identify root causes of inefficiency and execution breakdown',
    deliverables: [
      'Business health assessment',
      'Leadership interviews',
      'Workflow analysis',
      'Priority heat map',
    ],
    timeline: '1-3 weeks',
  },
  {
    number: 2,
    name: 'Stabilize',
    description: 'Reduce immediate chaos and establish baseline structure',
    deliverables: [
      'Quick wins implementation',
      'Role clarity',
      'Communication protocols',
      'Initial KPIs',
    ],
    timeline: '2-4 weeks',
  },
  {
    number: 3,
    name: 'Redesign',
    description: 'Build new operating models and organizational structure',
    deliverables: [
      'Target operating model',
      'Org structure redesign',
      'Process maps and SOPs',
      'Governance framework',
    ],
    timeline: '4-8 weeks',
  },
  {
    number: 4,
    name: 'Implement',
    description: 'Execute changes with hands-on support',
    deliverables: [
      'Change management plan',
      'Team training',
      'System rollout',
      'Performance monitoring',
    ],
    timeline: '4-12 weeks',
  },
  {
    number: 5,
    name: 'Sustain',
    description: 'Lock in results and enable continuous improvement',
    deliverables: [
      'Monthly KPI reviews',
      'Leadership coaching',
      'Continuous optimization',
      'Quarterly health checks',
    ],
    timeline: 'Ongoing',
  },
];

export default function HowItWorks() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            The Zenphry Framework
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our 5-phase approach ensures lasting transformation from diagnosis through sustained
            execution.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          {phases.map((phase) => (
            <Card key={phase.number}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {phase.number}
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{phase.name}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400">{phase.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Deliverables:
                    </h4>
                    <ul className="space-y-1">
                      {phase.deliverables.map((item, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Typical Timeline:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{phase.timeline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Governance Cadence
          </h2>
          <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">
                Weekly Working Session
              </span>
              <span className="text-gray-600 dark:text-gray-400">60 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">
                Biweekly Executive Review
              </span>
              <span className="text-gray-600 dark:text-gray-400">30 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 dark:text-white">Monthly KPI Pack</span>
              <span className="text-gray-600 dark:text-gray-400">Delivered</span>
            </div>
          </div>
        </div>

        <div className="text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin?</h2>
          <p className="mb-6 text-lg">
            Start with a Diagnostic to understand where you are and what needs to change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/services/diagnostic">Request Diagnostic</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

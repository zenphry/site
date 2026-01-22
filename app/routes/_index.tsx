import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ArrowRight, CheckCircle, Target, Users, Zap } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Zenphry | Business Restructuring & Transformation' },
    {
      name: 'description',
      content:
        'Operator-led business restructuring and transformation. Fix broken operations, realign teams, and build execution systems that scale.',
    },
    {
      name: 'keywords',
      content:
        'business restructuring, operational transformation, organizational alignment, execution systems, leadership coaching',
    },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Restructure Operations.
              <br />
              Realign Teams.
              <br />
              <span className="text-primary">Scale with Confidence.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
              Zenphry is a business restructuring and transformation firm that helps companies fix
              broken operations, realign teams, and build execution systems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/book-a-call">
                  Book a Call <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services/diagnostic">Get the Diagnostic</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Proof Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Operator-led
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Execution focused, not consultants
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Structured frameworks
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Not generic advice</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-primary mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Measurable outcomes
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Clear scope, accountability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Problems We Solve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Declining performance and unclear root causes',
              'Leadership lacks operational visibility',
              'Teams lack role clarity and accountability',
              'Growth has stalled or become chaotic',
              'Founder bottlenecks blocking scale',
              'Technology inefficiencies slowing execution',
            ].map((problem, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{problem}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Restructuring Diagnostic</CardTitle>
                <CardDescription>2-3 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Identify root causes of inefficiency and execution breakdown before restructuring
                  begins.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/services/diagnostic">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Foundation & Growth</CardTitle>
                <CardDescription>4-12 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Stabilize operations and introduce structure or redesign operations to support
                  scale.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/services">View Services</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise Transformation</CardTitle>
                <CardDescription>3-6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Lead full-scale organizational transformation across departments.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/services/enterprise">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - 5 Phase Framework */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            The Zenphry Framework
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { phase: 'Diagnose', desc: 'Identify root causes' },
                { phase: 'Stabilize', desc: 'Reduce chaos' },
                { phase: 'Redesign', desc: 'Build new models' },
                { phase: 'Implement', desc: 'Execute changes' },
                { phase: 'Sustain', desc: 'Lock in results' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">
                    {item.phase}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a discovery call or request the Restructuring Diagnostic to identify what needs to
            change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services/diagnostic">Get the Diagnostic</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

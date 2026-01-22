import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Foundation Restructure | Zenphry' },
    {
      name: 'description',
      content: 'Stabilize operations and introduce structure for small businesses. 4-6 week engagement.',
    },
  ];
};

export default function ServiceFoundation() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Foundation Restructure
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Stabilize operations and introduce structure. 4-6 weeks.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Book a Foundation Restructure Call</Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Content for Foundation Restructure service will be added here following the same pattern
            as the Diagnostic page.
          </p>
          <Button asChild variant="outline">
            <Link to="/services">← Back to Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

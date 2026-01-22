import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Technology & Systems Restructuring | Zenphry' },
    {
      name: 'description',
      content: 'Remove technology inefficiencies slowing execution.',
    },
  ];
};

export default function ServiceTechnology() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Technology & Systems Restructuring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Remove technology inefficiencies slowing execution.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Discuss Technology Restructuring</Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Content for Technology & Systems Restructuring service will be added here following the
            same pattern as the Diagnostic page.
          </p>
          <Button asChild variant="outline">
            <Link to="/services">← Back to Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

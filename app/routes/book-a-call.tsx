import type { MetaFunction } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Book a Call | Zenphry' },
    {
      name: 'description',
      content: 'Schedule a discovery call with Zenphry to discuss your business needs.',
    },
  ];
};

export default function BookACall() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Book a Discovery Call
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Schedule a 30-minute call to discuss your business challenges and see how Zenphry can
            help.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Calendly or scheduling embed will be integrated here.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Please provide your Calendly URL or preferred scheduling tool link.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>What to expect:</strong>
            </p>
            <ul className="mt-2 space-y-1">
              <li>• 30-minute discovery call</li>
              <li>• Discussion of your specific challenges</li>
              <li>• Overview of how Zenphry can help</li>
              <li>• Next steps and engagement options</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

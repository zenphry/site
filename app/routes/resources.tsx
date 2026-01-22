import type { MetaFunction } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Resources | Zenphry' },
    {
      name: 'description',
      content: 'Business restructuring resources, guides, and insights from Zenphry.',
    },
  ];
};

export default function Resources() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, guides, and resources for business restructuring and operational
            transformation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Resources, articles, and guides will be published here. Check back soon for content
                on business restructuring best practices, frameworks, and industry insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

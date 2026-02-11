import { Card, CardContent } from "~/components/ui/card";
import { Check } from "lucide-react";

interface Pillar {
  number: number;
  title: string;
  items: string[];
  extra?: {
    label: string;
    items: string[];
  };
}

export function PillarSection({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="space-y-10">
      {pillars.map((pillar) => (
        <div key={pillar.number}>
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              {pillar.number}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white pt-1">
              {pillar.title}
            </h3>
          </div>
          <div className="ml-14 grid md:grid-cols-2 gap-3">
            {pillar.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-3">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {item}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          {pillar.extra && (
            <div className="ml-14 mt-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {pillar.extra.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.extra.items.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm px-3 py-1 rounded text-sm text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

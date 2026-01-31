import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { CheckCircle } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Thank You | Zenphry" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function ThankYou() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Thank You!
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We&apos;ve received your inquiry and will be in touch within 24
            hours.
          </p>

          <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              What Happens Next?
            </h2>
            <ol className="text-left space-y-3 max-w-lg mx-auto">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  You will receive a confirmation email shortly
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Our team will review your information
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  3
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  We will reach out within 24 hours to schedule your discovery
                  call
                </span>
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              While you wait, learn more about our approach:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/how-it-works">How It Works</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/case-studies">View Case Studies</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

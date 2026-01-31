import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Check, X } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Restructuring Diagnostic | Zenphry" },
    {
      name: "description",
      content:
        "Identify root causes of inefficiency and execution breakdown before restructuring begins. 2-3 week engagement.",
    },
  ];
};

export default function ServiceDiagnostic() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Above the Fold */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Restructuring Diagnostic
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Identify root causes of inefficiency and execution breakdown before
            restructuring begins.
          </p>
          <Button asChild size="lg">
            <Link to="/book-a-call">Request the Diagnostic</Link>
          </Button>
        </div>

        {/* Who It Is For */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Who It Is For
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Founder-led businesses",
              "Companies with declining performance",
              "Leadership teams lacking visibility",
              "Organizations preparing for change",
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-4">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Triggers */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Common Triggers
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Performance declining but root causes unclear",
              "Leadership lacks visibility into operations",
              "Teams working hard but results not showing up",
              "Growth has stalled or become chaotic",
              "Multiple initiatives but no clear priorities",
              "High turnover or low team morale",
              "Technology investments not delivering ROI",
            ].map((trigger, index) => (
              <div
                key={index}
                className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-3 rounded text-gray-700 dark:text-gray-300 text-sm"
              >
                • {trigger}
              </div>
            ))}
          </div>
        </div>

        {/* What You Get */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Business health assessment",
              "Leadership interviews",
              "Workflow and process review",
              "Org structure assessment",
              "Financial and operational risk snapshot",
              "KPI gap analysis",
              "Executive diagnostic report",
              "Root cause summary",
              "Priority heat map",
              "30-90 day roadmap",
              "Clear next steps",
            ].map((deliverable, index) => (
              <Card key={index}>
                <CardContent className="flex items-center p-3">
                  <div className="bg-primary/10 rounded p-2 mr-3">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {deliverable}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "Week 1",
                activity: "Data gathering, interviews, workflow observation",
              },
              {
                step: "Week 2",
                activity: "Analysis and root cause identification",
              },
              {
                step: "Week 3",
                activity: "Report delivery and roadmap presentation",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.step}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.activity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline and Engagement */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Timeline & Engagement
          </h2>
          <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Duration
                </h3>
                <p className="text-gray-600 dark:text-gray-400">2-3 weeks</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Time Commitment
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  5-10 hours total (interviews and review sessions)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What Is NOT Included */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What Is NOT Included
          </h2>
          <div className="space-y-2">
            {[
              "Implementation of recommendations",
              "Ongoing support beyond report delivery",
              "Legal, tax, or financial advice",
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            The Diagnostic is designed to identify issues. Implementation
            requires a separate engagement (Foundation, Growth, or Enterprise
            tier).
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What data do you need from us?
              </AccordionTrigger>
              <AccordionContent>
                We will request org charts, process documentation (if
                available), financial KPIs, and access to leadership for
                interviews. Most data gathering happens through interviews and
                observation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can this be done remotely?</AccordionTrigger>
              <AccordionContent>
                Yes. The Diagnostic can be conducted entirely remotely via video
                calls and asynchronous data gathering. On-site work is available
                if preferred.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What happens after the Diagnostic?
              </AccordionTrigger>
              <AccordionContent>
                You receive a comprehensive report with prioritized
                recommendations and a 30-90 day roadmap. You can choose to
                implement internally, engage Zenphry for implementation support,
                or take no action.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is the Diagnostic required before other services?
              </AccordionTrigger>
              <AccordionContent>
                Recommended but not required. The Diagnostic ensures we focus on
                the right problems before committing to implementation. Some
                clients already know what needs to change and start directly
                with Foundation, Growth, or Enterprise engagements.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Request the Restructuring Diagnostic
          </h2>
          <p className="mb-6">
            Identify what needs to change before committing to full
            restructuring.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/book-a-call">Schedule a Call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

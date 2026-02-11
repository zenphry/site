import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Book a Call | Zenphry" },
    {
      name: "description",
      content:
        "Schedule a discovery call with Zenphry to discuss your business needs.",
    },
  ];
};

export default function BookACall() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Book a Discovery Call
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Schedule a 30-minute call to discuss your business challenges and
            see how Zenphry can help.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/JBb4ASYOSl1ZM8wqg4X2"
                style={{
                  width: "100%",
                  border: "none",
                  overflow: "hidden",
                  scrollbarWidth: "none",
                }}
                id="JBb4ASYOSl1ZM8wqg4X2_1770763798288"
                title="Scheduling"
              />
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

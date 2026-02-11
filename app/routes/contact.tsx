import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact | Zenphry" },
    {
      name: "description",
      content:
        "Get in touch with Zenphry to discuss your business restructuring needs.",
    },
  ];
};

export default function Contact() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Get in Touch
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="flex items-center p-4">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        contact@zenphry.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Phone
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        [TO BE PROVIDED]
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-4">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Location
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        [TO BE PROVIDED]
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/o1zE6H7UvcRONNO02ckQ"
                    style={{
                      width: "100%",
                      height: "460px",
                      border: "none",
                      borderRadius: "12px",
                    }}
                    id="inline-o1zE6H7UvcRONNO02ckQ"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Form 0"
                    data-height="460"
                    data-layout-iframe-id="inline-o1zE6H7UvcRONNO02ckQ"
                    data-form-id="o1zE6H7UvcRONNO02ckQ"
                    title="Form 0"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Prefer to Schedule Directly?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book a discovery call to discuss your specific needs and see if
              Zenphry is the right fit.
            </p>
            <a
              href="/book-a-call"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

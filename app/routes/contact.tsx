import { useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";

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
    <div>
      <PageHero
        headline="Get in Touch"
        subtitle="Reach out directly or use the form below. We respond within one business day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
                        <a
                          href="tel:+19723629878"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                        >
                          +1 972-362-9878
                        </a>
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
                          6160 Warren Parkway, Suite 100
                          <br />
                          Frisco, TX 75034
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
                      sandbox="allow-scripts allow-same-origin allow-forms"
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
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Prefer to Book Directly?"
        supporting="Book a discovery call to discuss your specific needs and see if Zenphry is the right fit."
        showDiagnostic={false}
      />
    </div>
  );
}

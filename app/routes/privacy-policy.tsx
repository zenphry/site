import type { MetaFunction } from "react-router";
import { Link } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry Privacy Policy — how we collect, use, and protect your information.",
    },
  ];
};

const sections = [
  {
    heading: "Information We Collect",
    content: `We collect information you provide directly to us when you:

• Complete a contact or inquiry form
• Book a discovery call or meeting
• Subscribe to communications from Zenphry
• Communicate with us by email or phone

This may include your name, email address, phone number, company name, and the details of your inquiry.

We also collect certain information automatically when you visit our website, including your IP address, browser type, referring URLs, and pages visited. This information is collected through standard web analytics tools.`,
  },
  {
    heading: "How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your inquiries and communications
• Schedule and conduct discovery calls and meetings
• Provide and manage our services
• Send you information relevant to your inquiry or engagement
• Improve our website and services
• Comply with legal obligations

We do not sell your personal information to third parties. We do not use your information for advertising or data brokerage purposes.`,
  },
  {
    heading: "How We Share Your Information",
    content: `We may share your information with:

• Service providers who assist us in operating our website and conducting our business (such as scheduling tools, email platforms, and CRM providers), under confidentiality obligations
• Professional advisors such as lawyers and accountants where necessary
• Law enforcement or government bodies where required by law

Any third parties who receive your information are required to protect it and may only use it for the purposes we specify.`,
  },
  {
    heading: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.

If you would like us to delete your information, please contact us and we will respond within a reasonable timeframe.`,
  },
  {
    heading: "Cookies and Tracking",
    content: `Our website uses cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. Cookies are small text files stored on your device.

You can control cookie settings through your browser settings. Disabling cookies may affect the functionality of some parts of our website.

We use analytics tools (such as web traffic analytics) to understand how visitors use our site. This data is aggregated and not used to identify individual users.`,
  },
  {
    heading: "Your Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information, including:

• The right to access the personal information we hold about you
• The right to correct inaccurate information
• The right to request deletion of your information
• The right to object to or restrict certain processing
• The right to data portability

To exercise any of these rights, please contact us using the details below. We will respond to your request within a reasonable timeframe and in accordance with applicable law.`,
  },
  {
    heading: "Data Security",
    content: `We take reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, no method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    heading: "Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    heading: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    heading: "Contact Us",
    content: `If you have questions about this Privacy Policy or how we handle your personal information, please contact us:

Zenphry
6160 Warren Parkway
Frisco, TX 75034
+1 972-362-9878
contact@zenphry.com`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Effective date: February 2025
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Zenphry (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, share, and protect
              information when you visit our website or engage with our
              services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {section.heading}
                </h2>
                <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Back to site */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Questions about this policy?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  BarChart3,
  CheckCircle,
  Cloud,
  Database,
  LockKeyhole,
  Network,
  Server,
  Shield,
} from "lucide-react";
import { PageHero } from "~/components/page-hero";
import { SectionCTA } from "~/components/section-cta";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export const meta: MetaFunction = () => {
  return [
    { title: "Private Cloud for US Clients | Zenphry" },
    {
      name: "description",
      content:
        "Zenphry designs, deploys, and manages white-label private cloud environments for US-based organizations that need dedicated infrastructure, data control, and managed operations.",
    },
  ];
};

const deliveryLayers = [
  {
    Icon: Server,
    title: "Dedicated Compute",
    body: "Virtual machine infrastructure on dedicated capacity, sized around your workloads, tenant model, and growth plan.",
  },
  {
    Icon: Database,
    title: "Block and Object Storage",
    body: "Resilient storage for VM disks, backups, archives, and S3-compatible application storage.",
  },
  {
    Icon: Network,
    title: "Private Networking",
    body: "VPC-style isolation, VPN access, firewall policy, public IP planning, and secure administration paths.",
  },
  {
    Icon: LockKeyhole,
    title: "White-Label Portal",
    body: "A branded self-service portal for provisioning, customer access, usage visibility, and operations workflows.",
  },
  {
    Icon: BarChart3,
    title: "Monitoring and Alerting",
    body: "Dashboards, metrics, alert rules, and operational visibility for infrastructure and customer-facing services.",
  },
  {
    Icon: Shield,
    title: "Managed Operations",
    body: "Patching, upgrades, security reviews, backup planning, incident support, and ongoing infrastructure governance.",
  },
];

const tiers = [
  {
    name: "Starter",
    fit: "Single-zone private cloud for a focused internal platform or early customer environment.",
    scale: "1 zone, up to 3 nodes",
    features: [
      "Dedicated compute, block, and object storage",
      "White-label customer or internal portal",
      "Firewall and VPN access",
      "Monthly operational check-ins",
    ],
  },
  {
    name: "Standard",
    fit: "Production private cloud for businesses serving multiple workloads, departments, or customers.",
    scale: "1-2 zones, up to 10 nodes",
    features: [
      "High-availability network design",
      "Monitoring and alerting included",
      "Disaster recovery runbook",
      "Managed service model with response targets",
    ],
  },
  {
    name: "Enterprise",
    fit: "Multi-site or compliance-sensitive private cloud with custom operational and support requirements.",
    scale: "Custom zones and capacity",
    features: [
      "US data residency and customer-supplied colocation options",
      "Dedicated engineering and operations model",
      "Custom compliance documentation",
      "Migration, integration, and runbook support",
    ],
  },
];

const buildSteps = [
  {
    title: "Scope",
    detail:
      "Map workloads, user groups, data requirements, migration needs, security posture, and support expectations.",
  },
  {
    title: "Design",
    detail:
      "Define the private cloud architecture: compute, storage, networking, portal, monitoring, backup, and operating model.",
  },
  {
    title: "Deploy",
    detail:
      "Build the environment, configure access, test failover paths, and prepare the customer-facing portal under your brand.",
  },
  {
    title: "Operate",
    detail:
      "Manage patches, alerts, capacity, incidents, upgrades, documentation, and regular operational reviews.",
  },
];

const faqs = [
  {
    q: "Is this public cloud resale?",
    a: "No. The offer is a dedicated private cloud environment designed around the client. It can be deployed for internal use, customer-facing services, or a white-label managed cloud offer.",
  },
  {
    q: "Can this be branded as our cloud?",
    a: "Yes. Zenphry can provide a white-label portal and customer-facing operating model so the environment can be presented under your company brand.",
  },
  {
    q: "Is this only for Canadian infrastructure?",
    a: "No. This Zenphry offer is positioned for US-based clients. US deployment, US data residency, and customer-supplied colocation can be scoped during architecture planning.",
  },
  {
    q: "Can Zenphry help with VMware migration?",
    a: "Yes. VMware and vSphere migration can be scoped as a professional service, including discovery, migration planning, cutover support, and post-migration validation.",
  },
];

export default function ServicePrivateCloud() {
  return (
    <div>
      <PageHero
        headline="White-Label Private Cloud for US Clients"
        subtitle="Dedicated private cloud infrastructure designed, deployed, branded, and managed for organizations that need control without building a cloud team from scratch."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Private Cloud" },
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-5">
              <Cloud className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What This Service Is
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Zenphry private cloud gives US-based organizations a dedicated
                cloud environment under their own brand or operating model. The
                service covers architecture, deployment, migration, portal
                configuration, monitoring, security controls, and managed
                infrastructure operations.
              </p>
              <p>
                It is built for teams that want the control and data posture of
                private infrastructure without taking on the full burden of
                designing, staffing, and operating the platform alone.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Who It Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "US businesses that need dedicated infrastructure and clearer data control",
                "Managed service providers adding a branded cloud offer",
                "Software companies that need isolated customer environments",
                "Organizations moving away from VMware or expensive licensing models",
                "Teams with customer, regulatory, or contractual data residency requirements",
                "Companies that need private cloud operations without hiring a full platform team",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm p-3 rounded text-gray-700 dark:text-gray-300 text-sm"
                >
                  &bull; {item}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              What Zenphry Delivers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deliveryLayers.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <item.Icon className="h-6 w-6 text-primary mb-2" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Private Cloud Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <Card key={tier.name}>
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.scale}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                      {tier.fit}
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Final pricing is scoped by capacity, location, support model,
              migration complexity, and compliance requirements.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              How Engagements Work
            </h2>
            <div className="space-y-5">
              {buildSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-1">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`item-${index + 1}`}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Button asChild size="lg">
              <Link to="/contact">Scope a Private Cloud</Link>
            </Button>
          </div>
        </div>
      </div>

      <SectionCTA
        headline="Ready to Scope a Private Cloud?"
        supporting="Zenphry can help define the architecture, deployment model, migration path, and managed operations plan for your private cloud offer."
        showDiagnostic={false}
      />
    </div>
  );
}

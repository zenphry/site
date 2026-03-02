import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  TrendingDown,
  Eye,
  Users,
  Rocket,
  AlertCircle,
  Cpu,
  ChevronDown,
  Building2,
  HeartPulse,
} from "lucide-react";
import { BookingModal } from "~/components/booking-modal";
import { ScrollReveal } from "~/components/scroll-reveal";
import { SectionCTA } from "~/components/section-cta";
import { COMPANY_STATS } from "~/lib/company-stats";

export const meta: MetaFunction = () => {
  return [
    { title: "Zenphry | Business Restructuring & Transformation" },
    {
      name: "description",
      content:
        "Operator-led business restructuring and transformation. Fix broken operations, realign teams, and build execution systems that scale.",
    },
    {
      name: "keywords",
      content:
        "business restructuring, operational transformation, organizational alignment, execution systems, leadership coaching",
    },
  ];
};

const problems = [
  {
    icon: TrendingDown,
    title: "Declining Performance",
    desc: "Results are slipping but root causes aren't clear. You're reacting, not leading.",
    link: "/services/diagnostic",
  },
  {
    icon: Eye,
    title: "No Operational Visibility",
    desc: "Leadership can't see what's happening on the ground. Decisions are made on gut feel.",
    link: "/services/operational",
  },
  {
    icon: Users,
    title: "Unclear Roles & Accountability",
    desc: "Teams are busy but nothing gets done. Ownership gaps create constant friction.",
    link: "/services/organizational",
  },
  {
    icon: Rocket,
    title: "Growth Has Stalled or Become Chaotic",
    desc: "Scaling exposed broken foundations. What worked at $1M won't work at $5M.",
    link: "/services/scale",
  },
  {
    icon: AlertCircle,
    title: "Founder Bottlenecks Blocking Scale",
    desc: "Everything runs through you. The business can't grow faster than you can decide.",
    link: "/services/organizational",
  },
  {
    icon: Cpu,
    title: "Technology Slowing Execution",
    desc: "Tools don't talk to each other. Teams work around systems instead of with them.",
    link: "/services/technology",
  },
];

const services = [
  {
    title: "Restructuring Diagnostic",
    duration: "2–3 weeks",
    tag: "Diagnostic",
    badge: null,
    desc: "Identify root causes before restructuring begins. Your first step.",
    cta: "Get the Diagnostic",
    link: "/services/diagnostic",
    accent: "border-l-4 border-l-blue-500",
  },
  {
    title: "Operational Restructuring",
    duration: "6–12 weeks",
    tag: "Restructuring",
    badge: "Most Popular",
    desc: "Fix how work flows through your business — processes, rhythm, accountability.",
    cta: "Fix Operations",
    link: "/services/operational",
    accent: "border-l-4 border-l-primary",
  },
  {
    title: "Organizational & Team",
    duration: "4–8 weeks",
    tag: "Restructuring",
    badge: null,
    desc: "Redesign roles, decision rights, and team structure for efficient execution.",
    cta: "Realign Your Team",
    link: "/services/organizational",
    accent: "border-l-4 border-l-purple-500",
  },
  {
    title: "Financial Execution",
    duration: "4–6 weeks",
    tag: "Restructuring",
    badge: null,
    desc: "Build budgeting systems, cost visibility, and financial review rhythms.",
    cta: "Build Financial Discipline",
    link: "/services/financial",
    accent: "border-l-4 border-l-green-500",
  },
  {
    title: "Technology & Systems",
    duration: "4–10 weeks",
    tag: "Technology",
    badge: null,
    desc: "Simplify your tech stack so systems support execution, not obstruct it.",
    cta: "Fix Your Tech Stack",
    link: "/services/technology",
    accent: "border-l-4 border-l-cyan-500",
  },
  {
    title: "Growth & Scale Readiness",
    duration: "6–10 weeks",
    tag: "Restructuring",
    badge: null,
    desc: "Build the foundation your company needs to scale past the next inflection point.",
    cta: "Prepare to Scale",
    link: "/services/scale",
    accent: "border-l-4 border-l-orange-500",
  },
  {
    title: "Growth Advisory",
    duration: "Ongoing",
    tag: "Advisory",
    badge: null,
    desc: "Strategic advisory for founders navigating inflection points and scaling decisions.",
    cta: "Explore Advisory",
    link: "/services/advisory",
    accent: "border-l-4 border-l-yellow-500",
  },
];

const steps = [
  {
    phase: "Diagnose",
    desc: "Identify root causes",
    detail:
      "We conduct stakeholder interviews, process audits, and data analysis to identify exactly where execution is breaking down.",
    timeline: "1–2 weeks",
    deliverable: "Root Cause Report + Priority Matrix",
  },
  {
    phase: "Stabilize",
    desc: "Reduce chaos",
    detail:
      "We implement quick wins and immediate interventions to stop the bleeding — without waiting for the full redesign.",
    timeline: "2–3 weeks",
    deliverable: "Stabilization Plan + Quick Win Log",
  },
  {
    phase: "Redesign",
    desc: "Build new models",
    detail:
      "We design the new operating model: org structure, processes, systems, and decision rights built for scale.",
    timeline: "3–4 weeks",
    deliverable: "Operating Model Blueprint",
  },
  {
    phase: "Implement",
    desc: "Execute changes",
    detail:
      "We work side by side with your team to roll out changes — not just hand off a deck.",
    timeline: "4–8 weeks",
    deliverable: "Implementation Tracker + Team Playbooks",
  },
  {
    phase: "Sustain",
    desc: "Lock in results",
    detail:
      "We build governance cadences, KPIs, and leadership rhythms so results stick after we leave.",
    timeline: "2–4 weeks",
    deliverable: "Governance Framework + KPI Dashboard",
  },
];

const filters = [
  "All",
  "Diagnostic",
  "Restructuring",
  "Technology",
  "Advisory",
];

const phrases = [
  "Scale with Confidence.",
  "Execute with Clarity.",
  "Lead with Structure.",
];

export default function Index() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      timeout = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const visibleServices =
    activeFilter === "All"
      ? services
      : services.filter((s) => s.tag === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-linear-to-br from-gray-50/60 to-white/60 dark:from-gray-900/60 dark:to-gray-800/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Restructure Operations.
              <br />
              Realign Teams.
              <br />
              <span
                className={`text-primary transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
              >
                {phrases[phraseIndex]}
              </span>
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              For operators scaling $1M&ndash;$50M businesses
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookingModal>
                <Button size="lg" className="rounded-full px-10 py-4 text-base">
                  Book a Call <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </BookingModal>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 text-base border-primary text-primary dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-white"
              >
                <Link to="/services/diagnostic">Get the Diagnostic</Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {COMPANY_STATS.operatorsCopy}
            </p>

            {/* Industry trust icons */}
            <div className="flex items-center justify-center gap-4 mt-3 text-gray-400 dark:text-gray-600">
              <Cpu className="h-5 w-5" />
              <HeartPulse className="h-5 w-5" />
              <Building2 className="h-5 w-5" />
            </div>

            <div className="mt-8 flex justify-center">
              <ChevronDown className="h-6 w-6 text-primary/50 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Item 1 */}
            <ScrollReveal delay={0}>
              <div className="group relative flex flex-col items-center">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 text-xs bg-gray-900 text-white rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  Delivered by operators with hands-on experience
                </div>
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {COMPANY_STATS.engagements}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Engagements Completed
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Operator-led, not consultant-driven
                </p>
              </div>
            </ScrollReveal>

            {/* Item 2 */}
            <ScrollReveal delay={100}>
              <div className="group relative flex flex-col items-center">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 text-xs bg-gray-900 text-white rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  Diagnose &rarr; Stabilize &rarr; Redesign &rarr; Implement
                  &rarr; Sustain
                </div>
                <Target className="h-8 w-8 text-primary mb-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  5-Phase
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Proprietary Framework
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Proven across industries
                </p>
              </div>
            </ScrollReveal>

            {/* Item 3 */}
            <ScrollReveal delay={200}>
              <div className="group relative flex flex-col items-center">
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 text-xs bg-gray-900 text-white rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  Real capacity freed across operations, technology, and teams
                </div>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  $2M+
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Capacity Recovered
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Measurable operational outcomes
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Does This Sound Like You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <ScrollReveal key={index} delay={index * 60}>
                <Card className="group cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/60 dark:hover:border-primary/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <problem.icon className="h-5 w-5 text-primary shrink-0" />
                      <CardTitle className="text-lg">{problem.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {problem.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      to={problem.link}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      See how we solve this <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Our Services
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200"
          >
            {visibleServices.map((s) => (
              <Card
                key={s.title}
                className={`relative overflow-hidden ${s.accent} hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
              >
                <CardHeader>
                  {s.badge && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded mb-2">
                      {s.badge}
                    </span>
                  )}
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {s.desc}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={s.link}>{s.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Zenphry Framework */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            The Zenphry Framework
          </h2>
          <div className="max-w-4xl mx-auto">
            {/* Steps with connecting line */}
            <div className="relative">
              {/* Horizontal connector line (desktop only) */}
              <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-primary/25 z-0" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {steps.map((item, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <div className="text-center">
                      <button
                        onClick={() =>
                          setActiveStep(activeStep === index ? null : index)
                        }
                        className={`bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold transition-all duration-200 hover:bg-primary/80 ${
                          activeStep === index
                            ? "ring-2 ring-primary ring-offset-2"
                            : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">
                        {item.phase}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {activeStep !== null && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  Phase {activeStep + 1}: {steps[activeStep].phase}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {steps[activeStep].detail}
                </p>
                <div className="flex flex-wrap gap-8 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Timeline:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {steps[activeStep].timeline}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Deliverable:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {steps[activeStep].deliverable}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Link
              to="/resources/case-studies"
              className="text-sm text-primary hover:underline flex items-center gap-1 mt-6 justify-center"
            >
              See a real example <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <SectionCTA
        headline="Ready to Get Started?"
        supporting="Book a discovery call or request the Restructuring Diagnostic to identify what needs to change. No long-term contracts."
      />
    </div>
  );
}

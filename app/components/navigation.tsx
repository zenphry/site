import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Settings,
  Users,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { BookingModal } from "./booking-modal";
import { ThemeToggle } from "./theme-toggle";
import { AnnouncementBar } from "./announcement-bar";
import logoColor from "~/assets/logo-color.svg";
import logoWhite from "~/assets/logo-white.svg";

const serviceLinks = [
  {
    to: "/services/technology",
    label: "Technology & Systems",
    description: "Modernise tech stacks and eliminate bottlenecks.",
    Icon: Cpu,
  },
  {
    to: "/services/operational",
    label: "Operational Restructuring",
    description: "Streamline operations and cut inefficiencies.",
    Icon: Settings,
  },
  {
    to: "/services/organizational",
    label: "Organizational & Team",
    description: "Realign teams and leadership for execution.",
    Icon: Users,
  },
  {
    to: "/services/financial",
    label: "Financial Execution",
    description: "Tighten financial discipline and cash control.",
    Icon: BarChart3,
  },
  {
    to: "/services/scale",
    label: "Growth & Scale",
    description: "Build the systems to scale without chaos.",
    Icon: TrendingUp,
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesMobileMenuOpen, setResourcesMobileMenuOpen] = useState(false);
  const [aboutMobileMenuOpen, setAboutMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const makeHoverHandlers = (key: string, setter: (v: boolean) => void) => ({
    onMouseEnter: () => {
      if (closeTimers.current[key]) clearTimeout(closeTimers.current[key]);
      setter(true);
    },
    onMouseLeave: () => {
      closeTimers.current[key] = setTimeout(() => setter(false), 150);
    },
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <header
        className={`bg-white/75 dark:bg-gray-900/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-shadow duration-200 ${
          scrolled ? "shadow-md border-gray-300 dark:border-gray-700" : ""
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="relative flex items-center justify-between">
            {/* Mobile: hamburger left */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <img
                src={logoColor}
                alt="Zenphry"
                className={`w-auto dark:hidden transition-all duration-200 ${scrolled ? "h-8" : "h-10"}`}
              />
              <img
                src={logoWhite}
                alt="Zenphry"
                className={`w-auto hidden dark:block transition-all duration-200 ${scrolled ? "h-8" : "h-10"}`}
              />
            </Link>

            {/* Mobile: theme toggle right */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
            </div>

            {/* Desktop Navigation — 4 items + CTA */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Services — hover mega menu */}
              <div
                className="relative"
                {...makeHoverHandlers("services", setServicesOpen)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline underline-offset-4 transition-all duration-150"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-150 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[520px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-3 z-50">
                    <div className="grid grid-cols-2 gap-0">
                      {/* LEFT column */}
                      <div className="px-3 border-r border-gray-100 dark:border-gray-800">
                        <Link
                          to="/services"
                          className="flex items-center gap-1 px-2 py-2 mb-1 text-xs font-semibold text-primary uppercase tracking-wider hover:underline transition-colors duration-150"
                          onClick={() => setServicesOpen(false)}
                        >
                          All Services &rarr;
                        </Link>
                        <div className="space-y-0.5">
                          {serviceLinks.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className="flex items-start gap-2.5 px-2 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 group"
                              onClick={() => setServicesOpen(false)}
                            >
                              <link.Icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-150">
                                  {link.label}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                                  {link.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT column — featured callout */}
                      <div className="px-3">
                        <div className="rounded-lg border border-yellow-400/30 bg-primary/10 p-4 flex flex-col gap-3">
                          <span className="inline-block self-start px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold tracking-wide">
                            Most Popular
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-50">
                              Restructuring Diagnostic
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                              Start here. Identify root causes before
                              restructuring begins.
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-medium">Timeline:</span>
                            <span>2&ndash;3 weeks</span>
                          </div>
                          <Link
                            to="/services/diagnostic"
                            className="inline-block text-center text-xs font-semibold px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors duration-150"
                            onClick={() => setServicesOpen(false)}
                          >
                            Start Here &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources — hover dropdown */}
              <div
                className="relative"
                {...makeHoverHandlers("resources", setResourcesOpen)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline underline-offset-4 transition-all duration-150"
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                >
                  Resources
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    {[
                      { to: "/resources/case-studies", label: "Case Studies" },
                      { to: "/resources/how-it-works", label: "How It Works" },
                      { to: "/resources/blog", label: "Blog" },
                      { to: "/resources/faq", label: "FAQ" },
                      { to: "/pricing", label: "Pricing" },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                        onClick={() => setResourcesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About — hover dropdown */}
              <div
                className="relative"
                {...makeHoverHandlers("about", setAboutOpen)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline underline-offset-4 transition-all duration-150"
                  onClick={() => setAboutOpen(!aboutOpen)}
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                >
                  About
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-150 ${aboutOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {aboutOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    {[
                      { to: "/about", label: "About Us" },
                      { to: "/about/what-we-do", label: "What We Do" },
                      { to: "/about/team", label: "Team" },
                      { to: "/about/vision", label: "Vision & Values" },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                        onClick={() => setAboutOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline underline-offset-4 transition-all duration-150"
              >
                Contact
              </Link>
              <ThemeToggle />
              <BookingModal>
                <Button>Book a Call</Button>
              </BookingModal>
            </div>

          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              {/* Services */}
              <div>
                <button
                  className="flex items-center gap-1 w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform duration-150 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="mt-2 ml-4 space-y-2 border-l-2 border-primary/20 pl-3">
                    <Link
                      to="/services"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                    >
                      All Services
                    </Link>
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150 py-2"
                  onClick={() =>
                    setResourcesMobileMenuOpen(!resourcesMobileMenuOpen)
                  }
                >
                  <span>Resources</span>
                  {resourcesMobileMenuOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {resourcesMobileMenuOpen && (
                  <div className="ml-4 space-y-2 py-2">
                    <Link
                      to="/resources/case-studies"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Case Studies
                    </Link>
                    <Link
                      to="/resources/how-it-works"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      How It Works
                    </Link>
                    <Link
                      to="/resources/blog"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link
                      to="/resources/faq"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link
                      to="/pricing"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </div>
                )}
              </div>

              {/* About */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150 py-2"
                  onClick={() => setAboutMobileMenuOpen(!aboutMobileMenuOpen)}
                >
                  <span>About</span>
                  {aboutMobileMenuOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {aboutMobileMenuOpen && (
                  <div className="ml-4 space-y-2 py-2">
                    <Link
                      to="/about"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/about/what-we-do"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      What We Do
                    </Link>
                    <Link
                      to="/about/team"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Team
                    </Link>
                    <Link
                      to="/about/vision"
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Vision &amp; Values
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <BookingModal>
                <Button
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Call
                </Button>
              </BookingModal>
            </div>
          )}
        </nav>

      </header>
    </div>
  );
}

import { Link } from "react-router";
import { Linkedin, Twitter } from "lucide-react";
import { COMPANY_STATS } from "~/lib/company-stats";
import { Separator } from "./ui/separator";
import { BookingModal } from "./booking-modal";
import logoColor from "~/assets/logo-color.svg";
import logoWhite from "~/assets/logo-white.svg";

export function Footer() {
  return (
    <footer className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm border-t-2 border-primary/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info + Contact */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img
                src={logoColor}
                alt="Zenphry"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src={logoWhite}
                alt="Zenphry"
                className="h-8 w-auto hidden dark:block"
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Operator-led business restructuring and transformation
            </p>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-gray-400">
                6160 Warren Parkway, Suite 100
                <br />
                Frisco, TX 75034
              </li>
              <li>
                <a
                  href="tel:+19723629878"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                >
                  +1 972-362-9878
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href="https://linkedin.com/company/zenphry"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com/zenphry"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <BookingModal>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-150">
                    Book a Call
                  </button>
                </BookingModal>
              </li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 leading-relaxed">
              Helping operators scale since 2022.
              <br />
              {COMPANY_STATS.engagementsFull}.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/services/technology"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Technology &amp; Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/services/operational"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Operational Restructuring
                </Link>
              </li>
              <li>
                <Link
                  to="/services/organizational"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Organizational &amp; Team
                </Link>
              </li>
              <li>
                <Link
                  to="/services/financial"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Financial Execution
                </Link>
              </li>
              <li>
                <Link
                  to="/services/scale"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Growth &amp; Scale Readiness
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/resources/case-studies"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/how-it-works"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about/what-we-do"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  What We Do
                </Link>
              </li>
              <li>
                <Link
                  to="/about/team"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/about/vision"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary hover:underline underline-offset-2"
                >
                  Vision &amp; Values
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zenphry. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors duration-150"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="mt-4 md:mt-0 text-center md:text-right max-w-xl">
            Zenphry provides operational, organizational, and technology
            restructuring services. Zenphry does not provide legal, tax, or
            bankruptcy advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

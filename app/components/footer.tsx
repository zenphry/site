import { Link } from "react-router";
import { Separator } from "./ui/separator";
import logoColor from "~/assets/logo-color.svg";
import logoWhite from "~/assets/logo-white.svg";

export function Footer() {
  return (
    <footer className="bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Operator-led business restructuring and transformation
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
                  to="/services/diagnostic"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Restructuring Diagnostic
                </Link>
              </li>
              <li>
                <Link
                  to="/services/foundation"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Foundation Restructure
                </Link>
              </li>
              <li>
                <Link
                  to="/services/growth"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Growth Restructure
                </Link>
              </li>
              <li>
                <Link
                  to="/services/enterprise"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Enterprise Transformation
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
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/about/what-we-do"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  What We Do
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/how-it-works"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/case-studies"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  to="/book-a-call"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zenphry. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-center md:text-right max-w-2xl">
            Zenphry provides operational, organizational, and technology
            restructuring services. Zenphry does not provide legal, tax, or
            bankruptcy advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

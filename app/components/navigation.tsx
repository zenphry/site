import { Link } from "react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import logoColor from "~/assets/logo-color.svg";
import logoWhite from "~/assets/logo-white.svg";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesMobileMenuOpen, setResourcesMobileMenuOpen] = useState(false);
  const [aboutMobileMenuOpen, setAboutMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 dark:bg-gray-900/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoColor}
              alt="Zenphry"
              className="h-10 w-auto dark:hidden"
            />
            <img
              src={logoWhite}
              alt="Zenphry"
              className="h-10 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              Pricing
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150 focus:outline-none">
                  Resources
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/resources/case-studies">Case Studies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/resources/how-it-works">How It Works</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/resources/blog">Blog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150 focus:outline-none">
                  About
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about/what-we-do">What We Do</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              Contact
            </Link>
            <ThemeToggle />
            <Button asChild>
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/services"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/pricing"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Resources */}
            <div>
              <button
                className="flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150 py-2"
                onClick={() => setResourcesMobileMenuOpen(!resourcesMobileMenuOpen)}
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
                </div>
              )}
            </div>

            {/* Mobile About */}
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
                    About
                  </Link>
                  <Link
                    to="/about/what-we-do"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    What We Do
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
            <Button asChild className="w-full">
              <Link to="/book-a-call" onClick={() => setMobileMenuOpen(false)}>
                Book a Call
              </Link>
            </Button>
          </div>
        )}
      </nav>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button asChild size="lg" className="shadow-lg">
          <Link to="/book-a-call">Book a Call</Link>
        </Button>
      </div>
    </header>
  );
}

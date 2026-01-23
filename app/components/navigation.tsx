import { Link } from 'react-router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import logoColor from '~/assets/logo-color.svg';
import logoWhite from '~/assets/logo-white.svg';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link
              to="/how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              About
            </Link>
            <Link
              to="/case-studies"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-150"
            >
              Case Studies
            </Link>
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
            <Link
              to="/how-it-works"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/case-studies"
              className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Case Studies
            </Link>
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

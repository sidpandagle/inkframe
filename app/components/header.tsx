import { Link } from "react-router";
import { BookOpen, Scale, Info, Mail, Menu } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { MobileNav } from "./mobile-nav";
import { Search } from "./search";
import { useState } from "react";
import logoLight from "./logo-icon-light.svg";
import logoDark from "./logo-icon-dark.svg";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border/40 sticky top-0 glass z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              {/* <div className="w-9 h-9 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <img
                  src={logoLight}
                  alt="InkFrame"
                  className="w-9 h-9 block dark:hidden"
                />
                <img
                  src={logoDark}
                  alt="InkFrame"
                  className="w-9 h-9 hidden dark:block"
                />
              </div> */}
              <span className="text-2xl font-bold text-display gradient-text">
                InkFrame
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Search />
              <Link
                to="/articles"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth group"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Articles</span>
              </Link>
              <Link
                to="/compliance"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth group"
              >
                <Scale className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Compliance</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth group"
              >
                <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <ThemeSwitcher />
              <Link
                to="/contact"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:scale-105 transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <Search />
              <ThemeSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

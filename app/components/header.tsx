import { Link } from "react-router";
import {
  BookOpen,
  Scale,
  Info,
  Mail,
  Menu,
  ChevronDown,
  Shield,
  FileText,
  Coins,
  Building2,
  TrendingUp,
  Landmark,
  Home,
  FileCheck,
  Lock,
  ScrollText,
} from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { MobileNav } from "./mobile-nav";
import { useState, useRef, useEffect } from "react";
import logoLight from "./logo-icon-light.svg";
import logoDark from "./logo-icon-dark.svg";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target as Node)) {
        setNewsDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const newsCategories = [
    { name: "All Articles", slug: "/articles", icon: BookOpen },
    { name: "Crypto Regulation", slug: "/articles?category=crypto-regulation", icon: Shield },
    { name: "MiCA", slug: "/articles?category=mica", icon: Scale },
    { name: "DeFi", slug: "/articles?category=defi", icon: Coins },
    { name: "Banking", slug: "/articles?category=banking", icon: Building2 },
    { name: "Fintech", slug: "/articles?category=fintech", icon: TrendingUp },
    { name: "Legal Analysis", slug: "/articles?category=legal", icon: Landmark },
    { name: "Policy", slug: "/articles?category=policy", icon: FileText },
  ];

  const resourceLinks = [
    { name: "About Us", slug: "/about", icon: Info },
    { name: "Contact", slug: "/contact", icon: Mail },
    { name: "Terms of Service", slug: "/terms", icon: FileCheck },
    { name: "Privacy Policy", slug: "/privacy", icon: Lock },
    { name: "Disclaimer", slug: "/disclaimer", icon: ScrollText },
  ];

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

            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>

              {/* News Dropdown */}
              <div className="relative" ref={newsDropdownRef}>
                <button
                  onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                >
                  <BookOpen className="w-4 h-4 transition-transform" />
                  <span>News</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${newsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl transition-all duration-200 py-2 ${newsDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  {newsCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.slug}
                        to={category.slug}
                        onClick={() => setNewsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                to="/compliance"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth group"
              >
                <Scale className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Compliance</span>
              </Link>

              {/* Resources Dropdown */}
              <div className="relative" ref={resourcesDropdownRef}>
                <button
                  onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Info className="w-4 h-4 transition-transform" />
                  <span>Resources</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${resourcesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl transition-all duration-200 py-2 ${resourcesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                  {resourceLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.slug}
                        to={link.slug}
                        onClick={() => setResourcesDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <ThemeSwitcher />

              <Link
                to="/contact"
                className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:shadow-lg hover:scale-105 transition-smooth"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-3">
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

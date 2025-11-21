import { Link } from "react-router";
import {
  BookOpen,
  Scale,
  Info,
  Mail,
  X,
  Home,
  Shield,
  FileText,
  Coins,
  Building2,
  TrendingUp,
  Landmark,
  ChevronDown,
  FileCheck,
  Lock,
  ScrollText,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [newsExpanded, setNewsExpanded] = useState(false);
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scroll on body when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Reset expanded states when menu closes
      setNewsExpanded(false);
      setResourcesExpanded(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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

  const mainLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/compliance", icon: Scale, label: "Compliance" },
    { to: "/authors", icon: Users, label: "Authors" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-bold gradient-text">Menu</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
          <ul className="space-y-2">
            {/* Main Links */}
            {mainLinks.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            ))}

            {/* News Section with Dropdown */}
            <li>
              <button
                onClick={() => setNewsExpanded(!newsExpanded)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">News</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${newsExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {newsExpanded && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 border-border pl-4">
                  {newsCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <li key={category.slug}>
                        <Link
                          to={category.slug}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{category.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* Resources Section with Dropdown */}
            <li>
              <button
                onClick={() => setResourcesExpanded(!resourcesExpanded)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Resources</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${resourcesExpanded ? "rotate-180" : ""}`}
                />
              </button>
              {resourcesExpanded && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 border-border pl-4">
                  {resourceLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.slug}>
                        <Link
                          to={link.slug}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} InkFrame
          </p>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "~/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground mb-6", className)}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Home */}
        <li className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {items.length > 0 && <ChevronRight className="w-4 h-4 shrink-0" />}
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <>
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </>
              ) : (
                <span
                  className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

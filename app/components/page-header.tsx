import { cn } from "~/lib/utils";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      )}
      {badge && (
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
          {badge}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      {description && (
        <p className="text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  icon: Icon,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="w-7 h-7 text-primary" />}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

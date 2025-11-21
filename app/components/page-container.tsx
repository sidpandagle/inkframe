import { cn } from "~/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  const maxWidths = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-screen-2xl",
  };

  return (
    <div className={cn("container mx-auto px-4 py-12", maxWidths[size], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "muted" | "gradient";
}

export function Section({ children, className, variant = "default" }: SectionProps) {
  const variants = {
    default: "py-16 md:py-20",
    muted: "py-16 md:py-20 bg-muted/20",
    gradient: "py-16 md:py-20 gradient-hero",
  };

  return (
    <section className={cn(variants[variant], className)}>
      {children}
    </section>
  );
}

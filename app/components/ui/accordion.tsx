import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  multiple?: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within Accordion");
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

function Accordion({
  children,
  type = "single",
  defaultValue,
  className,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (type === "multiple" && Array.isArray(defaultValue)) {
      return defaultValue;
    }
    if (type === "single" && typeof defaultValue === "string") {
      return [defaultValue];
    }
    return [];
  });

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider
      value={{ openItems, toggleItem, multiple: type === "multiple" }}
    >
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <div
      className={cn("border border-border rounded-lg overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function AccordionTrigger({
  value,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <button
      className={cn(
        "flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-all hover:bg-muted/50",
        isOpen && "bg-muted/30",
        className
      )}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionContent({
  value,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "px-4 pb-4 pt-0 text-muted-foreground animate-in fade-in-50 slide-in-from-top-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

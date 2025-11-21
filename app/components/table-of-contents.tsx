import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse HTML content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");

    const tocItems: TOCItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Add id to the heading if it doesn't have one
      heading.id = id;

      return {
        id,
        text,
        level: parseInt(heading.tagName.charAt(1)),
      };
    });

    setToc(tocItems);
  }, [content]);

  useEffect(() => {
    // Observe scroll position to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-20 hidden lg:block">
      <div className="border border-border rounded-lg p-4 bg-card">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <List className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-sm">Table of Contents</h3>
        </div>

        <ul className="space-y-2 text-sm">
          {toc.map((item) => (
            <li
              key={item.id}
              className={`${item.level === 3 ? "ml-4" : ""}`}
            >
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`text-left w-full py-1 px-2 rounded transition-colors hover:text-primary hover:bg-primary/5 ${
                  activeId === item.id
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

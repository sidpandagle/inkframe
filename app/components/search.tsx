import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Search as SearchIcon, X, FileText, Scale } from "lucide-react";
import { getAllArticles, getAllComplianceTopics } from "~/lib/data";

interface SearchResult {
  type: "article" | "compliance";
  id: string;
  title: string;
  slug: string;
  summary?: string;
  tags?: string[];
  url: string;
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Open search with Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const articles = getAllArticles();
    const complianceTopics = getAllComplianceTopics();

    const articleResults: SearchResult[] = articles
      .filter((article) => {
        const matchTitle = article.title.toLowerCase().includes(searchQuery);
        const matchSummary = article.summary.toLowerCase().includes(searchQuery);
        const matchTags = article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery)
        );
        const matchAuthor = article.author.toLowerCase().includes(searchQuery);
        return matchTitle || matchSummary || matchTags || matchAuthor;
      })
      .slice(0, 8)
      .map((article) => ({
        type: "article" as const,
        id: article.id,
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        tags: article.tags,
        url: `/articles/${article.slug}`,
      }));

    const complianceResults: SearchResult[] = complianceTopics
      .filter((topic) => {
        const matchName = topic.name.toLowerCase().includes(searchQuery);
        const matchDescription = topic.description
          .toLowerCase()
          .includes(searchQuery);
        return matchName || matchDescription;
      })
      .slice(0, 4)
      .map((topic) => ({
        type: "compliance" as const,
        id: topic.id,
        title: topic.name,
        slug: topic.slug,
        summary: topic.description,
        url: `/compliance/${topic.slug}`,
      }));

    setResults([...articleResults, ...complianceResults]);
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-primary/20 text-primary">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/50 transition-colors group"
        aria-label="Search"
      >
        <SearchIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs border border-border rounded bg-muted">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
          />

          {/* Modal */}
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl bg-background border border-border rounded-xl shadow-2xl animate-scale-in overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <SearchIcon className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, compliance topics..."
                className="flex-1 bg-transparent outline-none text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-muted rounded transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-2 py-1 text-xs border border-border rounded bg-muted">
                ESC
              </kbd>
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim().length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <SearchIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    Start typing to search articles and compliance topics
                  </p>
                  <p className="text-xs mt-2">
                    Tip: Press <kbd className="px-2 py-0.5 border border-border rounded bg-muted">⌘K</kbd> to quickly open search
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-2">
                    Try different keywords or browse all{" "}
                    <Link
                      to="/articles"
                      onClick={handleClose}
                      className="text-primary hover:underline"
                    >
                      articles
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.url}
                      onClick={handleClose}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                        {result.type === "article" ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <Scale className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                            {highlightText(result.title, query)}
                          </h3>
                          <span className="text-xs text-muted-foreground capitalize shrink-0">
                            {result.type}
                          </span>
                        </div>
                        {result.summary && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {highlightText(result.summary, query)}
                          </p>
                        )}
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 text-xs bg-muted rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>
                  {results.length > 0 && `${results.length} result${results.length !== 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Navigate with</span>
                <kbd className="px-2 py-0.5 border border-border rounded bg-background">
                  ↑↓
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

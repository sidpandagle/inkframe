import type { Route } from "./+types/articles";
import { ArticleCard } from "~/components/article-card";
import { getAllArticles, getAllTags, getAllAuthors } from "~/lib/data";
import { Pagination, PaginationInfo } from "~/components/ui/pagination";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  FileText,
  Filter,
  Grid3x3,
  List,
  Calendar,
  User,
  ArrowUpDown,
  X
} from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router";
import { formatDate } from "~/lib/utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Articles - InkFrame" },
    {
      name: "description",
      content:
        "Browse our collection of articles on crypto regulation, fintech law, compliance, and legal insights.",
    },
  ];
}

export async function loader() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const authors = getAllAuthors();

  return {
    articles,
    tags,
    authors,
  };
}

const ARTICLES_PER_PAGE = 12;

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "title";
type DateFilter = "all" | "30" | "90" | "365";

export default function Articles({ loaderData }: Route.ComponentProps) {
  const { articles, tags, authors } = loaderData;
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter((article: typeof articles[0]) =>
        article.tags.some((tag: string) => tag === selectedTag)
      );
    }

    // Apply author filter
    if (selectedAuthor) {
      filtered = filtered.filter((article: typeof articles[0]) =>
        article.author === selectedAuthor
      );
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const daysAgo = parseInt(dateFilter);
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((article: typeof articles[0]) =>
        new Date(article.date) >= cutoffDate
      );
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((article: typeof articles[0]) => {
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchTags = article.tags.some((tag: string) =>
          tag.toLowerCase().includes(query)
        );
        const matchAuthor = article.author.toLowerCase().includes(query);
        return matchTitle || matchSummary || matchTags || matchAuthor;
      });
    }

    // Apply sorting
    filtered = [...filtered].sort((a: typeof articles[0], b: typeof articles[0]) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, selectedTag, selectedAuthor, dateFilter, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const activeFiltersCount =
    (selectedTag ? 1 : 0) +
    (selectedAuthor ? 1 : 0) +
    (dateFilter !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedTag(null);
    setSelectedAuthor(null);
    setDateFilter("all");
  };

  return (
    <PageContainer>
      <PageHeader
        icon={FileText}
        title="Articles"
        description="Expert insights on crypto regulation, compliance, and legal frameworks."
      />

      {/* Search Query Indicator */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Searching for: <span className="text-primary">"{searchQuery}"</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredArticles.length} result{filteredArticles.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <a
            href="/articles"
            className="px-4 py-2 text-sm bg-background hover:bg-muted rounded-lg transition-colors"
          >
            Clear Search
          </a>
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Toggle Filters Button */}
          <Button
            variant={showFilters || activeFiltersCount > 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-background/20">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/50"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="mb-8 p-6 bg-muted/50 rounded-lg border border-border space-y-6">
          {/* Date Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all" as DateFilter, label: "All Time" },
                { value: "30" as DateFilter, label: "Last 30 Days" },
                { value: "90" as DateFilter, label: "Last 90 Days" },
                { value: "365" as DateFilter, label: "Last Year" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setDateFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Author Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <User className="w-4 h-4" />
              Author
            </label>
            <select
              value={selectedAuthor || ""}
              onChange={(e) => setSelectedAuthor(e.target.value || null)}
              className="w-full sm:w-auto px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted transition-colors cursor-pointer"
            >
              <option value="">All Authors</option>
              {authors.map((author: typeof authors[0]) => (
                <option key={author.slug} value={author.name}>
                  {author.name} ({author.articleCount})
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <FileText className="w-4 h-4" />
              Topics
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-muted"
                }`}
              >
                All Topics
              </button>
              {tags.map((tag: string) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-background hover:bg-muted"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pagination Info */}
      {filteredArticles.length > 0 && (
        <div className="mb-6">
          <PaginationInfo
            currentPage={currentPage}
            pageSize={ARTICLES_PER_PAGE}
            totalItems={filteredArticles.length}
          />
        </div>
      )}

      {/* Articles Display */}
      {paginatedArticles.length > 0 ? (
        <>
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedArticles.map((article: typeof articles[0]) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-12">
              {paginatedArticles.map((article: typeof articles[0]) => {
                const authorProfile = authors.find((a: typeof authors[0]) => a.name === article.author);
                return (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Article Content */}
                        <div className="flex-1">
                          <Link to={`/articles/${article.slug}`} className="group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {article.summary}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <Link
                              to={`/authors/${authorProfile?.slug || article.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.author}
                            </Link>
                            <span>•</span>
                            <span>{formatDate(article.date)}</span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag: string) => (
                              <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-xs transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/articles"
          />
        </>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-lg font-medium mb-2">No articles found</p>
          <p className="text-sm text-muted-foreground mb-6">
            Try adjusting your filters or search query
          </p>
          {activeFiltersCount > 0 && (
            <Button onClick={clearAllFilters} variant="outline">
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </PageContainer>
  );
}

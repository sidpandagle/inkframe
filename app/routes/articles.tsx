import type { Route } from "./+types/articles";
import { ArticleCard } from "~/components/article-card";
import { getAllArticles, getAllTags } from "~/lib/data";
import { Pagination, PaginationInfo } from "~/components/ui/pagination";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";

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

  return {
    articles,
    tags,
  };
}

const ARTICLES_PER_PAGE = 12;

export default function Articles({ loaderData }: Route.ComponentProps) {
  const { articles, tags } = loaderData;
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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

    return filtered;
  }, [articles, selectedTag, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

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

      {/* Tag Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All Articles
          </button>
          {tags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

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

      {/* Articles Grid */}
      {paginatedArticles.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedArticles.map((article: typeof articles[0]) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/articles"
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No articles found for the selected tag.
          </p>
        </div>
      )}
    </PageContainer>
  );
}

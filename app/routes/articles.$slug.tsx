import type { Route } from "./+types/articles.$slug";
import { getArticleBySlug, getAllArticles } from "~/lib/data";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Breadcrumb } from "~/components/breadcrumb";
import { PageContainer } from "~/components/page-container";

export function meta({ params }: Route.MetaArgs) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return [{ title: "Article Not Found - InkFrame" }];
  }

  return [
    { title: `${article.title} - InkFrame` },
    { name: "description", content: article.summary },
    { name: "keywords", content: article.tags.join(", ") },
    { name: "author", content: article.author },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.summary },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: article.date },
    { property: "article:author", content: article.author },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    throw new Response("Article not found", { status: 404 });
  }

  // Get related articles (same tags, excluding current)
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.id !== article.id &&
        a.tags.some((tag) => article.tags.includes(tag))
    )
    .slice(0, 3);

  return {
    article,
    relatedArticles,
  };
}

export default function ArticleDetail({ loaderData }: Route.ComponentProps) {
  const { article, relatedArticles } = loaderData;

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageContainer size="default">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Articles", href: "/articles" },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          {article.featured && (
            <span className="inline-block text-sm font-semibold text-primary mb-4">
              Featured Article
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-6">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <time dateTime={article.date}>{formattedDate}</time>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-muted rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Summary */}
        <div className="mb-8 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
          <p className="text-lg">{article.summary}</p>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-4xl mx-auto mt-20 pt-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-10">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle: typeof relatedArticles[0]) => (
              <Link
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {relatedArticle.summary}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}

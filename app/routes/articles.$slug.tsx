import type { Route } from "./+types/articles.$slug";
import { getArticleBySlug, getRelatedArticles } from "~/lib/data";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Breadcrumb } from "~/components/breadcrumb";
import { PageContainer } from "~/components/page-container";
import { ShareButtons } from "~/components/share-buttons";
import { TableOfContents } from "~/components/table-of-contents";
import { calculateReadingTime, formatDate } from "~/lib/utils";
import { Clock, User, Calendar } from "lucide-react";

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

  // Get related articles using new function
  const relatedArticles = getRelatedArticles(article.id, 3);

  // Calculate reading time
  const readingTime = calculateReadingTime(article.content);

  return {
    article,
    relatedArticles,
    readingTime,
  };
}

export default function ArticleDetail({ loaderData }: Route.ComponentProps) {
  const { article, relatedArticles, readingTime } = loaderData;

  return (
    <PageContainer size="default">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Articles", href: "/articles" },
          { label: article.title },
        ]}
      />

      <div className="grid lg:grid-cols-[1fr_280px] gap-12">
        {/* Main Content */}
        <article className="max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            {article.featured && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
                ⭐ Featured Article
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag: string) => (
                <Link
                  key={tag}
                  to={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Share Buttons */}
            <ShareButtons
              url={`/articles/${article.slug}`}
              title={article.title}
              description={article.summary}
            />
          </header>

          {/* Article Summary */}
          <div className="mb-8 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
            <p className="text-lg leading-relaxed">{article.summary}</p>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:font-display prose-headings:scroll-mt-20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Author Bio (placeholder) */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{article.author}</span> is a contributing writer
              at InkFrame, specializing in {article.tags.slice(0, 2).join(" and ")} regulation.
            </p>
          </div>
        </article>

        {/* Sidebar - Table of Contents */}
        <aside>
          <TableOfContents content={article.content} />
        </aside>
      </div>

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

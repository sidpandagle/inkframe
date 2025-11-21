import type { Route } from "./+types/authors.$slug";
import { Link } from "react-router";
import { getAuthorBySlug } from "~/lib/data";
import { PageContainer } from "~/components/page-container";
import { Breadcrumb } from "~/components/breadcrumb";
import { ArticleCard } from "~/components/article-card";
import { Card, CardContent } from "~/components/ui/card";
import { generatePersonSchema, generateBreadcrumbSchema } from "~/lib/structured-data";
import { StructuredData } from "~/components/structured-data";
import { FileText, Tag, Calendar, User } from "lucide-react";
import { formatDate } from "~/lib/utils";

export function meta({ params, data }: Route.MetaArgs) {
  if (!data?.author) {
    return [{ title: "Author Not Found - InkFrame" }];
  }

  const { author } = data;
  return [
    { title: `${author.name} - Author at InkFrame` },
    {
      name: "description",
      content: `Read ${author.articleCount} articles by ${author.name} covering ${author.tags.slice(0, 3).join(", ")} and more.`,
    },
    { name: "keywords", content: author.tags.join(", ") },
    { name: "author", content: author.name },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const author = getAuthorBySlug(params.slug);

  if (!author) {
    throw new Response("Author not found", { status: 404 });
  }

  return { author };
}

export default function AuthorProfile({ loaderData }: Route.ComponentProps) {
  const { author } = loaderData;

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "https://inkframe.com";

  // Generate structured data for author
  const personSchema = generatePersonSchema(
    {
      id: author.slug,
      name: author.name,
      role: "Contributing Writer",
      bio: `${author.name} has authored ${author.articleCount} articles on ${author.tags.slice(0, 3).join(", ")} and related topics.`,
    },
    baseUrl
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: "Home", url: "/" },
      { name: "Authors", url: "/authors" },
      { name: author.name, url: `/authors/${author.slug}` },
    ],
    baseUrl
  );

  // Find most recent article date
  const latestArticleDate = author.articles[0]?.date;

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={breadcrumbSchema} />

      <PageContainer size="default">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Authors", href: "/authors" },
            { label: author.name },
          ]}
        />

        {/* Author Header */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Author Avatar */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-4xl md:text-5xl font-bold flex-shrink-0">
                  {author.name.charAt(0)}
                </div>

                {/* Author Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {author.name}
                    </h1>
                  </div>

                  <p className="text-lg text-muted-foreground mb-6">
                    Contributing Writer at InkFrame
                  </p>

                  {/* Author Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <FileText className="w-4 h-4" />
                        <span>Articles Published</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {author.articleCount}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Tag className="w-4 h-4" />
                        <span>Topics Covered</span>
                      </div>
                      <p className="text-2xl font-bold">{author.tags.length}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Latest Article</span>
                      </div>
                      <p className="text-lg font-semibold">
                        {latestArticleDate
                          ? formatDate(latestArticleDate)
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {author.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/articles?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Articles by {author.name}
          </h2>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Empty State */}
          {author.articles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">
                No articles found for this author yet.
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}

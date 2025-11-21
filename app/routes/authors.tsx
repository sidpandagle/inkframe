import type { Route } from "./+types/authors";
import { Link } from "react-router";
import { getAllAuthors } from "~/lib/data";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Card, CardContent } from "~/components/ui/card";
import { Users, FileText, Tag } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Authors - InkFrame" },
    {
      name: "description",
      content:
        "Meet the expert authors behind InkFrame's crypto regulation, compliance, and legal analysis content.",
    },
    {
      name: "keywords",
      content:
        "crypto experts, legal analysts, compliance authors, regulatory writers",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const authors = getAllAuthors();
  return { authors };
}

export default function Authors({ loaderData }: Route.ComponentProps) {
  const { authors } = loaderData;

  return (
    <PageContainer size="default">
      <PageHeader
        icon={Users}
        title="Our Authors"
        description="Meet the expert contributors who bring you authoritative insights on crypto regulation and compliance"
      />

      {/* Authors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Link
            key={author.slug}
            to={`/authors/${author.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Author Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {author.name.charAt(0)}
                </div>

                {/* Author Name */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {author.name}
                </h3>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{author.articleCount} articles</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{author.tags.length} topics</span>
                  </div>
                </div>

                {/* Top Tags */}
                <div className="flex flex-wrap gap-2">
                  {author.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {author.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{author.tags.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Author Count */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {authors.length} expert {authors.length === 1 ? "author" : "authors"}{" "}
          contributing to InkFrame
        </p>
      </div>
    </PageContainer>
  );
}

import type { Route } from "./+types/compliance.$slug";
import { getComplianceTopicBySlug, getArticlesForComplianceTopic } from "~/lib/data";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ArticleCard } from "~/components/article-card";
import { Breadcrumb } from "~/components/breadcrumb";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Shield } from "lucide-react";

export function meta({ params }: Route.MetaArgs) {
  const topic = getComplianceTopicBySlug(params.slug);

  if (!topic) {
    return [{ title: "Compliance Topic Not Found - InkFrame" }];
  }

  return [
    { title: `${topic.name} - Compliance - InkFrame` },
    { name: "description", content: topic.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const topic = getComplianceTopicBySlug(params.slug);

  if (!topic) {
    throw new Response("Compliance topic not found", { status: 404 });
  }

  const articles = getArticlesForComplianceTopic(topic.id);

  return {
    topic,
    articles,
  };
}

export default function ComplianceTopicDetail({
  loaderData,
}: Route.ComponentProps) {
  const { topic, articles } = loaderData;

  return (
    <PageContainer>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Compliance", href: "/compliance" },
          { label: topic.name },
        ]}
      />

      {/* Topic Header */}
      <PageHeader
        icon={Shield}
        title={topic.name}
        description={topic.description}
      />

      {/* Articles */}
      {articles.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Related Articles ({articles.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: typeof articles[0]) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            No articles available for this topic yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/articles">Browse All Articles</Link>
          </Button>
        </div>
      )}
    </PageContainer>
  );
}

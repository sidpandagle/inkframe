import type { Route } from "./+types/compliance";
import { getAllComplianceTopics } from "~/lib/data";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { PageContainer } from "~/components/page-container";
import { PageHeader } from "~/components/page-header";
import { Shield } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Compliance Topics - InkFrame" },
    {
      name: "description",
      content:
        "Browse compliance topics covering crypto regulation, AML/KYC requirements, tax reporting, DeFi, and more.",
    },
  ];
}

export async function loader() {
  const topics = getAllComplianceTopics();

  return {
    topics,
  };
}

export default function Compliance({ loaderData }: Route.ComponentProps) {
  const { topics } = loaderData;

  return (
    <PageContainer>
      <PageHeader
        icon={Shield}
        title="Compliance Hub"
        description="Navigate complex regulatory requirements with our topic-based compliance resources."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic: typeof topics[0]) => (
          <Link
            key={topic.id}
            to={`/compliance/${topic.slug}`}
            className="block group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {topic.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {topic.articles.length} article{topic.articles.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}

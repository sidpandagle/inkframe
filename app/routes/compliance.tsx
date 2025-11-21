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
        {topics.map((topic: typeof topics[0]) => {
          // Default compliance/security image from Unsplash
          const defaultImage = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop";
          const imageUrl = topic.image || defaultImage;

          return (
            <Link
              key={topic.id}
              to={`/compliance/${topic.slug}`}
              className="block group"
            >
              <Card className="h-full card-modern overflow-hidden hover:shadow-xl transition-all duration-300 pt-0">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={topic.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-card/40"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
                      <Shield className="w-3 h-3" />
                      <span>{topic.articles.length} article{topic.articles.length !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-xl">
                    {topic.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageContainer>
  );
}

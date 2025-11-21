import type { Route } from "./+types/about";
import { getAllTeamMembers } from "~/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PageContainer } from "~/components/page-container";
import { PageHeader, SectionHeader } from "~/components/page-header";
import { Info, Target, Globe, Users } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - InkFrame" },
    {
      name: "description",
      content:
        "Learn about InkFrame's mission to provide authoritative insights on crypto regulation, fintech law, and compliance. Meet our editorial team.",
    },
  ];
}

export async function loader() {
  const team = getAllTeamMembers();

  return {
    team,
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { team } = loaderData;

  return (
    <PageContainer size="default">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <PageHeader
          icon={Info}
          title="About InkFrame"
          description="Your trusted source for comprehensive insights on crypto regulation, fintech law, and compliance frameworks."
        />
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We bridge the gap between complex regulatory landscapes and practical
          implementation, helping crypto founders, legal teams, compliance
          officers, and industry professionals navigate the evolving world of
          digital asset regulation.
        </p>
      </div>

      {/* Mission & Values */}
      <section className="mb-20">
        <SectionHeader
          icon={Target}
          title="Our Mission"
          className="text-center justify-center"
        />
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden card-modern group hover:shadow-xl transition-all duration-300 p-0">
            <div className="h-48 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
                alt="Authoritative Analysis"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-card/30"></div>
            </div>
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">Authoritative Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We provide in-depth, well-researched analysis of regulatory
                developments from experienced legal and compliance professionals.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden card-modern group hover:shadow-xl transition-all duration-300 p-0">
            <div className="h-48 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop"
                alt="Practical Insights"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-card/30"></div>
            </div>
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">Practical Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Our content bridges theory and practice, offering actionable
                guidance for navigating complex compliance requirements.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden card-modern group hover:shadow-xl transition-all duration-300 p-0">
            <div className="h-48 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop"
                alt="Global Coverage"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-card/30"></div>
            </div>
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">Global Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We cover regulatory developments across major jurisdictions,
                providing a comprehensive view of the global crypto legal
                landscape.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Editorial Team */}
      <section className="mb-20">
        <SectionHeader
          icon={Users}
          title="Our Editorial Team"
          className="text-center justify-center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member: typeof team[0]) => {
            // Default professional image from Unsplash
            const defaultImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop";
            const imageUrl = member.image || defaultImage;

            return (
              <Card key={member.id} className="overflow-hidden card-modern group hover:shadow-xl transition-all duration-300 p-0">
                <div className="h-48 relative overflow-hidden bg-primary/10">
                  <img
                    src={imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Commitment */}
      <section className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-2xl p-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Commitment</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are committed to maintaining the highest standards of accuracy,
          objectivity, and timeliness in our coverage. Our editorial team
          comprises experienced legal and compliance professionals who bring
          deep expertise and practical insights to every article.
        </p>
      </section>
    </PageContainer>
  );
}

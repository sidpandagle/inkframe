import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { ArticleCard } from "~/components/article-card";
import { getFeaturedArticles, getAllArticles } from "~/lib/data";
import { Link } from "react-router";
import { TrendingUp, Shield, FileText, ArrowRight, Zap } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "InkFrame - Crypto, Fintech, Law & Regulation Insights" },
    {
      name: "description",
      content:
        "Your trusted source for crypto regulation, compliance updates, legal analysis, and fintech industry insights.",
    },
    {
      name: "keywords",
      content:
        "crypto regulation, fintech law, compliance, MiCA, legal analysis, cryptocurrency",
    },
  ];
}

export async function loader() {
  const featuredArticles = getFeaturedArticles();
  const allArticles = getAllArticles();
  const recentArticles = allArticles.slice(0, 6);

  return {
    featuredArticles,
    recentArticles,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredArticles, recentArticles } = loaderData;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative gradient-hero py-12 md:py-20 lg:py-24 overflow-hidden min-h-[85vh] flex items-center">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6 animate-fade-in-up">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Leading Crypto Regulation Insights</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Navigate the World of{" "}
              <span className="gradient-text">Crypto Regulation</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Expert insights on crypto, fintech, law, and compliance. Stay ahead
              with authoritative analysis from industry leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up mb-10 md:mb-12" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-smooth text-base">
                <Link to="/articles" className="flex items-center gap-2">
                  <span>Explore Articles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary/5 transition-smooth text-base">
                <Link to="/compliance" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Compliance Hub</span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 md:mb-2">250+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 md:mb-2">50+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Regulations Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-1 md:mb-2">10K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Monthly Readers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">Latest Insights</h2>
          </div>
          <Button asChild variant="outline" className="border-2">
            <Link to="/articles" className="flex items-center gap-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our Community</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Informed, Stay <span className="gradient-text">Compliant</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who trust InkFrame for the latest in
            crypto regulation, compliance, and legal analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-primary text-white hover:shadow-xl hover:scale-105 transition-smooth text-base">
              <Link to="/about" className="flex items-center gap-2">
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 hover:bg-primary/5 transition-smooth text-base">
              <Link to="/contact" className="flex items-center gap-2">
                {/* <Mail className="w-4 h-4" /> */}
                <span>Get in Touch</span>
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Accurate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Daily</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Expert</div>
              <div className="text-sm text-muted-foreground">Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Global</div>
              <div className="text-sm text-muted-foreground">Coverage</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

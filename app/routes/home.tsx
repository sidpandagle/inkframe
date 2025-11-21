import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { ArticleCard } from "~/components/article-card";
import { SearchBar } from "~/components/search-bar";
import { TrustedBy } from "~/components/trusted-by";
import { BreakingNewsCarousel } from "~/components/breaking-news-carousel";
import { CategoriesShowcase, getDefaultCategories } from "~/components/categories-showcase";
import {
  getAllArticles,
  getBreakingNewsArticles,
  getTrendingArticles,
  getCategoryCount,
} from "~/lib/data";
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
  const breakingNews = getBreakingNewsArticles(4);
  const trendingArticles = getTrendingArticles(6);
  const allArticles = getAllArticles();
  const recentArticles = allArticles.slice(0, 9);

  // Get category counts (icons will be added on client side)
  const categoryCounts = getDefaultCategories().map(cat => ({
    name: cat.name,
    slug: cat.slug,
    count: getCategoryCount(cat.slug),
    color: cat.color,
  }));

  return {
    breakingNews,
    trendingArticles,
    recentArticles,
    categoryCounts,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { breakingNews, trendingArticles, recentArticles, categoryCounts } = loaderData;

  // Merge category counts with icons on client side
  const categories = getDefaultCategories().map(cat => ({
    ...cat,
    count: categoryCounts.find(c => c.slug === cat.slug)?.count || 0,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative gradient-hero py-12 md:py-20 lg:py-24 overflow-hidden min-h-[60vh] md:min-h-[65vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=1080&fit=crop"
            alt="Crypto and blockchain technology"
            className="w-full h-full object-cover opacity-10 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"></div>
        </div>

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
              Latest News, Essential Insights &{" "}
              <span className="gradient-text">Actionable Trends</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Expert insights on crypto, fintech, law, and compliance. Stay ahead
              with authoritative analysis from industry leaders.
            </p>

            {/* Search Bar */}
            <div className="mb-10 md:mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <SearchBar />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up mb-10 md:mb-12" style={{ animationDelay: '0.35s' }}>
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

            {/* Trusted By Section */}
            <TrustedBy />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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

      {/* Breaking News Carousel */}
      {breakingNews.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <BreakingNewsCarousel articles={breakingNews} />
        </section>
      )}

      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20 bg-muted/30">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
              <p className="text-sm text-muted-foreground mt-1">Most popular articles this week</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {trendingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Showcase */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <CategoriesShowcase categories={categories} />
      </section>

      {/* Latest Insights */}
      <section className="container mx-auto px-4 py-16 md:py-20 bg-muted/30">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Latest Insights</h2>
              <p className="text-sm text-muted-foreground mt-1">Fresh analysis and expert commentary</p>
            </div>
          </div>
          <Button asChild variant="outline" className="border-2 hidden md:flex">
            <Link to="/articles" className="flex items-center gap-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <Button asChild variant="outline" className="border-2 w-full">
            <Link to="/articles" className="flex items-center justify-center gap-2">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
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

import { Link } from "react-router";
import {
  Shield,
  TrendingUp,
  FileText,
  Scale,
  Building2,
  Landmark,
  ArrowRight,
  Coins,
} from "lucide-react";

export interface CategoryData {
  name: string;
  slug: string;
  icon: typeof Shield;
  count: number;
  color: string;
}

interface CategoriesShowcaseProps {
  categories: CategoryData[];
}

export function CategoriesShowcase({ categories }: CategoriesShowcaseProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explore by <span className="gradient-text">Category</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Navigate through our comprehensive coverage of crypto regulation, compliance, and fintech topics
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/articles?category=${category.slug}`}
              className="group"
            >
              <div className="relative h-full p-6 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Gradient background */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${category.color}`}></div>

                {/* Content */}
                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${category.color.replace('bg-gradient-to-br', 'bg-gradient-to-br')} bg-opacity-10`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} article{category.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Categories Link */}
      <div className="text-center pt-4">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <span>View all topics</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// Helper to get default categories
export function getDefaultCategories(): CategoryData[] {
  return [
    {
      name: "Crypto Regulation",
      slug: "crypto-regulation",
      icon: Shield,
      count: 0,
      color: "bg-gradient-to-br from-primary/10 to-primary/5",
    },
    {
      name: "Compliance",
      slug: "compliance",
      icon: FileText,
      count: 0,
      color: "bg-gradient-to-br from-accent/10 to-accent/5",
    },
    {
      name: "MiCA",
      slug: "mica",
      icon: Scale,
      count: 0,
      color: "bg-gradient-to-br from-secondary/10 to-secondary/5",
    },
    {
      name: "DeFi",
      slug: "defi",
      icon: Coins,
      count: 0,
      color: "bg-gradient-to-br from-primary/10 to-accent/5",
    },
    {
      name: "Banking",
      slug: "banking",
      icon: Building2,
      count: 0,
      color: "bg-gradient-to-br from-secondary/10 to-primary/5",
    },
    {
      name: "Fintech",
      slug: "fintech",
      icon: TrendingUp,
      count: 0,
      color: "bg-gradient-to-br from-accent/10 to-secondary/5",
    },
    {
      name: "Legal Analysis",
      slug: "legal",
      icon: Landmark,
      count: 0,
      color: "bg-gradient-to-br from-primary/10 to-secondary/5",
    },
    {
      name: "Policy",
      slug: "policy",
      icon: FileText,
      count: 0,
      color: "bg-gradient-to-br from-secondary/10 to-accent/5",
    },
  ];
}

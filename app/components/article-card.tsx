import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Article } from "~/types";
import { Calendar, User, ArrowRight, Star } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/articles/${article.slug}`} className="block group h-full">
      <Card
        className={`h-full card-modern ${
          featured ? "border-primary/40 bg-gradient-to-br from-primary/5 to-transparent" : ""
        }`}
      >
        {/* Image placeholder with gradient */}
        <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
          {featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 text-xl">
            {article.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={article.date}>{formattedDate}</time>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">{article.summary}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="badge-modern"
            >
              {tag}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}

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

  // Default Unsplash image for crypto/fintech/law topics
  const defaultImage = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop";
  const imageUrl = article.image || defaultImage;

  return (
    <Link to={`/articles/${article.slug}`} className="block group h-full">
      <Card
        className={`h-full card-modern overflow-hidden p-0 ${
          featured ? "border-primary/40 bg-gradient-to-br from-primary/5 to-transparent" : ""
        }`}
      >
        {/* Image with modern overlay */}
        <div className="h-52 relative overflow-hidden">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Solid overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          {featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-lg backdrop-blur-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          )}

          {/* Hover icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-primary/95 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xl">
              <ArrowRight className="w-6 h-6 text-primary dark:text-primary-foreground" />
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2 text-xl leading-tight">
            {article.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-3 text-sm pt-2">
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

        <CardContent className="pb-4">
          <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">{article.summary}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 pt-0">
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

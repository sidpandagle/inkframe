import { Link } from "react-router";
import type { Article } from "~/types";
import { Calendar, ArrowRight, Zap } from "lucide-react";
import { Button } from "~/components/ui/button";

interface BreakingNewsCarouselProps {
  articles: Article[];
}

export function BreakingNewsCarousel({ articles }: BreakingNewsCarouselProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Breaking News</h2>
            <p className="text-sm text-muted-foreground mt-1">Latest updates and urgent developments</p>
          </div>
        </div>
        <Button asChild variant="outline" className="border-2 hidden md:flex">
          <Link to="/articles" className="flex items-center gap-2">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="group flex-shrink-0 w-[340px] md:w-[380px]"
              >
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src={article.image || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-semibold">
                    Breaking
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary-foreground transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Gradient fade on right */}
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none hidden md:block"></div>
      </div>

      {/* Mobile View All Button */}
      <Button asChild variant="outline" className="border-2 w-full md:hidden">
        <Link to="/articles" className="flex items-center justify-center gap-2">
          <span>View All Articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

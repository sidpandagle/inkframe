import type { SiteData, Article, ComplianceTopic, TeamMember } from "~/types";
import siteData from "~/data/site-data.json";

const data: SiteData = siteData as SiteData;

export function getAllArticles(): Article[] {
  return data.articles.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedArticles(): Article[] {
  return data.articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  return data.articles.find(article => article.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  return data.articles.filter(article =>
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllComplianceTopics(): ComplianceTopic[] {
  return data.complianceTopics;
}

export function getComplianceTopicBySlug(slug: string): ComplianceTopic | undefined {
  return data.complianceTopics.find(topic => topic.slug === slug);
}

export function getArticlesForComplianceTopic(topicId: string): Article[] {
  const topic = data.complianceTopics.find(t => t.id === topicId);
  if (!topic) return [];

  return topic.articles
    .map(articleId => data.articles.find(a => a.id === articleId))
    .filter((article): article is Article => article !== undefined);
}

export function getAllTeamMembers(): TeamMember[] {
  return data.team;
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return data.team.find(member => member.id === id);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  data.articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getBreakingNewsArticles(limit: number = 4): Article[] {
  // Get the most recent articles as "breaking news"
  return getAllArticles().slice(0, limit);
}

export function getTrendingArticles(limit: number = 6): Article[] {
  // For now, return featured articles or most recent
  const featured = getFeaturedArticles();
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  // Fill with recent articles if not enough featured
  const recent = getAllArticles();
  const combined = [...featured];

  for (const article of recent) {
    if (combined.length >= limit) break;
    if (!combined.find(a => a.id === article.id)) {
      combined.push(article);
    }
  }

  return combined.slice(0, limit);
}

export function getCategoryCount(categorySlug: string): number {
  const normalizedCategory = categorySlug.toLowerCase();
  return data.articles.filter(article =>
    article.tags.some(tag => tag.toLowerCase().includes(normalizedCategory))
  ).length;
}

export function getRelatedArticles(articleId: string, limit: number = 3): Article[] {
  const currentArticle = data.articles.find(a => a.id === articleId);
  if (!currentArticle) return [];

  // Find articles with shared tags
  const related = data.articles
    .filter(article => {
      if (article.id === articleId) return false;
      return article.tags.some(tag => currentArticle.tags.includes(tag));
    })
    .sort((a, b) => {
      // Sort by number of shared tags
      const aSharedTags = a.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      const bSharedTags = b.tags.filter(tag => currentArticle.tags.includes(tag)).length;
      if (bSharedTags !== aSharedTags) return bSharedTags - aSharedTags;
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);

  return related;
}

export interface AuthorProfile {
  name: string;
  slug: string;
  articleCount: number;
  articles: Article[];
  recentArticles: Article[];
  tags: string[];
}

export function getAllAuthors(): AuthorProfile[] {
  const authorMap = new Map<string, Article[]>();

  // Group articles by author
  data.articles.forEach(article => {
    const existing = authorMap.get(article.author) || [];
    authorMap.set(article.author, [...existing, article]);
  });

  // Create author profiles
  return Array.from(authorMap.entries())
    .map(([name, articles]) => {
      // Sort articles by date
      const sortedArticles = articles.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Get unique tags
      const tags = Array.from(
        new Set(articles.flatMap(article => article.tags))
      ).sort();

      return {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        articleCount: articles.length,
        articles: sortedArticles,
        recentArticles: sortedArticles.slice(0, 3),
        tags,
      };
    })
    .sort((a, b) => b.articleCount - a.articleCount);
}

export function getAuthorBySlug(slug: string): AuthorProfile | undefined {
  const authors = getAllAuthors();
  return authors.find(author => author.slug === slug);
}

export function getArticlesByAuthor(authorName: string): Article[] {
  return data.articles
    .filter(article => article.author === authorName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

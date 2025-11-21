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

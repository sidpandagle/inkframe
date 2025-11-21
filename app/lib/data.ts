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

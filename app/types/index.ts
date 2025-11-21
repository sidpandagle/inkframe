export interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export interface ComplianceTopic {
  id: string;
  name: string;
  slug: string;
  description: string;
  articles: string[]; // Article IDs
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface SiteData {
  articles: Article[];
  complianceTopics: ComplianceTopic[];
  team: TeamMember[];
}

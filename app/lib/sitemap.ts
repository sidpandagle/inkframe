import type { Article, ComplianceTopic } from "~/types";
import type { AuthorProfile } from "~/lib/data";

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface SitemapOptions {
  baseUrl: string;
}

/**
 * Generate XML sitemap from a list of URLs
 */
export function generateSitemap(urls: SitemapUrl[], options: SitemapOptions): string {
  const { baseUrl } = options;

  const urlEntries = urls
    .map((url) => {
      const parts = [
        `  <url>`,
        `    <loc>${baseUrl}${url.loc}</loc>`,
      ];

      if (url.lastmod) {
        parts.push(`    <lastmod>${url.lastmod}</lastmod>`);
      }

      if (url.changefreq) {
        parts.push(`    <changefreq>${url.changefreq}</changefreq>`);
      }

      if (url.priority !== undefined) {
        parts.push(`    <priority>${url.priority.toFixed(1)}</priority>`);
      }

      parts.push(`  </url>`);
      return parts.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generate sitemap URLs from articles
 */
export function generateArticleUrls(articles: Article[]): SitemapUrl[] {
  return articles.map((article) => ({
    loc: `/articles/${article.slug}`,
    lastmod: article.date,
    changefreq: "monthly" as const,
    priority: article.featured ? 0.9 : 0.7,
  }));
}

/**
 * Generate sitemap URLs from compliance topics
 */
export function generateComplianceUrls(topics: ComplianceTopic[]): SitemapUrl[] {
  return topics.map((topic) => ({
    loc: `/compliance/${topic.slug}`,
    changefreq: "weekly" as const,
    priority: 0.8,
  }));
}

/**
 * Generate sitemap URLs from author profiles
 */
export function generateAuthorUrls(authors: AuthorProfile[]): SitemapUrl[] {
  return authors.map((author) => ({
    loc: `/authors/${author.slug}`,
    changefreq: "monthly" as const,
    priority: 0.7,
  }));
}

/**
 * Generate static page URLs
 */
export function generateStaticUrls(): SitemapUrl[] {
  return [
    {
      loc: "/",
      changefreq: "daily" as const,
      priority: 1.0,
    },
    {
      loc: "/articles",
      changefreq: "daily" as const,
      priority: 0.9,
    },
    {
      loc: "/authors",
      changefreq: "weekly" as const,
      priority: 0.7,
    },
    {
      loc: "/compliance",
      changefreq: "weekly" as const,
      priority: 0.8,
    },
    {
      loc: "/resources",
      changefreq: "weekly" as const,
      priority: 0.8,
    },
    {
      loc: "/faq",
      changefreq: "monthly" as const,
      priority: 0.7,
    },
    {
      loc: "/about",
      changefreq: "monthly" as const,
      priority: 0.6,
    },
    {
      loc: "/contact",
      changefreq: "monthly" as const,
      priority: 0.6,
    },
    {
      loc: "/terms",
      changefreq: "yearly" as const,
      priority: 0.3,
    },
    {
      loc: "/privacy",
      changefreq: "yearly" as const,
      priority: 0.3,
    },
    {
      loc: "/disclaimer",
      changefreq: "yearly" as const,
      priority: 0.3,
    },
  ];
}

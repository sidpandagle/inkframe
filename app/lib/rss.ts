import type { Article } from "~/types";

interface RSSFeedOptions {
  title: string;
  description: string;
  link: string;
  language?: string;
  copyright?: string;
}

export function generateRSSFeed(articles: Article[], options: RSSFeedOptions): string {
  const { title, description, link, language = "en-us", copyright } = options;
  const buildDate = new Date().toUTCString();

  const items = articles.map((article) => {
    const articleUrl = `${link}/articles/${article.slug}`;
    const pubDate = new Date(article.date).toUTCString();

    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${article.author}]]></author>
      ${article.tags.map(tag => `<category>${tag}</category>`).join("\n      ")}
      ${article.image ? `<enclosure url="${article.image}" type="image/jpeg" />` : ""}
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${link}</link>
    <description>${description}</description>
    <language>${language}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    ${copyright ? `<copyright>${copyright}</copyright>` : ""}
    <atom:link href="${link}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

export function generateAtomFeed(articles: Article[], options: RSSFeedOptions): string {
  const { title, description, link } = options;
  const updated = new Date().toISOString();

  const entries = articles.map((article) => {
    const articleUrl = `${link}/articles/${article.slug}`;
    const published = new Date(article.date).toISOString();

    return `
  <entry>
    <title><![CDATA[${article.title}]]></title>
    <link href="${articleUrl}" />
    <id>${articleUrl}</id>
    <published>${published}</published>
    <updated>${published}</updated>
    <summary><![CDATA[${article.summary}]]></summary>
    <author>
      <name>${article.author}</name>
    </author>
    ${article.tags.map(tag => `<category term="${tag}" />`).join("\n    ")}
  </entry>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${title}</title>
  <link href="${link}" />
  <link href="${link}/atom.xml" rel="self" />
  <id>${link}/</id>
  <updated>${updated}</updated>
  <subtitle>${description}</subtitle>
  ${entries}
</feed>`;
}

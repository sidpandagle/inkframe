import type { Route } from "./+types/rss.featured[.]xml";
import { getFeaturedArticles } from "~/lib/data";
import { generateRSSFeed } from "~/lib/rss";

export async function loader({}: Route.LoaderArgs) {
  const articles = getFeaturedArticles();
  const baseUrl = "https://inkframe.com"; // Update with your actual domain

  const rss = generateRSSFeed(articles, {
    title: "InkFrame - Featured Articles",
    description: "Featured expert insights on crypto regulation, compliance, and legal frameworks.",
    link: baseUrl,
    copyright: `© ${new Date().getFullYear()} InkFrame. All rights reserved.`,
  });

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}

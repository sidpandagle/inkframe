import type { Route } from "./+types/rss[.]xml";
import { getAllArticles } from "~/lib/data";
import { generateRSSFeed } from "~/lib/rss";

export async function loader({}: Route.LoaderArgs) {
  const articles = getAllArticles().slice(0, 50); // Latest 50 articles
  const baseUrl = "https://inkframe.com"; // Update with your actual domain

  const rss = generateRSSFeed(articles, {
    title: "InkFrame - Crypto Regulation & Compliance Insights",
    description: "Expert insights on crypto regulation, fintech law, compliance frameworks, and legal analysis.",
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

import type { Route } from "./+types/atom[.]xml";
import { getAllArticles } from "~/lib/data";
import { generateAtomFeed } from "~/lib/rss";

export async function loader({}: Route.LoaderArgs) {
  const articles = getAllArticles().slice(0, 50); // Latest 50 articles
  const baseUrl = "https://inkframe.com"; // Update with your actual domain

  const atom = generateAtomFeed(articles, {
    title: "InkFrame - Crypto Regulation & Compliance Insights",
    description: "Expert insights on crypto regulation, fintech law, compliance frameworks, and legal analysis.",
    link: baseUrl,
  });

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}

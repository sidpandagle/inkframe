import type { Route } from "./+types/sitemap[.]xml";
import { getAllArticles, getAllComplianceTopics } from "~/lib/data";
import {
  generateSitemap,
  generateArticleUrls,
  generateComplianceUrls,
  generateStaticUrls,
} from "~/lib/sitemap";

export async function loader({}: Route.LoaderArgs) {
  const baseUrl = "https://inkframe.com"; // Update with your actual domain

  // Gather all URLs
  const staticUrls = generateStaticUrls();
  const articleUrls = generateArticleUrls(getAllArticles());
  const complianceUrls = generateComplianceUrls(getAllComplianceTopics());

  // Combine all URLs
  const allUrls = [...staticUrls, ...articleUrls, ...complianceUrls];

  // Generate sitemap XML
  const sitemap = generateSitemap(allUrls, { baseUrl });

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}

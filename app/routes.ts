import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/:slug", "routes/articles.$slug.tsx"),
  route("authors", "routes/authors.tsx"),
  route("authors/:slug", "routes/authors.$slug.tsx"),
  route("compliance", "routes/compliance.tsx"),
  route("compliance/:slug", "routes/compliance.$slug.tsx"),
  route("resources", "routes/resources.tsx"),
  route("faq", "routes/faq.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("disclaimer", "routes/disclaimer.tsx"),
  // RSS & Atom feeds
  route("rss.xml", "routes/rss[.]xml.tsx"),
  route("rss/featured.xml", "routes/rss.featured[.]xml.tsx"),
  route("atom.xml", "routes/atom[.]xml.tsx"),
  // Sitemap
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
] satisfies RouteConfig;

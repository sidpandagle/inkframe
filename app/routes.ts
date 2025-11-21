import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles.tsx"),
  route("articles/:slug", "routes/articles.$slug.tsx"),
  route("compliance", "routes/compliance.tsx"),
  route("compliance/:slug", "routes/compliance.$slug.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("terms", "routes/terms.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("disclaimer", "routes/disclaimer.tsx"),
] satisfies RouteConfig;

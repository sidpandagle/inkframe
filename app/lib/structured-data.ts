import type { Article, TeamMember } from "~/types";

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
}

export function generateOrganizationSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    sameAs: data.sameAs,
  };
}

export function generateArticleSchema(article: Article, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: article.image || `${baseUrl}/og-image.png`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "InkFrame",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${article.slug}`,
    },
    keywords: article.tags.join(", "),
  };
}

export function generatePersonSchema(member: TeamMember, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    image: member.image,
    worksFor: {
      "@type": "Organization",
      name: "InkFrame",
      url: baseUrl,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebSiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InkFrame",
    url: baseUrl,
    description: "Your trusted source for crypto regulation, compliance updates, legal analysis, and fintech industry insights.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/articles?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

# PRD: InkFrame-style Website

## 1. Vision & Purpose

-   Create an informational resource on crypto, fintech, law, and
    regulation.
-   Present key statistics, legal/regulatory articles, compliance
    updates, and industry commentary.
-   Start with static JSON-based content.
-   Multi-page, SEO‑focused Remix website.

## 2. Target Users

-   Crypto founders, legal teams, compliance officers\
-   Lawyers and researchers\
-   Investors\
-   General audience

## 3. Key Features

### Homepage

-   Hero section\
-   Trending articles\
-   Newsletter CTA

### Articles

-   List + detail pages\
-   SEO-friendly slugs\
-   Tags, author, date

### Compliance

-   Breakdown by regulation topic\
-   Topic-based article grouping

### About

-   Mission, editorial board, team

### Contact

-   Contact form\
-   Address & trust indicators

### Legal Pages

-   Terms, Privacy, Disclaimer

### Footer

-   Navigation links\
-   Newsletter input

## 4. Data Model (JSON)

``` json
{
  "articles": [
    {
      "id": "mica-compliance-wallet-providers-2025",
      "title": "MiCA Compliance for Wallet Providers Statistics 2025",
      "slug": "mica-compliance-wallet-providers-2025",
      "author": "Barry Elad",
      "date": "2025-11-20",
      "summary": "A deep dive into the MiCA regulation and its impact.",
      "content": "<p>Full content…</p>",
      "tags": ["MiCA", "Compliance"]
    }
  ],
  "complianceTopics": [],
  "team": []
}
```

## 5. Tech Stack

-   Remix (SSR, SEO)
-   Tailwind CSS
-   Static JSON
-   Hosted on Vercel/Netlify

## 6. UX/UI

-   Clean, minimal, responsive\
-   Accessibility-friendly\
-   Fast performance

## 7. Content Workflow

-   JSON-based manual editing\
-   Version control\
-   Future CMS integration

## 8. Metrics

-   Article count\
-   Newsletter signups\
-   SEO traffic\
-   Engagement

## 9. Risks

-   Manual JSON editing required\
-   SEO risk if content is thin\
-   Scalability limits

## 10. Timeline

1.  Wireframes + schema\
2.  Routing + layout\
3.  Article/compliance pages\
4.  About/contact/legal pages\
5.  SEO & deployment\
6.  Content + launch

## 11. Future Enhancements

-   CMS\
-   Search & filtering\
-   Charts\
-   Localization\
-   Comments

## 12. Non-functional Requirements

-   Performance \<2s\
-   Security (form validation)\
-   SEO meta tags\
-   Accessibility\
-   Modular code structure

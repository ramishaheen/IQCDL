import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * IQCDL robots policy — comprehensive allowlist for the major search and
 * answer-engine crawlers (AEO). Dashboard, portal and API routes are kept
 * out of every index. Sitemap + host are emitted at the bottom.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/dashboard", "/api/", "/portal", "/admin"];

  const search = [
    "Googlebot",
    "Googlebot-Image",
    "Googlebot-News",
    "Bingbot",
    "DuckDuckBot",
    "Slurp",
    "Baiduspider",
    "Yandex",
    "YandexBot",
    "Applebot",
  ];

  const ai = [
    // OpenAI
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Google / Apple AI training crawlers
    "Google-Extended",
    "Applebot-Extended",
    // Anthropic
    "ClaudeBot",
    "anthropic-ai",
    "Claude-Web",
    // Meta
    "FacebookBot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    // Common Crawl + others
    "CCBot",
    "Bytespider",
    "Amazonbot",
    "Diffbot",
    "MistralAI-User",
    "cohere-ai",
    "cohere-training-data-crawler",
    "ImagesiftBot",
    "omgili",
    "omgilibot",
    "YouBot",
    "PetalBot",
    "SemrushBot",
    "AhrefsBot",
    "AwarioRssBot",
  ];

  return {
    rules: [
      // Generic crawlers
      { userAgent: "*", allow: "/", disallow },
      // Explicit search-engine allowlist
      ...search.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      // Explicit AI / answer-engine allowlist
      ...ai.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

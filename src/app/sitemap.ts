import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/why-quantum-ai", priority: 0.9, freq: "monthly" },
    { path: "/programs", priority: 0.9, freq: "monthly" },
    { path: "/quantum-index", priority: 0.9, freq: "weekly" },
    { path: "/quantum-index/submit", priority: 0.6, freq: "monthly" },
    { path: "/awards", priority: 0.9, freq: "monthly" },
    { path: "/awards/submit", priority: 0.6, freq: "monthly" },
    { path: "/membership", priority: 0.8, freq: "monthly" },
    { path: "/community", priority: 0.6, freq: "weekly" },
    { path: "/standards", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/assessment", priority: 0.8, freq: "monthly" },
    { path: "/roadmap", priority: 0.6, freq: "monthly" },
    { path: "/verify", priority: 0.5, freq: "yearly" },
    { path: "/login", priority: 0.3, freq: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

const PAGES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/matches", changeFrequency: "weekly", priority: 0.9 },
  { path: "/trials", changeFrequency: "monthly", priority: 0.9 },
  { path: "/squad", changeFrequency: "monthly", priority: 0.8 },
  { path: "/club", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kits", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE_URL}${p.path}`, changeFrequency: p.changeFrequency, priority: p.priority }));
}

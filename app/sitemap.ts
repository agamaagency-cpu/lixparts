import type { MetadataRoute } from "next";
import { models, products } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const base = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/catalog",
    "/nosecut",
    "/partners",
    "/about",
    "/contacts",
    "/delivery",
    "/privacy",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const modelRoutes = models.map((m) => ({
    url: `${base}/catalog/${m.slug}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/catalog/${p.model}/${p.categorySlug}`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...modelRoutes, ...productRoutes];
}

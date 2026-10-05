import type { MetadataRoute } from "next";
import { models, productHref, products } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

const base = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/catalog",
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
    url: `${base}${productHref(p)}`,
    lastModified: new Date("2026-10-06"),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    ...(p.images?.length ? { images: p.images.map((src) => `${base}${src}`) } : {}),
  }));

  return [...staticRoutes, ...modelRoutes, ...productRoutes];
}

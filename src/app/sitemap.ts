import type { MetadataRoute } from "next";
import { ALL_DOCS } from "@/lib/docs-nav";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/privacy", ...ALL_DOCS.map((d) => d.href)];
  return pages.map((path) => ({
    url: new URL(path, SITE.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/docs") ? 0.7 : 0.4,
  }));
}

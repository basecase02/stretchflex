import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Lists the pages this app serves. Add each page here as it is rebuilt in
 * Next.js. Until then the WordPress sitemap (/sitemap_index.xml) still covers
 * the remaining pages and posts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date("2026-06-23T06:50:13+00:00"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

import type { MetadataRoute } from "next";
import { PAGES } from "@/content/pages";
import posts from "@/content/wp/posts.json";
import { hasSeo, seoFor } from "@/lib/seo";
import { SITE_URL } from "@/content/site";

/**
 * Every page this app serves, with the last-modified dates carried over from
 * WordPress. Pages the live site keeps out of search (thank-you pages and the
 * two benefit pages) are left out, as Yoast did.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const date = (path: string) => {
    const modified = hasSeo(path) ? seoFor(path).modified : null;
    return modified ? new Date(modified) : undefined;
  };
  /** The client's content update (14 November 2026) for rewritten pages. */
  const REWRITTEN = new Date("2026-11-14T00:00:00+08:00");

  const pages = (Object.keys(PAGES) as (keyof typeof PAGES)[])
    .filter((path) => !PAGES[path].noindex)
    .map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: PAGES[path].seo ? REWRITTEN : date(PAGES[path].seoFrom ?? path),
      changeFrequency: "monthly" as const,
      priority: path.startsWith("/our-packages") ? 0.8 : 0.6,
    }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: REWRITTEN,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages,
    { url: `${SITE_URL}/blog`, lastModified: date("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE_URL}${post.path}`,
      lastModified: new Date(post.modified),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

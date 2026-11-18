import { postUrls, urlset } from "@/lib/sitemaps";

export const dynamic = "force-static";

/** /post-sitemap.xml: every blog post (src/lib/sitemaps.ts). */
export function GET() {
  return urlset(postUrls());
}

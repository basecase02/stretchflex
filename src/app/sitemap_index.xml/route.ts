import { sitemapIndex } from "@/lib/sitemaps";

export const dynamic = "force-static";

/** /sitemap_index.xml: the sitemap index at the address Yoast uses (src/lib/sitemaps.ts). */
export function GET() {
  return sitemapIndex();
}

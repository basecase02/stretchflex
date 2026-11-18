import { pageUrls, urlset } from "@/lib/sitemaps";

export const dynamic = "force-static";

/** /page-sitemap.xml: every page (src/lib/sitemaps.ts). */
export function GET() {
  return urlset(pageUrls());
}

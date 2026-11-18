import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * The live site's crawl rules, line for line, with two additions:
 * - Allow /_next/: the live "Disallow: /*?" would otherwise stop Google
 *   fetching our optimised images (/_next/image?url=…). The longer rule wins.
 * - The sitemap index, so crawlers find it without Search Console.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/*.css", "/*.js", "/_next/"],
        disallow: ["/calendar/action*", "/events/action*", "/cdn-cgi*", "/*?"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${SITE_URL}/sitemap_index.xml`,
  };
}
export const dynamic = "force-static";

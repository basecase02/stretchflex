import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Same crawl rules as the live site, minus its blanket "Disallow: /*?" rule:
 * Next.js serves optimised images from /_next/image?url=..., and that rule
 * would stop Google from fetching them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/calendar/action*", "/events/action*", "/cdn-cgi*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

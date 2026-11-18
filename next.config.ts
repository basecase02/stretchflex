import type { NextConfig } from "next";

/**
 * Pages that have not been rebuilt in Next.js yet can keep being served by the
 * existing WordPress site. Set WP_ORIGIN to wherever WordPress lives and every
 * URL this app does not own falls through to it, so no existing URL 404s.
 * It must be a different origin from the one this app is deployed on.
 */
const wpOrigin = process.env.WP_ORIGIN?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old addresses keep working, with a 301 as WordPress sends, so their
  // rankings and links pass to the new page.
  async redirects() {
    const moved = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });
    return [
      // Pages renamed or removed in the rebuild.
      moved("/biljana-stojanovic", "/biljana-mancini"),
      moved("/alan-chapman", "/about"),
      moved("/our-packages/rapid-rejuvenation", "/our-packages/de-compression-recovery-stack"),
      moved("/our-packages/red-light-therapy-benefits", "/our-packages/red-light-therapy-perth"),
      // Redirects the live site already has (WordPress's Redirection plugin).
      moved("/blogs/assisted-stretching-perth-2", "/blogs/assisted-stretching-perth"),
      // As on the live site, /sitemap.xml leads to Yoast's sitemap index.
      moved("/sitemap.xml", "/sitemap_index.xml"),
      // WordPress archive pages (all kept out of search on the live site): the blog.
      moved("/blogs", "/blog"),
      moved("/:year(\\d{4})", "/blog"),
      moved("/:year(\\d{4})/:month(\\d{2})", "/blog"),
      moved("/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})", "/blog"),
      moved("/category/:slug*", "/blog"),
      moved("/author/:slug*", "/blog"),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: wpOrigin ? [{ source: "/:path*", destination: `${wpOrigin}/:path*` }] : [],
    };
  },
};

export default nextConfig;

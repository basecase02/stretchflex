/**
 * Old addresses that keep working, with a 301 as WordPress sends, so their
 * rankings and links pass to the new page.
 *
 * The site is static files on S3 behind CloudFront, so these run at the edge
 * (infra/build-edge.mjs writes them into the CloudFront function). `next dev`
 * uses the same list through next.config.ts.
 */

/** Exact paths. */
export const MOVED = {
  // Pages renamed or removed in the rebuild.
  "/biljana-stojanovic": "/biljana-mancini",
  "/alan-chapman": "/about",
  "/our-packages/rapid-rejuvenation": "/our-packages/de-compression-recovery-stack",
  "/our-packages/red-light-therapy-benefits": "/our-packages/red-light-therapy-perth",
  // Redirects the live site already has (WordPress's Redirection plugin).
  "/blogs/assisted-stretching-perth-2": "/blogs/assisted-stretching-perth",
  // As on the live site, /sitemap.xml leads to Yoast's sitemap index.
  "/sitemap.xml": "/sitemap_index.xml",
  "/blogs": "/blog",
};

/**
 * WordPress archive pages (all kept out of search on the live site) go to the
 * blog: /2025, /2025/06, /2025/06/14, /category/..., /author/...
 */
export const ARCHIVES = ["^/\\d{4}(/\\d{2}(/\\d{2})?)?$", "^/category(/.*)?$", "^/author(/.*)?$"];
export const ARCHIVE_TARGET = "/blog";

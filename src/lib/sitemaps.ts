import { PAGES } from "@/content/pages";
import { SITE_URL } from "@/content/site";
import posts from "@/content/wp/posts.json";
import { hasSeo, seoFor, type SeoEntry } from "@/lib/seo";

/**
 * The sitemaps, at the addresses Yoast uses on the live site (Google already
 * knows them): /sitemap_index.xml lists /post-sitemap.xml and
 * /page-sitemap.xml. Dates are the live ones; pages the live site doesn't
 * have use the date the new content went in. Pages kept out of search are
 * left out, as Yoast does.
 */

type Url = { path: string; lastmod: string; image: string | null };

/** When the client's new content went in (pages the live site doesn't have). */
const NEW_CONTENT = "2026-11-14T00:00:00+08:00";

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const lastmod = (entry: SeoEntry | null) => entry?.sitemap?.lastmod ?? entry?.modified ?? NEW_CONTENT;

function url(path: string, entry: SeoEntry | null): Url {
  return { path, lastmod: lastmod(entry), image: entry?.ogImage?.url ?? null };
}

const byDate = (a: Url, b: Url) => a.lastmod.localeCompare(b.lastmod);

export function pageUrls(): Url[] {
  const pages = (Object.keys(PAGES) as (keyof typeof PAGES)[])
    .filter((path) => !PAGES[path].noindex)
    .map((path) => {
      const content = PAGES[path];
      const source = content.seoFrom ?? path;
      return url(path, hasSeo(source) ? seoFor(source, content.seoRename) : null);
    });
  // The homepage first, as Yoast lists it; then the pages, oldest change first.
  return [url("/", seoFor("/")), ...[...pages, url("/blog", seoFor("/blog"))].sort(byDate)];
}

export function postUrls(): Url[] {
  return (posts as { path: string }[]).map((post) => url(post.path, seoFor(post.path))).sort(byDate);
}

export function urlset(urls: Url[]): Response {
  const body = urls
    .map(
      (u) =>
        `\t<url>\n\t\t<loc>${escape(SITE_URL + u.path)}</loc>\n\t\t<lastmod>${u.lastmod}</lastmod>\n` +
        (u.image ? `\t\t<image:image>\n\t\t\t<image:loc>${escape(new URL(u.image, SITE_URL).href)}</image:loc>\n\t\t</image:image>\n` : "") +
        `\t</url>`,
    )
    .join("\n");
  return xml(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>`,
  );
}

export function sitemapIndex(): Response {
  const newest = (urls: Url[]) => urls.map((u) => u.lastmod).sort().at(-1);
  const entries = [
    ["/post-sitemap.xml", newest(postUrls())],
    ["/page-sitemap.xml", newest(pageUrls())],
  ]
    .map(([path, date]) => `\t<sitemap>\n\t\t<loc>${SITE_URL}${path}</loc>\n\t\t<lastmod>${date}</lastmod>\n\t</sitemap>`)
    .join("\n");
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`);
}

function xml(body: string): Response {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

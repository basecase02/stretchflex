import type { Metadata } from "next";
import seo from "@/content/wp/seo.json";
import posts from "@/content/wp/posts.json";
import dims from "@/content/image-dims.json";
import { SITE_URL, SOCIAL } from "@/content/site";

/**
 * The live site's SEO, copied from what Yoast prints on each URL
 * (scripts/snapshot-live-seo.mjs). The rebuilt pages print the same tags:
 * title, description, robots, canonical, Open Graph, Twitter labels, author
 * and the schema graph.
 */

export type SeoImage = { url: string; width: number | null; height: number | null; type: string | null };

export type SeoEntry = {
  title: string;
  /** Null where the live page has no meta description (Google writes its own snippet). */
  description: string | null;
  robots: string | null;
  /** Path the canonical points to; null where Yoast prints none (pages kept out of search). */
  canonical: string | null;
  ogLocale: string | null;
  ogType: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogUrl: string | null;
  ogSiteName: string | null;
  ogImage: SeoImage | null;
  /** The Facebook page, printed as article:publisher. */
  publisher: string | null;
  published: string | null;
  modified: string | null;
  author: string | null;
  /** Yoast's Twitter labels, e.g. ["Est. reading time", "3 minutes"]. */
  twitter: [string, string][];
  schema: object | null;
  /** The URL's entry in the live sitemap, or null if it isn't listed. */
  sitemap: { lastmod: string | null } | null;
};

export const SITE_NAME = "Assisted Stretching Perth | StretchFLEX";

/** The RSS links WordPress prints on every page. */
export const FEEDS = {
  "application/rss+xml": [
    { url: "/feed", title: `${SITE_NAME} » Feed` },
    { url: "/comments/feed", title: `${SITE_NAME} » Comments Feed` },
  ],
};

export const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const entries = seo as unknown as Record<string, SeoEntry>;

/* ───────── Real photos in place of the AI images ─────────
   A few live share images are AI-generated pictures that the rebuild has
   replaced with real photos. Their tags and schema point to the photo now
   on the page; everything else is exactly as it is live. */

/** WordPress serves "photo.jpg" and "photo-1024x765.jpg" as one picture. */
const imageKey = (url: string) => url.replace(/^https?:\/\/[^/]+/, "").replace(/-\d+x\d+(?=\.\w+$)/, "");

const TYPES: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

function localImage(src: string): SeoImage {
  const size = (dims as unknown as Record<string, [number, number]>)[src];
  return { url: src, width: size?.[0] ?? null, height: size?.[1] ?? null, type: TYPES[src.split(".").pop()!.toLowerCase()] ?? null };
}

const TEAM_PHOTO = localImage("/images/team/stretchflex-team-reception.jpg");

const REPLACED = new Map<string, SeoImage>([
  // Homepage and About: AI pictures, now the team photo at the front desk.
  [imageKey("/wp-content/uploads/2026/02/openart-image_-Cb-sXPh_1770269064583_raw.webp"), TEAM_PHOTO],
  [imageKey("/wp-content/uploads/2026/06/SF62.jpg"), TEAM_PHOTO],
]);
// Blog posts whose AI cover was swapped for a real photo: the share image follows the cover.
for (const post of posts as { path: string; image: { src: string } }[]) {
  const live = entries[post.path]?.ogImage;
  if (live && imageKey(live.url) !== imageKey(post.image.src)) REPLACED.set(imageKey(live.url), localImage(post.image.src));
}

const replacement = (url: unknown) => (typeof url === "string" ? REPLACED.get(imageKey(url)) : undefined);

function withRealImages(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(withRealImages);
  if (node && typeof node === "object") {
    const record = node as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) out[key] = withRealImages(value);
    // An image whose picture was replaced takes the new picture's size too.
    const swapped = record["@type"] === "ImageObject" ? replacement(record.url) : undefined;
    if (swapped) Object.assign(out, { width: swapped.width, height: swapped.height });
    return out;
  }
  const swapped = typeof node === "string" && /\.(jpe?g|png|webp)$/i.test(node) ? replacement(node) : undefined;
  return swapped ? `${SITE_URL}${swapped.url}` : node;
}

/** Whether a live URL has an SEO snapshot. */
export function hasSeo(path: string): boolean {
  return path in entries;
}

/** Every live URL in the snapshot. */
export function seoPaths(): string[] {
  return Object.keys(entries);
}

/**
 * The live SEO of a URL. A page that moved keeps it, with the old address and
 * name swapped for the new ones: rename [["biljana-stojanovic", "biljana-mancini"], …].
 */
export function seoFor(path: string, rename: [string, string][] = []): SeoEntry {
  const entry = entries[path];
  if (!entry) throw new Error(`No SEO snapshot for ${path}`);
  const renamed: SeoEntry = rename.length
    ? JSON.parse(rename.reduce((text, [from, to]) => text.replaceAll(from, to), JSON.stringify(entry)))
    : entry;
  return {
    ...renamed,
    ogImage: renamed.ogImage ? (replacement(renamed.ogImage.url) ?? renamed.ogImage) : null,
    schema: renamed.schema ? (withRealImages(renamed.schema) as object) : null,
  };
}

/**
 * Next.js metadata for the tags it prints well: title, description, robots,
 * author, canonical, the RSS links and Yoast's Twitter labels. The Open Graph
 * tags are printed by <SeoTags> in Yoast's order instead: given Open Graph
 * metadata, Next.js would also add twitter:title, twitter:description and
 * twitter:image, which the live site doesn't have.
 */
export function pageMetadata(entry: SeoEntry, path: string): Metadata {
  // Next.js drops the homepage's trailing slash ("https://stretchflex.au/"),
  // so <SeoTags> prints that canonical.
  const home = path === "/";
  const labels = entry.twitter.flatMap(([label, data], i) => [
    [`twitter:label${i + 1}`, label],
    [`twitter:data${i + 1}`, data],
  ]);
  return {
    title: { absolute: entry.title },
    description: entry.description,
    robots: entry.robots,
    authors: entry.author ? [{ name: entry.author }] : null,
    alternates: { ...(entry.canonical && !home ? { canonical: entry.canonical } : {}), types: FEEDS },
    other: { "twitter:card": "summary_large_image", ...Object.fromEntries(labels) },
  };
}

/** SEO for a page the live site doesn't have, in the same format as the live pages. */
export function newPageEntry(
  path: string,
  seo: { title: string; description?: string; ogTitle?: string; ogDescription?: string },
  noindex = false,
): SeoEntry {
  return {
    title: seo.title,
    description: seo.description ?? null,
    robots: noindex ? "noindex, nofollow" : ROBOTS_INDEX,
    canonical: noindex ? null : path,
    ogLocale: "en_US",
    ogType: "article",
    ogTitle: seo.ogTitle ?? seo.title,
    ogDescription: seo.ogDescription ?? seo.description ?? null,
    ogUrl: path,
    ogSiteName: SITE_NAME,
    ogImage: TEAM_PHOTO,
    publisher: SOCIAL.facebook,
    published: null,
    modified: null,
    author: null,
    twitter: [],
    schema: null,
    sitemap: null,
  };
}

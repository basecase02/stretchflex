import type { Metadata } from "next";
import seo from "@/content/wp/seo.json";

type SeoEntry = {
  title: string;
  description: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogType: string;
  ogImage: { url: string; width?: number; height?: number } | null;
  published: string | null;
  modified: string | null;
  schema: object | null;
};

const SITE_NAME = "Assisted Stretching Perth | StretchFLEX";
const DEFAULT_IMAGE = "/images/team/stretchflex-team-reception.jpg";
const entries = seo as unknown as Record<string, SeoEntry>;

/** The SEO snapshot of a live WordPress URL (title, description, image, schema). */
export function seoFor(path: string): SeoEntry {
  const entry = entries[path];
  if (!entry) throw new Error(`No SEO snapshot for ${path}`);
  return entry;
}

/**
 * Metadata for a page, carried over from the live site: the same title,
 * description, canonical URL and Open Graph tags Yoast printed there.
 */
export function pageMetadata(path: string): Metadata {
  const entry = seoFor(path);
  const description = entry.description ?? entry.ogDescription ?? undefined;
  const image = entry.ogImage ?? { url: DEFAULT_IMAGE, width: 2000, height: 1499 };
  return {
    title: entry.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      locale: "en_US",
      type: entry.ogType === "article" ? "article" : "website",
      title: entry.ogTitle ?? entry.title,
      description: entry.ogDescription ?? description,
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image.url, width: image.width, height: image.height }],
      ...(entry.ogType === "article" && entry.published
        ? { publishedTime: entry.published, modifiedTime: entry.modified ?? undefined }
        : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}

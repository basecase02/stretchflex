import { SITE_URL } from "@/content/site";
import type { SeoEntry } from "@/lib/seo";

const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

/**
 * The Open Graph tags, in the order and form Yoast prints them (property=,
 * which Next.js metadata can't do for article:*), and the homepage's
 * canonical with its trailing slash. React moves these into <head> wherever
 * they are rendered. Title, description, robots and canonical come from
 * pageMetadata() in src/lib/seo.ts.
 */
export function SeoTags({ entry, path }: { entry: SeoEntry; path: string }) {
  const image = entry.ogImage;
  const tags: [string, string | number | null | undefined][] = [
    ["og:locale", entry.ogLocale],
    ["og:type", entry.ogType],
    ["og:title", entry.ogTitle ?? entry.title],
    ["og:description", entry.ogDescription],
    ["og:url", entry.ogUrl ? absolute(entry.ogUrl === "/" ? "/" : entry.ogUrl) : null],
    ["og:site_name", entry.ogSiteName],
    ["article:publisher", entry.publisher],
    ["article:published_time", entry.published],
    ["article:modified_time", entry.modified],
    ["og:image", image ? absolute(image.url) : null],
    ["og:image:width", image?.width],
    ["og:image:height", image?.height],
    ["og:image:type", image?.type],
  ];
  return (
    <>
      {path === "/" && entry.canonical ? <link rel="canonical" href={`${SITE_URL}/`} /> : null}
      {tags.map(([property, content]) =>
        content == null || content === "" ? null : <meta property={property} content={String(content)} key={property} />,
      )}
    </>
  );
}

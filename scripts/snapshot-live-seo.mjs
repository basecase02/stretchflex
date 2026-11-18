#!/usr/bin/env node
/**
 * Copies the live WordPress site's SEO into src/content/wp/seo.json, so the
 * rebuilt pages print exactly what Yoast prints today: title, description,
 * robots, canonical, Open Graph, Twitter labels, author and the schema graph,
 * plus each URL's sitemap date.
 *
 * Run it again right before the domain moves to the new site, in case the
 * SEO was edited in WordPress since:
 *
 *   node scripts/snapshot-live-seo.mjs
 *
 * It reads the URLs from the live sitemaps and adds the pages kept out of
 * search that the new site still serves. It waits a
 * moment between requests (the host asks crawlers for a 10 s delay; this is
 * one visit per page, so a short pause is enough). Redirects it meets are
 * listed at the end; they belong in next.config.ts, not in the snapshot.
 */
import { writeFile } from "node:fs/promises";

const ORIGIN = "https://stretchflex.au";
const OUT = new URL("../src/content/wp/seo.json", import.meta.url);
const UA = "Mozilla/5.0 (compatible; seo-snapshot/1.0)";
const PAUSE_MS = 800;

/** Live pages that are not in the sitemap (Yoast leaves out noindex pages) but are still served. */
const EXTRA = ["/thank-you", "/thank-you-booking", "/risk-of-injury", "/muscle-tension-and-stiffness"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(path) {
  const res = await fetch(ORIGIN + path, { headers: { "User-Agent": UA }, redirect: "manual" });
  const location = res.headers.get("location");
  return { status: res.status, location: location ? toPath(location) : null, text: await res.text() };
}

/** "https://stretchflex.au/about" → "/about"; the homepage stays "/". */
function toPath(url) {
  const u = new URL(url, ORIGIN);
  return u.origin === ORIGIN ? u.pathname : url;
}

const NAMED = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", laquo: "«", raquo: "»", copy: "©", reg: "®", trade: "™",
  middot: "·", bull: "•", times: "×", eacute: "é", rarr: "→",
};

function decode(text) {
  if (text == null) return null;
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : whole;
    }
    return NAMED[code.toLowerCase()] ?? whole;
  });
}

function attrs(source) {
  const out = {};
  for (const m of source.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) out[m[1].toLowerCase()] = m[2] ?? m[3];
  return out;
}

/** Everything Yoast prints in <head> that search engines and social sites read. */
function parseHead(html) {
  const head = html.split(/<\/head>/i)[0];
  const meta = {};
  for (const m of head.matchAll(/<meta\s([^>]*?)\/?>/gi)) {
    const a = attrs(m[1]);
    const key = (a.name ?? a.property)?.toLowerCase();
    if (key && a.content !== undefined) (meta[key] ??= []).push(decode(a.content));
  }
  const one = (key) => meta[key]?.[0] ?? null;
  const num = (key) => (one(key) ? Number(one(key)) : null);

  let canonical = null;
  for (const m of head.matchAll(/<link\s([^>]*?)\/?>/gi)) {
    const a = attrs(m[1]);
    if (a.rel?.toLowerCase().split(/\s+/).includes("canonical")) canonical = toPath(a.href);
  }

  const schemaSource = html.match(/<script[^>]*class="yoast-schema-graph"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
  const twitter = [];
  for (let i = 1; one(`twitter:label${i}`); i++) twitter.push([one(`twitter:label${i}`), one(`twitter:data${i}`)]);

  return {
    title: decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? ""),
    description: one("description"),
    robots: one("robots"),
    canonical,
    ogLocale: one("og:locale"),
    ogType: one("og:type"),
    ogTitle: one("og:title"),
    ogDescription: one("og:description"),
    ogUrl: one("og:url") ? toPath(one("og:url")) : null,
    ogSiteName: one("og:site_name"),
    ogImage: one("og:image")
      ? { url: toPath(one("og:image")), width: num("og:image:width"), height: num("og:image:height"), type: one("og:image:type") }
      : null,
    publisher: one("article:publisher"),
    published: one("article:published_time"),
    modified: one("article:modified_time"),
    author: one("author"),
    twitter,
    schema: schemaSource ? JSON.parse(schemaSource) : null,
  };
}

/** The URLs in the live sitemaps, with their last-modified dates. */
async function sitemapUrls() {
  const index = (await get("/sitemap_index.xml")).text;
  const urls = new Map();
  for (const [, loc] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const xml = (await get(toPath(loc))).text;
    for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const path = toPath(block.match(/<loc>([^<]+)<\/loc>/)[1]);
      urls.set(path, { lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null });
    }
    await sleep(PAUSE_MS);
  }
  return urls;
}

const listed = await sitemapUrls();
const paths = [...listed.keys(), ...EXTRA];
const snapshot = {};
const redirects = [];

async function visit(path) {
  const page = await get(path);
  await sleep(PAUSE_MS);
  if (page.status >= 300 && page.status < 400) {
    redirects.push(`${page.status} ${path} → ${page.location}`);
    return false;
  }
  if (page.status !== 200) {
    console.warn(`${page.status} ${path} (skipped)`);
    return false;
  }
  snapshot[path] = { ...parseHead(page.text), sitemap: listed.get(path) ?? null };
  console.log(`200 ${path}`);
  return true;
}

// Not the blog's /blog/page/N: WordPress answers any N with a copy of /blog
// whose canonical is /blog, and nothing links to them, so they hold no rankings.
for (const path of paths) await visit(path);

const sorted = Object.fromEntries(Object.entries(snapshot).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(OUT, JSON.stringify(sorted, null, 1) + "\n");
console.log(`\nSaved ${Object.keys(sorted).length} pages to src/content/wp/seo.json`);
if (redirects.length) console.log(`\nRedirects on the live site (mirror these in next.config.ts):\n  ${redirects.join("\n  ")}`);

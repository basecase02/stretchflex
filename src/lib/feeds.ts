import { POSTS } from "@/components/blog/posts";
import { SITE_URL } from "@/content/site";
import { SITE_NAME } from "@/lib/seo";

/**
 * The RSS feeds WordPress serves at /feed and /comments/feed. Every page links
 * to them (as on the live site), so readers and aggregators keep working.
 */

/** "2026-08-17T01:46:00" (WordPress, GMT) → "Mon, 17 Aug 2026 01:46:00 +0000". */
const rssDate = (date: string) => new Date(`${date.replace(/Z|[+-]\d\d:\d\d$/, "")}Z`).toUTCString().replace("GMT", "+0000");

const cdata = (text: string) => `<![CDATA[${text.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

function channel(title: string, self: string, items: string): Response {
  const newest = POSTS[0];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
	<title>${title}</title>
	<atom:link href="${SITE_URL}${self}" rel="self" type="application/rss+xml" />
	<link>${SITE_URL}/</link>
	<description>Assisted Stretching Perth</description>
	<lastBuildDate>${newest ? rssDate(newest.modified ?? newest.date) : ""}</lastBuildDate>
	<language>en-AU</language>
${items}</channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

/** The ten newest posts, as WordPress lists them. */
export function postsFeed(): Response {
  const items = POSTS.slice(0, 10)
    .map(
      (post) => `	<item>
		<title>${cdata(post.title)}</title>
		<link>${SITE_URL}${post.path}</link>
		<pubDate>${rssDate(post.date)}</pubDate>
		<guid isPermaLink="true">${SITE_URL}${post.path}</guid>
		<description>${cdata(post.excerpt)}</description>
	</item>
`,
    )
    .join("");
  return channel(SITE_NAME, "/feed", items);
}

/** The site has no comments; the feed stays valid and empty, as on the live site. */
export function commentsFeed(): Response {
  return channel(`Comments for ${SITE_NAME}`, "/comments/feed", "");
}

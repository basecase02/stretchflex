# StretchFLEX — website (Next.js)

A rebuild of [stretchflex.au](https://stretchflex.au/) in Next.js (App Router): the homepage,
all 24 other pages and the blog with its 45 posts. Same content, photos, prices, links and SEO
as the live WordPress site, with one new interface throughout.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (the page is prerendered as static HTML)
npm start
```

## Where things are

| Path | What it holds |
| --- | --- |
| `src/content/site.ts` | **All copy, prices, links and reviews.** Edit text here. |
| `src/content/schema.ts` | Structured data (JSON-LD), carried over from the live site. |
| `src/content/images.ts` | The site photos and logos. |
| `src/app/layout.tsx` | Fonts, page title, meta tags, Open Graph, header and footer. |
| `src/app/page.tsx` | The homepage sections, in order. |
| `src/content/pages/*.ts` | **Every inner page's content**, as a list of blocks (hero, split, checklist, cards, accordion, offers, text, prose, people, embed, cta, sessions, reviews, contact). Edit page text here. |
| `src/content/blocks.ts` | The block types, with what each field does. |
| `src/components/blocks.tsx`, `src/styles/blocks.css` | How each block looks. Built from the homepage's parts so every page matches it. |
| `src/content/photos.ts` | The shared studio photos, named by what they show. |
| `src/app/<path>/page.tsx` | One small file per inner page; it renders the page's blocks with its SEO. |
| `src/app/blog`, `src/app/blogs/[slug]`, `src/components/blog` | The blog index and the post template. |
| `src/content/wp/seo.json`, `posts.json` | A snapshot from the WordPress API: each URL's Yoast title, description, Open Graph image and structured data, and the blog posts' text cleaned to plain HTML. |
| `src/app/globals.css` | The design system: colours, type, every section's styles. |
| `src/components/` | Header and menu, running title (marquee), session filter and carousel, review carousel, rotating word, icons, analytics, and the sections every page shares (`sections.tsx`). |
| `src/app/robots.ts`, `sitemap.ts` | `robots.txt` and `sitemap.xml`. |

## Design

- **Look:** every section is its own rounded panel on a pale blue-grey page, with a strip
  of the page between panels. The first screen is the team photo edge to edge with a giant chunky
  headline along the bottom. Below it: a grid of photo and text tiles, the sessions in three
  tabs of price cards, notes pinned up around the benefits, and the reviews (a swipeable
  carousel on phones). Headlines are chunky caps with one handwritten word.
- **Colours:** the StretchFLEX palette only — blue `#0F75BC`, red `#EF4036`, navy `#06314E`
  and white — with pale tints of the blue for quiet surfaces (`#E6EFF8`, `#D4E6F5`, and the
  page itself `#DDE7F1`). No pink.
- **Fonts:** Albert Sans (all text), Lilita One (headlines),
  Qwitcher Grypen (handwritten words). All are self-hosted by `next/font`, so no requests go
  to Google at runtime.
- The sessions show in one carousel with arrows, filtered by "All" (the default) or by kind.
  The kinds are grouped in `SESSION_GROUPS` in `src/content/site.ts`. Every card is in the
  HTML once; a filter only hides the others.
- Inner pages open with the homepage's two hero tiles (headline beside a photo) and end
  with the booking band and the reviews, so every page reads as part of one site.
- The first panel fills exactly one screen; on desktop each main panel is sized to one
  screen.

## SEO carried over from the live site

- Title, meta description, robots directives, canonical, Open Graph and Twitter tags.
- Google site verification, both JSON-LD blocks (Yoast graph and LocalBusiness).
- The same heading outline: one `h1` ("Professional Assisted Stretching Perth"), the same `h2`/`h3` text.
- Every link keeps its URL and wording (navigation, booking links, footer).
- Google Tag Manager, Meta Pixel and the LeadConnector chat widget, with the same IDs.
  They load only in production builds, so local development does not send page views.
- Photos stay at their original `/wp-content/uploads/...` URLs (in `public/`), so image links
  already indexed or shared keep working.
- The page is static HTML: all eight sessions and all four reviews are in the markup.

## SEO on the inner pages

- Each page keeps its live URL, Yoast title, meta description, Open Graph tags and
  structured data (from `src/content/wp/seo.json`), and its H1 text.
- Blog posts keep their FAQ structured data, publish and modified dates, and featured images.
- The thank-you pages, `/risk-of-injury` and `/muscle-tension-and-stiffness` stay `noindex`,
  as on the live site, and are left out of `sitemap.xml`.
- All photos are in `public/` at their original `/wp-content/uploads/...` paths.

## Before pointing the domain at this app

Every page and post in the WordPress sitemap is rebuilt. Keep `WP_ORIGIN` set while switching
over so anything else WordPress serves (`/feed`, old attachment URLs) still resolves:

- Set `WP_ORIGIN` to wherever WordPress is served from (it must be a different origin from
  this app, for example `https://wp.stretchflex.au`). Any URL this app does not own is then
  passed through to WordPress. See `next.config.ts`.
- `robots.txt` drops the live site's `Disallow: /*?` rule, because Next.js serves optimised
  images from `/_next/image?url=...` and that rule would block them from Google.

To refresh the content snapshot from WordPress, re-fetch `/wp-json/wp/v2/pages` and
`/wp-json/wp/v2/posts` and regenerate `src/content/wp/*.json`.

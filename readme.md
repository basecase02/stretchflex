# StretchFLEX — homepage (Next.js)

A rebuild of the [stretchflex.au](https://stretchflex.au/) homepage in Next.js (App Router).
Same content, photos, reviews, prices and links as the live page, with a new interface.

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
| `src/app/globals.css` | The design system: colours, type, every section's styles. |
| `src/components/` | Header and menu, running title (marquee), session tabs, review carousel, rotating word, icons, analytics. |
| `src/app/robots.ts`, `sitemap.ts` | `robots.txt` and `sitemap.xml`. |

## Design

- **Look:** every section is its own rounded panel on a pale rose page, with a strip of
  rose between panels. The first screen is the team photo edge to edge with a giant chunky
  headline along the bottom. Below it: a grid of photo and text tiles, the sessions in three
  tabs of price cards, notes pinned up around the benefits, and the reviews (a swipeable
  carousel on phones). Headlines are chunky caps with one handwritten word.
- **Colours:** the StretchFLEX palette — blue `#0F75BC`, red `#EF4036`, navy `#06314E`,
  blush `#FFF6F6`, white — plus rose `#FBD3CF` (the red tinted into blush) and sky
  `#D8E9F6` (the blue tinted into white).
- **Fonts:** Albert Sans (all text), Lilita One (headlines),
  Qwitcher Grypen (handwritten words). All are self-hosted by `next/font`, so no requests go
  to Google at runtime.
- The session tabs are grouped in `SESSION_GROUPS` in `src/content/site.ts`. All eight
  sessions are in the HTML; the inactive tabs are only hidden.
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

## Before pointing the domain at this app

Only the homepage is rebuilt. The other 21 pages and 45 blog posts still live on WordPress.
Until they are rebuilt, keep them reachable so no indexed URL 404s:

- Set `WP_ORIGIN` to wherever WordPress is served from (it must be a different origin from
  this app, for example `https://wp.stretchflex.au`). Any URL this app does not own is then
  passed through to WordPress. See `next.config.ts`.
- In development, `.env.development` points `WP_ORIGIN` at the live site, so menu links open
  the current pages.
- `robots.txt` drops the live site's `Disallow: /*?` rule, because Next.js serves optimised
  images from `/_next/image?url=...` and that rule would block them from Google.

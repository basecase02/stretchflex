import { BlogIndex } from "@/components/blog/blog-index";
import { POSTS, toCard } from "@/components/blog/posts";
import { Blocks } from "@/components/blocks";
import { SeoTags } from "@/components/seo-tags";
import { JsonLd } from "@/components/text";
import { BOOK_URL } from "@/content/site";
import { pageMetadata, seoFor, type SeoEntry } from "@/lib/seo";
import type { Metadata } from "next";

/** Posts per blog page; the newest post is shown large on page 1. */
export const PER_PAGE = 12;
export const PAGE_COUNT = Math.ceil(POSTS.length / PER_PAGE);

const pagePath = (page: number) => (page === 1 ? "/blog" : `/blog/page/${page}`);

/**
 * The blog's SEO: /blog exactly as live. The live site has no real page 2, 3, …
 * (WordPress shows every post on /blog), so ours follow Yoast's own format for
 * numbered pages, each pointing to itself.
 */
function blogSeo(page: number): SeoEntry {
  const blog = seoFor("/blog");
  if (page === 1) return blog;
  const title = `Blog Page ${page} of ${PAGE_COUNT} - Assisted Stretching Perth | StretchFLEX`;
  return { ...blog, title, ogTitle: title, canonical: pagePath(page), ogUrl: pagePath(page), schema: null };
}

export function blogMetadata(page: number): Metadata {
  return pageMetadata(blogSeo(page), pagePath(page));
}

/** One page of the blog: the hero, that page's posts, page links and search. */
export function BlogListing({ page }: { page: number }) {
  const seo = blogSeo(page);
  const posts = POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(toCard);
  return (
    <>
      <SeoTags entry={seo} path={pagePath(page)} />
      {seo.schema ? <JsonLd data={seo.schema} /> : null}
      <Blocks
        blocks={[
          {
            type: "hero",
            ...(page > 1 ? { crumbs: [{ label: "Blog", href: "/blog" }] } : {}),
            heading: "The StretchFLEX blog",
            ...(page > 1
              ? { title: `Latest articles – Page ${page}` }
              : { title: "Move better. Recover better.", accent: "Read better." }),
            intro:
              "Practical, plain-English advice on flexibility, mobility, posture and recovery from our Perth CBD studio. Why your body feels the way it does, and what you can do about it.",
            image: {
              src: "/images/stretch/stretch-side-reach.jpg",
              alt: "A StretchFLEX therapist guiding a client through an assisted side reach",
              position: "55% 50%",
            },
          },
        ]}
      />
      <section className="blk blk--rose panel">
        <div className="wrap">
          <BlogIndex posts={posts} all={POSTS.map(toCard)} page={page} pageCount={PAGE_COUNT} />
        </div>
      </section>
      <Blocks blocks={[{ type: "cta", title: "Ready to feel the difference for yourself?", hand: "feel", action: { label: "Book your session", href: BOOK_URL } }]} />
    </>
  );
}

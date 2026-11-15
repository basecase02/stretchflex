import { BlogIndex } from "@/components/blog/blog-index";
import { POSTS, toCard } from "@/components/blog/posts";
import { Blocks } from "@/components/blocks";
import { JsonLd } from "@/components/text";
import { BOOK_URL } from "@/content/site";
import { seoFor } from "@/lib/seo";

/** Posts per blog page; the newest post is shown large on page 1. */
export const PER_PAGE = 12;
export const PAGE_COUNT = Math.ceil(POSTS.length / PER_PAGE);

/** SEO from the client's content document (Blog). */
export const BLOG_SEO = {
  title: "Stretching & Recovery Blog | StretchFLEX Perth",
  description:
    "Practical advice on flexibility, mobility, posture and recovery from the StretchFLEX team in Perth CBD. Why you feel stiff, and what helps.",
  ogTitle: "The StretchFLEX Blog",
  ogDescription: "Practical advice on moving better and recovering better, from our Perth CBD studio.",
};

/** One page of the blog: the hero, that page's posts, page links and search. */
export function BlogListing({ page }: { page: number }) {
  const schema = page === 1 ? seoFor("/blog").schema : null;
  const posts = POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(toCard);
  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <Blocks
        blocks={[
          {
            type: "hero",
            ...(page > 1 ? { crumbs: [{ label: "Blog", href: "/blog" }] } : {}),
            kicker: "The StretchFLEX blog",
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

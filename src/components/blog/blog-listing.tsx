import { BlogIndex } from "@/components/blog/blog-index";
import { POSTS, toCard } from "@/components/blog/posts";
import { Blocks } from "@/components/blocks";
import { JsonLd } from "@/components/text";
import { seoFor } from "@/lib/seo";

/** Posts per blog page; the newest post is shown large on page 1. */
export const PER_PAGE = 12;
export const PAGE_COUNT = Math.ceil(POSTS.length / PER_PAGE);




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
            title: page > 1 ? `Latest Articles – Page ${page}` : "Latest Articles",
            image: {
              src: "/wp-content/uploads/2026/06/SF63.jpg",
              alt: "A StretchFLEX therapist guiding a smiling client through an assisted leg stretch",
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
      <Blocks blocks={[{ type: "cta" }]} />
    </>
  );
}

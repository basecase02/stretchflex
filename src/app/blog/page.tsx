import { BlogIndex } from "@/components/blog/blog-index";
import { POSTS, toCard } from "@/components/blog/posts";
import { Blocks } from "@/components/blocks";
import { JsonLd } from "@/components/text";
import { pageMetadata, seoFor } from "@/lib/seo";

export const metadata = pageMetadata("/blog");

/** /blog — every article, newest first, and the search box, as on the live page. */
export default function BlogPage() {
  const schema = seoFor("/blog").schema;
  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <Blocks
        blocks={[
          {
            type: "hero",
            title: "Latest Articles",
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
          <BlogIndex posts={POSTS.map(toCard)} />
        </div>
      </section>
      <Blocks blocks={[{ type: "cta" }]} />
    </>
  );
}

import { BlogListing, blogMetadata } from "@/components/blog/blog-listing";

export const metadata = blogMetadata(1);

/** /blog: the newest articles (page 1), with page links to the rest. */
export default function BlogPage() {
  return <BlogListing page={1} />;
}

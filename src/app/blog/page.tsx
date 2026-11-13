import { BlogListing } from "@/components/blog/blog-listing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/blog");

/** /blog: the newest articles (page 1), with page links to the rest. */
export default function BlogPage() {
  return <BlogListing page={1} />;
}

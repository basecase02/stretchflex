import type { Metadata } from "next";
import { BLOG_SEO, BlogListing } from "@/components/blog/blog-listing";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata("/blog");

export const metadata: Metadata = {
  ...base,
  title: { absolute: BLOG_SEO.title },
  description: BLOG_SEO.description,
  openGraph: { ...base.openGraph, title: BLOG_SEO.ogTitle, description: BLOG_SEO.ogDescription },
};

/** /blog: the newest articles (page 1), with page links to the rest. */
export default function BlogPage() {
  return <BlogListing page={1} />;
}

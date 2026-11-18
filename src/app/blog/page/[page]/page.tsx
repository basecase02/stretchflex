import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListing, blogMetadata, PAGE_COUNT } from "@/components/blog/blog-listing";

export const dynamicParams = false;

/** /blog/page/2 … /blog/page/N (page 1 is /blog). */
export function generateStaticParams() {
  return Array.from({ length: PAGE_COUNT - 1 }, (_, i) => ({ page: String(i + 2) }));
}

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogMetadata(Number((await params).page));
}

export default async function BlogPageN({ params }: Props) {
  const n = Number((await params).page);
  if (n === 1) redirect("/blog");
  if (!Number.isInteger(n) || n < 2 || n > PAGE_COUNT) notFound();
  return <BlogListing page={n} />;
}

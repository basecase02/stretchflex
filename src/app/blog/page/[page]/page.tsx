import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BLOG_SEO, BlogListing, PAGE_COUNT } from "@/components/blog/blog-listing";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

/** /blog/page/2 … /blog/page/N (page 1 is /blog). */
export function generateStaticParams() {
  return Array.from({ length: PAGE_COUNT - 1 }, (_, i) => ({ page: String(i + 2) }));
}

type Props = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const base = pageMetadata("/blog");
  const path = `/blog/page/${page}`;
  const title = `Stretching & Recovery Blog – Page ${page} | StretchFLEX Perth`;
  return {
    ...base,
    title: { absolute: title },
    description: BLOG_SEO.description,
    alternates: { ...base.alternates, canonical: path },
    openGraph: { ...base.openGraph, url: path, title: `${BLOG_SEO.ogTitle} – Page ${page}`, description: BLOG_SEO.ogDescription },
  };
}

export default async function BlogPageN({ params }: Props) {
  const n = Number((await params).page);
  if (n === 1) redirect("/blog");
  if (!Number.isInteger(n) || n < 2 || n > PAGE_COUNT) notFound();
  return <BlogListing page={n} />;
}

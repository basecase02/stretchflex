import data from "@/content/wp/posts.json";

/** A blog post as snapshotted from WordPress (see src/content/wp/posts.json). */
export type Post = {
  slug: string;
  path: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  minutes: number;
  image: { src: string; alt: string } | null;
  html: string;
  jsonLd: object[];
};

/** What a post card needs; no body, so it is cheap to send to the browser. */
export type PostCard = Pick<Post, "slug" | "path" | "title" | "date" | "excerpt" | "minutes" | "image">;

/** Every post, newest first. */
export const POSTS = (data as Post[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => POSTS.find((post) => post.slug === slug);

export const toCard = ({ slug, path, title, date, excerpt, minutes, image }: Post): PostCard => ({
  slug,
  path,
  title,
  date,
  excerpt,
  minutes,
  image,
});

/**
 * WordPress stores the site's local time without a zone, so the date is read
 * and printed as-is (UTC both ways) and never shifts a day.
 */
export function formatDate(date: string) {
  // Printed as on the live blog, e.g. "August 17, 2026".
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}Z`));
}

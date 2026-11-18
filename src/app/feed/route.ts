import { postsFeed } from "@/lib/feeds";

export const dynamic = "force-static";

/** /feed: the blog's RSS feed (src/lib/feeds.ts). */
export function GET() {
  return postsFeed();
}

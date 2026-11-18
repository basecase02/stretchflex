import { commentsFeed } from "@/lib/feeds";

export const dynamic = "force-static";

/** /comments/feed: WordPress's comments feed, empty (src/lib/feeds.ts). */
export function GET() {
  return commentsFeed();
}

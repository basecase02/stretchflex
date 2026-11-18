import type { Block } from "@/content/blocks";

/** One rebuilt page: its blocks, top to bottom. */
export type PageContent = {
  blocks: Block[];
  /** Kept out of search results, as on the live site. */
  noindex?: boolean;
  /**
   * The live URL whose SEO this page keeps, when it has moved. Pages still at
   * their live URL use that URL's SEO (src/content/wp/seo.json) automatically.
   */
  seoFrom?: string;
  /** Text to swap in the moved page's SEO, e.g. [["biljana-stojanovic", "biljana-mancini"]]. */
  seoRename?: [string, string][];
  /** A page title for pages without live SEO. */
  title?: string;
  /** SEO for a page the live site doesn't have. Pages that exist live always print the live SEO. */
  seo?: { title: string; description: string; ogTitle?: string; ogDescription?: string };
  /**
   * The sessions this page sells (ids from SESSIONS in src/content/site.ts).
   * Every general booking button on the page becomes a button per session
   * (length and price), and a booking bar stays in view while people scroll.
   */
  sessions?: string[];
  /** The service named in the booking bar, e.g. "Photobiotic Assisted Stretching". */
  bookingTitle?: string;
};

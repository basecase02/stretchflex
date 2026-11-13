import type { Block } from "@/content/blocks";

/** One rebuilt page: its blocks, top to bottom. */
export type PageContent = {
  blocks: Block[];
  /** Kept out of search results, as on the live site. */
  noindex?: boolean;
  /** The live URL whose SEO snapshot this page uses, when it has moved (its structured data is left out). */
  seoFrom?: string;
  /** A page title that replaces the live one. */
  title?: string;
  /**
   * The sessions this page sells (ids from SESSIONS in src/content/site.ts).
   * Every general booking button on the page becomes a button per session
   * (length and price), and a booking bar stays in view while people scroll.
   */
  sessions?: string[];
  /** The service named in the booking bar, e.g. "Photobiotic Assisted Stretching". */
  bookingTitle?: string;
};

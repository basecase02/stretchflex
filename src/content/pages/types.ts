import type { Block } from "@/content/blocks";

/** One rebuilt page: its blocks, top to bottom. */
export type PageContent = {
  blocks: Block[];
  /** Kept out of search results, as on the live site. */
  noindex?: boolean;
};

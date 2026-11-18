import { GiftThanks, GiftView } from "@/components/gift/gift-after";
import type { PageContent } from "./types";

/** Back from Square checkout. */
export const giftThanks: PageContent = {
  noindex: true,
  seo: { title: "Thank you | StretchFLEX gift certificates", description: "Your StretchFLEX gift certificate is confirmed." },
  blocks: [{ type: "node", node: <GiftThanks /> }],
};

/** The recipient's mobile certificate. */
export const giftView: PageContent = {
  noindex: true,
  seo: { title: "Your gift certificate | StretchFLEX", description: "Your StretchFLEX gift certificate." },
  blocks: [{ type: "node", node: <GiftView /> }],
};

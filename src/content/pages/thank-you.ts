import { PHOTOS } from "@/content/photos";
import type { PageContent } from "./types";

/** /thank-you — shown after the contact form; kept out of search results as on the live site. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      title: "Thank you for",
      accent: "Sending a Message",
      intro: "We will contact you shortly.",
      actions: [{ label: "Back to Home", href: "/" }],
      image: PHOTOS.team,
    },
    { type: "contact" },
  ],
  noindex: true,
};

import { PHOTOS } from "@/content/photos";
import type { PageContent } from "./types";

/** /thank-you-booking — shown after booking; kept out of search results as on the live site. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      title: "Thank you for",
      accent: "Booking",
      intro: "We will contact you shortly with more details.",
      actions: [{ label: "Back to Home", href: "/" }],
      image: PHOTOS.team,
    },
    { type: "contact" },
  ],
  noindex: true,
};

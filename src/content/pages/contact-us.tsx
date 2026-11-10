import { createElement } from "react";
import { ContactDetails } from "@/components/pages/utility/contact-details";
import type { PageContent } from "./types";

/**
 * /contact-us — the live H1 and "Hey, let's talk" section, with the live
 * page's photo. The Elementor form posted to WordPress and cannot work here;
 * the homepage's contact details and booking take its place.
 */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      title: "Contact",
      accent: "Us",
      image: {
        src: "/wp-content/uploads/2026/03/StretchFLEX-45.jpg",
        alt: "A StretchFLEX therapist welcoming a client at the front desk",
        position: "40% 45%",
      },
    },
    { type: "node", node: createElement(ContactDetails) },
    { type: "reviews" },
  ],
};

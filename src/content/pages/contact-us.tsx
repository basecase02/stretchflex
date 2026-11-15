import { createElement } from "react";
import { ContactDetails, ContactMessage } from "@/components/pages/utility/contact-details";
import { BOOK_URL, CONTACT } from "@/content/site";
import type { PageContent } from "./types";

/**
 * /contact-us: the client's content document (Contact Us). Details and map,
 * then the message form (src/components/contact-form.tsx), then booking.
 */
export const page: PageContent = {
  seo: {
    title: "Contact StretchFLEX | Trinity Arcade, Perth CBD",
    description:
      "Contact StretchFLEX at 111 Trinity Arcade, 72 St Georges Terrace, Perth CBD. Call 0432 569 077 or book online. Open Monday to Friday, 8:30 am to 5:30 pm.",
    ogTitle: "Contact StretchFLEX | Perth CBD",
    ogDescription: "Find us in Trinity Arcade, St Georges Terrace. Call, email or book online.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Get in touch",
      title: "Contact us",
      intro: CONTACT.body,
      image: {
        src: "/images/team/stretchflex-team-reception.jpg",
        alt: "The StretchFLEX team at the front desk in Trinity Arcade",
        position: "52% 50%",
      },
    },
    { type: "node", node: createElement(ContactDetails) },
    { type: "node", node: createElement(ContactMessage) },
    { type: "cta", title: "Ready to book?", hand: "book", action: { label: "Book your session", href: BOOK_URL } },
  ],
};

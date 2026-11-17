import { BookingEmbed } from "@/components/booking-embed";
import { PHONE } from "@/content/site";
import type { PageContent } from "./types";

/** /book-your-session: the Acuity scheduler, embedded, then what to bring and how to reach us. */
export const page: PageContent = {
  seo: {
    title: "Book Assisted Stretching Perth CBD | StretchFLEX",
    description:
      "Book your StretchFLEX session online. Assisted stretching from $65, light therapy and recovery in Trinity Arcade, Perth CBD. Choose a time that suits you.",
    ogTitle: "Book Your Session | StretchFLEX Perth",
    ogDescription: "Choose your session and time online. Private, one-on-one sessions in Perth CBD.",
  },
  blocks: [
    { type: "node", node: <BookingEmbed /> },
    {
      type: "checklist",
      id: "before-you-book",
      title: "Before you book",
      hand: "Before",
      items: [
        { body: "Bring a clean, unworn pair of socks. Fresh socks are compulsory. Grip socks are $15 at reception." },
        { body: "Tell us about any injuries or health conditions in your booking." },
        {
          body: "Need to change your booking? Give us at least 48 hours notice for a full refund. See our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
        },
      ],
    },
    {
      type: "text",
      id: "talk",
      title: "Prefer to talk to us?",
      hand: "talk",
      body: [
        `Call [${PHONE.label}](${PHONE.href}). Monday to Friday 8:30 am to 5:30 pm. Saturdays by appointment.`,
        "111 Trinity Arcade, 72 St Georges Terrace, Perth CBD",
      ],
      after: [
        "**Policies and terms:** [Refund and Cancellation Policy](/refund-and-cancellation-policy) · [Membership Terms and Conditions](/membership-terms) · [Privacy Policy](/privacy-policy) · [Website Terms of Use](/terms-of-use)",
      ],
    },
  ],
};

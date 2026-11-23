import { GiftBuy, GiftFormats } from "@/components/gift/gift-sections";
import { GIFT_VALIDITY_MONTHS } from "@/lib/gift/catalog";
import type { PageContent } from "./types";

const FAQ = [
  {
    title: "How long is a gift certificate valid?",
    body: `${GIFT_VALIDITY_MONTHS} months from the day it is bought. The expiry date is printed on the certificate.`,
  },
  {
    title: "How does the recipient redeem it?",
    body: "Online: book at [stretchflex.au/book-your-session](/book-your-session) and enter the code at checkout: it covers the session, or comes off the price. In studio: show the certificate, printed or on their phone, when they arrive. You can also call us on 0432 569 077 to book.",
  },
  {
    title: "Can I schedule the email for a birthday or anniversary?",
    body: "Yes. Choose “Schedule it” and pick the day. We email it at 8 am Perth time on that date, and you get your receipt and a printable copy straight away.",
  },
  {
    title: "What if a gift value is more than one session?",
    body: "The balance stays on the code for their next booking, until it expires. Experience certificates cover one session of the experience named on them.",
  },
  {
    title: "Can I print it and give it in person?",
    body: "Yes. Your confirmation email includes a printable landscape PDF, and you can download it again from the link in that email.",
  },
  {
    title: "Can a gift certificate be refunded or exchanged for cash?",
    body: "Gift certificates can’t be exchanged for cash. If something isn’t right with your order, call us on 0432 569 077 or email info@stretchflex.au. See our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
  },
];

/** /gift-certificates: "Give the gift of movement". Bought online, delivered by email, redeemed online or in studio. */
export const page: PageContent = {
  seo: {
    title: "Assisted Stretching Gift Certificates Perth | StretchFLEX",
    description:
      "Give the gift of movement. StretchFLEX gift certificates for assisted stretching, Photobiotic stretching and recovery in Perth CBD. Emailed now or on the day, valid for 36 months.",
  },
  blocks: [
    { type: "node", node: <GiftBuy /> },
    { type: "node", node: <GiftFormats /> },
    { type: "accordion", id: "gift-faqs", title: "Gift certificate questions", hand: "questions", faq: true, items: FAQ },
  ],
};


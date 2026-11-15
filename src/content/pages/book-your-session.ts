import { PHONE, SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

/** The sessions in the order and wording of the content document; prices and booking links come from SESSIONS. */
const CHOICES: [id: string, label: string, time: string][] = [
  ["revive-stretch", "The Revive Stretch", "30 min"],
  ["prime-mobility-stretch", "Prime Mobility Stretch", "45 min"],
  ["ultimate-stretch", "The Ultimate Stretch", "60 min"],
  ["photobiotic-44", "The Rapid Reset (Photobiotic)", "44 min"],
  ["photobiotic-59", "The Performance Protocol (Photobiotic)", "59 min"],
  ["photobiotic-74", "The Architectural Overhaul (Photobiotic)", "74 min"],
  ["de-compression-recovery-stack", "De-Compression Recovery Stack", "20 min"],
  ["led-red-light-therapy", "LED Red Light Therapy", "14 min"],
];

const rows = CHOICES.map(([id, label, time]) => {
  const session = SESSIONS.find((s) => s.id === id);
  if (!session) throw new Error(`Unknown session ${id}`);
  return [`[${label}](${session.learnHref})`, time, `$${session.price}`, session.bookHref ? `[Book](${session.bookHref})` : ""];
});

/** /book-your-session: the client's content document (Book Your Session). */
export const page: PageContent = {
  seo: {
    title: "Book Assisted Stretching Perth CBD | StretchFLEX",
    description:
      "Book your StretchFLEX session online. Assisted stretching from $65, light therapy and recovery in Trinity Arcade, Perth CBD. Choose a time that suits you.",
    ogTitle: "Book Your Session | StretchFLEX Perth",
    ogDescription: "Choose your session and time online. Private, one-on-one sessions in Perth CBD.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Book online",
      title: "Book your session",
      intro: "Choose your session and a time that suits you. Every session is private and one-on-one, and you can choose your therapist.",
    },
    {
      type: "table",
      id: "sessions",
      title: "Choose your session",
      hand: "your",
      head: ["Session", "Time", "Price", "Book"],
      rows,
    },
    {
      type: "checklist",
      id: "before-you-book",
      tone: "rose",
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

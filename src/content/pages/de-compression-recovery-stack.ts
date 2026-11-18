import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/de-compression-recovery-stack
 * (was /our-packages/rapid-rejuvenation, which now redirects here)
 * Copy from the client's content document (StretchFLEX Website Content,
 * 14 November 2026). Pack links are the live site's payment links.
 */
export const page: PageContent = {
  seo: {
    title: "Compression Recovery & Vagus Nerve Stimulation Perth | StretchFLEX",
    description:
      "20 minutes of pneumatic compression, non-invasive vagus nerve stimulation and guided mindfulness in Perth CBD. Relax, unwind and recover. $120.",
    ogTitle: "The De-Compression Recovery Stack | StretchFLEX",
    ogDescription:
      "Compression, vagus nerve stimulation and guided mindfulness. Twenty minutes to switch off and recover.",
  },
  sessions: ["de-compression-recovery-stack"],
  bookingTitle: "De-Compression Recovery Stack",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "20 minutes to switch off",
      title: "De-Compression",
      accent: "Recovery Stack",
      intro:
        "Three recovery tools in one 20-minute session in Perth CBD: pneumatic compression for your legs, non-invasive vagus nerve stimulation and guided mindfulness. Lie back, breathe and let the technology do the work.",
      note: "[Save up to $201 with a pack](#packs)",
      image: {
        src: u("2026/03/StretchFlex-47.jpg"),
        alt: "Client relaxing in pneumatic compression boots during a De-Compression Recovery Stack session",
        position: "50% 55%",
      },
    },
    {
      type: "cards",
      title: "Three tools. One session.",
      hand: "session.",
      items: [
        {
          title: "Pneumatic compression",
          body: "Air-filled sleeves wrap your legs and apply rhythmic, sequential pressure. Clients describe their legs feeling lighter and fresher afterwards, especially after training or long hours on their feet.",
        },
        {
          title: "Non-invasive vagus nerve stimulation",
          body: "A gentle, non-invasive device used while you rest, as part of a calm, relaxing session.",
        },
        {
          title: "Guided mindfulness",
          body: "A short guided breathing practice to help you slow down and switch off while the technology works.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      title: "Your 20-minute De-Compression session",
      hand: "minutes",
      items: [
        {
          title: "Settle in",
          body: "Get comfortable in a reclined position while your therapist fits the compression sleeves.",
        },
        {
          title: "Compress and breathe",
          body: "Relax through the compression cycle and vagus nerve stimulation, guided by a calming breathing practice.",
        },
        {
          title: "Reset",
          body: "Head back to your day feeling lighter and calmer.",
        },
      ],
    },
    {
      type: "checklist",
      title: "Perfect for you if you",
      hand: "Perfect",
      items: [
        { body: "Train hard and want a dedicated recovery session" },
        { body: "Spend long hours standing or sitting and finish the day with heavy legs" },
        { body: "Want 20 minutes to properly switch off in a busy week" },
        { body: "Want to add recovery to your stretching routine" },
      ],
    },
    {
      type: "offers",
      id: "packs",
      title: "Book once, or save with a pack",
      hand: "pack",
      items: [
        {
          name: "Single session",
          badge: "20 min",
          price: "$120",
          detail: "$120 per session",
          action: { label: "Book now", href: book("de-compression-recovery-stack") },
        },
        {
          name: "5-Session Pack",
          badge: "Save $50",
          price: "$550",
          was: "$600",
          detail: "$110 per session",
          action: {
            label: "Buy the 5-pack",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc93003b17c94f5714509",
          },
        },
        {
          name: "10-Session Pack",
          tag: "Best value",
          badge: "Save $201",
          price: "$999",
          was: "$1,200",
          detail: "$99.90 per session",
          action: {
            label: "Buy the 10-pack",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc99f5a9093aac76c5c6b",
          },
        },
      ],
      footnote:
        "Packs are valid for 12 months from purchase, are for one person and are non-refundable and non-transferable, except as required by law. Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
    },
    {
      type: "text",
      tone: "sky",
      title: "Want it every week?",
      hand: "week?",
      body: [
        "All Performance & Recovery Memberships include a weekly De-Compression Recovery Stack alongside two [Photobiotic Assisted Stretching™](/our-packages/photobiotic-assisted-stretching) sessions.",
      ],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      type: "accordion",
      faq: true,
      tone: "rose",
      title: "De-Compression questions, answered",
      hand: "answered",
      items: [
        {
          title: "What should I wear?",
          body: "Comfortable clothing. Compression sleeves go over your clothes, and fresh socks are compulsory.",
        },
        {
          title: "Can I combine it with stretching?",
          body: "Yes. Many clients book it straight after an assisted stretch, and it is included in every Performance & Recovery Membership.",
        },
        {
          title: "Is it suitable for everyone?",
          body: "Not always. Compression and vagus nerve stimulation are not suitable if you are pregnant, have a pacemaker or other implanted electronic device, a history of blood clots or deep vein thrombosis, a heart condition, open wounds or recent injury to the legs, or epilepsy. Please tell us about any health conditions when you book, and check with your doctor if you are unsure.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy): full refund with 48 hours notice, 50% with 24 to 48 hours, and no refund under 24 hours.",
        },
      ],
    },
    {
      type: "cta",
      title: "Recover like you mean it",
      hand: "Recover",
      body: "Twenty minutes. Three tools. One calmer you.",
    },
  ],
};

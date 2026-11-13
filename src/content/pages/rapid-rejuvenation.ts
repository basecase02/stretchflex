import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/rapid-rejuvenation
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "de-compression-recovery-stack",
  ],
  blocks: [
    {
      type: "hero",
      crumbs: [
        {
          label: "Our Packages",
          href: "/our-packages",
        },
      ],
      kicker: "Feeling drained?",
      title: "De-Compression",
      accent: "Recovery Stack",
      intro: "Pneumatic compression meets a mindful reset: fast recovery for tired legs, busy minds and hard training.",
      image: {
        src: u("2026/06/4659FB4D-8940-4085-BD29-9CD5E0D2F4B1.jpeg"),
        alt: "A client relaxing in compression recovery boots in the StretchFLEX recovery suite",
        position: "55% 55%",
      },
    },
    {
      type: "cards",
      kicker: "Transform your recovery",
      title: "Why it works",
      hand: "works",
      items: [
        {
          title: "Faster muscle recovery",
          body: "Precise pressure patterns boost circulation to clear the by-products behind muscle discomfort.",
        },
        {
          title: "Lighter legs",
          body: "Helps move fluid that builds up from training or long hours standing.",
        },
        {
          title: "Better blood flow",
          body: "Rhythmic compression delivers oxygen and nutrients throughout your body.",
        },
        {
          title: "A mindful reset",
          body: "Relax, breathe deeply and let the technology do the work.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 20 minutes",
      hand: "minutes",
      image: {
        src: u("2026/06/De-Compressing.jpg"),
        alt: "A man reclining in pneumatic compression boots with a mindfulness headset",
        position: "45% 60%",
      },
      items: [
        {
          title: "Settle in",
          body: "Relax in the recovery suite as the compression system fits around your legs.",
        },
        {
          title: "Compression gets to work",
          body: "Rhythmic sequences move fluid and boost circulation through your limbs.",
        },
        {
          title: "Mind reset",
          body: "Breathe, switch off and walk out feeling energised.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Mind + body",
      title: "Book once or save with a pack",
      hand: "save",
      items: [
        {
          name: "The De-Compression Recovery Stack",
          badge: "20 min",
          price: "$120",
          detail: "Compression + mindfulness",
          action: {
            label: "Book now",
            href: book("de-compression-recovery-stack"),
          },
        },
        {
          name: "The 5 Recovery Package",
          tag: "Mind + Body Reset",
          badge: "Save $50",
          price: "$550.00",
          was: "$600",
          detail: "5 × Compression & Mindfulness Sessions",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc93003b17c94f5714509",
          },
        },
        {
          name: "The Ultimate Recovery Package",
          tag: "Complete Restoration",
          badge: "Save $200",
          price: "$999.00",
          was: "$1200",
          detail: "10 × Compression & Mindfulness Sessions",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc99f5a9093aac76c5c6b",
          },
        },
      ],
    },
    {
      type: "checklist",
      title: "Who it’s for",
      hand: "for",
      items: [
        {
          body: "After intense training sessions",
        },
        {
          body: "On your feet all day",
        },
        {
          body: "During stressful periods",
        },
        {
          body: "Anyone needing a complete reset",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      title: "Quick answers",
      hand: "answers",
      items: [
        {
          title: "What is it?",
          body: "A 20-minute session in our pneumatic compression system, combined with mindfulness for physical and mental recovery.",
        },
        {
          title: "Who is it for?",
          body: "Fitness enthusiasts, people on their feet for hours, and anyone who wants to feel refreshed.",
        },
        {
          title: "Does it go with stretching?",
          body: "Yes. It complements any wellness routine, including our assisted stretching sessions.",
        },
      ],
    },
    {
      type: "cta",
      title: "Feel refreshed in 20 minutes",
      hand: "refreshed",
      body: "Compression and mindfulness, $120.",
    },
  ],
};

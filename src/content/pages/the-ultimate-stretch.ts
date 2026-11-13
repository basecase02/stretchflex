import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/the-ultimate-stretch
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "ultimate-stretch",
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
      kicker: "Our deepest dive",
      title: "The Ultimate",
      accent: "Stretch",
      intro: "An immersive session through every major muscle group, leaving you open, aligned and primed for performance.",
      image: {
        src: u("2026/02/openart-image_rc3Bir-V_1770268184130_raw.webp"),
        alt: "A StretchFLEX therapist guiding a client through a lying hamstring stretch",
        position: "50% 45%",
      },
    },
    {
      type: "cards",
      kicker: "Benefits of the session",
      title: "The full-body payoff",
      hand: "payoff",
      items: [
        {
          title: "Unlock your potential",
          body: "A significant increase in flexibility and range of motion.",
        },
        {
          title: "Tension melts away",
          body: "Release chronic muscular tension and stiffness.",
        },
        {
          title: "Better alignment",
          body: "Support your body’s natural posture and alignment.",
        },
        {
          title: "Deep calm",
          body: "Stress reduction and relaxation as you let go.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 60 minutes",
      hand: "minutes",
      image: {
        src: u("2026/02/openart-image_dUV856pq_1770268180039_raw.webp"),
        alt: "A therapist guiding a smiling client through a side-lying leg stretch",
        position: "45% 55%",
      },
      items: [
        {
          title: "Every muscle group",
          body: "The session works through every major muscle group and limb.",
        },
        {
          title: "Deep, guided stretches",
          body: "Your Stretch & Flexologist takes you through a series of deep stretches.",
        },
        {
          title: "Leave renewed",
          body: "Walk out feeling open, aligned and refreshed.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Go all in",
      title: "Book once or save with a pack",
      hand: "save",
      items: [
        {
          name: "Ultimate Stretch",
          badge: "60 min",
          price: "$120",
          detail: "One-on-one deep-dive session",
          action: {
            label: "Book now",
            href: book("ultimate-stretch"),
          },
        },
        {
          name: "The 5 Ultimate Package",
          tag: "Premium Experience",
          badge: "Save $30",
          price: "$570.00",
          was: "$600",
          detail: "5 × Ultimate Stretch Sessions (60 min each)",
          quote: "“It’s like a spa day that actually fixes your body problems.”",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc64203b17c94f5714505",
          },
        },
        {
          name: "The 10 Ultimate Package",
          tag: "Maximum Value",
          badge: "Save $150",
          price: "$1050.00",
          was: "$1200",
          detail: "10 × Ultimate Stretch Sessions (60 min each)",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc72203b17c94f5714506",
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
          body: "Anyone wanting a complete reset",
        },
        {
          body: "People with chronic tension or stiffness",
        },
        {
          body: "Athletes preventing injuries",
        },
        {
          body: "Executives who demand excellence",
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
          title: "What does the session cover?",
          body: "Every major muscle group and limb, in one immersive 60-minute session.",
        },
        {
          title: "Who guides me?",
          body: "Our experienced Stretch & Flexologists, in a safe and supportive one-on-one setting.",
        },
        {
          title: "Which package saves the most?",
          body: "The 10 Ultimate Package: 10 sessions for $1050, saving $150.",
        },
      ],
    },
    {
      type: "cta",
      title: "Give your body the full hour",
      hand: "hour",
      body: "60 minutes, one-on-one, $120.",
    },
  ],
};

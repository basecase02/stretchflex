import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/the-revive-stretch-session
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "revive-stretch",
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
      kicker: "Your quick reset",
      title: "The Revive",
      accent: "Stretch",
      intro: "A guided, one-on-one assisted stretch that leaves you looser, lighter and more mobile, fast.",
      image: {
        src: u("2026/03/StretchFLEX36.jpg"),
        alt: "A StretchFLEX therapist stretching a smiling client's shoulder and arm",
        position: "50% 45%",
      },
    },
    {
      type: "cards",
      kicker: "Benefits of the session",
      title: "Half an hour. Whole-body reset.",
      hand: "reset",
      items: [
        {
          title: "Less tension",
          body: "Say goodbye to aches and pains caused by tight muscles.",
        },
        {
          title: "Better posture",
          body: "Stand taller and feel more confident.",
        },
        {
          title: "More energy",
          body: "Feel refreshed after a busy day.",
        },
        {
          title: "Better sleep",
          body: "Fall asleep easier and wake up more rested.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 30 minutes",
      hand: "minutes",
      image: {
        src: u("2026/02/openart-image_D_F4oLlj_1770268182209_raw.webp"),
        alt: "A therapist guiding a client through an assisted hamstring stretch",
        position: "45% 50%",
      },
      items: [
        {
          title: "Tell us what feels tight",
          body: "Your session is tailored to you, whatever your fitness level.",
        },
        {
          title: "Guided stretching",
          body: "Gentle, effective stretches target key muscle groups and common tension zones.",
        },
        {
          title: "Walk out lighter",
          body: "Leave looser, more aligned and with better range of motion.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Start here",
      title: "Book once or save with a pack",
      hand: "save",
      items: [
        {
          name: "Revive Stretch",
          badge: "30 min",
          price: "$65",
          detail: "One-on-one assisted stretch",
          action: {
            label: "Book now",
            href: book("revive-stretch"),
          },
        },
        {
          name: "The 5 Revive Package",
          tag: "Perfect Starting Point",
          badge: "Save $30",
          price: "$295.00",
          was: "$325",
          detail: "5 × Revive Stretch Sessions (30 min each)",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a2125955a9093aac76c6014",
          },
        },
        {
          name: "The 10 Revive Package",
          tag: "Most Popular Choice",
          badge: "Save $55",
          price: "$595.00",
          was: "$650",
          detail: "10 × Revive Stretch Sessions (30 min each)",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a2126f85a9093aac76c6015",
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
          body: "Short on time but need a reset",
        },
        {
          body: "Feeling muscle tension or stiffness",
        },
        {
          body: "Desk workers and weekend warriors",
        },
        {
          body: "Beginners trying assisted stretching",
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
          title: "Is it good for beginners?",
          body: "Yes. It’s designed for all fitness levels and is the perfect place to start.",
        },
        {
          title: "Who does the stretching?",
          body: "Our certified Stretch & Flexologists guide every movement, safely and effectively.",
        },
        {
          title: "How do the packages work?",
          body: "Buy 5 or 10 sessions up front and save up to $55.",
        },
      ],
    },
    {
      type: "cta",
      title: "Feel the difference in 30 minutes",
      hand: "difference",
      body: "One-on-one, $65, designed for all fitness levels.",
    },
  ],
};

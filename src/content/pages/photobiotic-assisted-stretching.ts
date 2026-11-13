import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/photobiotic-assisted-stretching
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "photobiotic-44",
    "photobiotic-59",
    "photobiotic-74",
  ],
  bookingTitle: "Photobiotic Assisted Stretching",
  blocks: [
    {
      type: "hero",
      crumbs: [
        {
          label: "Our Packages",
          href: "/our-packages",
        },
      ],
      kicker: "Why stretch in the dark?",
      title: "Photobiotic Assisted",
      accent: "Stretching™",
      intro: "Medical-grade light primes your muscles, then expert hands take you deeper. Stretching, upgraded with the StretchFLEX 7/7 Protocol.",
      image: {
        src: u("2026/06/SF62.jpg"),
        alt: "A StretchFLEX therapist stretching a smiling client's leg on the treatment table",
        position: "60% 50%",
      },
    },
    {
      type: "cards",
      kicker: "The clinical standard",
      title: "Light first. Then the stretch.",
      hand: "stretch",
      items: [
        {
          title: "9 wavelengths, not 2",
          body: "A 480–1060nm spectrum from 432 dual-chip LEDs reaches skin, fascia and bone.",
        },
        {
          title: "Clinical-strength light",
          body: "TGA & FDA registered (Class IIa), delivering ≥ 183.1 mW/cm² in every 7-minute window.",
        },
        {
          title: "Warmer tissue, deeper stretch",
          body: "Light “thaws” the fascia, so your therapist works deeper with significantly less discomfort.",
        },
        {
          title: "Zero downtime",
          body: "The pulsed flush helps clear metabolic waste, so you can train straight after.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "The 7/7 Protocol",
      title: "Your session in three phases",
      hand: "phases",
      image: {
        src: u("2026/03/StretchFLEX-012.webp"),
        alt: "A therapist stretching a client lying on his side on the treatment table",
      },
      items: [
        {
          title: "The 7-minute Mitochondrial Prime",
          body: "A customised 630–850nm spectrum floods your target muscles, releasing nitric oxide to “thaw” tight fascia.",
        },
        {
          title: "The assisted stretch",
          body: "With tissue primed and pain receptors calmed, your therapist works deeper into the fascia.",
        },
        {
          title: "The 7-minute Metabolic Flush",
          body: "Pulsed light (up to 10,000 Hz) supports cell repair and flushes metabolic waste.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Pick your stack",
      title: "Choose your session",
      hand: "session",
      lead: "Every session starts and ends with 7 minutes of medical-grade light.",
      items: [
        {
          name: "The Rapid Reset",
          badge: "44 min",
          price: "$120",
          detail: "14 min light + 30 min assisted stretch",
          body: "The high-efficiency session for the busy professional.",
          action: {
            label: "Book now",
            href: book("photobiotic-44"),
          },
        },
        {
          name: "The Performance Protocol",
          tag: "Signature session",
          badge: "59 min",
          price: "$145",
          detail: "14 min light + 45 min assisted stretch",
          body: "Our signature full-body overhaul for deep-seated tension.",
          action: {
            label: "Book now",
            href: book("photobiotic-59"),
          },
        },
        {
          name: "The Architectural Overhaul",
          badge: "1 hr 14 min",
          price: "$165",
          detail: "14 min light + 60 min assisted stretch",
          body: "The total system reboot for peak performance.",
          action: {
            label: "Book now",
            href: book("photobiotic-74"),
          },
        },
      ],
    },
    {
      type: "checklist",
      title: "Made for you if you’re…",
      hand: "you",
      items: [
        {
          body: "A busy professional short on time",
        },
        {
          body: "Training hard and need zero downtime",
        },
        {
          body: "Carrying deep, stubborn stiffness",
        },
        {
          body: "Chasing more range of motion",
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
          title: "What should I wear?",
          body: "Comfortable, light-coloured gym gear, like shorts and a tank top. Denim and dark, heavy fabrics block the light.",
        },
        {
          title: "Is it like a home red light panel?",
          body: "No. Most home panels use 2 wavelengths at low power; ours is TGA Class IIa medical grade with 9 bands.",
        },
        {
          title: "How do I prepare?",
          body: "Drink at least 500ml of water in the hour before, and arrive 5 to 10 minutes early.",
        },
        {
          title: "What does it feel like?",
          body: "A gentle internal warmth as circulation increases, not sauna heat. Many clients feel a “second wind” afterwards.",
        },
        {
          title: "Can I train afterwards?",
          body: "Yes. There’s zero downtime, and many athletes head straight to the gym.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to go deeper?",
      hand: "deeper",
      body: "Choose 44, 59 or 74 minutes and book in seconds.",
    },
  ],
};

import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/the-prime-mobility-stretch-session
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "prime-mobility-stretch",
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
      kicker: "Elevate your flexibility",
      title: "Prime Mobility",
      accent: "Stretch",
      intro: "Deep muscle release meets controlled movement in a one-on-one session built to unlock range, posture and performance.",
      image: {
        src: u("2026/02/openart-image_5lnhgXxN_1770268368240_raw.webp"),
        alt: "A StretchFLEX therapist stretching a smiling client's leg",
        position: "50% 45%",
      },
    },
    {
      type: "cards",
      kicker: "Benefits of the session",
      title: "Move freer. Perform better.",
      hand: "better",
      items: [
        {
          title: "Bigger range of motion",
          body: "Greater flexibility and freedom of movement in your joints.",
        },
        {
          title: "Athletic edge",
          body: "Support your power, speed and agility.",
        },
        {
          title: "Lower injury risk",
          body: "Improve your balance and stability.",
        },
        {
          title: "Deep muscle release",
          body: "Let go of chronic tension and tightness.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 45 minutes",
      hand: "minutes",
      image: {
        src: u("2026/02/openart-image_E2IR-VHA_1770267642333_raw.webp"),
        alt: "A therapist lifting a client’s leg into an assisted hamstring stretch",
        position: "40% 50%",
      },
      items: [
        {
          title: "Assessment",
          body: "Your therapist assesses your body and tailors every stretch to your needs.",
        },
        {
          title: "Advanced sequences",
          body: "Deep release and controlled movement build on foundational techniques.",
        },
        {
          title: "Walk out freer",
          body: "Leave lighter, with better posture and joint mobility.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Go further",
      title: "Book once or save with a pack",
      hand: "save",
      items: [
        {
          name: "Prime Mobility Stretch",
          badge: "45 min",
          price: "$95",
          detail: "One-on-one mobility session",
          action: {
            label: "Book now",
            href: book("prime-mobility-stretch"),
          },
        },
        {
          name: "The 5 Prime Mobility Package",
          tag: "Next Level Results",
          badge: "Save $25",
          price: "$450.00",
          was: "$475",
          detail: "5 × Prime Mobility Sessions (45 min each)",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a2128e35a9093aac76c601a",
          },
        },
        {
          name: "The 10 Prime Mobility Package",
          tag: "Complete Transformation",
          badge: "Save $80",
          price: "$870.00",
          was: "$950",
          detail: "10 × Prime Mobility Sessions (45 min each)",
          action: {
            label: "Order Now",
            href: "https://link.fastpaydirect.com/payment-link/6a21298903b17c94f571485b",
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
          body: "Athletes chasing performance",
        },
        {
          body: "Desk workers with stiffness or poor posture",
        },
        {
          body: "Gym-goers wanting better recovery",
        },
        {
          body: "Beginners starting their mobility journey",
        },
        {
          body: "Anyone wanting to move more freely",
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
          title: "Do I need experience?",
          body: "No. Our therapists guide you step by step for comfort, safety and results.",
        },
        {
          title: "How is it different from basic stretching?",
          body: "It goes beyond muscles to focus on joint health and movement quality.",
        },
        {
          title: "Is it only for athletes?",
          body: "Not at all. It suits desk workers, gym-goers, beginners and anyone wanting to move more freely.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to move more freely?",
      hand: "freely",
      body: "45 minutes, one-on-one, $95.",
    },
  ],
};

import { createElement } from "react";
import { ClientStories } from "@/components/pages/video/client-stories";
import { BOOK_URL, SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;
/** A general booking button: swapped for this page's session button ("Book Ultimate · 60 min · $120"). */
const BOOK = { label: "Book now", href: BOOK_URL };

/**
 * /our-packages/the-ultimate-stretch
 * Copy from the client's content document (November 2026). Client reviews are
 * left to the homepage, at the owner's request.
 */
export const page: PageContent = {
  sessions: ["ultimate-stretch"],
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "Our deepest session",
      title: "The Ultimate",
      accent: "Stretch",
      intro:
        "Sixty minutes, one-on-one, working through every major muscle group from head to toe. Leave feeling open, aligned and completely reset.",
      note: "[Save up to $150 with a pack](#packs)",
      trust: ["One-on-one session", "Choose your therapist", "Trinity Arcade, Perth CBD", "No experience needed"],
      image: {
        src: "/images/stretch/stretch-forward-fold.jpg",
        alt: "StretchFLEX therapist guiding a client through a full-body assisted forward fold",
        position: "55% 45%",
      },
    },
    {
      type: "split",
      title: "For when your whole body needs it",
      hand: "whole",
      image: {
        src: "/images/stretch/stretch-hip-logo.jpg",
        alt: "A StretchFLEX therapist stretching a client’s leg on the treatment table",
        position: "38% 50%",
      },
      body: [
        "Some weeks, everything feels tight. The Ultimate Stretch gives your therapist a full hour to work through your entire body without rushing, so nothing gets missed.",
        "It is our most complete stretch session, and the one clients book when they want to feel properly looked after.",
      ],
    },
    {
      type: "cards",
      title: "The full-body payoff",
      hand: "payoff",
      items: [
        {
          title: "Flexibility",
          body: "Work gradually into a fuller range of motion across your whole body.",
        },
        {
          title: "Tension release",
          body: "Time to ease long-held tightness in your neck, shoulders, back, hips and legs.",
        },
        {
          title: "Alignment",
          body: "Clients often tell us they feel taller and more balanced afterwards.",
        },
        {
          title: "Calm",
          body: "A full hour in a quiet, private room to breathe, slow down and let go.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 60-minute Ultimate Stretch",
      hand: "minute",
      lead: "**What to bring:** comfortable activewear and a clean, unworn pair of socks (compulsory for hygiene and grip). Grip socks are $15 at reception.",
      image: {
        src: "/images/stretch/stretch-strap.jpg",
        alt: "A therapist using a strap to guide a client's legs through an assisted stretch",
        position: "50% 45%",
      },
      items: [
        {
          title: "Check in",
          body: "Your therapist asks about your goals, tight spots and any injuries, and looks at how you move.",
        },
        {
          title: "Head-to-toe stretching",
          body: "A guided sequence through every major muscle group, adjusted in real time to your body.",
        },
        {
          title: "Leave reset",
          body: "Walk out feeling open and refreshed, with simple stretches to keep it going.",
        },
      ],
    },
    {
      type: "checklist",
      title: "Perfect for you if you",
      hand: "you",
      items: [
        { body: "Want a complete, full-body reset" },
        { body: "Carry long-held tension or stiffness in several areas" },
        { body: "Train hard and want thorough recovery" },
        { body: "Have a demanding schedule and want one hour that is entirely yours" },
      ],
      actions: [BOOK],
    },
    {
      type: "text",
      tone: "sky",
      title: "Your comfort comes first",
      hand: "comfort",
      body: [
        "Every session is private and one-on-one, and you choose your therapist when you book. Our team is led by co-founder [Biljana Mancini](/biljana-mancini), with GP [Dr Joe Kosterich](/dr-joe-kosterich) on our advisory board.",
      ],
    },
    {
      // Client testimonial videos (site.ts, CLIENT_VIDEOS), just before the prices.
      type: "node",
      node: createElement(ClientStories, { id: "client-stories" }),
    },
    {
      type: "offers",
      id: "packs",
      title: "Book once, or save with a pack",
      hand: "save",
      items: [
        {
          name: "Single session",
          price: "$120",
          detail: "$120 per session",
          action: { label: "Book now", href: book("ultimate-stretch") },
        },
        {
          name: "5-Session Pack",
          tag: "Premium experience",
          badge: "Save $30",
          price: "$570",
          was: "$600",
          detail: "$114 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc64203b17c94f5714505",
          },
        },
        {
          name: "10-Session Pack",
          tag: "Best value",
          badge: "Save $150",
          price: "$1,050",
          was: "$1,200",
          detail: "$105 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a1fc72203b17c94f5714506",
          },
        },
      ],
      footnote:
        "Packs are valid for 12 months from purchase, are for one person and are non-refundable and non-transferable, except as required by law. Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
    },
    {
      type: "text",
      title: "Want this every week? Become a member.",
      hand: "every",
      body: ["The Ultimate Membership includes two 60-minute sessions every week for $180, just $90 per session."],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      // One next step: a centred statement reads better than a lone half-width tile.
      type: "text",
      tone: "rose",
      title: "Ready to go further?",
      hand: "further",
      body: [
        "**The Architectural Overhaul** · 74 min · $165",
        "The Ultimate Stretch with 14 minutes of photobiomodulation light before and after.",
      ],
      actions: [{ label: "Explore Photobiotic Stretching", href: "/our-packages/photobiotic-assisted-stretching", tone: "navy" }],
    },
    {
      type: "accordion",
      faq: true,
      title: "Ultimate Stretch questions, answered",
      hand: "answered",
      items: [
        {
          title: "What does The Ultimate Stretch cover?",
          body: "Every major muscle group and limb in one 60-minute session, tailored to where you need it most.",
        },
        {
          title: "Who does the stretching?",
          body: "A qualified assisted stretching therapist of your choice, in a private one-on-one session.",
        },
        {
          title: "Is it too much for a first session?",
          body: "Not at all. Your therapist adjusts every stretch to your comfort level. Many clients choose it for their first visit.",
        },
        {
          title: "How often should I come?",
          body: "Weekly or fortnightly suits most clients. Your therapist can suggest a routine after your first session.",
        },
        {
          title: "What do I need to bring or wear?",
          body: "Comfortable, flexible activewear and a clean, unworn pair of socks. Fresh socks are compulsory for hygiene and grip. Grip socks are available at reception for $15.",
        },
        {
          title: "What is the best value option?",
          body: "The 10-Session Pack saves you $150. If you come every week, the Ultimate Membership works out at $90 per session.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancel or reschedule with at least 48 hours notice for a full refund. Cancellations with 24 to 48 hours notice receive a 50% refund. Cancellations with less than 24 hours notice, and missed appointments, are not refundable.",
        },
      ],
    },
    {
      type: "cta",
      title: "One hour. Your whole body.",
      hand: "whole",
      body: [
        "One-on-one. Your choice of therapist. Right in the heart of Perth CBD.",
        "Questions first? Call [0432 569 077](tel:0432569077)",
      ],
    },
  ],
};

import { createElement } from "react";
import { ClientStories } from "@/components/pages/video/client-stories";
import { BOOK_URL, SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;
/** A general booking button: swapped for this page's session button ("Book Prime · 45 min · $95"). */
const BOOK = { label: "Book now", href: BOOK_URL };

/**
 * /our-packages/the-prime-mobility-stretch-session
 * Copy from the client's content document (November 2026). Client reviews are
 * left to the homepage, at the owner's request.
 */
export const page: PageContent = {
  sessions: ["prime-mobility-stretch"],
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "More time. More attention.",
      title: "Prime Mobility",
      accent: "Stretch",
      intro:
        "Forty-five minutes, one-on-one, combining deep assisted stretching with controlled movement. Enough time to work through several tight areas and leave moving the way you want to.",
      note: "[Save up to $80 with a pack](#packs)",
      trust: ["One-on-one session", "Choose your therapist", "Trinity Arcade, Perth CBD", "No experience needed"],
      image: {
        src: "/images/stretch/stretch-hip-extension.jpg",
        alt: "StretchFLEX therapist guiding a client through an assisted hip mobility stretch",
        position: "50% 45%",
      },
    },
    {
      type: "split",
      title: "When one area isn't the whole story",
      hand: "whole",
      image: {
        src: "/images/stretch/stretch-neck-seated.jpg",
        alt: "A therapist easing tension in a client's neck and shoulders",
        position: "45% 45%",
      },
      body: [
        "Tight hips pull on your lower back. Stiff shoulders drag on your neck. Most of us carry tension in more than one place, and 30 minutes is rarely enough to get to all of it.",
        "Prime gives your therapist time to assess how you move, then work through each area in turn, so the whole chain feels freer, not just one spot.",
      ],
    },
    {
      type: "cards",
      title: "Move freer. Perform better.",
      hand: "better",
      items: [
        {
          title: "Greater range of motion",
          body: "Work gradually into a fuller, more comfortable range through your hips, back and shoulders.",
        },
        {
          title: "Release deep tension",
          body: "Extra time to ease the stubborn tightness that a shorter session can't reach.",
        },
        {
          title: "Move with more control",
          body: "Controlled movement alongside each stretch, so your new range feels stable and usable.",
        },
        {
          title: "Recover between sessions",
          body: "A regular reset for gym-goers, runners and anyone training hard.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "What to expect",
      title: "Your 45-minute Prime Mobility Stretch",
      hand: "minute",
      lead: "**What to bring:** comfortable activewear and a clean, unworn pair of socks (compulsory for hygiene and grip). Grip socks are $15 at reception.",
      image: {
        src: "/images/stretch/stretch-quad-prone.jpg",
        alt: "A therapist guiding a client through an assisted quad stretch, face down on the table",
        position: "40% 50%",
      },
      items: [
        {
          title: "Assess",
          body: "Your therapist checks how your hips, spine and shoulders move and where you are holding tension.",
        },
        {
          title: "Stretch and move",
          body: "Deeper assisted stretches combined with controlled movement, adjusted to you in real time.",
        },
        {
          title: "Walk out freer",
          body: "Leave feeling looser and more mobile, with simple stretches to keep it going at home.",
        },
      ],
    },
    {
      type: "checklist",
      title: "Perfect for you if you are",
      hand: "you",
      items: [
        { body: "Tight in more than one area, such as your hips, back and shoulders" },
        { body: "Training regularly and want to recover and move better" },
        { body: "Sitting for long hours and feeling it in your posture" },
        { body: "New to assisted stretching and want a thorough first session" },
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
          price: "$95",
          detail: "$95 per session",
          action: { label: "Book now", href: book("prime-mobility-stretch") },
        },
        {
          name: "5-Session Pack",
          tag: "Best way to start",
          badge: "Save $25",
          price: "$450",
          was: "$475",
          detail: "$90 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a2128e35a9093aac76c601a",
          },
        },
        {
          name: "10-Session Pack",
          tag: "Best value",
          badge: "Save $80",
          price: "$870",
          was: "$950",
          detail: "$87 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a21298903b17c94f571485b",
          },
        },
      ],
      footnote:
        "Packs are valid for 12 months from purchase, are for one person and are non-refundable and non-transferable, except as required by law. Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
    },
    {
      type: "text",
      title: "Coming every week? Become a member.",
      hand: "every",
      body: ["The Prime Membership includes two 45-minute sessions every week for $139, just $69.50 per session."],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      type: "cards",
      tone: "rose",
      title: "Ready to go further?",
      hand: "further",
      items: [
        {
          title: "The Ultimate Stretch",
          meta: "60 min · $120",
          body: "Every major muscle group in one complete session.",
          href: "/our-packages/the-ultimate-stretch",
        },
        {
          title: "The Performance Protocol",
          meta: "59 min · $145",
          body: "The Prime stretch with 14 minutes of photobiomodulation light.",
          href: "/our-packages/photobiotic-assisted-stretching",
        },
      ],
    },
    {
      type: "accordion",
      faq: true,
      title: "Prime Mobility Stretch questions, answered",
      hand: "answered",
      items: [
        {
          title: "Do I need any experience?",
          body: "No. Your therapist guides you through every step and adjusts each stretch to suit your body.",
        },
        {
          title: "How is this different from stretching on my own?",
          body: "Your therapist supports and positions your body so you can relax fully, which lets you work into stretches you can't reach alone. Prime also adds controlled movement, so the focus is on how you move, not just how far you can stretch.",
        },
        {
          title: "Is it only for athletes?",
          body: "No. Prime suits anyone who is tight in more than one area, from desk workers to weekend runners.",
        },
        {
          title: "Will it hurt?",
          body: "You will feel a stretch, but it should never be painful. Your therapist works within your comfort level.",
        },
        {
          title: "How often should I come?",
          body: "Once or twice a week works well for most clients. Your therapist can suggest a routine after your first session.",
        },
        {
          title: "What do I need to bring or wear?",
          body: "Comfortable, flexible activewear and a clean, unworn pair of socks. Fresh socks are compulsory for hygiene and grip. Grip socks are available at reception for $15.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancel or reschedule with at least 48 hours notice for a full refund. Cancellations with 24 to 48 hours notice receive a 50% refund. Cancellations with less than 24 hours notice, and missed appointments, are not refundable.",
        },
        {
          title: "I have an injury or health condition. Can I still book?",
          body: "Please tell us about any injuries or conditions when you book. If you have had a recent injury, surgery or diagnosis, check with your health professional first.",
        },
      ],
    },
    {
      type: "cta",
      title: "More time. Better movement.",
      hand: "Better",
      body: [
        "One-on-one. Your choice of therapist. Right in the heart of Perth CBD.",
        "Questions first? Call [0432 569 077](tel:0432569077)",
      ],
    },
  ],
};

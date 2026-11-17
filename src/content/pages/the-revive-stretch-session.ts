import { createElement } from "react";
import { ClientStories } from "@/components/pages/video/client-stories";
import { BOOK_URL, SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;
/** A general booking button: swapped for this page's session button ("Book Revive · 30 min · $65"). */
const BOOK = { label: "Book now", href: BOOK_URL };

/**
 * /our-packages/the-revive-stretch-session
 * Copy from the client's content document (November 2026). Client reviews are
 * left to the homepage, at the owner's request.
 */
export const page: PageContent = {
  seo: {
    title: "Revive Stretch: 30-Min Assisted Stretching Perth | StretchFLEX",
    description:
      "A 30-minute, one-on-one assisted stretch in Perth CBD with the therapist of your choice. Release tension and move more freely. $65, or save with a pack.",
    ogTitle: "The Revive Stretch: Your 30-Minute Reset",
    ogDescription: "Thirty minutes, one-on-one, in Perth CBD. Walk in tight. Walk out moving freely.",
  },
  sessions: ["revive-stretch"],
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "Your 30-minute reset",
      title: "The Revive",
      accent: "Stretch",
      intro:
        "Thirty minutes, one-on-one with a qualified therapist who does the work for you. Walk in tight. Walk out looser, lighter and moving freely.",
      note: "[Save up to $85 with a pack](#packs)",
      trust: ["One-on-one session", "Choose your therapist", "Trinity Arcade, Perth CBD", "No experience needed"],
      image: {
        src: "/images/stretch/stretch-side-reach.jpg",
        alt: "StretchFLEX therapist guiding a client through an assisted shoulder stretch",
        position: "55% 50%",
      },
    },
    {
      type: "split",
      title: "Tight, stiff and short on time?",
      hand: "time",
      image: {
        src: "/images/stretch/stretch-forearm.jpg",
        alt: "A StretchFLEX therapist stretching a client's forearm and wrist",
        position: "40% 50%",
      },
      body: [
        "Long hours at a desk, hard training sessions and everyday stress all build up in your muscles. Stretching on your own rarely gets deep enough, and it is the first thing to go when life gets busy.",
        "The Revive Stretch fits into a lunch break. Your therapist guides your body through stretches you can't reach on your own, so you get more from 30 minutes than an hour of trying alone.",
      ],
    },
    {
      type: "cards",
      title: "Half an hour. Whole-body reset.",
      hand: "reset",
      items: [
        {
          title: "Release tension",
          body: "Ease the tightness in your neck, shoulders, hips and back that builds up from sitting, training and stress.",
        },
        {
          title: "Move more freely",
          body: "Gently work into a greater range of motion, so everyday movement feels easier.",
        },
        {
          title: "Stand taller",
          body: "Clients often tell us they feel more upright and open through the chest and shoulders after a session.",
        },
        {
          title: "Switch off",
          body: "Thirty minutes in a calm, private room where your only job is to breathe and let go.",
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
      lead: "**What to bring:** comfortable activewear and a clean, unworn pair of socks (compulsory for hygiene and grip). Forgot yours? StretchFLEX grip socks are $15 at reception.",
      image: {
        src: "/images/stretch/stretch-neck-lying.jpg",
        alt: "A therapist gently stretching a relaxed client's neck on the treatment table",
        position: "45% 50%",
      },
      items: [
        {
          title: "A quick check-in",
          body: "Tell your therapist what feels tight, how you move day to day and any injuries we should know about.",
        },
        {
          title: "Guided, assisted stretching",
          body: "Lie back while your therapist moves you through targeted stretches, adjusting the pressure in real time so it always feels safe.",
        },
        {
          title: "Leave with a plan",
          body: "Walk out feeling lighter, with one or two simple stretches to keep the benefits going at home.",
        },
      ],
    },
    {
      type: "checklist",
      title: "Perfect for you if you are",
      hand: "you",
      items: [
        { body: "Short on time but need a proper reset" },
        { body: "Feeling tight or stiff from sitting at a desk all day" },
        { body: "Training hard and want to recover between sessions" },
        { body: "New to assisted stretching and want an easy first experience" },
      ],
      actions: [BOOK],
    },
    {
      type: "text",
      tone: "sky",
      title: "Your comfort comes first",
      hand: "comfort",
      body: [
        "Every session is private and one-on-one, and you choose your therapist when you book. Our team is led by co-founder Biljana Mancini, a certified personal trainer with specialist training in assisted stretching, who has developed stretching protocols and mentored other practitioners.",
      ],
      actions: [{ label: "Meet Biljana", href: "/biljana-mancini", tone: "navy" }],
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
          price: "$65",
          detail: "$65 per session",
          action: { label: "Book now", href: book("revive-stretch") },
        },
        {
          name: "5-Session Pack",
          tag: "Best way to start",
          badge: "Save $30",
          price: "$295",
          was: "$325",
          detail: "$59 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a2125955a9093aac76c6014",
          },
        },
        {
          name: "10-Session Pack",
          tag: "Best value",
          badge: "Save $85",
          price: "$565",
          was: "$650",
          detail: "$56.50 per session",
          action: {
            label: "Order now",
            href: "https://link.fastpaydirect.com/payment-link/6a2126f85a9093aac76c6015",
          },
        },
      ],
      footnote:
        "Packs are valid for 12 months from purchase, are for one person and are non-refundable and non-transferable, except as required by law. Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy).",
    },
    {
      type: "text",
      title: "Stretching every week? Become a member.",
      hand: "every",
      body: ["The Revive Membership includes two 30-minute sessions every week for $89, just $44.50 per session."],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      type: "cards",
      tone: "rose",
      title: "Ready to go further?",
      hand: "further",
      items: [
        {
          title: "Prime Mobility Stretch",
          meta: "45 min · $95",
          body: "More time to work through several areas in one session.",
          href: "/our-packages/the-prime-mobility-stretch-session",
        },
        {
          title: "The Rapid Reset",
          meta: "44 min · $120",
          body: "The Revive stretch with 14 minutes of photobiomodulation light before and after.",
          href: "/our-packages/photobiotic-assisted-stretching",
        },
      ],
    },
    {
      type: "accordion",
      title: "Your questions, answered",
      hand: "answered",
      items: [
        {
          title: "Is the Revive Stretch good for beginners?",
          body: "Yes. No fitness level or experience is needed. Your therapist adjusts every stretch to suit your body.",
        },
        {
          title: "Will it hurt?",
          body: "You will feel a stretch, but it should never be painful. Your therapist checks in throughout and works within your comfort level.",
        },
        {
          title: "Who does the stretching?",
          body: "A qualified assisted stretching therapist of your choice. Sessions are always private and one-on-one.",
        },
        {
          title: "Is 30 minutes long enough?",
          body: "Yes, for a focused reset of the areas that bother you most. If you want to work on your whole body in one visit, [Prime Mobility Stretch](/our-packages/the-prime-mobility-stretch-session) or [The Ultimate Stretch](/our-packages/the-ultimate-stretch) are a better fit.",
        },
        {
          title: "How often should I come?",
          body: "Many clients come once or twice a week to maintain their results. Your therapist can recommend a routine after your first session.",
        },
        {
          title: "What do I need to bring or wear?",
          body: "Comfortable, flexible activewear and a clean, unworn pair of socks to change into before your session. Fresh socks are compulsory for hygiene and grip. StretchFLEX grip socks are available at reception for $15.",
        },
        {
          title: "How do the packs work?",
          body: "Buy 5 or 10 sessions upfront and save up to $85. Packs are valid for 12 months and are for one person.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancel or reschedule with at least 48 hours notice for a full refund. Cancellations with 24 to 48 hours notice receive a 50% refund. Cancellations with less than 24 hours notice, and missed appointments, are not refundable.",
        },
        {
          title: "I have an injury or health condition. Can I still book?",
          body: "Please tell us about any injuries or conditions when you book. If you have had a recent injury, surgery or diagnosis, check with your health professional first. Once you are cleared, your therapist will adapt every stretch to suit you.",
        },
        {
          title: "Where are you?",
          body: "111 Trinity Arcade, 72 St Georges Terrace, Perth CBD. Open Monday to Friday, 8:30 am to 5:30 pm, and Saturdays by appointment.",
        },
      ],
    },
    {
      type: "cta",
      title: "Feel the difference in 30 minutes",
      hand: "difference",
      body: [
        "One-on-one. Your choice of therapist. Right in the heart of Perth CBD.",
        "Questions first? Call [0432 569 077](tel:0432569077)",
      ],
    },
  ],
};

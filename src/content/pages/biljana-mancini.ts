import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /biljana-mancini — our therapist and co-founder, kept short. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "a session with Biljana",
  // Renamed from Biljana Stojanović (the old URL redirects here); SEO text comes from the old page.
  seoFrom: "/biljana-stojanovic",
  title: "Biljana Mancini - Assisted Stretching Perth | StretchFLEX",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "About", href: "/about" }],
      kicker: "Co-founder, Mobility FlexHub",
      title: "Biljana Mancini",
      intro: "Lead assisted stretching and mobility clinician and co-founder of StretchFLEX, blending wellness expertise with an artist's eye for movement.",
      image: { src: u("2025/11/Biljana-Stojanovic-768x1375-1.webp"), alt: "Biljana Mancini, co-founder of StretchFLEX", portrait: true, ratio: 768 / 1375 },
    },
    {
      type: "split",
      kicker: "Her story",
      title: "Professional Background",
      hand: "Background",
      image: { src: u("2026/03/StretchFLEX-010.webp"), alt: "A StretchFLEX therapist guiding a client through a lying hip and back stretch", position: "55% 50%" },
      tone: "navy",
      reverse: true,
      body: [
        "A certified personal trainer with specialised training in assisted stretching, Biljana built her name in the wellness industry before co-founding StretchFLEX.",
        "As Team Leader and Master Trainer at a premier wellness facility, she developed stretching protocols and mentored other practitioners.",
      ],
    },
    {
      type: "checklist",
      tone: "rose",
      kicker: "Credentials",
      title: "Why Clients Trust Biljana",
      hand: "Trust",
      items: [
        { body: "Certified personal trainer" },
        { body: "Specialised training in assisted stretching methods" },
        { body: "Team Leader and Master Trainer for over two years" },
        { body: "Trained at the School of Artistic Trades and Applied Arts, Šabac, Serbia" },
        { body: "Artwork exhibited locally and internationally" },
      ],
    },
    {
      type: "text",
      title: "Philosophy and Approach",
      hand: "Approach",
      body: [
        "Biljana sees the body as both a functional system and a creative instrument.",
        "She pairs technical precision with intuition to build a personalised mobility plan for every client.",
      ],
    },
    { type: "cta", title: "Book a Session with Biljana", hand: "Biljana" },
  ],
};

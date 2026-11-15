import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /biljana-mancini: our co-founder and lead therapist. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "a session with Biljana",
  // Renamed from Biljana Stojanović (the old URL redirects here); `seo` below takes priority over the old page's snapshot.
  seoFrom: "/biljana-stojanovic",
  seo: {
    title: "Biljana Mancini | Lead Assisted Stretching Therapist Perth",
    description:
      "Meet Biljana Mancini, co-founder and lead assisted stretching therapist at StretchFLEX, Perth CBD. Personalised one-on-one mobility care.",
    ogTitle: "Meet Biljana Mancini | StretchFLEX",
    ogDescription: "Co-founder and lead therapist at StretchFLEX, Perth CBD.",
  },
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "About", href: "/about" }],
      kicker: "Co-founder and lead therapist",
      title: "Biljana Mancini",
      intro:
        "Biljana leads the StretchFLEX therapy team and has shaped the way every session is delivered: personal, unhurried and built around the client on the table.",
      image: {
        src: u("2025/11/Biljana-Stojanovic-768x1375-1.webp"),
        alt: "Biljana Mancini, co-founder and lead assisted stretching therapist at StretchFLEX",
        portrait: true,
        ratio: 768 / 1375,
      },
    },
    {
      type: "split",
      title: "Experience",
      image: { src: "/images/stretch/stretch-hip-logo.jpg", alt: "Biljana Mancini guiding a client through an assisted hip stretch at StretchFLEX", position: "40% 50%" },
      tone: "navy",
      reverse: true,
      list: [
        "Co-founder of StretchFLEX and lead assisted stretching and mobility therapist",
        "Former Team Leader and Master Trainer at a wellness facility, where she developed stretching protocols and mentored other practitioners",
        "Certified personal trainer with specialist training in assisted stretching methods",
      ],
    },
    {
      type: "text",
      title: "Her approach",
      hand: "approach",
      body: [
        "Biljana believes the best results come from listening first. Every session starts with understanding how you move, where you feel restricted and what you want to be able to do, then building the stretch around you.",
        "Her background as an artist, trained at the School of Artistic Trades and Applied Arts in Šabac, Serbia, shows in the care and precision she brings to her work.",
      ],
    },
    {
      type: "cta",
      title: "Book a session with Biljana",
      hand: "Biljana",
      body: "Select Biljana as your therapist when you book online, or call us on [0432\u00a0569\u00a0077](tel:0432569077).",
    },
  ],
};

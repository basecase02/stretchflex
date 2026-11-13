import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /first-time-visitors — your first session, step by step, kept short. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "your first session",
  blocks: [
    {
      type: "hero",
      kicker: "Never tried it? Start here",
      title: "First Time Visitors",
      intro: "Here's exactly what happens in your first assisted stretching session in Perth, from hello to floating back out.",
      image: { src: u("2026/03/StretchFLEX-43.jpg"), alt: "A StretchFLEX therapist checking in a new client at the front desk", position: "40% 50%" },
    },
    {
      type: "accordion",
      tone: "rose",
      kicker: "What to expect",
      title: "Your First Session, Step by Step",
      hand: "Step",
      numbered: true,
      image: { src: u("2026/02/openart-image_reWvHdiU_1770338907959_raw.webp"), alt: "A StretchFLEX therapist stretching a relaxed client's shoulder on the treatment table", position: "50% 50%" },
      items: [
        {
          title: "Warm welcome & quick check-in",
          body: "Meet your stretch specialist and talk through your goals, tight spots and any injuries. We never rush this part.",
        },
        {
          title: "Posture & movement assessment",
          body: "A gentle look at your posture and how your hips, shoulders and spine move. It's not a fitness test.",
        },
        {
          title: "Getting comfortable on the table",
          body: "You stay fully clothed on a padded table, with bolsters, straps or a blanket if you like. You can pause or adjust at any time.",
        },
        {
          title: "Guided assisted stretching",
          body: "Slow, targeted stretches for your hips, hamstrings, back, neck and shoulders. Strong but safe, never painful.",
        },
        {
          title: "Breathing, relaxation & body awareness",
          body: "Guided breathing helps release tension and calm your nervous system. Many clients call it a full-body tune-up.",
        },
        {
          title: "Cool-down & personalised advice",
          body: "Notice how much lighter you move, then leave with simple at-home stretches and a plan for follow-up sessions.",
        },
      ],
    },
    {
      type: "checklist",
      kicker: "Before you arrive",
      title: "What to Wear & Bring",
      hand: "Wear",
      items: [
        { title: "Comfy clothes:", body: "activewear or anything loose you can move in." },
        { title: "Eat light:", body: "skip heavy meals for an hour or two beforehand." },
        { title: "Arrive early:", body: "5–10 minutes gives you time to settle in." },
        { title: "No experience needed:", body: "you don't need to be fit or flexible to start." },
        { title: "Afterwards:", body: "mild muscle awareness for up to 24 hours is normal, so stay hydrated." },
      ],
    },
    {
      type: "cta",
      title: "Ready to Book Your First Session?",
      hand: "First",
      body: "You don't need to be flexible. Just ready to give your body the care it deserves.",
    },
  ],
};

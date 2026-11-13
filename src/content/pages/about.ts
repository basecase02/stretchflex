import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /about — who we are, kept short. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    {
      type: "hero",
      kicker: "Movement is medicine",
      title: "About",
      accent: "StretchFlex",
      intro: "We specialise in assisted stretching and mobility therapy that reduces tension, improves flexibility and restores balance to your body.",
      image: { src: u("2026/02/openart-image_aAWfT-1G_1770268632537_raw.webp"), alt: "A smiling StretchFLEX therapist at the studio front desk", position: "30% 40%" },
    },
    {
      type: "cards",
      style: "notes",
      kicker: "Our philosophy",
      title: "Movement Is Medicine",
      hand: "Medicine",
      items: [
        { title: "Mobility", body: "The freedom to move without restriction." },
        { title: "Mindfulness", body: "Noticing how your body feels and moves each day." },
        { title: "Maintenance", body: "Lasting results through consistent, personalised care." },
      ],
    },
    {
      type: "cards",
      tone: "rose",
      kicker: "Our services",
      title: "What Do We Offer",
      hand: "Offer",
      items: [
        {
          title: "Assisted Stretching",
          body: "Gently and effectively improve your flexibility, range of motion and muscle function.",
          image: { src: u("2026/06/SF62.jpg"), alt: "A StretchFLEX therapist assisting a client with a quad stretch on the treatment table", position: "40% 50%" },
        },
        {
          title: "Flexibility & Mobility",
          body: "Targeted help for injury recovery, athletic performance or simply everyday comfort.",
          image: { src: u("2026/03/StretchFLEX37.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder and arm", position: "55% 45%" },
        },
        {
          title: "Private, Safe Space",
          body: "A comfortable, supportive studio where you can fully relax.",
          image: { src: u("2026/06/openart-image_f1Y6t1CT_1780474264127_raw.jpg"), alt: "A client checking in at the StretchFLEX front desk in Perth", position: "50% 45%" },
        },
      ],
    },
    {
      type: "checklist",
      kicker: "Key benefits",
      title: "Why Choose StretchFlex?",
      hand: "Choose",
      items: [
        { title: "Expert care:", body: "highly trained Stretch & Flexologists." },
        { title: "Personalised:", body: "every session tailored to your needs and goals." },
        { title: "Private:", body: "a safe, supportive space." },
        { title: "Results-focused:", body: "we work towards the outcomes you want." },
        { title: "Holistic:", body: "your overall wellbeing comes first." },
      ],
    },
    {
      type: "people",
      tone: "rose",
      kicker: "Meet the team",
      title: "Who You'll Work With",
      hand: "With",
      items: [
        {
          name: "Biljana Mancini",
          role: "Therapist · Co-founder",
          href: "/biljana-mancini",
          image: { src: u("2025/11/Biljana-Stojanovic-768x1375-1.webp"), alt: "Biljana Mancini, co-founder of StretchFLEX" },
          body: "Lead assisted stretching and mobility clinician.",
        },
        {
          name: "Dr Joe Kosterich",
          role: "Advisory Board",
          href: "/dr-joe-kosterich",
          image: { src: u("2026/03/DrJoeKosterich.webp"), alt: "Dr Joe Kosterich, GP and StretchFLEX advisor" },
          body: "GP and medical advisor to StretchFLEX.",
        },
      ],
    },
    { type: "cta", title: "Looking for Assisted Stretching?", hand: "for" },
  ],
};

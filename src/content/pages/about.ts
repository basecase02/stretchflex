import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /about: who we are and the team behind StretchFLEX. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    {
      type: "hero",
      kicker: "Movement is medicine",
      title: "About",
      accent: "StretchFLEX",
      intro:
        "StretchFLEX is a private assisted stretching and recovery studio in the heart of Perth CBD. We exist for one reason: to help people move better, recover better and live better.",
      image: {
        src: "/images/team/stretchflex-team-reception.jpg",
        alt: "The StretchFLEX team at reception in Trinity Arcade, Perth CBD",
        position: "52% 50%",
      },
    },
    {
      type: "split",
      title: "Our story",
      hand: "story",
      image: { src: "/images/stretch/stretch-hip-extension.jpg", alt: "A StretchFLEX therapist guiding a client through an assisted hip stretch", position: "45% 50%" },
      tone: "navy",
      body: [
        "StretchFLEX was founded by [Biljana Mancini](/biljana-mancini) and Ray Mancini on a simple idea. Plenty of people work hard, train hard and look after themselves, yet still feel tight and stiff. Often what they need is not more effort, but someone to help them move.",
        "So we built a studio around that idea. Private rooms. One-on-one sessions with the therapist of your choice. Hands-on assisted stretching, paired with the best recovery technology we could find. All inside Trinity Arcade, so it fits into a working day.",
      ],
    },
    {
      type: "cards",
      style: "notes",
      title: "Our philosophy",
      hand: "philosophy",
      items: [
        { title: "Mobility", body: "The freedom to move through life without restriction." },
        { title: "Mindfulness", body: "Noticing how your body feels and moves, and listening to it." },
        { title: "Maintenance", body: "Lasting results come from consistent, personalised care, not one-off fixes." },
      ],
    },
    {
      type: "checklist",
      tone: "rose",
      title: "What we offer",
      hand: "offer",
      items: [
        { title: "Assisted stretching:", body: "30, 45 and 60-minute one-on-one sessions" },
        {
          title: "Photobiotic Assisted Stretching™:",
          body: "assisted stretching with professional-grade [photobiomodulation](/our-packages/photobiotic-assisted-stretching)",
        },
        {
          title: "Recovery technology:",
          body: "pneumatic compression, vagus nerve stimulation and [LED red light therapy](/our-packages/red-light-therapy-perth)",
        },
        { title: "Memberships:", body: "[two sessions every week from $89](/membership)" },
      ],
      actions: [{ label: "View all sessions", href: "/our-packages", tone: "navy" }],
    },
    {
      type: "cards",
      title: "Why choose StretchFLEX?",
      hand: "choose",
      items: [
        { title: "Your comfort, your privacy", body: "Every session is one-on-one in a private room, with the therapist of your choice." },
        { title: "Personalised care", body: "Every session starts with a check-in and is tailored to what your body needs that day." },
        { title: "Expert guidance", body: "Led by experienced practitioners, with a GP on our advisory board." },
        { title: "A complete approach", body: "Stretching, light technology and recovery tools under one roof." },
      ],
    },
    {
      type: "people",
      tone: "rose",
      title: "Meet the team",
      hand: "team",
      items: [
        {
          name: "Biljana Mancini",
          role: "Co-founder and Lead Therapist",
          href: "/biljana-mancini",
          image: { src: u("2025/11/Biljana-Stojanovic-768x1375-1.webp"), alt: "Biljana Mancini, co-founder and lead therapist at StretchFLEX" },
          body: "A certified personal trainer with specialist training in assisted stretching, Biljana has led teams, developed stretching protocols and mentored other practitioners. Her clients know her for the care she brings to every session.",
        },
        {
          name: "Ray Mancini",
          role: "Co-founder and Director",
          image: { src: "/images/team/ray-mancini.jpg", alt: "Ray Mancini, co-founder and director of StretchFLEX", position: "50% 25%" },
          body: "An AUSactive Level 3 Registered Professional since 2008, Ray brings more than 25 years of experience in strength, conditioning and performance training, including for law enforcement and special forces teams across six continents. He designs the recovery and performance programs behind StretchFLEX.",
        },
        {
          name: "Dr Joe Kosterich",
          role: "Advisory Board",
          href: "/dr-joe-kosterich",
          image: { src: u("2026/03/DrJoeKosterich.webp"), alt: "Dr Joe Kosterich, member of the StretchFLEX advisory board" },
          body: "A GP with more than 20 years in clinical practice and medical education, Dr Joe advises StretchFLEX on clinical and strategic matters.",
        },
      ],
    },
    {
      type: "cta",
      title: "Visit us",
      hand: "Visit",
      body: "111 Trinity Arcade, 72 St Georges Terrace, Perth CBD. Monday to Friday 8:30 am to 5:30 pm, Saturdays by appointment.",
    },
  ],
};

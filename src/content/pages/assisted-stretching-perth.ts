import { faqJsonLd } from "@/components/pages/info/team";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** The quick answers, shown on the page and as FAQPage structured data. */
const FAQS = [
  {
    q: "What is Assisted Stretching Perth?",
    a: "A guided, one-on-one mobility session where a trained therapist moves your body through controlled stretches to improve flexibility and range of motion.",
  },
  {
    q: "Is assisted stretching suitable for beginners?",
    a: "Yes. Every session is tailored to your flexibility level and comfort, so it suits beginners and experienced movers alike.",
  },
  {
    q: "How quickly will I notice results?",
    a: "Many people feel less stiff after one session. Lasting mobility gains build over several weeks of consistent sessions.",
  },
  {
    q: "How Often Should You Book Assisted Stretching Perth?",
    a: "Weekly or fortnightly keeps you moving well; more frequent sessions can kick-start a specific goal. Flexibility builds progressively, so we'll plan the right rhythm for you.",
  },
  {
    q: "Can Assisted Stretching Perth improve posture?",
    a: "Loosening tight muscle groups can support better posture and ease the strain of long hours sitting.",
  },
  {
    q: "Is Assisted Stretching Perth safe for older adults?",
    a: "Yes. Sessions are adjusted to your mobility level and any health considerations.",
  },
];

/** /assisted-stretching-perth — the guide to assisted stretching, kept short. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    faqJsonLd(FAQS),
    {
      type: "hero",
      kicker: "Move better, feel lighter",
      title: "Understanding Assisted Stretching in Perth and",
      accent: "How It Works",
      intro: "One-on-one, therapist-led stretching that improves flexibility, eases muscle tension and increases your range of motion.",
      image: { src: u("2026/03/StretchFLEX36.jpg"), alt: "A StretchFLEX therapist stretching a seated client's arm across her chest", position: "45% 45%" },
    },
    {
      type: "split",
      kicker: "The basics",
      title: "What Is Assisted Stretching?",
      hand: "Assisted",
      image: { src: u("2026/06/SF67.jpg"), alt: "A StretchFLEX therapist standing with a smiling client in the studio", position: "50% 35%" },
      tone: "navy",
      reverse: true,
      body: [
        "A trained therapist moves your body through controlled stretches while you stay completely relaxed.",
        "They stabilise each area and build range gradually, so you go deeper and safer than stretching alone.",
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      kicker: "Three simple steps",
      title: "How Assisted Stretching Works",
      hand: "Works",
      numbered: true,
      image: { src: u("2026/03/StretchFLEX35.jpg"), alt: "A StretchFLEX therapist working on a seated client's shoulders", position: "55% 40%" },
      items: [
        { title: "A quick mobility check", body: "A short chat about your goals, then a look at how you move." },
        {
          title: "Guided, controlled stretches",
          body: "Your therapist applies safe tension while keeping you aligned, teaching your nervous system to allow more movement.",
        },
        { title: "Progress you can feel", body: "Consistent sessions improve flexibility, posture and how easily you move every day." },
      ],
    },
    {
      type: "cards",
      kicker: "Made for real bodies",
      title: "Who Benefits from Assisted Stretching Perth?",
      hand: "Benefits",
      items: [
        {
          title: "Office workers",
          body: "Undo desk-day tightness in the neck, shoulders, hips and hamstrings.",
          image: { src: u("2026/06/SF71.jpg"), alt: "A StretchFLEX therapist releasing a seated client's neck and shoulders", position: "55% 40%" },
        },
        {
          title: "Athletes & active people",
          body: "Recover faster and move more freely, from runners to gym-goers.",
          image: { src: u("2026/06/SF70.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder", position: "45% 40%" },
        },
        {
          title: "Over 40 and 50",
          body: "Keep your joints moving and your confidence high, without excess strain.",
          image: { src: u("2026/06/SF76.jpg"), alt: "A StretchFLEX therapist stretching a relaxed client's leg as he lies on his side", position: "40% 50%" },
        },
      ],
    },
    {
      type: "cards",
      tone: "sky",
      kicker: "Know the difference",
      title: "Assisted Stretching vs Physiotherapy vs Massage",
      hand: "vs",
      items: [
        { title: "Physiotherapy", body: "Injury rehabilitation and clinical treatment." },
        { title: "Massage", body: "Eases soft-tissue tension through hands-on manipulation." },
        { title: "Assisted stretching", body: "Builds flexibility and mobility through guided movement, and works alongside both." },
      ],
    },
    {
      type: "accordion",
      id: "faqs",
      tone: "rose",
      kicker: "Quick answers",
      title: "FAQs",
      items: FAQS.map((item) => ({ title: item.q, body: item.a })),
    },
    {
      type: "cta",
      title: "Book Your Assisted Stretching Perth Session at StretchFlex",
      hand: "Session",
    },
  ],
};

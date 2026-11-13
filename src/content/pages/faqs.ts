import { faqJsonLd } from "@/components/pages/info/team";
import type { PageContent } from "./types";

type Faq = { q: string; a: string };

const START: Faq[] = [
  {
    q: "What is assisted stretching?",
    a: "A qualified stretch specialist guides your body through targeted stretches, so you move deeper and safer than you could on your own.",
  },
  {
    q: "What happens in a session?",
    a: "A quick chat about your goals and tight spots, then personalised stretches adjusted in real time. You finish with simple after-care tips for home.",
  },
  {
    q: "Do I need to be fit or experienced?",
    a: "Nope. All fitness levels are welcome, from beginners and desk workers to athletes.",
  },
  { q: "What do I need to bring?", a: "Just yourself and a drink. We provide everything else." },
  {
    q: "I’m really not flexible will it hurt?",
    a: "A little, but we never push you too far. As you get more flexible, we go a little further.",
  },
];

const RESULTS: Faq[] = [
  {
    q: "Can assisted stretching help with pain or stiffness?",
    a: "Yes. Gentle, guided stretching releases muscle tension and stiffness, so your body feels better day to day.",
  },
  {
    q: "What are the benefits?",
    a: "Better flexibility and range of motion, less muscle tension, improved posture, stronger athletic performance, lower injury risk and real relaxation.",
  },
  {
    q: "Do I need to stretch between visits?",
    a: "You'll leave with personalised take-home stretches and mobility tips to keep your progress going.",
  },
  {
    q: "Can I make stretching part of my fitness routine?",
    a: "Yes. It pairs perfectly with workouts, recovery days and athletic training, or simply as self-care.",
  },
];

const BOOKING: Faq[] = [
  {
    q: "How long is a session and what are my options?",
    a: "From rapid 20-minute resets to 60-minute deep sessions. Pick the one that suits your goals and schedule.",
  },
  {
    q: "How often should I come?",
    a: "It depends on your goals. Many people come weekly for maintenance; others start with a few sessions close together.",
  },
  {
    q: "Is assisted stretching safe?",
    a: "Absolutely. Our therapists adjust every stretch for comfort and alignment. Just tell us about any health conditions or injuries.",
  },
  {
    q: "What if I have an injury or health condition?",
    a: "Check with your health professional first after an injury, surgery or diagnosis. Once you're cleared, we'll adapt every stretch to suit you.",
  },
];

const group = (items: Faq[]) => items.map((item) => ({ title: item.q, body: item.a }));

/** /faqs — every live question, with short answers. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    faqJsonLd([...START, ...RESULTS, ...BOOKING]),
    {
      type: "hero",
      kicker: "Quick answers, no fluff",
      title: "FAQs",
      intro: "Everything you want to know before your first assisted stretching session, answered in a sentence or two.",
      image: { src: "/wp-content/uploads/2026/02/openart-image_aAWfT-1G_1770268632537_raw.webp", alt: "A smiling StretchFLEX therapist at the studio front desk", position: "30% 40%" },
    },
    { type: "accordion", tone: "rose", kicker: "Getting started", title: "New to Stretching?", hand: "New", items: group(START) },
    { type: "accordion", kicker: "Results", title: "What You'll Feel", hand: "Feel", items: group(RESULTS) },
    { type: "accordion", tone: "rose", kicker: "Booking & safety", title: "Sessions & Safety", hand: "Safety", items: group(BOOKING) },
    { type: "cta", title: "Looking for Assisted Stretching?", hand: "for" },
  ],
};

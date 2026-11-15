import { faqJsonLd } from "@/components/pages/info/team";
import { BOOK_URL } from "@/content/site";
import type { PageContent } from "./types";

/** One question. The answer is rich text: one paragraph, or several. */
type Faq = { q: string; a: string | string[] };

const GROUPS: { title: string; hand?: string; items: Faq[] }[] = [
  {
    title: "Getting started",
    hand: "started",
    items: [
      {
        q: "What is assisted stretching?",
        a: "A one-on-one session where a qualified therapist moves your body through controlled stretches while you relax. Because your therapist supports your body, you can stretch further and more comfortably than on your own.",
      },
      { q: "Do I need to be flexible or fit?", a: "No. Beginners, desk workers and athletes are all welcome. Every stretch is adjusted to you." },
      {
        q: "Who will my therapist be?",
        a: "A qualified assisted stretching therapist of your choice. You can select your therapist when you book, and every session is private and one-on-one.",
      },
      {
        q: "What happens in my first session?",
        a: "A short check-in about your goals and any injuries, a gentle movement check, then guided stretching, finishing with simple stretches to do at home. Our [First Time Visitors page](/first-time-visitors) explains it step by step.",
      },
    ],
  },
  {
    title: "During your session",
    hand: "session",
    items: [
      { q: "Will it hurt?", a: "You will feel a stretch, but never pain. Your therapist checks in throughout and adjusts to your comfort." },
      {
        q: "What do I need to bring or wear?",
        a: [
          "Please wear comfortable, flexible activewear and bring a clean, unworn pair of socks to change into immediately before your session. For hygiene, grip and therapist control during assisted stretching, fresh socks are mandatory for every appointment. Forgot yours? No problem. Custom StretchFLEX grip socks are available to purchase at reception for $15.",
          "For Photobiotic Assisted Stretching™ and light sessions, light-coloured activewear works best, as denim and dark, heavy fabrics block the light.",
        ],
      },
      { q: "Do I stay clothed?", a: "Yes. You stay in your activewear for every session." },
      {
        q: "Which session length should I choose?",
        a: "30 minutes for a quick reset of one or two areas, 45 minutes to work through several areas, and 60 minutes for a complete full-body session.",
      },
    ],
  },
  {
    title: "Results",
    items: [
      {
        q: "How soon will I notice a difference?",
        a: "Many people feel looser after one session. Lasting improvement in flexibility and mobility comes with regular sessions over several weeks.",
      },
      { q: "How often should I come?", a: "Weekly or fortnightly suits most people. Your therapist can recommend a routine for your goals." },
      {
        q: "Will I be sore afterwards?",
        a: "Some people feel mild tenderness for up to 24 hours, similar to after a new workout. Drink plenty of water and keep moving gently.",
      },
    ],
  },
  {
    title: "Light therapy and recovery",
    hand: "recovery",
    items: [
      {
        q: "What is Photobiotic Assisted Stretching™?",
        a: "Our signature session: a 7-minute light prime, your assisted stretch, then a 7-minute light flush, using professional-grade red and near-infrared light.",
      },
      {
        q: "What is the De-Compression Recovery Stack?",
        a: "A 20-minute session combining pneumatic compression, non-invasive vagus nerve stimulation and guided mindfulness.",
      },
      {
        q: "Are light therapy and compression safe for everyone?",
        a: "Not always. They may not be suitable if you are pregnant, have a pacemaker or implanted electronic device, epilepsy, a light-sensitive condition, a history of skin cancer or blood clots, or take medication that increases sensitivity to light. Please tell us about any conditions when you book.",
      },
    ],
  },
  {
    title: "Booking and payment",
    hand: "Booking",
    items: [
      { q: "How do I book?", a: "Book online any time, or call us on [0432\u00a0569\u00a0077](tel:0432569077)." },
      { q: "What are your opening hours?", a: "Monday to Friday 8:30 am to 5:30 pm. Saturdays by appointment. Closed Sundays." },
      { q: "Where are you?", a: "111 Trinity Arcade, 72 St Georges Terrace, Perth CBD." },
      { q: "Do prices include GST?", a: "Yes. All prices are in Australian dollars and include GST." },
      {
        q: "What is your cancellation policy?",
        a: "Full refund with at least 48 hours notice. 50% refund with 24 to 48 hours notice. No refund with less than 24 hours notice or for missed appointments.",
      },
    ],
  },
  {
    title: "Packs and memberships",
    hand: "memberships",
    items: [
      { q: "How do session packs work?", a: "Buy 5 or 10 sessions upfront and save. Packs are valid for 12 months and are for one person." },
      {
        q: "How do memberships work?",
        a: "Memberships include two sessions every week, billed weekly by direct debit. Assisted Stretching Memberships have a three-month minimum and Performance & Recovery Memberships a four-week minimum. See our [Membership page](/membership) for details.",
      },
      { q: "Can I pause my membership?", a: "Yes. Each membership includes one 30-day hold." },
    ],
  },
  {
    title: "Health and safety",
    hand: "safety",
    items: [
      {
        q: "I have an injury or health condition. Can I still come?",
        a: "Please tell us when you book. If you have had a recent injury, surgery or diagnosis, check with your health professional first. Once cleared, your therapist will adapt every stretch to suit you.",
      },
      {
        q: "Is assisted stretching a medical treatment?",
        a: "No. Our services support general mobility, recovery and wellbeing. They do not diagnose or treat medical conditions and are not a substitute for advice from your doctor or physiotherapist.",
      },
    ],
  },
];

/** A rich answer as plain text for structured data: links keep their label, bold loses its marks. */
const plain = (a: string | string[]) =>
  (Array.isArray(a) ? a : [a])
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "");

/** /faqs: every common question, grouped. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  seo: {
    title: "Assisted Stretching FAQs | StretchFLEX Perth",
    description:
      "Answers to common questions about assisted stretching, light therapy, memberships, booking and cancellations at StretchFLEX, Perth CBD.",
    ogTitle: "Your Questions, Answered | StretchFLEX",
    ogDescription: "Everything you need to know before your first session.",
  },
  blocks: [
    faqJsonLd(GROUPS.flatMap((group) => group.items.map((item) => ({ q: item.q, a: plain(item.a) })))),
    {
      type: "hero",
      kicker: "Your questions, answered",
      title: "Frequently asked",
      accent: "questions",
      intro: "Can't find what you're looking for? Call us on [0432\u00a0569\u00a0077](tel:0432569077).",
      image: {
        src: "/images/stretch/stretch-side-reach.jpg",
        alt: "A StretchFLEX therapist guiding a client through an assisted side reach",
        position: "55% 50%",
      },
    },
    ...GROUPS.map((group, i) => ({
      type: "accordion" as const,
      tone: i % 2 === 0 ? ("rose" as const) : undefined,
      title: group.title,
      hand: group.hand,
      items: group.items.map((item) => ({ title: item.q, body: item.a })),
    })),
    {
      type: "cta",
      title: "Still have a question?",
      hand: "question",
      actions: [
        { label: "Contact us", href: "/contact-us", tone: "light" },
        { label: "Book your session", href: BOOK_URL },
      ],
    },
  ],
};

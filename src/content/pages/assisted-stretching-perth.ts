import { faqJsonLd } from "@/components/pages/info/team";
import { BOOK_URL } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** The quick answers, shown on the page and as FAQPage structured data. */
const FAQS = [
  { q: "Is assisted stretching suitable for beginners?", a: "Yes. Sessions are tailored to your flexibility and comfort." },
  {
    q: "How quickly will I notice results?",
    a: "Many people feel looser after one session. Lasting improvement comes with regular sessions over several weeks.",
  },
  {
    q: "Can it help my posture?",
    a: "Releasing tight muscles in your chest, hips and back can help you feel more upright and reduce the strain of long hours sitting.",
  },
  {
    q: "Is it safe for older adults?",
    a: "Yes. Every session is adjusted to your mobility and health. Tell us about any conditions when you book.",
  },
  {
    q: "Is it the same as yoga?",
    a: "No. In yoga you hold the poses yourself. In assisted stretching, your therapist does the work while you relax.",
  },
];

/** /assisted-stretching-perth: the plain-English guide to assisted stretching. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  seo: {
    title: "Assisted Stretching Perth: How It Works & Who It Helps",
    description:
      "What is assisted stretching, how does it work and is it right for you? A plain-English guide from StretchFLEX, Perth CBD's assisted stretching studio.",
    ogTitle: "Assisted Stretching Explained | StretchFLEX Perth",
    ogDescription: "How assisted stretching works, who it helps and how it compares with massage and physiotherapy.",
  },
  blocks: [
    faqJsonLd(FAQS),
    {
      type: "hero",
      kicker: "The complete guide",
      title: "Assisted stretching in Perth:",
      accent: "how it works and who it helps",
      intro:
        "Assisted stretching is one-on-one stretching where a trained therapist moves your body through controlled stretches while you relax. Here is everything you need to know before you book.",
      image: { src: "/images/stretch/stretch-hip-logo.jpg", alt: "Therapist supporting a client's leg during an assisted stretching session in Perth", position: "40% 50%" },
    },
    {
      type: "split",
      title: "What is assisted stretching?",
      hand: "assisted",
      image: { src: "/images/stretch/stretch-forward-fold.jpg", alt: "A therapist supporting a client as she relaxes into a seated forward fold", position: "55% 45%" },
      tone: "navy",
      reverse: true,
      body: [
        "In a normal stretch, you hold the position yourself, which means some muscles are always working to keep you there. In assisted stretching, your therapist supports and positions your body for you.",
        "Because you can fully relax, you can work into stretches you can't reach on your own, with your therapist controlling the pace and pressure the whole time.",
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      title: "How it works",
      hand: "works",
      numbered: true,
      image: { src: "/images/stretch/stretch-neck-lying.jpg", alt: "A StretchFLEX therapist gently stretching a client's neck on the treatment table", position: "45% 50%" },
      items: [
        { title: "A short consultation", body: "Your therapist asks about your goals, tight areas and past injuries, and looks at how you move." },
        {
          title: "Guided stretches",
          body: "Your therapist takes each area through a series of controlled stretches, building gradually and keeping you aligned and comfortable.",
        },
        {
          title: "Progress over time",
          body: "With regular sessions, many people find their flexibility, posture and everyday movement steadily improve.",
        },
      ],
    },
    {
      type: "cards",
      title: "Who benefits from assisted stretching?",
      hand: "benefits",
      items: [
        {
          title: "Office workers",
          body: "Long hours at a desk tighten the neck, shoulders, hips and hamstrings. Assisted stretching helps release that built-up tension.",
          image: { src: "/images/stretch/stretch-neck-seated.jpg", alt: "A StretchFLEX therapist easing tension in a client's neck and shoulders", position: "45% 45%" },
        },
        {
          title: "Athletes and active people",
          body: "A regular stretch helps you recover between training sessions and move more freely.",
          image: { src: "/images/stretch/stretch-strap.jpg", alt: "A therapist using a strap to stretch a client's legs", position: "40% 45%" },
        },
        {
          title: "People over 40 and 50",
          body: "Staying mobile gets more important with age. Gentle, guided stretching helps keep your joints moving comfortably.",
          image: { src: "/images/stretch/stretch-forearm.jpg", alt: "A therapist slowly stretching a client's forearm and wrist", position: "40% 50%" },
        },
        {
          title: "Beginners",
          body: "You don't need any flexibility or experience. Every stretch is adjusted to you.",
          image: { src: "/images/stretch/stretch-side-reach.jpg", alt: "A StretchFLEX therapist guiding a client through a gentle assisted side reach", position: "55% 50%" },
        },
      ],
    },
    {
      type: "table",
      tone: "sky",
      title: "Assisted stretching, physiotherapy and massage",
      hand: "massage",
      head: ["Service", "Main focus", "Best for"],
      rows: [
        ["Physiotherapy", "Diagnosing and rehabilitating injuries", "Pain, injury and post-surgery recovery"],
        ["Massage", "Hands-on work on muscles and soft tissue", "Muscle tension and relaxation"],
        ["Assisted stretching", "Guided stretching and movement", "Flexibility, mobility and everyday comfort"],
      ],
      footnote:
        "Assisted stretching works well alongside both. If you have an injury, see your physiotherapist or doctor first, then use stretching to support your ongoing mobility.",
    },
    {
      type: "checklist",
      title: "The benefits clients notice",
      hand: "notice",
      items: [
        { body: "Greater flexibility and range of motion" },
        { body: "Less muscle tension and stiffness" },
        { body: "Feeling more upright and less strained from sitting" },
        { body: "Moving more freely during training and everyday life" },
        { body: "A calm, relaxing break from a busy week" },
      ],
    },
    {
      type: "text",
      tone: "navy",
      title: "How often should you book?",
      hand: "often",
      body: [
        "Weekly or fortnightly sessions suit most people. If you are working towards a specific goal, your therapist may suggest more frequent sessions at first.",
      ],
    },
    {
      type: "accordion",
      id: "faqs",
      tone: "rose",
      title: "Frequently asked questions",
      hand: "questions",
      items: FAQS.map((item) => ({ title: item.q, body: item.a })),
    },
    {
      // The doc's closing booking section carries a price table, which the
      // booking band can't show, so it is a table with the session buttons.
      type: "table",
      id: "book",
      title: "Try assisted stretching at StretchFLEX",
      hand: "Try",
      lead: "One-on-one sessions in Trinity Arcade, Perth CBD, with the therapist of your choice.",
      head: ["Session", "Time", "Price"],
      rows: [
        ["[The Revive Stretch](/our-packages/the-revive-stretch-session)", "30 min", "$65"],
        ["[Prime Mobility Stretch](/our-packages/the-prime-mobility-stretch-session)", "45 min", "$95"],
        ["[The Ultimate Stretch](/our-packages/the-ultimate-stretch)", "60 min", "$120"],
      ],
      actions: [{ label: "Book your session", href: BOOK_URL }],
    },
  ],
};

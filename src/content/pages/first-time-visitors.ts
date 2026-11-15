import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /first-time-visitors: your first session, step by step. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "your first session",
  seo: {
    title: "Your First Assisted Stretching Session Perth | StretchFLEX",
    description:
      "New to assisted stretching? Here is exactly what happens in your first StretchFLEX session in Perth CBD, what to wear and how to prepare.",
    ogTitle: "Your First Session at StretchFLEX",
    ogDescription: "Never tried assisted stretching? Here is everything you need to know, from arrival to walking out lighter.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Never tried it? Start here",
      title: "Your first session at",
      accent: "StretchFLEX",
      intro:
        "You don't need to be flexible. You just need to be ready. Here is exactly what to expect, from the moment you arrive to the moment you walk out lighter.",
      image: { src: "/images/team/stretchflex-team-reception.jpg", alt: "The StretchFLEX team ready to welcome first-time clients at reception in Trinity Arcade", position: "52% 50%" },
    },
    {
      type: "accordion",
      tone: "rose",
      title: "Your first session, step by step",
      hand: "step",
      numbered: true,
      image: { src: "/images/stretch/stretch-neck-seated.jpg", alt: "A StretchFLEX therapist gently easing a relaxed client's neck", position: "50% 40%" },
      items: [
        { title: "Welcome and check-in", body: "Meet your therapist and talk through your goals, tight areas and any injuries. There is no rush." },
        { title: "A gentle movement check", body: "Your therapist looks at your posture and how your hips, shoulders and spine move. It is not a fitness test." },
        {
          title: "Get comfortable",
          body: "You stay fully clothed on a padded table, with bolsters, straps or blankets if you want them. You can pause or adjust at any time.",
        },
        { title: "Guided assisted stretching", body: "Slow, targeted stretches for your hips, hamstrings, back, neck and shoulders. Firm, but never painful." },
        { title: "Breathe and relax", body: "Your therapist guides your breathing to help you release tension and settle." },
        { title: "Cool-down and advice", body: "A quick review of how you feel, plus simple stretches to do at home and a suggested plan." },
      ],
    },
    {
      type: "checklist",
      title: "What to wear and bring",
      hand: "wear",
      items: [
        { body: "Comfortable, flexible activewear" },
        {
          body: "A clean, unworn pair of socks to change into before your session. Fresh socks are compulsory for hygiene and grip. Forgot yours? StretchFLEX grip socks are $15 at reception.",
        },
        { body: "For Photobiotic or light sessions, light-coloured clothing works best" },
        { body: "A water bottle" },
      ],
    },
    {
      type: "checklist",
      tone: "sky",
      title: "Before you arrive",
      hand: "arrive",
      items: [
        { body: "Eat lightly and avoid a heavy meal in the one to two hours before" },
        { body: "Arrive 5 to 10 minutes early" },
        { body: "Tell us about any injuries, surgery or health conditions when you book" },
      ],
    },
    {
      type: "text",
      title: "After your session",
      hand: "After",
      body: [
        "Some people feel mild muscle tenderness for up to 24 hours, a bit like after a new workout. Drink plenty of water and keep moving gently.",
      ],
    },
    {
      type: "table",
      tone: "rose",
      title: "Which session should I book first?",
      hand: "first",
      head: ["Session", "Time", "Price", "Choose it if"],
      rows: [
        ["[The Revive Stretch](/our-packages/the-revive-stretch-session)", "30 min", "$65", "You want a short, easy introduction"],
        ["[Prime Mobility Stretch](/our-packages/the-prime-mobility-stretch-session)", "45 min", "$95", "You are tight in more than one area"],
        ["[The Ultimate Stretch](/our-packages/the-ultimate-stretch)", "60 min", "$120", "You want the complete experience"],
      ],
    },
    {
      type: "text",
      tone: "navy",
      title: "Your comfort comes first",
      hand: "comfort",
      body: [
        "Every session is private and one-on-one, and you choose the therapist you would like to see. If you have a preference, simply select your therapist when you book.",
      ],
    },
    {
      type: "accordion",
      id: "faqs",
      title: "First-timer questions",
      hand: "questions",
      items: [
        { title: "Do I need to be flexible?", body: "No. Sessions are adjusted to your body, whatever your starting point." },
        { title: "Will it hurt?", body: "You will feel a stretch, but never pain. Tell your therapist at any time and they will adjust." },
        { title: "Do I get undressed?", body: "No. You stay in your activewear throughout." },
        {
          title: "How soon will I notice a difference?",
          body: "Many people feel looser after their first session. Lasting change comes with regular sessions over several weeks.",
        },
        {
          title: "What if I need to cancel?",
          body: "Give us at least 48 hours notice for a full refund. See our [Refund and Cancellation Policy](/refund-and-cancellation-policy) for details.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to book your first session?",
      hand: "first",
      body: ["You don't need to be flexible. Just ready.", "Questions first? Call [0432\u00a0569\u00a0077](tel:0432569077)"],
    },
  ],
};

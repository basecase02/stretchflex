/**
 * Site-wide content: contact details, navigation, sessions and the homepage.
 * Copy follows the client's content document (StretchFLEX Website Content,
 * 14 November 2026). Edit copy, prices and links here; components only
 * handle presentation.
 */

export const SITE_URL = "https://stretchflex.au";

/**
 * Booking happens on the site: /book-your-session embeds the Acuity scheduler.
 * Every general "Book" button goes there; each session's button adds
 * ?session=<id> so the scheduler opens straight on that session.
 */
export const BOOK_URL = "/book-your-session";

/** The Acuity scheduling page that /book-your-session embeds. */
export const ACUITY_URL = "https://app.acuityscheduling.com/schedule.php?owner=40885174";

/** A session's booking link: the booking page, opened on that session. */
const book = (id: string) => `${BOOK_URL}?session=${id}`;

export const PHONE = { label: "0432 569 077", href: "tel:0432569077" };
export const EMAIL = { label: "info@stretchflex.au", href: "mailto:info@stretchflex.au" };

export const ADDRESS = "111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000";

/** Opening hours, as [days, hours]. */
export const HOURS: [string, string][] = [
  ["Monday to Friday", "8:30 am to 5:30 pm"],
  ["Saturday", "By appointment"],
  ["Sunday", "Closed"],
];

export const TAGLINE = "Move better. Recover better. Live better.";

export const COMPANY = {
  name: "Wellbeing Beyond Wellness Pty Ltd",
  abn: "42 687 612 611",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61583797823853",
  instagram: "https://www.instagram.com/stretchflexperth/",
};

/* ───────────────────────── Navigation ───────────────────────── */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };
export type NavItem = NavLink & { children?: NavLink[]; groups?: NavGroup[] };

export const NAV: NavItem[] = [
  {
    label: "Sessions",
    href: "/our-packages",
    children: [
      { label: "The Revive Stretch", href: "/our-packages/the-revive-stretch-session" },
      { label: "Prime Mobility Stretch", href: "/our-packages/the-prime-mobility-stretch-session" },
      { label: "The Ultimate Stretch", href: "/our-packages/the-ultimate-stretch" },
      { label: "Photobiotic Assisted Stretching™", href: "/our-packages/photobiotic-assisted-stretching" },
      { label: "De-Compression Recovery Stack", href: "/our-packages/de-compression-recovery-stack" },
      { label: "LED Red Light Therapy", href: "/our-packages/red-light-therapy-perth" },
      { label: "View all sessions", href: "/our-packages" },
    ],
  },
  { label: "First Time Visitors", href: "/first-time-visitors" },
  { label: "Membership", href: "/membership" },
  { label: "Gift Certificates", href: "/gift-certificates" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About StretchFLEX", href: "/about" },
      { label: "Biljana Mancini", href: "/biljana-mancini" },
      { label: "Dr Joe Kosterich", href: "/dr-joe-kosterich" },
    ],
  },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

/** The header's booking button. */
export const BOOK_LABEL = "Book now";

/* ───────────────────────── Hero ───────────────────────── */

export const HERO = {
  /** The page's H1, word for word from the live homepage. */
  kicker: "Professional Assisted Stretching Perth",
  lines: ["Move better.", "Recover better.", "Live better."],
  body: "One-on-one assisted stretching and recovery with the therapist of your choice, right in the heart of Perth CBD. Walk in tight. Walk out moving freely.",
  cta: { label: "Book your session", href: BOOK_URL },
  secondary: { label: "Explore sessions", href: "/our-packages" },
  trust: ["One-on-one, private sessions", "Choose your therapist", "Trinity Arcade, Perth CBD", "No experience needed"],
};

/* ───────────────────────── Your comfort ───────────────────────── */

/** Private, one-on-one sessions with the therapist each client chooses. */
export const COMFORT = {
  kicker: "Your comfort comes first",
  lines: [
    { lead: "Private,", hand: "one-on-one" },
    { lead: "With the therapist", hand: "you choose" },
  ],
  body: "Every session is private and one-on-one, and you choose the therapist you would like to see.",
};

/* ───────────────────────── Stretch & Recovery ───────────────────────── */

export type Session = {
  id: string;
  name: string;
  /** The word on its booking button, e.g. "Revive" → "Book Revive · 30 min · $65". */
  short?: string;
  price: number;
  duration: string;
  /** Who it's ideal for: the line under the price. */
  lead: string;
  /** Checklist on the session cards. */
  points?: string[];
  /** Paragraph instead of a checklist (Photobiotic sessions). */
  body?: string;
  learnHref: string;
  /** Without one, the card shows only "Learn More". */
  bookHref?: string;
  /** The session's appointment type in Acuity (Appointment Types → Edit, the number in the URL). */
  acuityId?: number;
  /** Price as written on a page; defaults to "$" + price. */
  priceLabel?: string;
  /** Sticker text; defaults to duration. */
  durationLabel?: string;
};

export const SESSIONS_TITLE = "Choose your session";

export const SESSIONS: Session[] = [
  {
    id: "revive-stretch",
    name: "The Revive Stretch",
    short: "Revive",
    price: 65,
    duration: "30 minutes",
    lead: "A quick reset of your tightest areas",
    points: ["Release tension", "Move more freely", "Stand taller", "Switch off"],
    learnHref: "/our-packages/the-revive-stretch-session",
    bookHref: book("revive-stretch"),
    acuityId: 100593536,
  },
  {
    id: "prime-mobility-stretch",
    name: "Prime Mobility Stretch",
    short: "Prime",
    price: 95,
    duration: "45 minutes",
    lead: "Working through several areas in one visit",
    points: ["Greater range of motion", "Release deep tension", "Move with more control", "Recover between sessions"],
    learnHref: "/our-packages/the-prime-mobility-stretch-session",
    bookHref: book("prime-mobility-stretch"),
    acuityId: 100598223,
  },
  {
    id: "ultimate-stretch",
    name: "The Ultimate Stretch",
    short: "Ultimate",
    price: 120,
    duration: "60 minutes",
    lead: "A complete, full-body session",
    points: ["Full-body flexibility", "Release long-held tension", "Feel taller and more balanced", "A full hour to switch off"],
    learnHref: "/our-packages/the-ultimate-stretch",
    bookHref: book("ultimate-stretch"),
    acuityId: 100598234,
  },
  {
    id: "photobiotic-44",
    name: "The Rapid Reset",
    price: 120,
    duration: "44 minutes",
    lead: "A 30-minute stretch with 14 minutes of light",
    body: "A focused session for busy professionals who want maximum effect in under an hour.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: book("photobiotic-44"),
    acuityId: 100598276,
  },
  {
    id: "photobiotic-59",
    name: "The Performance Protocol",
    price: 145,
    duration: "59 minutes",
    lead: "A 45-minute stretch with 14 minutes of light",
    body: "Our most popular choice: time to work through several areas, with light before and after.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: book("photobiotic-59"),
    acuityId: 100598282,
  },
  {
    id: "photobiotic-74",
    name: "The Architectural Overhaul",
    price: 165,
    duration: "74 minutes",
    lead: "A 60-minute stretch with 14 minutes of light",
    body: "The complete experience: a full-body stretch with light on both sides.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: book("photobiotic-74"),
    acuityId: 100598286,
  },
  {
    id: "de-compression-recovery-stack",
    name: "De-Compression Recovery Stack",
    price: 120,
    duration: "20 minutes",
    lead: "Compression, vagus nerve stimulation and guided mindfulness",
    points: ["Pneumatic compression", "Vagus nerve stimulation", "Guided mindfulness"],
    learnHref: "/our-packages/de-compression-recovery-stack",
    bookHref: book("de-compression-recovery-stack"),
    acuityId: 100598302,
  },
  {
    id: "led-red-light-therapy",
    name: "LED Red Light Therapy",
    price: 49,
    duration: "14 minutes",
    lead: "A standalone light session",
    points: ["Nine wavelength bands", "432 dual-chip LEDs", "Twin panels, front and back"],
    learnHref: "/our-packages/red-light-therapy-perth",
    bookHref: book("led-red-light-therapy"),
    acuityId: 100598308,
  },
];

/**
 * The sessions shown in the tabbed carousel. The tab shows the range of
 * session lengths; the title names the kind of session.
 */
export const SESSION_GROUPS = [
  {
    id: "stretch",
    tab: "30 – 60 minutes",
    title: "Assisted Stretching",
    sessionIds: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  },
  {
    id: "photobiotic",
    tab: "44 – 74 minutes",
    title: "Photobiotic Assisted Stretching™",
    sessionIds: ["photobiotic-44", "photobiotic-59", "photobiotic-74"],
  },
  {
    id: "recovery",
    tab: "14 – 20 minutes",
    title: "Recovery",
    sessionIds: ["de-compression-recovery-stack", "led-red-light-therapy"],
  },
] as const;

/* ───────────────────────── Intro ───────────────────────── */

export const INTRO = {
  title: "The stretch you can’t give yourself",
  hand: "can’t",
  paragraphs: [
    "Hours at a desk, hard training and everyday stress all build up in your body. Stretching on your own rarely goes deep enough, and it is usually the first thing to go when life gets busy.",
    "At StretchFLEX, a qualified therapist does the work for you. You relax while your therapist guides each muscle group through stretches you can’t reach on your own, adjusting in real time so it always feels safe. The result is a body that feels looser, lighter and easier to move.",
  ],
  cta: { label: "Explore sessions", href: "/our-packages" },
};

/* ───────────────────────── Booking band ───────────────────────── */

export const CTA_BAND = {
  title: "You don’t need to be flexible. Just ready.",
  hand: "ready",
  body: "Book your first session today, or call us on [0432 569 077](tel:0432569077).",
  cta: "Book your session",
};

/* ───────────────────────── Why clients choose StretchFLEX ───────────────────────── */

export type BenefitIcon = "range" | "release" | "posture" | "performance" | "shield" | "calm" | "pin";

export const BENEFITS = {
  kicker: "",
  title: "Why Perth clients choose StretchFLEX",
  hand: "choose",
  items: [
    {
      icon: "calm",
      title: "Your comfort comes first",
      body: "Every session is private and one-on-one, and you choose the therapist you would like to see.",
    },
    {
      icon: "range",
      title: "Personalised every time",
      body: "Each session starts with a check-in, so your therapist works on what your body needs that day.",
    },
    {
      icon: "shield",
      title: "Expert guidance",
      body: "Our team is led by co-founder Biljana Mancini, with GP Dr Joe Kosterich on our advisory board.",
    },
    {
      icon: "performance",
      title: "Advanced recovery technology",
      body: "Professional-grade photobiomodulation, pneumatic compression and vagus nerve stimulation, all under one roof.",
    },
    {
      icon: "pin",
      title: "Right in the CBD",
      body: "Inside Trinity Arcade on St Georges Terrace, with sessions that fit around work, training or lunch.",
    },
  ] satisfies { icon: BenefitIcon; title: string; body: string }[],
};

/* ───────────────────────── Your first session ───────────────────────── */

export const FIRST_SESSION = {
  kicker: "Your first session",
  title: "Step by step",
  hand: "by",
  steps: [
    { title: "Check in", body: "A relaxed chat about your goals, tight spots and any past injuries." },
    { title: "Get comfortable", body: "You stay fully clothed on a padded table. You can pause or adjust at any time." },
    { title: "Relax and stretch", body: "Your therapist guides you through targeted stretches, adjusting the pressure as you go." },
    { title: "Leave with a plan", body: "Simple stretches to keep the benefits going between visits." },
  ],
  cta: { label: "Read the first time visitors guide", href: "/first-time-visitors" },
};

/* ───────────────────────── Membership band ───────────────────────── */

export const MEMBERSHIP_BAND = {
  kicker: "Make it part of your week",
  title: "Results come from consistency",
  hand: "consistency",
  body: "Our memberships include two sessions every week from $89, with savings of up to $120 a week.",
  cta: { label: "Explore memberships", href: "/membership" },
  /** The six member cards, each linking to its tier on the Membership page. */
  collections: [
    {
      title: "Assisted Stretching",
      tiers: [
        { slug: "revive", name: "Revive", price: "$89" },
        { slug: "prime", name: "Prime", price: "$139" },
        { slug: "ultimate", name: "Ultimate", price: "$180" },
      ],
    },
    {
      title: "Performance & Recovery",
      tiers: [
        { slug: "bronze", name: "Bronze", price: "$250" },
        { slug: "silver", name: "Silver", price: "$295" },
        { slug: "gold", name: "Gold", price: "$330" },
      ],
    },
  ],
};

/* ───────────────────────── Quick answers ───────────────────────── */

export const QUICK_FAQS = {
  kicker: "Questions?",
  title: "Quick answers",
  hand: "Quick",
  items: [
    { q: "Do I need to be flexible?", a: "No. Sessions suit every body and every fitness level." },
    { q: "What should I wear?", a: "Comfortable activewear and a clean, unworn pair of socks (compulsory for hygiene and grip)." },
    { q: "Will it hurt?", a: "You will feel a stretch, but it should never be painful. Your therapist works within your comfort level." },
    { q: "How often should I come?", a: "Many clients come once or twice a week to maintain their results." },
  ],
  cta: { label: "See all FAQs", href: "/faqs" },
};

/* ───────────────────────── Google reviews ───────────────────────── */

export const REVIEWS = {
  title: "What our clients say",
  business: "StretchFLEX",
  rating: 5,
  countLabel: "Google reviews",
  writeReview: {
    label: "Read our Google reviews",
    href: "https://search.google.com/local/reviews?placeid=ChIJeVqjE9GlMioRGoEGr-Y4_WI",
  },
  items: [
    {
      id: "renu",
      name: "Renu Mathews",
      avatar: "/images/reviews/renu-mathews.png",
      text: "I have had assisted stretch sessions with Biljana for the past couple of months. I feel taller and more flexible after each session. My posture has improved and I feel stretching weekly like this has improved my overall health. Biljana is a knowledgeable professional and always checks in to make sure I’m comfortable with each stretch. I highly recommend.",
    },
    {
      id: "michelle",
      name: "Michelle Evans",
      avatar: "/images/reviews/michelle-evans.png",
      text: "I have been receiving assistive stretching at StretchFlex with Biljana, and I can confidently say that her care has made a meaningful difference in my wellbeing and daily function while managing MS. From the moment I walk in, Biljana treats me with genuine warmth, attentiveness, and professionalism. She takes the time to understand my symptoms, limitations, and goals, and adapts every session specifically for my needs. Her knowledge of muscular balance, mobility, and activation is exceptional. Biljana explains every step, checks in throughout each session, and ensures I feel supported and safe. I leave each appointment with reduced tension, better mobility, and a noticeable improvement in how my body feels and functions. I cannot recommend StretchFlex and Biljana highly enough. She has become an essential part of my week and I am truly grateful for the difference her treatment has made. Did I mention how calming and tranquil the treatment rooms are?",
    },
    {
      id: "ben",
      name: "Ben Kosterich",
      avatar: "/images/reviews/ben-kosterich.png",
      text: "Wonderful experience and great staff. Will be back again!",
    },
    {
      id: "rastko",
      name: "Rastko Stojanvic",
      avatar: "/images/reviews/rastko-stojanvic.png",
      text: "Amazing studio, I could tell Biljana truly cared about the health of her clients.",
    },
  ],
};



/* ───────────────────────── Contact ───────────────────────── */

export const CONTACT = {
  title: "Contact Us",
  body: "Have a question, or not sure which session to book? We would love to hear from you.",
  address: ADDRESS,
  directions:
    "Trinity Arcade runs between St Georges Terrace and Hay Street Mall, a short walk from Perth Underground and Elizabeth Quay stations.",
  hours: HOURS.map(([days, time]) => `${days}: ${time}`),
  cta: "Book your session",
  mapSrc: "https://maps.google.com/maps?q=StretchFlex&t=m&z=12&output=embed&iwloc=near",
};

/* ───────────────────────── Footer ───────────────────────── */

export const FOOTER = {
  blurb: "One-on-one assisted stretching and recovery in the heart of Perth CBD.",
  hours: "Monday to Friday 8:30 am to 5:30 pm · Saturday by appointment · Sunday closed",
  columns: [
    {
      title: "Sessions",
      links: [
        { label: "The Revive Stretch", href: "/our-packages/the-revive-stretch-session" },
        { label: "Prime Mobility Stretch", href: "/our-packages/the-prime-mobility-stretch-session" },
        { label: "The Ultimate Stretch", href: "/our-packages/the-ultimate-stretch" },
        { label: "Photobiotic Assisted Stretching™", href: "/our-packages/photobiotic-assisted-stretching" },
        { label: "De-Compression Recovery Stack", href: "/our-packages/de-compression-recovery-stack" },
        { label: "LED Red Light Therapy", href: "/our-packages/red-light-therapy-perth" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "First Time Visitors", href: "/first-time-visitors" },
        { label: "Membership", href: "/membership" },
        { label: "Gift Certificates", href: "/gift-certificates" },
        { label: "Assisted Stretching Perth", href: "/assisted-stretching-perth" },
        { label: "About", href: "/about" },
        { label: "FAQs", href: "/faqs" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Book Your Session", href: "/book-your-session" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Refund and Cancellation Policy", href: "/refund-and-cancellation-policy" },
        { label: "Membership Terms and Conditions", href: "/membership-terms" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Website Terms of Use", href: "/terms-of-use" },
      ],
    },
  ],
  copyright: `© 2026 StretchFLEX. StretchFLEX is operated by ${COMPANY.name}, ABN ${COMPANY.abn}.`,
  disclaimer: "Our services support general mobility, recovery and wellbeing and are not a substitute for medical advice.",
};

/* ───────────────────────── Client stories ───────────────────────── */

/**
 * Client testimonial Shorts on the StretchFLEX YouTube channel, shown on the
 * homepage and the Revive, Prime and Ultimate pages. Add a new one here and
 * it appears everywhere (the row becomes a carousel when they don't all fit).
 */
export const CLIENT_VIDEOS = [
  { id: "wCuBT7hnRRA", title: "Real people, real experiences, real results" },
  { id: "3coj8g2Tuo0", title: "Discover the StretchFLEX difference" },
];

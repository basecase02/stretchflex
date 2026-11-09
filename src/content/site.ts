/**
 * All homepage content, copied from the live stretchflex.au page.
 * Edit copy, prices and links here; the components only handle presentation.
 */

export const SITE_URL = "https://stretchflex.au";

/** Group booking widget used by every "Book Appointment" button. */
export const BOOK_URL = "https://api.leadconnectorhq.com/widget/groups/stretchflex";

export const PHONE = { label: "0432 569 077", href: "tel:0432569077" };

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
    label: "Our Packages",
    href: "/our-packages",
    children: [
      { label: "Revive Stretch", href: "/our-packages/the-revive-stretch-session" },
      { label: "Prime Mobility Stretch", href: "/our-packages/the-prime-mobility-stretch-session" },
      { label: "The Ultimate Stretch", href: "/our-packages/the-ultimate-stretch" },
      { label: "De-Compression Recovery Stack", href: "/our-packages/rapid-rejuvenation" },
      { label: "Photobiotic Assisted Stretching", href: "/our-packages/photobiotic-assisted-stretching" },
      { label: "Red Light Therapy Perth", href: "/our-packages/red-light-therapy-benefits" },
    ],
  },
  {
    label: "First Time Visitors",
    href: "/first-time-visitors",
    children: [{ label: "Assisted Stretching", href: "/assisted-stretching-perth" }],
  },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        label: "Therapist",
        links: [{ label: "Biljana Stojanović", href: "/biljana-stojanovic" }],
      },
      {
        label: "Advisory Board",
        links: [
          { label: "Dr Joe Kosterich", href: "/dr-joe-kosterich" },
          { label: "Alan Chapman", href: "/alan-chapman" },
        ],
      },
    ],
  },
  { label: "Membership", href: "/membership" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

/* ───────────────────────── Hero ───────────────────────── */

export const HERO = {
  lead: "Increase your",
  words: ["Mobility", "Strength", "Flexibility"],
  body: "Experience personalised Assisted Stretching in Perth with one-on-one sessions designed to improve flexibility, ease pain, and help your body move with confidence and ease.",
  cta: "Book Appointment",
};

/* ───────────────────────── Stretch & Recovery ───────────────────────── */

export type Session = {
  id: string;
  name: string;
  price: number;
  duration: string;
  /** Bold line under the price. */
  lead: string;
  /** Checklist (stretch + recovery sessions). */
  points?: string[];
  /** Paragraph (Photobiotic sessions). */
  body?: string;
  learnHref: string;
  bookHref: string;
};

export const SESSIONS_TITLE = "Stretch & Recovery";

export const SESSIONS: Session[] = [
  {
    id: "revive-stretch",
    name: "Revive Stretch",
    price: 65,
    duration: "30 minutes",
    lead: "Those short on time but in need of a quick reset",
    points: [
      "Reduced Tension and Stiffness",
      "Improved Posture and Alignment",
      "Enhanced Energy Levels",
      "Stress Reduction and Relaxation",
      "Improved Sleep Quality",
    ],
    learnHref: "/our-packages/the-revive-stretch-session",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/Q6ny2LRnBFnWAVBfGBqF",
  },
  {
    id: "prime-mobility-stretch",
    name: "Prime Mobility Stretch",
    price: 95,
    duration: "45 minutes",
    lead: "Active individuals who want to improve their athletic performance",
    points: [
      "Deep Muscle Release",
      "Improved Posture and Alignment",
      "Enhanced Body Awareness",
      "Stress Reduction and Relaxation",
      "Improved Posture and Alignment",
      "Reduce Your Risk of Injury",
    ],
    learnHref: "/our-packages/the-prime-mobility-stretch-session",
    bookHref:
      "https://api.leadconnectorhq.com/widget/bookings/nutritionalinsights-afd23e59-1bbd-4671-8d29-bc2f23ade8763zqh4oe8z5iq",
  },
  {
    id: "ultimate-stretch",
    name: "Ultimate Stretch",
    price: 120,
    duration: "60 minutes",
    lead: "Those seeking a comprehensive and transformative stretching experience",
    points: [
      "Release Chronic Tension",
      "Unlock Your Body's Full Potential",
      "Improve Your Posture and Alignment",
      "Enhance Your Body Awareness",
      "Deep Muscle Release",
      "Improved Joint Mobility",
      "Stress Reduction and Relaxation",
      "Enhanced Body Awareness:",
      "Posture and Alignment",
    ],
    learnHref: "/our-packages/the-ultimate-stretch",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/1eL0wBvy6QlrEYcrRiUL",
  },
  {
    id: "de-compression-recovery-stack",
    name: "The De-Compression Recovery Stack",
    price: 120,
    duration: "20 minutes",
    lead: "Designed to help you feel refreshed and ready to tackle whatever comes next.",
    points: [
      "Deep Muscle Release",
      "Combat Fluid Retention and Discomfort",
      "Optimize Blood Flow",
      "Alleviate Muscular Exhaustion",
      "Boost Physical Capabilities",
      "Mindful Recovery Moment",
    ],
    learnHref: "/our-packages/rapid-rejuvenation",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/fJB3aF0ZBoQN7J71CXSI",
  },
  {
    id: "led-red-light-therapy",
    name: "LED Red Light Therapy - Photobiomodulation",
    price: 49,
    duration: "14 minutes",
    lead: "We use a 9-Wavelength Spectrum (480nm – 1060nm) delivered by 432 dual-chip LEDs",
    points: [
      "Medical Grade Precision",
      "Extreme Irradiance",
      "The 1060nm Advantage",
      "Clinical Safety",
    ],
    learnHref: "/our-packages/red-light-therapy-benefits",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/MVTOqV0wwbLnoUZ06noD",
  },
  {
    id: "photobiotic-44",
    name: "Photobiotic Assisted Stretching™",
    price: 120,
    duration: "44 minutes",
    lead: "14min Photobiomodulation + 30min Assisted Stretch",
    body: "This high-efficiency session for the busy professional. This “bio-stack” delivers the mobility benefits of a 60-minute traditional stretch in nearly half the time. Perfect for targeted maintenance on specific problem areas.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/Np4aiALLxmETjKHHI9X7",
  },
  {
    id: "photobiotic-59",
    name: "Photobiotic Assisted Stretching™",
    price: 145,
    duration: "59 minutes",
    lead: "14min Photobiomodulation + 45min Assisted Stretch",
    body: "Our signature service for full-body structural overhaul. With 9-wavelength priming, we navigate through deep-seated tension in the posterior chain. Leave feeling taller, lighter, and biologically recharged.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/g7agUXJEYdlWoNKTrNp5",
  },
  {
    id: "photobiotic-74",
    name: "Photobiotic Assisted Stretching™",
    price: 165,
    duration: "1hr 14 minutes",
    lead: "14 min Photobiomodulation + 1 hr Assisted Stretch",
    body: "The total system reboot. This is for those who demand peak performance. 60 minutes of deep fascia work combined with our medical-grade 7/7 protocol ensures every major joint and muscle group is optimized. Zero downtime. Zero soreness.",
    learnHref: "/our-packages/photobiotic-assisted-stretching",
    bookHref: "https://api.leadconnectorhq.com/widget/booking/yFwfXTYH74zpcsKc2Vdv",
  },
];

/**
 * The sessions shown in three tabbed folders. The tab shows the range of
 * session lengths; the title names the kind of session.
 */
export const SESSION_GROUPS = [
  {
    id: "stretch",
    tab: "30 – 60 minutes",
    title: "Assisted Stretch",
    sessionIds: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  },
  {
    id: "recovery",
    tab: "14 – 20 minutes",
    title: "Recovery",
    sessionIds: ["de-compression-recovery-stack", "led-red-light-therapy"],
  },
  {
    id: "photobiotic",
    tab: "44 – 74 minutes",
    title: "Photobiotic Assisted Stretching™",
    sessionIds: ["photobiotic-44", "photobiotic-59", "photobiotic-74"],
  },
] as const;

/* ───────────────────────── Intro (page H1) ───────────────────────── */

export const INTRO = {
  title: "Professional Assisted Stretching Perth",
  paragraphs: [
    "Unlock the benefits of professional assisted stretching in Perth with personalised sessions shaped around your body’s unique needs. Our qualified stretch therapists use targeted, evidence-based techniques to boost flexibility, improve mobility, and release built-up muscle tension. Whether you’re recovering from injury, dealing with tightness from training, or simply wanting to move with greater ease, our assisted stretching programs help restore balance and enhance overall performance.",
    "Every session is crafted to support better posture, reduce discomfort, and elevate your sense of wellbeing, leaving you feeling stronger, more relaxed, and ready to take on the day.",
  ],
  cta: { label: "Explore Packages", href: "/our-packages" },
};

/* ───────────────────────── CTA band ───────────────────────── */

export const CTA_BAND = {
  title: "Looking for Assisted Stretching?",
  cta: "Book Appointment",
};

/* ───────────────────────── Key benefits ───────────────────────── */

export type BenefitIcon = "range" | "release" | "posture" | "performance" | "shield" | "calm";

export const BENEFITS = {
  kicker: "Key Benefits",
  title: "Why Choose Assisted Stretching?",
  items: [
    {
      icon: "range",
      title: "Increased Flexibility and Range of Motion",
      body: "Experience a significant improvement in your ability to move freely and comfortably.",
    },
    {
      icon: "release",
      title: "Reduced Muscle Tension and Stiffness",
      body: "Release tightness and knots that can cause pain and discomfort.",
    },
    {
      icon: "posture",
      title: "Improved Posture and Alignment",
      body: "Enhance your body’s natural alignment for better balance and stability.",
    },
    {
      icon: "performance",
      title: "Enhanced Athletic Performance",
      body: "Increase your flexibility and range of motion to optimize your athletic performance and reduce the risk of injury.",
    },
    {
      icon: "shield",
      title: "Reduced Risk of Injury",
      body: "Improve muscle flexibility and strength, helping to prevent strains and other injuries.",
    },
    {
      icon: "calm",
      title: "Stress Reduction and Relaxation",
      body: "Enjoy a calming and therapeutic experience that promotes relaxation and reduces stress.",
    },
  ] satisfies { icon: BenefitIcon; title: string; body: string }[],
};

/* ───────────────────────── Your first session ───────────────────────── */

export const FIRST_SESSION = {
  kicker: "Your First Session",
  title: "What to Expect",
  steps: [
    {
      title: "Quick Chat to Understand Your Needs",
      body: "We’ll start with a friendly chat to learn about your goals, lifestyle, and any areas of tightness, discomfort, or previous injuries. This helps us tailor the session specifically to your body’s needs.",
    },
    {
      title: "Guided Stretching with Expert Support",
      body: "You’ll be guided through a series of assisted stretches led by a fully certified stretch therapist. Each movement is carefully designed to increase flexibility, release tension, and restore balance.",
    },
    {
      title: "Real-Time Adjustments for Safety and Results",
      body: "Your therapist will make continuous adjustments throughout your session to ensure proper alignment and maximum benefit, so you feel safe, supported and fully relaxed from start to finish.",
    },
    {
      title: "Personalised Aftercare Tips",
      body: "Before you leave, you’ll receive simple aftercare advice, including stretches and mobility exercises you can do at home to maintain your results between sessions.",
    },
  ],
  closing: [
    "You’ll walk out feeling looser, lighter and more mobile, with noticeably reduced tension and improved range of motion.",
    "All fitness levels are welcome, and no prior experience is needed. Whether you’re recovering from training, improving posture or simply wanting to move better, our team of qualified stretch therapists will make sure your first session is comfortable, effective and enjoyable.",
  ],
  cta: "Book Appointment",
};

/* ───────────────────────── Google reviews ───────────────────────── */

export const REVIEWS = {
  business: "StretchFlex",
  rating: 5,
  countLabel: "7 Google reviews",
  writeReview: {
    label: "Write a review",
    href: "https://search.google.com/local/writereview?placeid=ChIJeVqjE9GlMioRGoEGr-Y4_WI",
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
  body: "We’re conveniently located in Perth CBD, with easy appointment times that fit your life. Whether you want to drop in before work, unwind after the gym, or recharge on your lunch break, we make looking after your body simple and stress-free.",
  address: "111 Trinity Arcade, 72 St Georges Terrace, Perth CBD, WA 6000",
  hours: ["Mon-Fri, 8:30 am–5.30 pm", "Sat, By Appointment Only", "Sun, Closed"],
  cta: "Book Appointment",
  mapSrc: "https://maps.google.com/maps?q=StretchFlex&t=m&z=12&output=embed&iwloc=near",
};

/* ───────────────────────── Footer ───────────────────────── */

export const FOOTER = {
  columns: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "Other Links",
      links: [
        { label: "Book Your Sessions", href: "/book-your-session" },
        { label: "First Time Visitors", href: "/first-time-visitors" },
        { label: "Membership", href: "/membership" },
        { label: "Refund and Cancellation Policy", href: "/refund-and-cancellation-policy" },
      ],
    },
    {
      title: "Our Packages",
      links: [
        { label: "The Revive Stretch Session", href: "/our-packages/the-revive-stretch-session" },
        { label: "The Prime Mobility Stretch Sessions", href: "/our-packages/the-prime-mobility-stretch-session" },
        { label: "The Ultimate Stretch Session", href: "/our-packages/the-ultimate-stretch" },
        { label: "Rapid Rejuvenaton", href: "/our-packages/rapid-rejuvenation" },
      ],
    },
  ],
  copyright: "© 2026 StretchFLEX. All Rights Reserved",
  credit: { label: "Made with ❤️", href: "https://dmhq.au/" },
};

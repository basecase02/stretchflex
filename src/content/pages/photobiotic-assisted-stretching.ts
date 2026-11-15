import { BOOK_URL } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/**
 * /our-packages/photobiotic-assisted-stretching
 * Copy from the client's content document (StretchFLEX Website Content,
 * 14 November 2026). Booking buttons come from SESSIONS in
 * src/content/site.ts: one per session length.
 */
export const page: PageContent = {
  seo: {
    title: "Photobiotic Assisted Stretching™ | Stretching + Red Light Perth",
    description:
      "Assisted stretching combined with professional-grade red and near-infrared light. 44, 59 or 74 minutes, one-on-one in Perth CBD. From $120.",
    ogTitle: "Photobiotic Assisted Stretching™ | StretchFLEX Perth",
    ogDescription:
      "Light, then stretch, then light. Our signature session pairs assisted stretching with professional-grade photobiomodulation.",
  },
  sessions: ["photobiotic-44", "photobiotic-59", "photobiotic-74"],
  bookingTitle: "Photobiotic Assisted Stretching™",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "Our signature session",
      title: "Photobiotic Assisted",
      accent: "Stretching™",
      intro:
        "Assisted stretching paired with professional-grade red and near-infrared light. A 7-minute light prime before your stretch, a 7-minute light flush after, and nothing like it anywhere else in Perth CBD.",
      trust: ["Three session lengths", "14 minutes of light every session", "One-on-one", "Perth CBD"],
      image: {
        src: u("2026/06/StretchFLEX-123.webp"),
        alt: "Client relaxing between StretchFLEX twin red light panels before an assisted stretch",
        position: "50% 45%",
      },
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      title: "Light, stretch, light",
      hand: "stretch",
      lead: "Photobiomodulation uses specific wavelengths of red and near-infrared light. In Photobiotic Assisted Stretching™ we use it on both sides of your stretch:",
      image: {
        src: "/images/stretch/stretch-strap.jpg",
        alt: "A therapist using a strap to guide a client's legs through an assisted stretch",
      },
      items: [
        {
          title: "The light prime (7 minutes)",
          body: "You relax between our twin light panels before your stretch begins. Clients describe a gentle internal warmth, not sauna heat.",
        },
        {
          title: "The assisted stretch (30, 45 or 60 minutes)",
          body: "Your therapist guides you through targeted stretches, adjusted to your body in real time.",
        },
        {
          title: "The light flush (7 minutes)",
          body: "A final light session to finish, before you head back to your day.",
        },
      ],
    },
    {
      type: "table",
      id: "sessions",
      title: "Choose your session",
      hand: "session",
      head: ["Session", "Light + stretch", "Total", "Price"],
      rows: [
        ["The Rapid Reset", "14 min + 30 min", "44 min", "$120"],
        ["The Performance Protocol", "14 min + 45 min", "59 min", "$145"],
        ["The Architectural Overhaul", "14 min + 60 min", "74 min", "$165"],
      ],
      footnote: [
        "**The Rapid Reset.** A focused session for busy professionals who want maximum effect in under an hour.",
        "**The Performance Protocol.** Our most popular choice: time to work through several areas, with light before and after.",
        "**The Architectural Overhaul.** The complete experience: a full-body stretch with light on both sides.",
      ],
      // A general booking button: replaced with one button per session length.
      actions: [{ label: "Book your session", href: BOOK_URL }],
    },
    {
      type: "checklist",
      tone: "sky",
      title: "The technology",
      hand: "technology",
      items: [
        { body: "Twin-panel system with 432 dual-chip LEDs" },
        { body: "Nine wavelength bands across 480 to 1060 nm, including deep near-infrared" },
        { body: "Output of at least 183.1 mW/cm² in every 7-minute window" },
      ],
    },
    {
      type: "split",
      title: "Who it is for",
      hand: "for",
      image: {
        src: "/images/stretch/stretch-quad-prone.jpg",
        alt: "A StretchFLEX therapist guiding a client through an assisted quad stretch",
        position: "40% 50%",
      },
      list: [
        "Active people who want more from their stretching and recovery",
        "Desk workers carrying long-held tightness",
        "Anyone curious about light technology who wants it paired with hands-on care",
      ],
    },
    {
      type: "checklist",
      title: "Getting ready",
      hand: "ready",
      items: [
        { body: "Wear light-coloured activewear. Denim and dark, heavy fabrics block the light." },
        { body: "Bring a clean, unworn pair of socks (compulsory). Grip socks are $15 at reception." },
        { body: "Drink water in the hour before your session." },
        { body: "Arrive 5 to 10 minutes early." },
      ],
    },
    {
      type: "text",
      tone: "sky",
      title: "Make it a weekly habit",
      hand: "habit",
      body: [
        "Our Performance & Recovery Memberships include two Photobiotic Assisted Stretching™ sessions and a De-Compression Recovery Stack every week, from $250 and saving up to $120 a week.",
      ],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      type: "accordion",
      tone: "rose",
      title: "Your questions, answered",
      hand: "answered",
      items: [
        {
          title: "What is photobiomodulation?",
          body: "Photobiomodulation is the use of specific wavelengths of red and near-infrared light on the body. It is the professional term for what is often called red light therapy.",
        },
        {
          title: "Does it feel hot?",
          body: "No. Most clients feel a gentle warmth, much milder than a sauna.",
        },
        {
          title: "Why light before and after the stretch?",
          body: "The prime prepares you to relax into your stretch, and the flush gives you a calm finish before you return to your day.",
        },
        {
          title: "Is it safe for everyone?",
          body: "Light therapy isn't suitable for everyone. Please tell us if you are pregnant, have a light-sensitive condition, take medication that increases sensitivity to light, have epilepsy, or have a history of skin cancer. We run through a short safety check before your first session.",
        },
        {
          title: "Can I book light on its own?",
          body: "Yes. [LED Red Light Therapy](/our-packages/red-light-therapy-perth) is available as a 14-minute session for $49.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy): full refund with 48 hours notice, 50% with 24 to 48 hours, and no refund under 24 hours.",
        },
      ],
    },
    {
      type: "cta",
      title: "Light. Stretch. Light.",
      hand: "Stretch.",
      body: ["Experience Perth's signature stretching and light session.", "Questions first? Call [0432 569 077](tel:0432569077)"],
    },
  ],
};

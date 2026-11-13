import { SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;
/** A session's own booking link (SESSIONS in src/content/site.ts). */
const book = (id: string) => SESSIONS.find((s) => s.id === id)!.bookHref!;

/**
 * /our-packages/red-light-therapy-benefits
 * Short and scannable on the shared service-page template: hook, why it works,
 * the session in three steps, sessions and packages, who it's for, quick
 * answers, booking band. Facts and prices are the live page's.
 */
export const page: PageContent = {
  sessions: [
    "led-red-light-therapy",
  ],
  bookingTitle: "LED Red Light Therapy",
  blocks: [
    {
      type: "hero",
      crumbs: [
        {
          label: "Our Packages",
          href: "/our-packages",
        },
      ],
      kicker: "Recharge. Recover. Perform.",
      title: "NEW Red Light LED Therapy",
      accent: "in The Perth CBD",
      intro: "Professional-grade photobiomodulation that fuels your body’s natural recovery at a cellular level. Not a home panel. Not a salon treatment.",
      image: {
        src: u("2026/06/Red-light-therapy-Perth.jpg"),
        alt: "A client with her eyes closed in front of a glowing red light therapy panel",
        position: "50% 40%",
      },
    },
    {
      type: "cards",
      kicker: "Why StretchFLEX is different",
      title: "Not your average red light",
      hand: "average",
      items: [
        {
          title: "9 wavelengths, 432 LEDs",
          body: "A 480–1060nm spectrum targets skin, muscle, fascia and joints. Most panels use two.",
        },
        {
          title: "Medical-grade precision",
          body: "TGA and FDA registered (Class IIa), built to clinical standards.",
        },
        {
          title: "Extreme irradiance",
          body: "≥ 183.1 mW/cm² delivers a meaningful dose in every 7-minute window. Less waiting, more impact.",
        },
        {
          title: "The 1060nm advantage",
          body: "Deep near-infrared reaches dense fascia and large muscle groups other systems can’t.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
      kicker: "14 minutes",
      title: "How your session works",
      hand: "works",
      image: {
        src: u("2026/06/StretchFLEX-123.webp"),
        alt: "A client standing between two red light therapy panels",
        position: "50% 45%",
      },
      items: [
        {
          title: "Step into the light",
          body: "Relax between our twin medical-grade panels. Zero EMF and flicker-free.",
        },
        {
          title: "Your cells power up",
          body: "Nine wavelengths stimulate your mitochondria, the “power stations” of your cells.",
        },
        {
          title: "Recover, then move",
          body: "Pair it with assisted stretching for flexibility, recovery and less muscle tightness.",
        },
      ],
    },
    {
      type: "offers",
      id: "sessions",
      kicker: "Book your light",
      title: "Choose your session",
      hand: "session",
      items: [
        {
          name: "LED Red Light Therapy",
          badge: "14 min",
          price: "$49",
          detail: "Twin panels, 9 wavelengths, 432 dual-chip LEDs",
          action: {
            label: "Book now",
            href: book("led-red-light-therapy"),
          },
        },
        {
          name: "Photobiotic Assisted Stretching™",
          tag: "Light + stretch",
          badge: "44–74 min",
          price: "From $120",
          detail: "Red light stacked with an assisted stretch",
          action: {
            label: "See sessions",
            href: "/our-packages/photobiotic-assisted-stretching",
          },
        },
      ],
    },
    {
      type: "checklist",
      title: "Who it’s for",
      hand: "for",
      items: [
        {
          body: "Office workers sitting long hours",
        },
        {
          body: "Athletes and fitness enthusiasts",
        },
        {
          body: "Active adults staying flexible",
        },
        {
          body: "Anyone with tight muscles",
        },
        {
          body: "People focused on healthy ageing",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      title: "Quick answers",
      hand: "answers",
      items: [
        {
          title: "What does red light therapy do?",
          body: "Specific wavelengths help your cells produce energy more efficiently, supporting recovery, circulation and mobility.",
        },
        {
          title: "Is it safe?",
          body: "Our system is TGA and FDA registered (Class IIa), with zero EMF and flicker-free operation.",
        },
        {
          title: "How is it different from a home panel?",
          body: "Most consumer devices use one or two wavelengths and lower output. Ours delivers 9 wavelengths at ≥ 183.1 mW/cm².",
        },
        {
          title: "Can I combine it with stretching?",
          body: "Yes. Photobiotic Assisted Stretching stacks red light with an assisted stretch in one session.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your recovery starts here",
      hand: "here",
      body: "432 dual-chip LEDs, 9 wavelengths, 14 minutes.",
    },
  ],
};

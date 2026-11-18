import { createElement } from "react";
import { Shorts } from "@/components/pages/video/shorts";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/**
 * /our-packages/red-light-therapy-perth
 * (was /our-packages/red-light-therapy-benefits, which now redirects here)
 * Copy from the client's content document (StretchFLEX Website Content,
 * 14 November 2026). Booking buttons come from SESSIONS in
 * src/content/site.ts.
 */
export const page: PageContent = {
  // The live page's SEO, at the new address.
  seoFrom: "/our-packages/red-light-therapy-benefits",
  seoRename: [["red-light-therapy-benefits", "red-light-therapy-perth"]],
  sessions: ["led-red-light-therapy"],
  bookingTitle: "LED Red Light Therapy",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      kicker: "New in Perth CBD",
      title: "LED Red Light",
      accent: "Therapy",
      intro:
        "Fourteen minutes between our professional-grade twin light panels. Nine wavelengths of red and near-infrared light, in a calm, private room in the heart of the city.",
      image: {
        src: u("2026/06/Red-light-therapy-Perth.jpg"),
        alt: "StretchFLEX twin-panel LED red light therapy system in the Perth CBD studio",
        position: "50% 40%",
      },
    },
    {
      type: "cards",
      title: "Not your average light panel",
      hand: "average",
      items: [
        {
          title: "Nine wavelength bands",
          body: "Our system covers 480 to 1060 nm across nine bands, including deep near-infrared.",
        },
        {
          title: "432 dual-chip LEDs",
          body: "Twin panels deliver light to the front and back of your body at the same time.",
        },
        {
          title: "High output",
          body: "At least 183.1 mW/cm² in every 7-minute window.",
        },
      ],
    },
    {
      type: "accordion",
      tone: "rose",
      numbered: true,
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
          body: "Relax between the two panels in a private room.",
        },
        {
          title: "Fourteen minutes",
          body: "Two 7-minute light windows while you breathe and unwind.",
        },
        {
          title: "Back to your day",
          body: "No changing out of the room needed, and nothing to recover from.",
        },
      ],
    },
    {
      // Shorts from the StretchFLEX YouTube channel (sent by the client, 15 November 2026).
      type: "node",
      node: createElement(Shorts, {
        kicker: "Watch",
        title: "Experts on red light therapy",
        handWord: "light",
        lead: "Short videos from the StretchFLEX channel.",
        items: [
          { id: "Fbc8rnUi3tE", title: "Gary Brecka on red light therapy and oxygen" },
          { id: "UlKNzZoF7e4", title: "Dr Daniel Barrett on red light therapy for healing and recovery" },
          { id: "FcY3iXQYrVQ", title: "Gary Brecka on red light therapy and biohacking" },
          { id: "jO5fVbz2XS8", title: "Dr Reza Tirgari on red light therapy and skin regeneration" },
          { id: "Ub7_XLFVECU", title: "Dr Leena Ramani on red light therapy and whole-body recovery" },
        ],
      }),
    },
    {
      type: "checklist",
      title: "Who it is for",
      hand: "for",
      items: [
        { body: "Office workers wanting a midday reset" },
        { body: "Athletes and active people building recovery into their week" },
        { body: "Anyone curious about light therapy who wants a professional-grade system" },
      ],
    },
    {
      type: "text",
      tone: "sky",
      title: "Pair it with a stretch",
      hand: "stretch",
      body: [
        "Photobiotic Assisted Stretching™ combines the same light system with an assisted stretch: light before, stretch, light after. From $120.",
      ],
      actions: [
        { label: "Explore Photobiotic Assisted Stretching™", href: "/our-packages/photobiotic-assisted-stretching" },
      ],
    },
    {
      type: "accordion",
      faq: true,
      tone: "rose",
      title: "Red light therapy questions, answered",
      hand: "answered",
      items: [
        {
          title: "What is red light therapy?",
          body: "Red light therapy, also called photobiomodulation, uses specific wavelengths of red and near-infrared light on the body.",
        },
        {
          title: "How is this different from a home panel?",
          body: "Our professional system uses nine wavelength bands, twin panels and high output, in a session delivered in a dedicated studio.",
        },
        {
          title: "Does it feel hot?",
          body: "No. Most people feel a gentle warmth.",
        },
        {
          title: "What should I wear?",
          body: "Light-coloured activewear or as directed by your therapist. Dark, heavy fabrics block the light.",
        },
        {
          title: "Is it safe for everyone?",
          body: "Light therapy isn't suitable for everyone. Please tell us if you are pregnant, have a light-sensitive condition, take medication that increases sensitivity to light, have epilepsy, or have a history of skin cancer. We run through a short safety check before your first session.",
        },
        {
          title: "What if I need to cancel?",
          body: "Cancellations follow our [Refund and Cancellation Policy](/refund-and-cancellation-policy): full refund with 48 hours notice, 50% with 24 to 48 hours, and no refund under 24 hours.",
        },
      ],
    },
    {
      type: "cta",
      title: "Fourteen minutes. Fully recharged.",
      hand: "recharged.",
      body: "Questions first? Call [0432 569 077](tel:0432569077)",
    },
  ],
};

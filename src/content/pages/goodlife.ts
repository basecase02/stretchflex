import "@/styles/utility.css";
import { createElement } from "react";
import { RatesTable } from "@/components/pages/utility/rates-table";
import { BOOK_URL } from "@/content/site";
import type { PageContent } from "./types";

/*
 * /goodlife — the Goodlife Brookfield launch offer (a partner landing page).
 * Every button on the live page links to "#"; here they keep their live
 * labels and jump to the offer or go to online booking. No photos, as live.
 */
const BOOK = BOOK_URL;

export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      kicker: "Trinity Arcade Launch",
      title: "Built for women who train hard and",
      accent: "recover smarter.",
      facts: ["50% Off for New Members", "30% Off for Existing Members", "All Products & Services", "Location — Perth CBD"],
      intro:
        "To celebrate our Perth CBD launch at Trinity Arcade, StretchFLEX and Goodlife Brookfield are bringing you an exclusive members offer — because the women who push hardest deserve the best recovery.",
      actions: [
        { label: "See My Offer", href: "#offer" },
        { label: "What's Included", href: "#included", tone: "line" },
      ],
    },
    {
      type: "offers",
      id: "offer",
      items: [
        {
          tag: "New Goodlife Members",
          name: "Joined Goodlife recently? This is your welcome.",
          price: "50%",
          detail: "Off Everything",
          body: "All new female members of Goodlife Brookfield receive 50% off every StretchFLEX product and service as part of our Perth CBD launch. Assisted stretching, Bio-Stacking, Triple Recovery Protocol, retail — the full offering, half the price.",
          action: { label: "Claim 50% Off →", href: BOOK },
        },
        {
          tag: "Existing Goodlife Members",
          name: "Already part of the Goodlife family? This one's for you.",
          price: "30%",
          detail: "Off Everything",
          body: "Existing female Goodlife Brookfield members receive 30% off every StretchFLEX product and service — a loyalty thank-you as we open our doors at Trinity Arcade. Your training deserves a full recovery system.",
          action: { label: "Claim 30% Off →", href: BOOK },
        },
      ],
    },
    {
      type: "cards",
      tone: "rose",
      items: [
        { meta: "Recovery Partner", title: "Stretch FLEX", body: "Shop 111, Trinity Arcade · 72 St Georges Terrace, Perth CBD" },
        { meta: "Fitness Partner", title: "Goodlife Brookfield", body: "Brookfield Place · Perth WA" },
      ],
      actions: [
        { label: "Perth CBD Launch", href: "#offer", tone: "line" },
        { label: "Claim Your Offer", href: BOOK },
      ],
    },
    {
      type: "cards",
      id: "included",
      kicker: "What's Included",
      title: "Every product. Every service. Your discount applies.",
      hand: "Your",
      lead: "This is not a limited offer on one treatment. Your Goodlife member discount applies across the entire StretchFLEX offering — from your first assisted stretch to our most advanced Bio-Stacking protocol.",
      items: [
        { meta: "Assisted Stretch", title: "High-Performance Assisted Stretching", body: "PNF-facilitated full-body stretch sessions with dedicated practitioners. Deeper range, faster adaptation, zero effort on your part." },
        { meta: "Bio-Stacking", title: "The 7/7 Protocol — PBM + Stretch", body: "TGA-approved 9-wavelength Photobiomodulation paired with assisted stretching. Cellular priming before the work begins, ATP flush to close." },
        { meta: "Triple Protocol", title: "Triple Recovery Protocol", body: "20-minute simultaneous session — Mindfulness & Breathwork, Vagus Nerve Stimulation, and Compression Boot Recovery running together." },
        { meta: "Compression", title: "Compression Boot Recovery", body: "Sequential pneumatic compression for lymphatic flush, DOMS clearance, and full-leg circulation reset after hard training sessions." },
        { meta: "Red Light Therapy", title: "TGA-Approved PBM Panel", body: "9-wavelength panel including industry-exclusive 1060nm deep infrared. Skin rejuvenation, pain relief, and recovery acceleration. ARTG #452667." },
        { meta: "Retail & Add-Ons", title: "All Retail Products & Upgrades", body: "Recovery supplements, add-on modalities, session upgrades, and all clinic retail products. Your discount applies to everything, no exceptions." },
      ],
    },
    {
      type: "accordion",
      numbered: true,
      kicker: "How to Redeem",
      title: "Three steps to your first session.",
      hand: "first",
      lead: "Redeeming your Goodlife member offer takes less than two minutes. No voucher codes, no complicated sign-up — just show your membership at the clinic and your discount is applied immediately.",
      items: [
        { title: "Book Online or Walk In", body: "Visit stretchflex.com.au to book your first session, or walk directly into Shop 111, Trinity Arcade. Same-week availability for all new clients." },
        { title: "Show Your Goodlife Membership", body: "Present your Goodlife Brookfield membership at reception — digital or physical. Our team will verify your membership status (new or existing) and apply your discount on the spot." },
        { title: "New Members — 50% Off Instantly", body: "If you joined Goodlife recently, your 50% discount applies immediately across all services and products at today’s session and beyond for the promotional period." },
        { title: "Existing Members — 30% Off Instantly", body: "Long-standing Goodlife Brookfield members receive their 30% discount applied to all services and retail on every visit throughout the launch promotional period." },
      ],
    },
    {
      type: "node",
      node: createElement(RatesTable, {
        kicker: "Your Discount at a Glance",
        title: "Every service. Your rate.",
        handWord: "Your",
        head: ["Service / Product", "New Members — 50% Off", "Existing Members — 30% Off"],
        rows: [
          ["Assisted Stretch — 45 min", "$75 (was $150)", "$105 (was $150)"],
          ["Bio-Stacking 7/7 Protocol — 60 min", "From $95", "From $133"],
          ["Triple Recovery Protocol — 20 min", "50% Off", "30% Off"],
          ["Red Light Therapy Panel Session", "50% Off", "30% Off"],
          ["Compression Boot Recovery", "50% Off", "30% Off"],
          ["All Retail Products & Upgrades", "50% Off", "30% Off"],
          ["10-Session Performance Pack", "50% Off", "30% Off"],
        ],
      }),
    },
    {
      type: "text",
      tone: "navy",
      title: "Your training deserves a recovery system equal to your ambition.",
      hand: "ambition.",
      body: [
        "Show your Goodlife Brookfield membership at StretchFLEX Trinity Arcade and your discount is applied immediately. No codes. No friction. Just recovery.",
      ],
      list: ["Shop 111, Trinity Arcade", "72 St Georges Terrace, Perth CBD", "TGA-Approved · ARTG #452667", "No Lock-In Required"],
      after: ["Perth CBD Launch Offer · Trinity Arcade · Terms apply · Goodlife Brookfield members only"],
      actions: [
        { label: "Book My First Session", href: BOOK, tone: "light" },
        { label: "Walk In — Trinity Arcade", href: "/contact-us", tone: "line" },
      ],
    },
  ],
};

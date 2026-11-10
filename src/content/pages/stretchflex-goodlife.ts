import type { PageContent } from "./types";

/** /stretchflex-goodlife — the permanent 20% Goodlife Brookfield Place member offer (a partner landing page). */
const BOOK = { label: "View Sessions and Book", href: "https://www.stretchflex.com.au" };

export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      kicker: "Permanent Member Privilege",
      title: "Your training just gained an",
      accent: "unfair edge.",
      facts: ["20% Off Every Visit", "Goodlife Brookfield Place"],
      intro: [
        "A permanent performance upgrade, reserved exclusively for Goodlife Brookfield Place members.",
        "**Exclusive Member Discount · All Sessions · Always**",
      ],
      actions: [BOOK],
    },
    {
      type: "text",
      kicker: "StretchFLEX Perth",
      title: "Goodlife Brookfield Place Members,",
      hand: "Members,",
      body: [
        "Your commitment to training deserves an equally serious commitment to recovery. That is why Goodlife has partnered with **StretchFLEX Perth**, the city's most advanced assisted recovery clinic, to give you a permanent performance advantage that most athletes never access.",
        "From today, every Goodlife Brookfield Place member receives a permanent **20% discount on all StretchFLEX sessions**. Not a limited-time offer. Not a trial. A standing privilege, available every time you book, for as long as your membership is active.",
        "StretchFLEX is not a recovery option you add when something goes wrong. It is the layer that keeps everything performing at its best. The members who train the hardest are the ones who benefit most.",
      ],
    },
    {
      type: "text",
      tone: "navy",
      kicker: "The StretchFLEX Difference",
      body: [
        "\"Where other recovery methods work around your body, Photobiotic Assisted Stretching works inside it. Medical-grade light prepares the tissue before the stretch begins. What your therapist can access, and what your body can release, changes completely.\"",
      ],
    },
    {
      type: "cards",
      tone: "rose",
      kicker: "Bio-Stack Protocol",
      title: "What You Gain From Every Session",
      hand: "Gain",
      items: [
        { title: "Greater Range of Motion", body: "Medical-grade light softens the fascial matrix before the stretch begins, allowing your therapist to access depths that cold tissue simply cannot provide." },
        { title: "Accelerated Recovery", body: "The Metabolic Flush drives ATP production immediately post-stretch. Soreness is virtually eliminated. You are ready to train again the same day." },
        { title: "Sustained Performance", body: "Regular bio-stacking maintains structural integrity across training cycles, reducing injury risk and extending the longevity of your performance output." },
        { title: "Training Efficiency", body: "Tissue that moves freely recruits muscle more effectively. Sessions at StretchFLEX directly translate to more productive training in the gym." },
      ],
    },
    {
      type: "offers",
      kicker: "20% Off Every Visit",
      title: "Your Sessions at Member Rate",
      hand: "Member",
      items: [
        { name: "The Rapid Reset", detail: "44 minutes", price: "$96", was: "$120", action: BOOK },
        { tag: "Most Requested", name: "The Performance Protocol", detail: "59 minutes", price: "$116", was: "$145", action: BOOK },
        { name: "The Architectural Overhaul", detail: "74 minutes", price: "$132", was: "$165", action: BOOK },
      ],
    },
    {
      type: "text",
      kicker: "How to Redeem",
      title: "One Step: Show. Book. Done.",
      hand: "Done.",
      tone: "rose",
      body: [
        "Simply show your Goodlife App or key tag at your appointment. Your 20% member rate is applied automatically, every time, with no codes or vouchers required.",
        "The members who recover well are the ones who keep improving. Book your first session at your member rate and experience the difference that prepared tissue makes to every session that follows.",
      ],
      actions: [BOOK],
      after: [
        "stretchflex.com.au · Trinity Arcade, Perth CBD",
        "We look forward to becoming a consistent part of how you train and recover.",
        "**The StretchFLEX Team**",
        "StretchFLEX Perth · In partnership with Goodlife Brookfield Place",
        "Shop 111, Trinity Arcade · 72 St Georges Terrace, Perth WA 6000 TGA Class IIa Medical Device · FDA Registered · EMF Output: 0.0 μT",
      ],
    },
  ],
};

import { SESSIONS } from "@/content/site";

/**
 * What can be given: Signature Experiences (a named session at its live price)
 * or a gift value in dollars. Shared by the gift page and the gift API, so the
 * price charged is always the price shown.
 */

export const GIFT_VALIDITY_MONTHS = 36;
export const GIFT_VALUES = [150, 200, 250, 330];

/**
 * Each gift is issued in Acuity (Packages, Gifts & Subscriptions) under the
 * matching private product, with our code, so it can be redeemed when booking
 * online. Acuity can't make a code for an arbitrary amount, so the custom
 * amounts are the values that have a product.
 */
export const ACUITY_EXPERIENCE_PRODUCTS: Record<string, number> = {
  "revive-stretch": 2321304,
  "prime-mobility-stretch": 2321306,
  "ultimate-stretch": 2321307,
  "photobiotic-44": 2321308,
  "photobiotic-59": 2321309,
  "photobiotic-74": 2321310,
  "de-compression-recovery-stack": 2321311,
};
export const ACUITY_VALUE_PRODUCTS: Record<number, number> = {
  50: 2321321, 100: 2321322, 150: 2321312, 200: 2321313, 250: 2321314, 300: 2321323, 330: 2321315,
  350: 2321325, 400: 2321326, 450: 2321327, 500: 2321328, 600: 2321329, 750: 2321330, 1000: 2321331,
};
/** The amounts offered under "Custom amount". */
export const CUSTOM_AMOUNTS = Object.keys(ACUITY_VALUE_PRODUCTS).map(Number).filter((v) => !GIFT_VALUES.includes(v));

export const acuityProductFor = (choice: GiftChoice): number | null =>
  choice.kind === "experience" ? ACUITY_EXPERIENCE_PRODUCTS[choice.id] ?? null : ACUITY_VALUE_PRODUCTS[Math.round(Number(choice.amount))] ?? null;

export type GiftExperience = {
  id: string;
  name: string;
  price: number;
  minutes: number;
  /** Line under the name on the certificate. */
  detail: string;
  /** Group label on the gift page. */
  group: "Assisted stretching" | "Photobiotic stretching" | "Recovery";
  lead: string;
  learnHref: string;
};

const DETAIL: Record<string, [GiftExperience["group"], string]> = {
  "revive-stretch": ["Assisted stretching", "30-minute assisted stretch"],
  "prime-mobility-stretch": ["Assisted stretching", "45-minute assisted stretch"],
  "ultimate-stretch": ["Assisted stretching", "60-minute assisted stretch"],
  "photobiotic-44": ["Photobiotic stretching", "44-minute Photobiotic assisted stretch"],
  "photobiotic-59": ["Photobiotic stretching", "59-minute Photobiotic assisted stretch"],
  "photobiotic-74": ["Photobiotic stretching", "74-minute Photobiotic assisted stretch"],
  "de-compression-recovery-stack": ["Recovery", "20-minute De-Compression Recovery Stack"],
};

export const GIFT_EXPERIENCES: GiftExperience[] = SESSIONS.filter((s) => DETAIL[s.id]).map((s) => ({
  id: s.id,
  name: s.name,
  price: s.price,
  minutes: parseInt(s.duration, 10),
  group: DETAIL[s.id][0],
  detail: DETAIL[s.id][1],
  lead: s.lead,
  learnHref: s.learnHref,
}));

export type GiftChoice = { kind: "experience"; id: string } | { kind: "value"; amount: number };

/** The certificate's title and detail line, and the price, for a choice (null if it isn't valid). */
export function describe(choice: GiftChoice): { title: string; detail: string; price: number } | null {
  if (choice.kind === "experience") {
    const e = GIFT_EXPERIENCES.find((x) => x.id === choice.id);
    return e ? { title: e.name, detail: e.detail, price: e.price } : null;
  }
  const amount = Math.round(Number(choice.amount));
  if (!ACUITY_VALUE_PRODUCTS[amount]) return null;
  return { title: `$${amount.toLocaleString("en-AU")}`, detail: "StretchFLEX credit towards any session", price: amount };
}

/** "18 November 2029" for a date `months` after `from`, in Perth time. */
export function validUntil(from: Date, months = GIFT_VALIDITY_MONTHS): string {
  const d = new Date(from);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Perth" });
}

/** A sample certificate for the page preview. */
export const SAMPLE_CODE = "SFX••••••••";

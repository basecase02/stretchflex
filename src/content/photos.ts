import type { Img } from "@/content/blocks";

/**
 * The studio photos the inner pages share, at their original WordPress paths
 * in /public. Pick from these so the same moment is not repeated twice on
 * one page.
 */
const u = (path: string) => `/wp-content/uploads/${path}`;

export const PHOTOS = {
  /** The team at the studio front desk (a real photo, not the old AI image). */
  team: { src: "/images/team/stretchflex-team-reception.jpg", alt: "The StretchFLEX stretch therapy team at the front desk of their Perth studio", position: "52% 50%" },
  /** A therapist guiding a client through a knee-to-chest stretch. */
  knee: { src: u("2026/02/openart-image__cfe8QLq_1770268051809_raw.webp"), alt: "A StretchFLEX therapist guiding a client through an assisted leg stretch in Perth", position: "60% 50%" },
  /** A therapist assisting a client with a hip stretch. */
  hip: { src: u("2026/02/openart-image_b-UlVvty_1770267647921_raw.webp"), alt: "A stretch therapist assisting a client with a hip stretch at StretchFLEX", position: "57% 42%" },
  /** A seated client having a shoulder and arm stretch, smiling. */
  shoulder: { src: u("2026/03/StretchFLEX37.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder and arm", position: "55% 45%" },
  /** A client lying face down, arms drawn back into a back extension. */
  backExtension: { src: u("2026/03/StretchFLEX39.jpg"), alt: "A therapist guiding a client through an assisted back extension stretch", position: "45% 50%" },
  /** A client in compression boots with a VR headset, warm low light. */
  recovery: { src: u("2026/03/StretchFlex-47.jpg"), alt: "A client relaxing in compression recovery boots with a mindfulness headset at StretchFLEX", position: "50% 60%" },
  /** A quad stretch on the table in the dark studio. */
  quad: { src: u("2026/06/SF62.jpg"), alt: "A StretchFLEX therapist assisting a client with a quad stretch on the treatment table", position: "40% 50%" },
  /** The front desk: a therapist welcoming a client with a tablet. */
  reception: { src: u("2026/06/openart-image_f1Y6t1CT_1780474264127_raw.jpg"), alt: "A client checking in at the StretchFLEX front desk in Perth", position: "50% 45%" },
  /** A man holding his lower back (stock). */
  backPain: { src: u("2026/06/StretchHub-Assisted-Stretching-Lower-Back-Pain-Drug-Free.png"), alt: "A man holding his lower back in pain", position: "50% 40%" },
} satisfies Record<string, Img>;

/** The general booking link most pages use. */
export const BOOK_GROUP = "https://api.leadconnectorhq.com/widget/group/h2hOi4gQos4P5NH6z4Dz";

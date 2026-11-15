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
  knee: { src: "/images/stretch/stretch-quad-prone.jpg", alt: "A StretchFLEX therapist guiding a client through an assisted leg stretch in Perth", position: "40% 50%" },
  /** A therapist assisting a client with a hip stretch. */
  hip: { src: "/images/stretch/stretch-hip-extension.jpg", alt: "A stretch therapist assisting a client with a hip stretch at StretchFLEX", position: "45% 45%" },
  /** A seated client having a shoulder and arm stretch, smiling. */
  shoulder: { src: "/images/stretch/stretch-side-reach.jpg", alt: "A StretchFLEX therapist guiding a client through an assisted shoulder and side stretch", position: "55% 50%" },
  /** A client lying face down, arms drawn back into a back extension. */
  backExtension: { src: "/images/stretch/stretch-hip-extension.jpg", alt: "A therapist guiding a client through an assisted hip and back stretch", position: "45% 50%" },
  /** A client in compression boots with a VR headset, warm low light. */
  recovery: { src: u("2026/03/StretchFlex-47.jpg"), alt: "A client relaxing in compression recovery boots with a mindfulness headset at StretchFLEX", position: "50% 60%" },
  /** A quad stretch on the table in the dark studio. */
  quad: { src: "/images/stretch/stretch-quad-prone.jpg", alt: "A StretchFLEX therapist assisting a client with a quad stretch on the treatment table", position: "40% 50%" },
  /** The front desk: a therapist welcoming a client with a tablet. */
  reception: { src: "/images/team/stretchflex-team-reception.jpg", alt: "The StretchFLEX team at the front desk in Perth", position: "52% 50%" },
  /** A man holding his lower back (stock). */
  backPain: { src: u("2026/06/StretchHub-Assisted-Stretching-Lower-Back-Pain-Drug-Free.png"), alt: "A man holding his lower back in pain", position: "50% 40%" },
} satisfies Record<string, Img>;

/** The general booking link most pages use. */
export const BOOK_GROUP = "https://api.leadconnectorhq.com/widget/group/h2hOi4gQos4P5NH6z4Dz";

import { createElement } from "react";
import { BOOK_GROUP } from "@/content/photos";
import type { Block, Img } from "@/content/blocks";
import { ClosingSplit, PhotoCta } from "./template-sections";

/*
 * /risk-of-injury and /muscle-tension-and-stiffness are unfinished Elementor
 * template pages on the live site (noindex, not linked from anywhere): the
 * same placeholder headings and Lorem ipsum, with one real sentence each.
 * They are carried over as they are, with the same five photos in the same
 * sections; their "#" buttons now go to booking.
 */
const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";
const LOREM_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";
const HEADING = "Your Heading Text Here";
const BOOK = { label: "Book Appointment", href: BOOK_GROUP };

const u = (path: string) => `/wp-content/uploads/${path}`;
const PHOTOS = {
  /** First section background. */
  neck: { src: u("2025/11/BEP07667.webp"), alt: "A StretchFLEX therapist gently stretching a client's neck on the treatment table", position: "50% 40%" },
  /** Beside the first text. */
  lounge: { src: u("2025/11/Rapid-Rejuvenation.webp"), alt: "A client relaxing in a recovery lounge chair wearing a mindfulness headset", position: "45% 40%" },
  /** Beside the accordion. */
  shoulder: { src: u("2025/11/Membership-4.webp"), alt: "A therapist assisting a client with a shoulder stretch, a towel under her head", position: "50% 35%" },
  /** Behind "Looking for Assisted Stretching?". */
  head: { src: u("2025/11/Homepage.webp"), alt: "", position: "50% 35%" },
  /** Beside the closing lines. */
  release: { src: u("2025/12/BEP07668.webp"), alt: "A therapist releasing a client's neck with a rolled towel", position: "50% 40%" },
} satisfies Record<string, Img>;

export function benefitTemplate(title: string, lead: string): Block[] {
  return [
    { type: "hero", title, image: PHOTOS.neck },
    {
      type: "split",
      title: HEADING,
      image: PHOTOS.lounge,
      tone: "rose",
      body: [lead, LOREM_LONG, LOREM_SHORT],
      actions: [BOOK],
    },
    {
      type: "accordion",
      title: HEADING,
      image: PHOTOS.shoulder,
      items: [
        "Increased Flexibility and Range of Motion",
        "Reduced Muscle Tension and Stiffness",
        "Improved Posture and Alignment",
        "Enhanced Athletic Performance",
        "Reduced Risk of Injury",
        "Stress Reduction and Relaxation",
      ].map((item) => ({ title: item, body: LOREM_LONG })),
    },
    {
      type: "node",
      node: createElement(PhotoCta, { title: "Looking for Assisted Stretching?", label: BOOK.label, href: BOOK.href, image: PHOTOS.head }),
    },
    {
      type: "node",
      node: createElement(ClosingSplit, {
        title: HEADING,
        body: [LOREM_LONG, LOREM_SHORT],
        lineOne: "Don't let physical discomfort prevent you from living your best life.",
        lineTwo:
          "Prioritise your recovery. Prioritise your mobility. Discover the effectiveness of our Mobility Restoration Treatment only at Mobility FlexHub - where movement meets wellness.",
        action: BOOK,
        image: PHOTOS.release,
      }),
    },
    { type: "contact" },
  ];
}

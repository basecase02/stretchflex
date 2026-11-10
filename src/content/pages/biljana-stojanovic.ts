import { createElement } from "react";
import { InfoHero } from "@/components/pages/info/info-blocks";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /biljana-stojanovic — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "node",
      node: createElement(InfoHero, {
        crumbs: [{ label: "About", href: "/about" }],
        title: "Biljana Stojanović",
        subtitle: "Co-Founder, Mobility FlexHub",
        intro: [
          "Biljana Stojanović brings a unique blend of wellness expertise and artistic sensibility to her role as co-founder of StretchFLEX. With extensive experience as a lead assisted stretching and mobility clinician, she has dedicated her career to helping clients improve their physical wellbeing through expert-guided movement techniques.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
        image: { src: u("2025/11/Biljana-Stojanovic-768x1375-1.webp"), alt: "Biljana Stojanović, co-founder of StretchFLEX", portrait: true, ratio: 768 / 1375 },
      }),
    },
    {
      type: "text",
      tone: "rose",
      title: "Professional Background",
      hand: "Background",
      body: [
        // "StrecthFLEX" is spelt this way on the live page.
        "As a certified personal trainer with specialised training in assisted stretching methodologies, Biljana established herself as a respected figure in the wellness industry before co-founding StrecthFLEX. Her previous experience includes a distinguished tenure at a premier wellness facility, where she served as both Team Leader and Master Trainer for over two years, developing protocols and mentoring other practitioners in the art and science of facilitated stretching.",
      ],
    },
    { type: "cta", action: { label: "Book Appointment", href: BOOK_GROUP } },
    {
      type: "split",
      title: "Artistic Roots",
      hand: "Roots",
      image: { src: u("2026/03/StretchFLEX-010.webp"), alt: "A StretchFLEX therapist guiding a client through a lying hip and back stretch", position: "55% 50%" },
      tone: "navy",
      reverse: true,
      body: [
        "Born and raised in the historic town of Šabac, Serbia, Biljana’s journey began at the School of Artistic Trades and Applied Arts, where she developed her creative vision and technical skills. This artistic foundation continues to influence her holistic approach to wellness, informing her understanding of body mechanics, movement patterns, and the mind-body connection.",
        "Her artwork has been featured in numerous exhibitions and galleries both locally and internationally. Known for her versatility, Biljana’s artistic portfolio spans genres from portrait to landscapes and abstract compositions, demonstrating her ability to express complex emotions and ideas across different mediums.",
      ],
    },
    {
      type: "text",
      title: "Philosophy and Approach",
      hand: "Approach",
      body: [
        "Biljana’s unique combination of wellness expertise and artistic sensibility informs her client-centred methodology at Mobility FlexHub. She views the body as both a functional system and a creative instrument, bringing technical precision together with intuitive understanding to each session. This integrated approach allows her to address not only physical limitations but also help clients reconnect with their bodies in more meaningful ways.",
        "Her work represents the intersection of science and art, where evidence-based techniques meet creative problem-solving to deliver personalised mobility solutions for clients from all walks of life.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
    },
    { type: "reviews" },
  ],
};

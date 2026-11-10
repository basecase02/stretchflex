import { createElement } from "react";
import { InfoHero, Statement } from "@/components/pages/info/info-blocks";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /alan-chapman — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "node",
      node: createElement(InfoHero, {
        crumbs: [{ label: "About", href: "/about" }],
        // The live page has no H1 in its content; its title is the name.
        title: "Alan Chapman",
        subtitle: "Co-Founder & Marketing Director",
        intro: [
          "Alan Chapman brings over three decades of marketing expertise to StretchFLEX and StretchFLEX Academy, serving as the strategic architect behind the brand’s rapid growth and market positioning.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
        image: { src: u("2025/12/Alan-2021-scaled.jpg"), alt: "Alan Chapman, co-founder and marketing director of StretchFLEX", portrait: true, ratio: 1726 / 2560 },
      }),
    },
    {
      type: "text",
      tone: "rose",
      title: "Marketing Mastery",
      hand: "Mastery",
      body: [
        "Alan’s journey in advertising began in 1991 at Advertising Professionals in Melbourne, where he spent seven years mastering the fundamentals of brand building and client engagement. In 2011, he founded Digital Marketing HQ, a full-service agency in Perth specialising in data-driven marketing solutions for growth-focused businesses.",
      ],
    },
    {
      type: "cta",
      title: "Get Mobile with Assisted Stretching",
      hand: "Mobile",
      action: { label: "Book Appointment", href: BOOK_GROUP },
    },
    {
      type: "split",
      title: "Strategic Innovation",
      hand: "Innovation",
      image: { src: u("2025/11/Membership-Banner.webp"), alt: "A StretchFLEX therapist guiding a client through a seated forward-fold stretch", position: "45% 55%" },
      tone: "navy",
      reverse: true,
      body: [
        "As Marketing Director for StretchFLEX, Alan leverages cutting-edge digital strategies including Google Ads, social media marketing, SEO, sales automation, and influencer partnerships to position StretchFLEX as the premier destination for mobility transformation and professional training. His expertise in high-tech marketing systems has been instrumental in scaling StretchFLEX from a local wellness concept to a nationally recognised brand with franchise potential.",
      ],
    },
    {
      type: "text",
      title: "Philosophy",
      body: [
        "Alan understands that exceptional services require exceptional storytelling. At StretchFLEX, he crafts compelling narratives that connect with clients seeking life-changing mobility solutions and professionals pursuing meaningful careers in the wellness industry. His data-driven approach ensures that every marketing initiative delivers measurable results, driving growth for both StretchFLEX studios and StretchFLEX Academy graduates.",
      ],
    },
    {
      type: "node",
      node: createElement(Statement, {
        text: "Together, Biljana, Ray, and Alan represent a powerful convergence of clinical excellence, educational vision, and strategic innovation—committed to revolutionising how people move, feel, and live.",
        actions: [{ label: "Book Appointment", href: BOOK_GROUP, tone: "light" }],
      }),
    },
    { type: "reviews" },
  ],
};

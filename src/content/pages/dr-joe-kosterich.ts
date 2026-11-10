import { createElement } from "react";
import { InfoHero } from "@/components/pages/info/info-blocks";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /dr-joe-kosterich — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "node",
      node: createElement(InfoHero, {
        crumbs: [{ label: "About", href: "/about" }],
        title: "Dr Joe Kosterich",
        accent: "M.B.B.S., G.A.I.C.D",
        subtitle: "Doctor | Speaker | Author | Media Presenter | Health Industry Consultant",
        intro: [
          "Dr Joe Kosterich is driven by a single mission: helping people take control of their health to get the most out of life. With a career spanning over 20 years in postgraduate education and clinical practice, Joe balances high-level consultancy with a continued commitment to seeing patients as a General Practitioner every week.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
        image: { src: u("2026/03/DrJoeKosterich.webp"), alt: "Dr Joe Kosterich, GP and StretchFLEX advisor", position: "50% 30%" },
      }),
    },
    {
      type: "text",
      tone: "rose",
      title: "Clinical Leadership & Governance",
      hand: "Leadership",
      body: ["Joe holds several pivotal roles within the Australian healthcare landscape:"],
      list: [
        "**WA State Medical Director** for [IPN](https://www.ipn.com.au/).",
        "**Clinical Editor** of [Medical Forum Magazine](https://mforum.com.au/).",
        "**Medical Advisor** to medicinal cannabis company, [Little Green Pharma](https://www.littlegreenpharma.com/au/).",
        "**Vice Chairman** of the [Arthritis and Osteoporosis Association of WA](https://www.arthritiswa.org.au/).",
      ],
      after: [
        "His expertise is frequently sought in the legal and academic fields, where he provides expert opinions for medico-legal cases and lectures students at [UWA](https://www.uwa.edu.au/home) (and previously [Curtin Medical School](https://www.curtin.edu.au/)).",
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
      title: "Strategic Advisor & Consultant: StretchFLEX Perth",
      hand: "Advisor",
      image: { src: u("2026/06/SF67.jpg"), alt: "A StretchFLEX therapist chatting with a client in the studio", position: "50% 40%" },
      tone: "navy",
      reverse: true,
      body: [
        "In his commitment to holistic health and physical performance, Dr Joe has joined StretchFLEX Perth as a Consultant and Advisor. He provides medical oversight and strategic guidance to ensure StretchFLEX continues to deliver evidence-based assisted stretching programs that enhance mobility, reduce injury risk, and support the long-term wellbeing of the Perth community.",
      ],
    },
    {
      type: "text",
      title: "Media & Thought Leadership",
      hand: "Media",
      body: [
        "A prominent voice in health media, Joe is a regular fixture on radio and television. He hosts the podcast [Dr Joe Unplugged](https://www.drjoetoday.com/) and has authored two self-published books.",
        "Joe’s extensive leadership history includes senior positions within the [Australian Medical Association (AMA)](https://www.ama.com.au/) and seats on numerous government, industry, and not-for-profit boards, giving him a unique 360-degree view of the health industry.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
    },
    { type: "reviews" },
  ],
};

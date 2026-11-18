import { CTA_BAND } from "@/content/site";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /dr-joe-kosterich: our advisory board GP. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "About", href: "/about" }],
      kicker: "Advisory board",
      title: "Dr Joe Kosterich",
      intro: "MBBS, GAICD · Doctor, speaker and author · StretchFLEX advisory board",
      image: { src: u("2026/03/DrJoeKosterich.webp"), alt: "Dr Joe Kosterich, member of the StretchFLEX advisory board", position: "50% 30%" },
    },
    {
      type: "text",
      tone: "navy",
      title: "A trusted voice in Australian health",
      hand: "trusted",
      body: [
        "Dr Joe Kosterich has spent more than 20 years in clinical practice and medical education. He is known across Australia as a doctor, author, speaker and media presenter focused on helping people take control of their own health.",
      ],
    },
    {
      type: "checklist",
      tone: "rose",
      title: "Experience",
      items: [
        { body: "WA State Medical Director, [IPN](https://www.ipn.com.au/)" },
        { body: "Clinical Editor, [Medical Forum Magazine](https://mforum.com.au/)" },
        { body: "Medical Advisor, [Little Green Pharma](https://www.littlegreenpharma.com/au/)" },
        { body: "Vice Chairman, [Arthritis and Osteoporosis Association of WA](https://www.arthritiswa.org.au/)" },
        { body: "Lecturer at the [University of Western Australia](https://www.uwa.edu.au/home), previously [Curtin Medical School](https://www.curtin.edu.au/)" },
        { body: "Former senior roles with the [Australian Medical Association](https://www.ama.com.au/)" },
        { body: "Author of two books and host of the podcast [Dr Joe Unplugged](https://www.drjoetoday.com/)" },
      ],
    },
    {
      type: "text",
      title: "His role at StretchFLEX",
      hand: "role",
      body: [
        "Dr Joe sits on the StretchFLEX advisory board, providing clinical and strategic guidance to help keep our services safe, sensible and focused on clients' long-term wellbeing.",
      ],
    },
    // The doc ends with a plain "Book your session" button and no heading: the site's standard booking band.
    { type: "cta", title: CTA_BAND.title, hand: CTA_BAND.hand, body: CTA_BAND.body },
  ],
};

import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /dr-joe-kosterich — our medical advisor, kept short. */
export const page: PageContent = {
  sessions: ["revive-stretch", "prime-mobility-stretch", "ultimate-stretch"],
  bookingTitle: "Assisted Stretching",
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "About", href: "/about" }],
      kicker: "Doctor, speaker, author",
      title: "Dr Joe Kosterich",
      accent: "M.B.B.S., G.A.I.C.D",
      intro: "With 20+ years in clinical practice and medical education, Dr Joe helps people take control of their health and get the most out of life.",
      image: { src: u("2026/03/DrJoeKosterich.webp"), alt: "Dr Joe Kosterich, GP and StretchFLEX advisor", position: "50% 30%" },
    },
    {
      type: "checklist",
      tone: "rose",
      kicker: "Clinical leadership",
      title: "A Trusted Voice in Australian Health",
      hand: "Trusted",
      items: [
        { title: "WA State Medical Director", body: "for [IPN](https://www.ipn.com.au/)" },
        { title: "Clinical Editor", body: "of [Medical Forum Magazine](https://mforum.com.au/)" },
        { title: "Medical Advisor", body: "to [Little Green Pharma](https://www.littlegreenpharma.com/au/)" },
        { title: "Vice Chairman", body: "of the [Arthritis and Osteoporosis Association of WA](https://www.arthritiswa.org.au/)" },
        { title: "Lecturer", body: "at [UWA](https://www.uwa.edu.au/home), previously [Curtin Medical School](https://www.curtin.edu.au/)" },
        { title: "Podcast host", body: "of [Dr Joe Unplugged](https://www.drjoetoday.com/) and author of two books" },
        { title: "Former senior roles", body: "with the [Australian Medical Association (AMA)](https://www.ama.com.au/)" },
      ],
    },
    {
      type: "text",
      tone: "navy",
      title: "Strategic Advisor & Consultant: StretchFLEX Perth",
      hand: "Advisor",
      body: [
        "Dr Joe joined StretchFLEX Perth as a Consultant and Advisor.",
        "He provides medical oversight and strategic guidance, so our assisted stretching stays evidence-based, safe and focused on your long-term wellbeing.",
      ],
    },
    { type: "cta", title: "Get Mobile with Assisted Stretching", hand: "Mobile" },
  ],
};

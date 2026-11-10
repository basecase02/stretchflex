import type { PageContent } from "./types";

/** /book-your-session — the live page is the Acuity scheduler alone (no photos); the URL is unchanged. */
export const page: PageContent = {
  blocks: [
    { type: "hero", title: "Book Your Session" },
    {
      type: "embed",
      id: "booking",
      tone: "rose",
      label: "Book a StretchFLEX session",
      src: "https://app.acuityscheduling.com/schedule.php?owner=35386550&location=525%20Newcastle%20Street%20West%20Perth%206005&ref=embedded_csp",
      height: 1100,
    },
    { type: "contact" },
  ],
};

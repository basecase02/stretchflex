/**
 * The studio's business details for search. The live site doesn't have this
 * (its homepage schema is in src/content/wp/seo.json, printed as is); it is
 * added on top, so local search sees the address, hours and phone number.
 */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://stretchflex.au/#business",
  name: "StretchFLEX",
  legalName: "Wellbeing Beyond Wellness Pty Ltd",
  url: "https://stretchflex.au",
  description:
    "One-on-one assisted stretching and recovery in Perth CBD with the therapist of your choice. Sessions from $65. Book online at Trinity Arcade.",
  image: "https://stretchflex.au/images/team/stretchflex-team-reception.jpg",
  logo: "https://stretchflex.au/wp-content/uploads/2025/11/StretchFlex-logo.webp",
  priceRange: "$49 – $165",
  telephone: "+61 432 569 077",
  email: "info@stretchflex.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "111 Trinity Arcade, 72 St Georges Terrace",
    addressLocality: "Perth",
    addressRegion: "WA",
    postalCode: "6000",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
  ],
  sameAs: ["https://www.facebook.com/profile.php?id=61583797823853", "https://www.instagram.com/stretchflexperth/"],
};

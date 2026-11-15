/**
 * Structured data carried over from the live site (Yoast graph + LocalBusiness).
 * Values are unchanged so search engines see the same entities as before.
 */

export const yoastGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://stretchflex.au/",
      url: "https://stretchflex.au/",
      name: "Assisted Stretching Perth Near Me | StretchFlex",
      isPartOf: { "@id": "https://stretchflex.au/#website" },
      about: { "@id": "https://stretchflex.au/#organization" },
      primaryImageOfPage: { "@id": "https://stretchflex.au/#primaryimage" },
      image: { "@id": "https://stretchflex.au/#primaryimage" },
      thumbnailUrl:
        "https://stretchflex.au/images/team/stretchflex-team-reception.jpg",
      datePublished: "2026-02-03T23:07:28+00:00",
      dateModified: "2026-11-14T00:00:00+08:00",
      description:
        "One-on-one assisted stretching and recovery in Perth CBD with the therapist of your choice. Sessions from $65. Book online at Trinity Arcade.",
      breadcrumb: { "@id": "https://stretchflex.au/#breadcrumb" },
      inLanguage: "en-AU",
      potentialAction: [{ "@type": "ReadAction", target: ["https://stretchflex.au/"] }],
    },
    {
      "@type": "ImageObject",
      inLanguage: "en-AU",
      "@id": "https://stretchflex.au/#primaryimage",
      url: "https://stretchflex.au/images/team/stretchflex-team-reception.jpg",
      contentUrl:
        "https://stretchflex.au/images/team/stretchflex-team-reception.jpg",
      width: 2000,
      height: 1499,
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://stretchflex.au/#breadcrumb",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home" }],
    },
    {
      "@type": "WebSite",
      "@id": "https://stretchflex.au/#website",
      url: "https://stretchflex.au/",
      name: "Assisted Stretching Perth | StretchFLEX",
      description: "Assisted Stretching Perth",
      publisher: { "@id": "https://stretchflex.au/#organization" },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://stretchflex.au/?s={search_term_string}",
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      inLanguage: "en-AU",
    },
    {
      "@type": "Organization",
      "@id": "https://stretchflex.au/#organization",
      name: "Assisted Stretching Perth | StretchFLEX",
      url: "https://stretchflex.au/",
      logo: {
        "@type": "ImageObject",
        inLanguage: "en-AU",
        "@id": "https://stretchflex.au/#/schema/logo/image/",
        url: "https://stretchflex.au/wp-content/uploads/2026/02/logo-square.jpg",
        contentUrl: "https://stretchflex.au/wp-content/uploads/2026/02/logo-square.jpg",
        width: 557,
        height: 557,
        caption: "Assisted Stretching Perth | StretchFLEX",
      },
      image: { "@id": "https://stretchflex.au/#/schema/logo/image/" },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61583797823853",
        "https://www.instagram.com/stretchflexperth/",
      ],
    },
  ],
};

/** The studio's business details for search (content document, 14 November 2026). */
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

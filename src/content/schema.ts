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
        "https://stretchflex.au/wp-content/uploads/2026/02/openart-image_-Cb-sXPh_1770269064583_raw-1024x765.webp",
      datePublished: "2026-02-03T23:07:28+00:00",
      dateModified: "2026-06-23T06:50:13+00:00",
      description:
        "Experience professional assisted stretching in Perth near you with StretchFlex. Improve flexibility, mobility and recovery. Book your session today.",
      breadcrumb: { "@id": "https://stretchflex.au/#breadcrumb" },
      inLanguage: "en-AU",
      potentialAction: [{ "@type": "ReadAction", target: ["https://stretchflex.au/"] }],
    },
    {
      "@type": "ImageObject",
      inLanguage: "en-AU",
      "@id": "https://stretchflex.au/#primaryimage",
      url: "https://stretchflex.au/wp-content/uploads/2026/02/openart-image_-Cb-sXPh_1770269064583_raw.webp",
      contentUrl:
        "https://stretchflex.au/wp-content/uploads/2026/02/openart-image_-Cb-sXPh_1770269064583_raw.webp",
      width: 1200,
      height: 896,
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

export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://stretchflex.au",
  name: "Assisted Stretching Perth Near Me",
  description:
    "Experience professional assisted stretching in Perth near you with StretchFlex. Improve flexibility, mobility and recovery. Book your session today.",
  image: "https://stretchflex.au/wp-content/uploads/2025/11/StretchFlex-logo.webp",
  priceRange: "$0.00",
  address: {
    "@type": "PostalAddress",
    addressLocality: "111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000, Australia",
    addressRegion: "WA",
    postalCode: "6000",
    streetAddress: "111 Trinity Arcade, 72 St Georges Terrace",
  },
  telephone: "+61 432 569 077",
};

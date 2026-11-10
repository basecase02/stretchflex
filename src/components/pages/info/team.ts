import { createElement } from "react";
import { JsonLd } from "@/components/text";
import type { Block } from "@/content/blocks";

/** FAQPage structured data built from the questions shown on the page. */
export function faqJsonLd(items: { q: string; a: string }[]): Block {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return { type: "node", node: createElement(JsonLd, { data }) };
}

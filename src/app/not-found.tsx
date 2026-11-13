import type { Metadata } from "next";
import { Blocks } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Page not found | StretchFLEX",
  robots: { index: false, follow: true },
};

/** Any address the site doesn't have: a way back into it. */
export default function NotFound() {
  return (
    <Blocks
      blocks={[
        {
          type: "hero",
          kicker: "Page not found",
          title: "This page has",
          accent: "stretched too far",
          intro: "The page you’re after may have moved. Start again from one of these.",
          actions: [
            { label: "Our Packages", href: "/our-packages" },
            { label: "Home", href: "/", tone: "line" },
            { label: "Contact Us", href: "/contact-us", tone: "line" },
          ],
        },
      ]}
    />
  );
}

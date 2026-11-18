import type { Metadata, Viewport } from "next";
import { Albert_Sans, Lilita_One, Qwitcher_Grypen } from "next/font/google";
import { Analytics, AnalyticsNoScript } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { QuickActions } from "@/components/quick-actions";
import { Reveal } from "@/components/reveal";
import { SITE_URL } from "@/content/site";
import { FEEDS, ROBOTS_INDEX, SITE_NAME } from "@/lib/seo";
import "./globals.css";
import "@/styles/blocks.css";

/** Chunky caps for every headline. */
const display = Lilita_One({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

/** Handwritten face for the single words set inside headlines. */
const hand = Qwitcher_Grypen({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-hand",
});

/** All body text, labels and buttons. */
const sans = Albert_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

/**
 * Site-wide tags, as the live site prints them on every page. Each page sets
 * its own title, description and canonical from the live SEO (src/lib/seo.ts)
 * and prints its Open Graph tags with <SeoTags>; these are the defaults.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  robots: ROBOTS_INDEX,
  alternates: { types: FEEDS },
  other: { "twitter:card": "summary_large_image" },
  verification: { google: "mBJIrwfq77wL7IHAYfGOxoqPCjV_o8_2-mjOQ0lBZO8" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F75BC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${display.variable} ${hand.variable}`}>
      <body>
        <AnalyticsNoScript />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <QuickActions />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}

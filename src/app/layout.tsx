import type { Metadata, Viewport } from "next";
import { Albert_Sans, Lilita_One, Qwitcher_Grypen } from "next/font/google";
import { Analytics, AnalyticsNoScript } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { QuickActions } from "@/components/quick-actions";
import { Reveal } from "@/components/reveal";
import { SITE_URL } from "@/content/site";
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

const title = "Assisted Stretching Perth Near Me | StretchFlex";
const description =
  "Experience professional assisted stretching in Perth near you with StretchFlex. Improve flexibility, mobility and recovery. Book your session today.";
const siteName = "Assisted Stretching Perth | StretchFLEX";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/feed", title: `${siteName} » Feed` },
        { url: "/comments/feed", title: `${siteName} » Comments Feed` },
      ],
    },
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    title,
    description,
    url: "/",
    siteName,
    images: [
      {
        url: "/images/team/stretchflex-team-reception.jpg",
        width: 2000,
        height: 1499,
        type: "image/jpeg",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
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

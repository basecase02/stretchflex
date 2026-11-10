import { PackageOffers, RichSplit, RichText } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

/* Both links exactly as on the live page (the first one does end in "zqh4o" there). */
const BOOK = "https://api.leadconnectorhq.com/widget/bookings/nutritionalinsights-afd23e59-1bbd-4671-8d29-bc2f23ade8763zqh4o";
const BOOK_GROUP = "https://api.leadconnectorhq.com/widget/groups/stretchflex";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  hero: { src: u("2026/03/StretchFLEX28.jpg"), alt: "A StretchFLEX therapist stretching a client’s leg on the treatment table", position: "60% 50%" },
  expect: { src: u("2026/02/openart-image_dUV856pq_1770268180039_raw.webp"), alt: "A therapist guiding a smiling client through a side-lying leg stretch", position: "45% 55%" },
  ideal: { src: u("2026/02/openart-image_rc3Bir-V_1770268184130_raw.webp"), alt: "A therapist raising a client’s leg into an assisted stretch on the table", position: "50% 50%" },
  packages: { src: u("2026/06/stretchflex-59.jpg"), alt: "A StretchFLEX therapist greeting a client with a handshake" },
} satisfies Record<string, Img>;

/** /our-packages/the-ultimate-stretch — the live page's copy, headings and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "The Ultimate",
      accent: "Stretch",
      facts: ["60 minutes – $120"],
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "A Comprehensive Journey to Total Flexibility and Mobility",
              hand: "Journey",
              p: [
                "Ready to experience the ultimate in stretching and unlock your body’s full potential?",
                "Our 60-minute Deep Dive is an immersive session designed to take you on a comprehensive journey of flexibility and mobility.",
              ],
              actions: [{ label: "Book Appointment", href: BOOK }],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <RichSplit
          image={PHOTO.expect}
          tone="rose"
          parts={[
            {
              h2: "What To Expect",
              hand: "Expect",
              p: [
                "This in-depth session targets every major muscle group and limb, making it ideal for [Assisted Stretching perth](/), and leaves you feeling open, aligned, and primed for peak performance.",
                "Our experienced Stretch & Flexologists will guide you through a series of deep stretches, helping you to:",
              ],
              checks: [
                "Unlock Your Body’s Full Potential: Experience a significant increase in your flexibility and range of motion.",
                "Release Chronic Tension: Melt away muscular tension and stiffness, leaving you feeling refreshed and rejuvenated.",
                "Improve Your Posture and Alignment: Enhance your body’s natural alignment for optimal function and well-being.",
                "Enhance Your Body Awareness: Develop a deeper connection to your body and its movement.",
              ],
            },
          ]}
        />
      ),
    },
    { type: "cta", title: "Looking for Assisted Stretching?", hand: "for", action: { label: "Book Appointment", href: BOOK_GROUP } },
    {
      type: "node",
      node: (
        <RichText
          tone="rose"
          parts={[
            {
              h2: "Benefits Of The Session",
              hand: "Benefits",
              checks: [
                "Deep Muscle Release: Release chronic tension and tightness in your muscles.",
                "Improved Joint Mobility: Increase your range of motion and reduce stiffness in your joints.",
                "Enhanced Body Awareness: Develop a deeper understanding of your body’s movement patterns.",
                "Stress Reduction and Relaxation: Experience a sense of calm and relaxation as you release tension.",
                "Improved Posture and Alignment: Stand taller and feel more confident with improved posture",
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <RichSplit
          image={PHOTO.ideal}
          tone="navy"
          reverse
          parts={[
            {
              h3: "Ideal For",
              list: [
                "Those seeking a comprehensive and transformative stretching experience",
                "Individuals with chronic muscle tension or stiffness",
                "Athletes looking to enhance their performance and prevent injuries",
                "Anyone who wants to prioritise their well-being and achieve optimal body function",
              ],
              actions: [{ label: "Book Appointment", href: BOOK, tone: "light" }],
            },
            {
              h3: "Our Commitment To You",
              p: [
                "At StretchFLEX Perth, we are committed to providing you with a safe and supportive environment where you can achieve your wellness goals. Our Stretch & Flexologists are highly trained and experienced, and they will work with you to ensure you have a comfortable and effective session.",
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <PackageOffers
          id="packages"
          image={PHOTO.packages}
          items={[
            {
              name: "THE 5 REVIVE PACKAGE",
              tag: "Premium Experience",
              badge: "Save $30",
              price: "$570.00",
              detail: "5 × Ultimate Stretch Sessions (60 min each)",
              was: "$600",
              sections: [
                { h: "The Full Experience", p: "Luxurious, comprehensive sessions that address every aspect of your mobility needs." },
                {
                  h: "Pure Indulgence That Works",
                  list: [
                    "Full-body systematic approach",
                    "Advanced therapeutic techniques",
                    "Stress relief and mental clarity",
                    "Leave feeling completely renewed",
                  ],
                },
              ],
              quote: "“It’s like a spa day that actually fixes your body problems.”",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a1fc64203b17c94f5714505" },
            },
            {
              name: "THE 10 REVIVE PACKAGE",
              tag: "Maximum Value",
              badge: "Save $150",
              price: "$1050.00",
              detail: "10 × Ultimate Stretch Sessions (60 min each)",
              was: "$1200",
              sections: [
                {
                  h: "The Complete Solution",
                  p: "Everything your body needs to function at its absolute best. This is our premium transformation package.",
                },
                {
                  h: "Why This is Worth Every Penny",
                  list: [
                    "Comprehensive full-body optimization",
                    "Dramatic pain reduction and elimination",
                    "Enhanced athletic performance",
                    "Improved quality of life in every area",
                  ],
                },
              ],
              note: "Perfect For: Executives, serious athletes, anyone who demands excellence",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a1fc72203b17c94f5714506" },
            },
          ]}
        />
      ),
    },
    { type: "reviews" },
  ],
};

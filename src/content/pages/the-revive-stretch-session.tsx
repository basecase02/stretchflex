import { HeadingCta, PackageOffers, RichSplit, RichText } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/bookings/nutritionalinsights-afd23e59-1bbd-4671-8d29-bc2f23ade8763zqh4oohgi8w";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  hero: { src: u("2026/03/StretchFLEX28.jpg"), alt: "A StretchFLEX therapist stretching a client’s leg on the treatment table", position: "60% 50%" },
  expect: { src: u("2026/02/openart-image_aAWfT-1G_1770268632537_raw.webp"), alt: "A smiling StretchFLEX therapist at the studio front desk", position: "45% 40%" },
  ideal: { src: u("2026/02/openart-image_D_F4oLlj_1770268182209_raw.webp"), alt: "A therapist guiding a client through an assisted hamstring stretch", position: "45% 50%" },
  packages: { src: u("2026/06/stretchflex-57.jpg"), alt: "A StretchFLEX therapist talking with a client in the studio" },
  book: { src: u("2026/03/StretchFLEX-01.jpg"), alt: "A therapist stretching a client’s arm and shoulder on the table", position: "50% 40%" },
} satisfies Record<string, Img>;

/** /our-packages/the-revive-stretch-session — the live page's copy, headings and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "The Revive",
      accent: "Stretch",
      facts: ["30 minutes – $65"],
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "Experience Stretch Therapy in Perth with",
              hand: "Perth",
              h3: ["Our 30-Minute Revive Session", "One-On-One", "Ready to feel the difference? Book your session now."],
              p: [
                "If you’re looking for a quick and effective way to relieve tension, improve flexibility and restore movement, [Assisted Stretching Perth](/) sessions like our 30-Minute Revive Stretch are the perfect place to start. Designed for all fitness levels, this guided session helps you feel looser, lighter and more mobile in just half an hour.",
                "Whether you’re searching for stretch therapy near me or want to try a professional flexibility session in Perth, StretchFLEX is here to help you move better and feel your best.",
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
                "This focused session is designed to target key muscle groups and common tension zones, leaving you feeling lighter, looser, and more aligned. Our experienced Stretch & Flexologists will guide you through a series of gentle yet effective stretches, helping you release tightness and improve your range of motion",
              ],
            },
            {
              h3: "Benefits Of The Session",
              checks: [
                "Reduced Muscle Tension and Stiffness: Say goodbye to aches and pains caused by tight muscles.",
                "Improved Posture and Alignment: Stand taller and feel more confident with improved posture.",
                "Enhanced Energy Levels: Boost your energy and feel more refreshed after a busy day.",
                "Stress Reduction and Relaxation: Experience a sense of calm and relaxation as you release tension.",
                "Improved Sleep Quality: Fall asleep easier and wake up feeling more rested",
              ],
            },
          ]}
        />
      ),
    },
    { type: "cta", title: "Looking for Assisted Stretching?", hand: "for", action: { label: "Book Appointment", href: BOOK } },
    {
      type: "node",
      node: (
        <RichSplit
          image={PHOTO.ideal}
          tone="navy"
          reverse
          parts={[
            {
              h2: "Ideal For",
              hand: "For",
              list: [
                "Those short on time but in need of a quick reset",
                "Individuals experiencing muscle tension or stiffness",
                "Anyone seeking to improve their overall well-being",
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
              tag: "Perfect Starting Point",
              badge: "Save $30",
              price: "$295.00",
              detail: "5 × Revive Stretch Sessions (30 min each)",
              was: "$325",
              sections: [
                {
                  h: "Why This Works",
                  p: "Short, focused sessions that fit your busy schedule while delivering real results. Perfect for beginners or those wanting to test the waters.",
                },
                {
                  h: "You Get",
                  list: [
                    "Professional-guided stretching to unlock tight muscles",
                    "Improved flexibility in just 30 minutes per session",
                    "Foundation techniques you can use at home",
                    "Personal attention from certified mobility experts",
                  ],
                },
              ],
              quote: "“Finally, a program that doesn’t demand hours of my time but still gets results!”",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a2125955a9093aac76c6014" },
            },
            {
              name: "THE 10 REVIVE PACKAGE",
              tag: "Most Popular Choice",
              badge: "Save $55",
              price: "$595.00",
              detail: "10 × Revive Stretch Sessions (30 min each)",
              was: "$650",
              sections: [
                {
                  h: "The Smart Investment",
                  p: "Double your sessions, more than double your savings. This package gives you the consistency needed for lasting change.",
                },
                {
                  h: "Transform Your Daily Life",
                  list: [
                    "Wake up without stiffness",
                    "Move through your day with confidence",
                    "Build sustainable mobility habits",
                    "See dramatic improvements in just 5 weeks",
                  ],
                },
              ],
              note: "Perfect for: Desk workers, weekend warriors, anyone ready for real change",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a2126f85a9093aac76c6015" },
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "What Is the 30-Minute Revive Stretch Session?",
              hand: "Revive",
              p: [
                "The Revive Stretch Session is a guided, assisted stretching experience designed to release tight muscles, improve range of motion, and support better posture. In just 30 minutes, you’ll experience targeted stretches performed by a certified therapist who will guide you through each movement safely and effectively.",
                "This stretch and mobility class focuses on your individual needs. Whether you sit for long hours at work, feel tight after training, or simply want to improve your mobility, our team tailors each session to help you achieve real results.",
                "It’s more than a simple stretch; it’s a full-body reset.",
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <HeadingCta
          title="Book Your 30-Minute Revive Stretch Session Today"
          handWord="Today"
          image={PHOTO.book}
          body={[
            "Ready to feel the difference? Book your stretch therapy Perth session today and experience how 30 minutes can transform the way you move and feel.",
            "Take the first step towards better mobility and flexibility. Book your session now and discover why StretchFLEX is Perth’s go-to destination for professional stretch therapy.",
          ]}
          action={{ label: "Book Appointment", href: BOOK }}
        />
      ),
    },
    { type: "reviews" },
  ],
};

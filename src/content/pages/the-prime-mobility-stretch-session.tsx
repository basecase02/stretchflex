import { HeadingCta, PackageOffers, RichSplit, RichText } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/bookings/nutritionalinsights-afd23e59-1bbd-4671-8d29-bc2f23ade8763zqh4oe8z5iq";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  hero: { src: u("2026/03/StretchFLEX28.jpg"), alt: "A StretchFLEX therapist stretching a client’s leg on the treatment table", position: "60% 50%" },
  expect: { src: u("2026/02/openart-image_E2IR-VHA_1770267642333_raw.webp"), alt: "A therapist lifting a client’s leg into an assisted hamstring stretch", position: "40% 50%" },
  benefits: { src: u("2026/02/openart-image_5lnhgXxN_1770268368240_raw.webp"), alt: "A therapist bending a reclining client’s knee into a hip stretch", position: "45% 50%" },
  commitment: { src: u("2026/02/openart-image_y9_WCiNg_1770268048492_raw.webp"), alt: "A therapist adjusting a client’s ankle as she lies on the treatment table", position: "50% 50%" },
  book: { src: u("2026/03/StretchFLEX-09-scaled.webp"), alt: "A therapist guiding a client through an assisted back extension", position: "50% 40%" },
} satisfies Record<string, Img>;

/** /our-packages/the-prime-mobility-stretch-session — the live page's copy, headings and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "Prime Mobility",
      accent: "Stretch",
      facts: ["45 minutes – $95"],
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "Prime Mobility Stretch Perth",
              hand: "Perth",
              h3: ["Elevate Your Flexibility", "One-On-One"],
              p: [
                "If you want to move more freely, relieve tension, and improve your overall body function, the Prime Mobility Stretch Session is the ideal solution. This [Assisted Stretching perth](/) session is a 30-minute mobility experience that combines guided stretching, joint mobilisation, and functional movement exercises to help your body move efficiently and safely.",
                "Whether you are an athlete, desk worker, or someone seeking better mobility for everyday life, this 45-minute Intermediate Stretch Session is designed to improve your flexibility, posture, and movement patterns. This mobility session Perth helps you move with greater ease and confidence in your daily activities.",
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
                "This dynamic session builds upon foundational stretching techniques, incorporating more advanced sequences that will challenge your body and support your progress.",
                "You’ll experience a powerful balance of deep muscle release and controlled movement, helping you to:",
              ],
              checks: [
                "Increase Your Range of Motion: Achieve greater flexibility and freedom of movement in your joints.",
                "Improve Your Athletic Performance: Enhance your power, speed, and agility.",
                "Reduce Your Risk of Injury: Strengthen your muscles and improve your balance and stability.",
                "Enhance Your Body Awareness: Develop a deeper connection to your body and its movement.",
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
          image={PHOTO.benefits}
          tone="sky"
          reverse
          parts={[
            {
              h2: "Benefits Of The Session",
              hand: "Benefits",
              checks: [
                "Deep Muscle Release: Release chronic tension and tightness in your muscles.",
                "Improved Joint Mobility: Increase your range of motion and reduce stiffness in your joints.",
                "Enhanced Body Awareness: Develop a deeper understanding of your body’s movement patterns.",
                "Stress Reduction and Relaxation: Experience a sense of calm and relaxation as you release tension.",
                "Improved Posture and Alignment: Stand taller and feel more confident with improved posture.",
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
          image={PHOTO.commitment}
          tone="navy"
          parts={[
            {
              h3: "Ideal For",
              list: [
                "Active individuals who want to improve their athletic performance",
                "Athletes seeking to enhance their flexibility and mobility",
                "Anyone who wants to move with more freedom and fluidity",
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
          items={[
            {
              name: "THE 5 PRIME MOBILITY PACKAGE",
              tag: "Next Level Results",
              badge: "Save $25",
              price: "$450.00",
              detail: "5 × Prime Mobility Sessions (45 min each)",
              was: "$475",
              sections: [
                {
                  h: "Deeper Work, Bigger Results",
                  p: "Extended sessions mean we can address complex movement patterns and multiple problem areas in one visit.",
                },
                {
                  h: "What Makes This Special",
                  list: [
                    "Comprehensive assessment and correction",
                    "Advanced mobility techniques",
                    "Strength-flexibility integration",
                    "Personalized movement prescription",
                  ],
                },
              ],
              note: "Ideal for: Active individuals, athletes, those with specific mobility goals",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a2128e35a9093aac76c601a" },
            },
            {
              name: "THE 10 PRIME MOBILITY PACKAGE",
              tag: "Complete Transformation",
              badge: "Save $80",
              price: "$870.00",
              detail: "10 × Prime Mobility Sessions (45 min each)",
              was: "$950",
              sections: [
                {
                  h: "The Game Changer",
                  p: "Our most comprehensive mobility program. This is where dramatic, life-changing results happen.",
                },
                {
                  h: "Your Investment in Freedom",
                  list: [
                    "Complete postural realignment",
                    "Eliminate chronic pain patterns",
                    "Build bulletproof movement quality",
                    "Achieve your peak physical potential",
                  ],
                },
              ],
              note: "Guarantee: You’ll move better than you have in years, or we’ll work with you until you do.",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a21298903b17c94f571485b" },
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
              h2: "What Makes the Prime Mobility Stretch Special?",
              hand: "Special?",
              p: [
                "The Prime Mobility Stretch goes beyond traditional stretching. Unlike basic stretches that target only muscles, this session focuses on improving joint health, movement quality, and neuromuscular control.",
                "Our certified therapists assess your body and customise every session to your specific needs, making it a truly personalised mobility training experience in Perth. This approach ensures you not only gain flexibility but also develop stability, balance, and long-lasting functional movement.",
                "Whether you want to prevent injury, enhance athletic performance, or simply feel lighter and more comfortable in your body, this session provides measurable benefits.",
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <RichText
          tone="rose"
          parts={[
            {
              h2: "Who Can Benefit from This Session?",
              hand: "Benefit",
              p: ["The Prime Mobility Stretch Session is suitable for everyone, including:"],
              list: [
                "Athletes aiming to improve performance and prevent injuries.",
                "Desk workers experiencing stiffness or poor posture.",
                "Beginners looking to start their mobility and flexibility journey.",
                "Gym-goers seeking improved recovery and movement quality.",
                "Anyone wanting to reduce tension, improve flexibility, and move more freely.",
              ],
            },
            { p: ["No experience is required. Our therapists guide you step by step, ensuring comfort, safety, and results."] },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <HeadingCta
          title="Book Your Prime Mobility Stretch Session Today"
          handWord="Today"
          image={PHOTO.book}
          body={[
            "Take the first step towards better posture, flexibility, and functional movement. Book your mobility training Perth session today and experience the benefits of professional mobility therapy.",
          ]}
          action={{ label: "Book Appointment", href: BOOK }}
        />
      ),
    },
    { type: "reviews" },
  ],
};

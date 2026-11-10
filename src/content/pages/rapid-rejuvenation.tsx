import { PackageOffers, QaSection, RichSplit, RichText } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/bookings/nutritionalinsights-afd23e59-1bbd-4671-8d29-bc2f23ade8763zqh4ow1amxk";
const BOOK_GROUP = "https://api.leadconnectorhq.com/widget/groups/stretchflex";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  hero: { src: u("2026/06/4659FB4D-8940-4085-BD29-9CD5E0D2F4B1.jpeg"), alt: "A client relaxing in compression recovery boots in the StretchFLEX recovery suite", position: "55% 55%" },
  difference: { src: u("2026/06/De-Compressing.jpg"), alt: "A man reclining in pneumatic compression boots with a mindfulness headset", position: "45% 60%" },
  packages: { src: u("2026/03/StretchFlex-47.jpg"), alt: "A client in compression recovery boots and a VR headset" },
} satisfies Record<string, Img>;

/** /our-packages/rapid-rejuvenation — the live page's copy, headings and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "De-Compression",
      accent: "Recovery Stack",
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "20-Minute De-Compression Recovery Stack",
              hand: "Recovery",
              p: [
                "Are your daily activities leaving you drained? Whether you’re recovering from an intense training session, experiencing discomfort from prolonged standing, or simply feeling the weight of everyday stress, The De-Compression recovery stack by StretchFLEX offers the perfect solution. Our signature 20-Minute Mobility Restoration Treatment is designed to help you bounce back quickly, feeling refreshed and ready to tackle whatever comes next.",
                "Step into our cutting-edge pneumatic compression system and experience a transformative recovery journey in just 20 minutes. This isn’t merely relaxation; it’s a scientifically backed recovery method that enhances your body’s natural healing capabilities.",
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
        <QaSection
          tone="rose"
          name="transform"
          title="Transform Your Recovery in Just 20 Minutes:"
          handWord="Recovery"
          groups={[
            {
              items: [
                {
                  q: "Fast-Track Muscle Recuperation",
                  a: [
                    "Combat lingering muscle discomfort effectively! Our compression therapy applies precise pressure patterns to your limbs, enhancing circulation. This helps eliminate metabolic byproducts that cause post-activity soreness, enabling faster tissue repair. Return to your routine with renewed strength!",
                  ],
                },
                {
                  q: "Combat Fluid Retention and Discomfort",
                  a: [
                    "Whether from vigorous exercise or extended periods of standing, fluid accumulation can create uncomfortable sensations in your legs. Our advanced compression system facilitates proper fluid movement, alleviating that weighted feeling and restoring comfort to your lower extremities.",
                  ],
                },
                {
                  q: "Optimize Blood Flow",
                  a: [
                    "Supercharge your circulatory system! The rhythmic compression sequences promote healthy blood circulation, delivering essential oxygen and nutrients throughout your body. This enhanced flow not only supports recovery but contributes to overall limb health and vitality.",
                  ],
                },
                {
                  q: "Alleviate Muscular Exhaustion",
                  a: [
                    "Tired of feeling… tired? Our Mobility Restoration Treatment helps reduce muscle fatigue by promoting efficient nutrient delivery and waste removal. Walk out feeling energised and prepared for your next endeavour.",
                  ],
                },
                {
                  q: "Boost Physical Capabilities",
                  a: [
                    "Effective recovery sets the foundation for improved performance. With reduced discomfort and fatigue, you can maintain consistent activity levels, leading to better overall outcomes in your physical pursuits.",
                  ],
                },
                {
                  q: "Mindful Recovery Moment",
                  a: [
                    "While actively supporting your physical recovery, our 20-minute session provides a perfect opportunity to mentally reset. Relax, breathe deeply, and let our technology work its wonders. Discover a peaceful interlude in your hectic schedule!",
                  ],
                },
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
        <RichSplit
          image={PHOTO.difference}
          tone="navy"
          reverse
          parts={[
            {
              h2: "Experience the StretchFLEX Difference",
              hand: "Difference",
              p: [
                "Our 20-Minute Mobility Restoration Treatment perfectly complements any wellness regimen, whether you’re a serious fitness enthusiast, a professional who spends hours on your feet, or someone seeking quick relief from daily physical stress.",
              ],
            },
            {
              h3: "Don't let physical discomfort prevent you from living your best life.",
              actions: [{ label: "Book Appointment", href: BOOK, tone: "light" }],
            },
            {
              h3: "Prioritise your recovery, and mobility. Discover the effectiveness of our De-Compression Recovery Stack only at StretchFLEX - where movement meets wellness.",
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
              name: "THE 5 RECOVERY PACKAGE",
              tag: "Mind + Body Reset",
              badge: "Save $50",
              price: "$550.00",
              detail: "5 × Compression & Mindfulness Sessions",
              was: "$600",
              sections: [
                {
                  h: "More Than Physical",
                  p: "Combines cutting-edge compression therapy with proven mindfulness techniques for complete restoration.",
                },
                {
                  h: "Dual-Action Benefits",
                  list: [
                    "Accelerated muscle recovery",
                    "Stress and anxiety reduction",
                    "Improved sleep quality",
                    "Enhanced mental clarity and focus",
                  ],
                },
              ],
              note: "Perfect after intense training, stressful periods, or when you need a complete reset.",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a1fc93003b17c94f5714509" },
            },
            {
              name: "THE ULTIMATE RECOVERY PACKAGE",
              tag: "Complete Restoration",
              badge: "Save $200",
              price: "$999.00",
              detail: "10 × Compression & Mindfulness Sessions",
              was: "$1200",
              sections: [
                {
                  h: "The Ultimate Reset",
                  p: "Our most comprehensive recovery program combines physical restoration with mental optimisation.",
                },
                {
                  h: "Transform How You Feel",
                  list: ["Chronic fatigue elimination", "Deep stress relief", "Optimal recovery protocols", "Peak mental performance"],
                },
              ],
              note: "Guarantee: You’ll feel more energized and focused than you have in months.",
              closing: "Don't Wait - Start Your Journey Today!",
              action: { label: "Order Now", href: "https://link.fastpaydirect.com/payment-link/6a1fc99f5a9093aac76c5c6b" },
            },
          ]}
        />
      ),
    },
    { type: "reviews" },
  ],
};

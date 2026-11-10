import Image from "next/image";
import { QaSection, RichSplit, RichText, type QaItem } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/group/VsewonS7sIbVhabLTuVn";
const BOOK_GROUP = "https://api.leadconnectorhq.com/widget/groups/stretchflex";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  hero: { src: u("2026/06/SF62.jpg"), alt: "A StretchFLEX therapist stretching a smiling client's leg on the treatment table", position: "60% 50%" },
  tech: { src: u("2026/06/LED-Red-Light-1.jpg"), alt: "A woman standing in front of a glowing red light therapy panel", position: "50% 40%" },
  protocol: { src: u("2026/06/openart-image_zSXGZx2h_1780459696634_raw.jpg"), alt: "A client standing side-on between two red light therapy panels", position: "50% 45%" },
  upgrade: { src: u("2026/03/StretchFLEX-45.jpg"), alt: "A StretchFLEX therapist signing a client in at the front desk", position: "40% 45%" },
  specs: { src: u("2026/03/StretchFLEX-43.jpg"), alt: "A client filling in a form with a StretchFLEX therapist at the desk", position: "50% 45%" },
  standard: { src: u("2026/03/StretchFLEX-012.webp"), alt: "A therapist stretching a client lying on his side on the treatment table", position: "50% 50%" },
  qa: { src: u("2026/06/stretchflex-56.jpg"), alt: "A smiling StretchFLEX therapist welcoming a client to the studio", position: "40% 40%" },
  science: { src: u("2026/06/Stretchflex-53.jpg"), alt: "A client checking in at the StretchFLEX reception", position: "50% 45%" },
  safety: { src: u("2026/06/Stretchflex-52.jpg"), alt: "A client standing between two twin red light therapy panels", position: "50% 45%" },
  performance: { src: u("2026/06/Stretchflex-54-1.jpg"), alt: "A StretchFLEX therapist greeting a client at the front desk", position: "40% 45%" },
  logistics: { src: u("2026/03/StretchFLEX37.jpg"), alt: "A StretchFLEX therapist stretching a seated client’s shoulder and arm", position: "55% 45%" },
} satisfies Record<string, Img>;

/* The live Q&A repeats three answers under its later questions; they are kept as they are live. */
const A_WHAT =
  "It is a proprietary recovery system that “stacks” medical-grade light therapy with expert manual stretching. We use a 7/7 Protocol: 7 minutes of multi-spectral light to prime your muscles before the stretch, and 7 minutes of pulsed light to flush metabolic waste after the stretch.";
const A_WHY =
  "Regular stretching attempts to move “cold” fascia, which can lead to micro-tears and significant post-session soreness. Photobiotic stretching uses light to trigger Systemic Vasodilation, essentially “thawing” your connective tissue so your therapist can reach deeper ranges of motion with significantly less discomfort.";
const A_HOME =
  "No. Most consumer-grade panels use 2 wavelengths and low power. StretchFLEX uses TGA Class IIa Medical Grade technology with a 9-band spectrum (480nm to 1060nm) and a high-intensity irradiance of ≥ 183.1 mW/cm². We deliver more therapeutic energy in 7 minutes than a home device provides in an hour.";

const QA: { h3: string; image: Img; items: QaItem[] }[] = [
  {
    h3: "The Basics: What & Why",
    image: PHOTO.qa,
    items: [
      { q: "What exactly is Photobiotic Assisted Stretching?", a: [A_WHAT] },
      { q: "Why shouldn’t I just do a regular stretch?", a: [A_WHY] },
      { q: "Is this the same as the red light panels I can buy for home?", a: [A_HOME] },
    ],
  },
  {
    h3: "The Science: Wavelengths & Biology",
    image: PHOTO.science,
    items: [
      {
        q: "What do the different light colours (wavelengths) actually do?",
        a: ["Our 9-band spectrum targets different layers of your biology:"],
        list: [
          "**Blue/Yellow (480-590nm):** Surface-level skin health and inflammation.",
          "**Deep Red (630-670nm):** Spikes ATP (cellular energy) in the mitochondria.",
          "**Near-Infrared (810-850nm):** Deep tissue penetration to release Nitric Oxide and relax muscles.",
          "**Deep NIR (1060nm):** Reaches the densest fascia, tendons, and even bone for structural repair.",
        ],
      },
      {
        q: "What is the \"7/7 Protocol\"?",
        list: [
          "**7-Minute Prime:** Floods the area with light to increase blood flow and tissue elasticity.",
          "**The Stretch:** 30, 45, or 60 minutes of therapist-led assisted stretching.",
          "**7-Minute Flush:** Uses pulsed light to accelerate the removal of metabolic waste and eliminate soreness.",
        ],
      },
      {
        q: "How does light reduce pain during a stretch?",
        a: [
          "The light has a mild analgesic effect. It dampens the signal of pain receptors (nociceptors), allowing our therapists to work through stubborn fascial restrictions that would usually be too uncomfortable to release.",
        ],
      },
    ],
  },
  {
    h3: "Safety & Experience",
    image: PHOTO.safety,
    items: [
      { q: "Is it safe? Are there any side effects?", a: [A_WHAT] },
      { q: "Does it get hot? Will I sweat?", a: [A_WHY] },
      { q: "What should I wear?", a: [A_HOME] },
    ],
  },
  {
    h3: "Performance & Results",
    image: PHOTO.performance,
    items: [
      { q: "How many sessions do I need?", a: [A_WHAT] },
      { q: "Can I train immediately after?", a: [A_WHY] },
      { q: "Why is this more expensive than a standard stretch?", a: [A_HOME] },
    ],
  },
  {
    h3: "Logistics",
    image: PHOTO.logistics,
    items: [
      { q: "Where is StretchFLEX located?", a: [A_WHAT] },
      { q: "How do I book?", a: [A_WHY] },
    ],
  },
];

/** /our-packages/photobiotic-assisted-stretching — the live page's copy, headings and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "Photobiotic Assisted",
      accent: "Stretching™",
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "The Clinical Standard in Bio-Stacking",
              hand: "Bio-Stacking",
              p: [
                "**Why stretch in the dark? Upgrade your DNA with the StretchFLEX 7/7 Protocol.**",
                "At StretchFLEX, we don’t just move your limbs; we optimize your architecture. Our clinic utilizes Class IIa Medical Grade (ARTG/TGA Registered) technology. We “stack” your stretching session with high-intensity, multi-spectral light to trigger cellular-level repair.",
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
          image={PHOTO.tech}
          tone="navy"
          parts={[
            {
              h2: "The Tech: Why StretchFLEX is Different",
              hand: "Different",
              p: [
                "Most “red light” sessions use two basic wavelengths. We use a 9-Wavelength Spectrum (480nm – 1060nm) delivered by 432 dual-chip LEDs. This allows us to target every layer of your biology from skin surface to deep-seated connective tissue and bone.",
              ],
              checks: [
                "Medical Grade Precision: TGA & FDA registered (Class IIa).",
                "Extreme Irradiance: Delivering ≥ 183.1 mW/cm² of energy directly into your tissue ensuring a therapeutic dose in every 7-minute window.",
                "The 1060nm Advantage: We utilise deep-penetrating Near-Infrared (1060nm) to reach the thickest fascia and densest muscle groups.",
                "Clinical Safety: Zero EMF and flicker-free technology for pure biological fuel without the \"dirty electricity\" found in consumer-grade panels.",
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
        <QaSection
          name="protocol"
          title="The 7/7 Protocol: The Science of the Stack"
          handWord="Stack"
          image={PHOTO.protocol}
          actions={[{ label: "Book Appointment", href: BOOK }]}
          groups={[
            {
              items: [
                {
                  q: "Phase 01 | The 7-Minute Mitochondrial Prime",
                  a: [
                    "We flood your target muscle groups with a customised spectrum (630nm to 850nm). This triggers **Systemic Vasodilation**, releasing Nitric Oxide into the bloodstream to “thaw” the fascia. With a focused 30° lens angle, we ensure maximum light density, priming your cells to reach new ranges of motion.",
                  ],
                },
                {
                  q: "Phase 02 | The Assisted Stretch",
                  a: [
                    "Once your mitochondria are active and your tissues are pliable, our therapists perform a high-performance assisted stretch. Because our panels have a mild analgesic effect on your pain receptors, we can work deeper into the fascia with significantly less discomfort.",
                  ],
                },
                {
                  q: "Phase 03 | The 7-Minute Metabolic Flush",
                  a: [
                    "We close with a final dose focused on ATP Synthesis and lymphatic drainage. By utilising pulse frequencies (up to 10,000 Hz), we stimulate the cells to repair micro-tears and flush metabolic waste. This protocol virtually eliminates post-stretch soreness (DOMS), allowing you to jump back into your training immediately.",
                  ],
                },
              ],
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
          name="upgrade"
          title="Choose Your Architecture Upgrade"
          handWord="Upgrade"
          image={PHOTO.upgrade}
          actions={[{ label: "Book Appointment", href: BOOK }]}
          groups={[
            {
              items: [
                {
                  q: "01. The Rapid Reset",
                  a: [
                    "**$120 | 44 Minutes** (14m PBM + 30m Assisted Stretch) The high-efficiency session for the busy professional. This “bio-stack” delivers the mobility benefits of a 60-minute traditional stretch in nearly half the time. Perfect for targeted maintenance on specific problem areas.",
                  ],
                },
                {
                  q: "02. The Performance Protocol",
                  a: [
                    "**$145 | 59 Minutes** (14m PBM + 45m Assisted Stretch) Our signature service for full-body structural overhaul. With 9-wavelength priming, we navigate through deep-seated tension in the posterior chain. Leave feeling taller, lighter, and biologically recharged.",
                  ],
                },
                {
                  q: "03. The Architectural Overhaul",
                  a: [
                    "**$165 | 74 Minutes** (14m PBM + 60m Assisted Stretch) The total system reboot. This is for those who demand peak performance. 60 minutes of deep fascia work combined with our medical-grade 7/7 protocol ensures every major joint and muscle group is optimised. Zero downtime. Zero soreness.",
                  ],
                },
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <QaSection
          name="spectrum"
          title="Technical Specification Table (For the Tech-Savvy Client) Why Wavelengths Matter: The 9-Band Advantage"
          handWord="9-Band"
          lead={[
            "Not all light is created equal. While standard devices only hit the surface, the StretchFLEX medical-grade system uses a multi-spectral approach to treat the body from the skin level down to the bone.",
          ]}
          image={PHOTO.specs}
          top={
            <Image
              className="pk-spec"
              src={u("2026/04/stretchflex_clinical_specs_table.webp")}
              alt="StretchFLEX clinical specifications: nine wavelengths from 480nm to 1060nm, energy output of at least 183.1 mW/cm², TGA and FDA registered Class IIa, 1 to 10,000 Hz pulsed or continuous, zero EMF and flicker-free"
              width={900}
              height={475}
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          }
          groups={[
            {
              items: [
                {
                  q: "The Blue & Yellow Spectrum (480nm – 590nm)",
                  a: [
                    "**Surface Recovery:** These shorter wavelengths target the upper layers of the dermis. They help reduce surface-level inflammation and improve skin health, ensuring your body’s largest organ is as healthy as the muscles beneath it.",
                  ],
                },
                {
                  q: "The Deep Red Spectrum (630nm – 670nm)",
                  a: [
                    "**Mitochondrial Engine:** This is the “sweet spot” for cellular energy. These wavelengths are absorbed by the mitochondria to spike ATP production. This is the fuel that powers Phase 01 (The Prime) and Phase 03 (The Flush) of your session.",
                  ],
                },
                {
                  q: "The Near-Infrared Spectrum (810nm – 850nm)",
                  a: [
                    "**Fascial Fluidity:** These wavelengths penetrate much deeper into the muscle and connective tissue. By triggering the release of Nitric Oxide, they facilitate systemic vasodilation. This is what “thaws” the fascia, allowing our therapists to move your body into ranges of motion that were previously inaccessible.",
                  ],
                },
                {
                  q: "The Deep NIR Spectrum (1060nm)",
                  a: [
                    "**The Structural Anchor:** This rare, ultra-long wavelength reaches the deepest tissues, including tendons, ligaments, and even bone. It is essential for treating chronic, deep-seated stiffness that standard stretching and basic red light panels simply cannot reach.",
                  ],
                },
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
              h2: "Precision Control: Pulsing vs Continuous",
              hand: "Precision",
              p: [
                "Our panels don’t just stay “on.” We utilise adjustable pulse frequencies (1 to 10,000 Hz) to talk to your nervous system.",
              ],
              checks: [
                "Low Frequencies: Used to calm the nervous system and provide an analgesic (pain-relieving) effect during the stretch.",
                "High Frequencies: Used during the \"Metabolic Flush\" to stimulate lymphatic drainage and rapid cellular repair.",
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
          image={PHOTO.standard}
          tone="sky"
          reverse
          parts={[
            {
              h2: "The StretchFLEX Standard",
              hand: "Standard",
              p: [
                "By combining these nine specific wavelengths with an irradiance of ≥ 183.1 mW/cm², we provide a therapeutic dose of light that is significantly more powerful than consumer-grade devices. You are not just sitting in front of a light; you are undergoing a TGA-registered clinical treatment designed for structural optimisation.",
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "node",
      node: (
        <QaSection
          tone="navy"
          name="first"
          title="Your First Session: The Photobiotic Experience"
          titleLevel={3}
          handWord="First"
          lead={[
            "Preparing for a session at StretchFLEX is simple. Because we use medical-grade technology and targeted manual therapy, follow these steps to ensure you get the most out of your biological upgrade.",
          ]}
          groups={[
            {
              items: [
                {
                  q: "01. What to Wear",
                  a: ["To achieve maximum results, the light needs to reach your skin or be filtered through thin, light-coloured clothing."],
                  list: [
                    "**Recommended:** Wear comfortable, flexible gym attire such as shorts and a t-shirt or tank top.",
                    "**Avoid:** Heavy fabrics like denim, thick sweaters, or dark-coloured hoodies, as these will block the light from reaching your target muscle groups.",
                  ],
                },
                {
                  q: "02. Hydration is Key",
                  a: ["Photobiomodulation and deep fascia work both rely on the fluid state of your body."],
                  list: [
                    "**Before:** Drink at least 500ml of water in the hour leading up to your session. Hydrated fascia is more pliable and responds faster to our 9-band light spectrum.",
                    "**After:** Continue to hydrate. The “Metabolic Flush” phase helps your body move waste products out of your system, and water is the primary vehicle for this process.",
                  ],
                },
                {
                  q: "03. Arrive Early",
                  a: [
                    "We recommend arriving 5 to 10 minutes before your scheduled time. This allows you to settle into the clinical environment and discuss any specific “problem areas” or performance goals with your therapist before we begin the 7-minute Mitochondrial Prime.",
                  ],
                },
                {
                  q: "04. What to Expect During the 7/7 Protocol",
                  list: [
                    "**The Sensation:** You will feel a gentle, internal warmth as your blood vessels dilate. This is not a surface heat like a sauna but a result of increased circulation.",
                    "**The Analgesic Effect:** You may notice that you can move deeper into a stretch than usual with significantly less “pinch” or discomfort. This is the light working on your pain receptors.",
                    "**The Energy Boost:** Many clients report feeling a “second wind” after their session. This is the result of the ATP spike in your cells.",
                  ],
                },
                {
                  q: "05. Post-Session Recovery",
                  a: [
                    "Unlike traditional deep-tissue work or heavy stretching, there is zero downtime. You do not need to wait 24 hours to train. In fact, many of our elite athletes head straight to the gym or the field to capitalise on their new range of motion and increased cellular energy.",
                  ],
                },
              ],
            },
          ]}
        />
      ),
    },
    {
      type: "cta",
      title: "Ready to Upgrade Your Architecture?",
      hand: "Upgrade",
      action: { label: "Book your Initial Consultation", href: BOOK },
    },
    ...QA.map((group, i) => ({
      type: "node" as const,
      node: (
        <QaSection
          key={group.h3}
          tone={i % 2 === 0 ? "blush" : "rose"}
          name={`qa-${i}`}
          title={i === 0 ? "The Comprehensive Q&A" : group.h3}
          titleLevel={i === 0 ? 2 : 3}
          handWord={i === 0 ? "Q&A" : undefined}
          image={group.image}
          actions={i === QA.length - 1 ? [{ label: "Book Appointment", href: BOOK }] : undefined}
          groups={[{ h3: i === 0 ? group.h3 : undefined, items: group.items }]}
        />
      ),
    })),
    { type: "reviews" },
  ],
};

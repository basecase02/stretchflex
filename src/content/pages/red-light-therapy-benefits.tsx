import { HeadingCta, QaSection, RichSplit, RichText } from "@/components/pages/packages/parts";
import type { Img } from "@/content/blocks";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/booking/MVTOqV0wwbLnoUZ06noD";
const u = (path: string) => `/wp-content/uploads/${path}`;

/** The live page's photos, in the sections they sit in there. */
const PHOTO = {
  // The live hero photo (Red-Lights.jpg) is only 275px wide, so it would be blurry; this is the page's own 1200px photo.
  hero: { src: u("2026/06/Red-light-therapy-Perth.jpg"), alt: "A client with her eyes closed in front of a glowing red light therapy panel", position: "50% 40%" },
  what: { src: u("2026/06/LED-Red-Light-1-1.jpg"), alt: "A woman standing in front of a glowing red light therapy panel", position: "50% 40%" },
  different: { src: u("2026/06/Stretchflex-52-1.jpg"), alt: "A client standing between two twin red light therapy panels", position: "50% 45%" },
  spectrum: { src: u("2026/06/StretchFLEX15.jpg"), alt: "A StretchFLEX therapist checking in a client at the front desk", position: "45% 45%" },
  precision: { src: u("2026/06/Stretchflex-50.jpg"), alt: "A client standing side-on between two red light panels", position: "50% 45%" },
  irradiance: { src: u("2026/06/StretchFLEX-123.webp"), alt: "A woman standing between two mobile red light therapy panels", position: "50% 45%" },
  nir: { src: u("2026/06/Red-light-Therapy-01.jpg"), alt: "A woman relaxing between two red light therapy panels", position: "50% 35%" },
  supporting: { src: u("2026/06/Stretchflex-53.jpg"), alt: "A client checking in at the StretchFLEX reception", position: "50% 45%" },
  safety: { src: u("2026/06/stretchflex-56-1.jpg"), alt: "A smiling StretchFLEX therapist welcoming a client to the studio", position: "40% 40%" },
  who: { src: u("2026/06/Red-light-therapy-02.jpg"), alt: "A client relaxing beside a red light therapy panel", position: "50% 35%" },
  who2: { src: u("2026/06/Red-light-therapy.jpg"), alt: "A man standing between two red light therapy panels", position: "50% 40%" },
} satisfies Record<string, Img>;

/** /our-packages/red-light-therapy-benefits — the live page's copy, headings and photos ("Pannel" and "Theraphy" spelled correctly). */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      crumbs: [{ label: "Our Packages", href: "/our-packages" }],
      title: "NEW Red Light LED Therapy",
      accent: "in The Perth CBD",
      image: PHOTO.hero,
    },
    {
      type: "node",
      node: (
        <RichText
          parts={[
            {
              h2: "Advanced Medical-Grade Twin Panel Red Light Therapy at StretchFLEX",
              hand: "Twin",
              p: [
                "**Recharge. Recover. Perform.**",
                "Your body works hard every day.",
                "Whether you’re sitting at a desk, training at the gym, recovering from injury, dealing with chronic tension, or simply feeling the effects of modern life, your body needs the right tools to repair, recover, and perform at its best.",
                "At the New StretchFLEX Studio in Perth , we’ve invested in one of Australia’s most advanced Red Light LED Therapy systems, delivering FDA approved medical-grade light energy designed to support recovery, circulation, cellular regeneration, mobility, and overall wellbeing.",
                "This isn’t the same technology found in the average home-use panel or beauty salon treatment.",
                "This is professional-grade photobiomodulation designed to fuel your body’s natural recovery systems at a cellular level.",
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
          image={PHOTO.what}
          tone="navy"
          parts={[
            {
              h2: "What Is Twin Panel Red Light LED Therapy?",
              hand: "Twin",
              p: [
                "Red Light LED Therapy uses specific wavelengths of light to stimulate the mitochondria within your cells.",
                "Often referred to as the “power stations” of the body, mitochondria are responsible for producing the energy required for healing, repair, recovery, and optimal function.",
                "When exposed to the correct therapeutic wavelengths, cells can produce energy more efficiently, helping support:",
              ],
              list: [
                "Muscle recovery",
                "Reduced stiffness and soreness",
                "Improved circulation",
                "Enhanced mobility",
                "Skin rejuvenation",
                "Exercise recovery",
                "Joint health",
                "Cellular repair and regeneration",
                "General wellness and vitality",
              ],
            },
            { p: ["The result is a treatment that helps your body perform what it is naturally designed to do, only more efficiently."] },
          ]}
        />
      ),
    },
    {
      type: "cta",
      title: "Looking for Assisted Stretching & Red Light Therapy? Try Photobiotic Stretching",
      hand: "Photobiotic",
      action: { label: "Find Out More", href: "/our-packages/photobiotic-assisted-stretching" },
    },
    {
      type: "node",
      node: (
        <RichSplit
          image={PHOTO.different}
          tone="rose"
          reverse
          parts={[
            {
              h2: "Why StretchFLEX Is Different",
              hand: "Different",
              p: [
                "Many red light therapy providers utilise only one or two basic wavelengths.",
                "While these systems can still provide benefits, they only target a limited range of tissue depths.",
                "StretchFLEX takes a completely different approach.",
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
          image={PHOTO.spectrum}
          tone="sky"
          parts={[
            {
              h2: "9-Wavelength Full Spectrum Technology",
              hand: "Full",
              p: [
                "Most “red light” sessions use two basic wavelengths.",
                "StretchFLEX utilises an advanced 9-Wavelength Spectrum ranging from 480nm through to 1060nm, delivered by 432 dual-chip LEDs.",
                "This broad spectrum allows us to target multiple layers of your biology simultaneously, including:",
              ],
              list: [
                "Skin surface tissues",
                "Circulatory systems",
                "Muscle tissue",
                "Fascia and connective tissue",
                "Tendons and ligaments",
                "Joint structures",
                "Deep muscular tissue",
                "Bone-supporting structures",
              ],
            },
            {
              p: ["Rather than targeting just one layer, our technology provides comprehensive whole-body support from the outside in."],
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
          image={PHOTO.precision}
          tone="navy"
          reverse
          parts={[
            {
              h2: "Medical-Grade Precision",
              hand: "Precision",
              p: ["Not all red light therapy devices are created equal.", "Our system is:"],
              list: [
                "TGA Registered (Class IIa)",
                "FDA Registered (Class IIa)",
                "Built to clinical standards",
                "Designed for professional therapeutic applications",
              ],
            },
            {
              p: [
                "This provides confidence that you are receiving treatment from technology developed with safety, reliability, and therapeutic outcomes in mind.",
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
          image={PHOTO.irradiance}
          tone="rose"
          parts={[
            {
              h2: "Extreme Irradiance for Faster Results",
              hand: "Faster",
              p: [
                "One of the most important factors in effective Red Light Therapy is irradiance.",
                "In simple terms, this is the amount of light energy that actually reaches your tissues.",
                "Many consumer-grade systems simply don’t deliver enough energy to provide a meaningful therapeutic dose.",
                "StretchFLEX delivers: **≥183.1 mW/cm²** of concentrated therapeutic energy directly into your tissues.",
                "This exceptional output ensures a clinically meaningful dose is delivered during every 7-minute treatment window, helping maximise efficiency and effectiveness.",
                "**Less waiting.**",
                "**More therapeutic impact.**",
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
          image={PHOTO.nir}
          tone="navy"
          reverse
          parts={[
            {
              h2: "The 1060nm Advantage",
              hand: "Advantage",
              p: [
                "This is where our technology truly stands apart.",
                "Most red light therapy systems stop well before reaching the 1060nm Near Infrared wavelength.",
                "StretchFLEX incorporates deep-penetrating 1060nm technology specifically designed to reach:",
              ],
              list: ["Deep fascia", "Large muscle groups", "Dense connective tissue", "Areas traditional red light often struggles to access"],
            },
            {
              p: [
                "For athletes, office workers, active adults, and anyone experiencing deep muscular tightness, this wavelength provides a significant advantage.",
                "It’s one of the reasons our technology is rapidly becoming a preferred choice for advanced recovery and performance optimisation.",
                "**Naturally Boost Healing & Reduce Inflammation**",
              ],
              actions: [{ label: "Book your Red Light Therapy Today", href: BOOK, tone: "light" }],
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
          name="supporting"
          title="Supporting Stretching, Mobility and Recovery"
          handWord="Recovery"
          lead={[
            "At StretchFLEX, Red Light Therapy works exceptionally well alongside our assisted stretching services.",
            "By helping prepare muscles and connective tissues before stretching, and supporting recovery afterwards, many clients find the combination creates a powerful recovery and mobility experience.",
            "Benefits may include:",
          ]}
          image={PHOTO.supporting}
          groups={[
            {
              items: [
                { q: "Improved Flexibility", a: ["Supporting tissue elasticity and movement."] },
                { q: "Enhanced Recovery", a: ["Helping the body recover following physical activity."] },
                { q: "Reduced Muscle Tightness", a: ["Supporting healthy muscular function and mobility."] },
                { q: "Better Circulation", a: ["Assisting oxygen and nutrient delivery throughout the body."] },
                { q: "Performance Support", a: ["Helping active individuals maintain movement quality and recovery."] },
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
          image={PHOTO.safety}
          tone="sky"
          reverse
          parts={[
            {
              h2: "Clinical Safety You Can Trust",
              hand: "Trust",
              p: [
                "Many low-cost consumer devices create unnecessary electrical interference and inconsistent light delivery.",
                "StretchFLEX uses:",
              ],
              list: ["Zero EMF technology", "Flicker-free operation", "Medical-grade engineering", "Consistent light output"],
            },
            {
              p: [
                "This means your body receives pure biological energy without the “dirty electricity” often associated with lower-quality devices.",
                "The experience is comfortable, relaxing, and designed with safety as a priority.",
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
          name="who"
          title="Who Can Benefit From Red Light LED Therapy?"
          handWord="Benefit"
          lead={["Our clients come from all walks of life, including:"]}
          image={PHOTO.who}
          image2={PHOTO.who2}
          groups={[
            {
              items: [
                { q: "Office Professionals", a: ["Counteracting the effects of long hours sitting at a desk."] },
                { q: "Athletes and Fitness Enthusiasts", a: ["Supporting recovery, mobility, and performance."] },
                { q: "Active Adults", a: ["Maintaining flexibility and physical wellbeing."] },
                { q: "People Experiencing Muscle Tightness", a: ["Helping support mobility and movement quality."] },
                { q: "Individuals Focused on Healthy Ageing", a: ["Supporting circulation, recovery, and overall wellness."] },
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
          parts={[
            {
              h2: "Experience Perth's Next Generation Recovery Technology",
              hand: "Generation",
              p: [
                "At StretchFLEX Perth CBD, we’re passionate about helping people move better, feel better, and perform better.",
                "By combining advanced assisted stretching techniques with one of the most sophisticated Red Light LED Therapy systems available, we provide a recovery experience that goes beyond traditional wellness treatments.",
                "If you’re looking for premium Red Light Therapy in Perth, discover the difference that medical-grade technology, advanced wavelengths, and professional expertise can make.",
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
        <HeadingCta
          title="Book Your StretchFLEX Twin Panel Red Light LED Therapy Session Today"
          handWord="Today"
          body={[
            "Experience the power of 432 dual-chip LEDs, 9 therapeutic wavelengths, deep-penetrating 1060nm technology, and medical-grade precision.",
            "Your recovery starts here.",
          ]}
          action={{ label: "Book Appointment", href: BOOK }}
        />
      ),
    },
    { type: "reviews" },
  ],
};

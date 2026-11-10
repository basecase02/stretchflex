import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /about — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      title: "About",
      accent: "StretchFlex",
      intro: "We specialise in assisted stretching and mobility therapy designed to reduce tension, improve flexibility, and restore balance to your body.",
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
      image: { src: u("2026/02/openart-image_aAWfT-1G_1770268632537_raw.webp"), alt: "A smiling StretchFLEX therapist at the studio front desk", position: "30% 40%" },
    },
    {
      type: "split",
      title: "Our Philosophy: Movement Is Medicine",
      hand: "Medicine",
      image: { src: u("2026/06/SF-60.jpg"), alt: "A StretchFLEX therapist chatting with a client in the studio", position: "50% 35%" },
      tone: "rose",
      body: [
        "At StretchFlex, we see movement as more than just exercise; it is the foundation of a healthy, fulfilling life. Our philosophy is built on three key pillars: mobility, mindfulness, and maintenance.",
      ],
      list: [
        "Mobility means giving your body the freedom to move without restriction.",
        "Mindfulness means paying attention to how your body feels and moves each day.",
        "Maintenance means supporting long-term results through consistent care and personalised guidance.",
      ],
      after: [
        "We combine proven stretching techniques with professional expertise to deliver results that go beyond temporary relief. Every session is designed to help you move smarter, prevent future tightness, and feel better in your daily life.",
      ],
    },
    {
      type: "cards",
      tone: "rose",
      kicker: "Our Services",
      title: "What Do We Offer",
      hand: "Offer",
      lead: "We specialise in guided stretching and mobility sessions that target muscle imbalances, joint stiffness, and postural issues. Each service is tailored to your unique body, goals, and comfort level. Our core services include:",
      items: [
        {
          title: "Assisted Stretching",
          body: "Our assisted stretching sessions are designed to gently and effectively improve your flexibility, range of motion, and muscle function.",
          image: { src: u("2026/06/SF62.jpg"), alt: "A StretchFLEX therapist assisting a client with a quad stretch on the treatment table", position: "40% 50%" },
        },
        {
          title: "Flexibility and Mobility Services",
          body: "We offer a range of specialised services to address your specific mobility concerns, whether you’re recovering from an injury, seeking to improve athletic performance, or simply wanting to enhance your daily comfort.",
          image: { src: u("2026/03/StretchFLEX37.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder and arm", position: "55% 45%" },
        },
        {
          title: "Private Safe Environment",
          body: "We provide a safe, comfortable, and supportive environment exclusively, fostering a sense of community and understanding.",
          image: { src: u("2026/06/openart-image_f1Y6t1CT_1780474264127_raw.jpg"), alt: "A client checking in at the StretchFLEX front desk in Perth", position: "50% 45%" },
        },
      ],
    },
    { type: "cta", action: { label: "Book Appointment", href: BOOK_GROUP } },
    {
      type: "cards",
      style: "notes",
      kicker: "Key Benefits",
      title: "Why Choose StretchFlex?",
      hand: "Choose",
      items: [
        { title: "Expert Care", body: "Our Stretch & Flexologists are highly trained and experienced." },
        { title: "Personalised Approach", body: "We tailor our services to your individual needs and goals." },
        { title: "Private Environment", body: "We provide a safe, supportive, and private space." },
        { title: "Focus on Results", body: "We are committed to helping you achieve your desired outcomes." },
        { title: "Holistic Wellness", body: "We prioritise your overall well-being." },
      ],
    },
    {
      type: "text",
      tone: "navy",
      title: "Our Commitment to You",
      hand: "You",
      body: [
        "We know that every person who walks through our doors has a different story, from athletes chasing performance to professionals managing desk-related tension. Our mission is to create a welcoming, inclusive space where everyone feels supported, heard, and cared for.",
        "We take pride in building real relationships with our clients. You are not just booking a session; you are investing in your long-term wellbeing with a team that genuinely cares about your progress.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK_GROUP, tone: "light" }],
    },
    { type: "reviews" },
    { type: "contact" },
  ],
};

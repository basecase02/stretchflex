import { createElement } from "react";
import { RichAccordion, type Rich } from "@/components/pages/info/info-blocks";
import { faqJsonLd } from "@/components/pages/info/team";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const FAQS: { title: string; body: Rich[] }[] = [
  {
    title: "What is assisted stretching?",
    body: ["Assisted stretching means a qualified stretch specialist physically guides your body through a series of targeted stretches to help you move deeper and safer than you might on your own. It’s like having a flexibility co-pilot to explore your body’s range of motion."],
  },
  {
    title: "What happens in a session?",
    body: ["Your session begins with a friendly chat to understand your goals, lifestyle and any areas of tension. Then your therapist guides you through personalised stretches, adjusts in real time for safety and effectiveness, and finishes with simple after-care tips you can use at home."],
  },
  {
    title: "Do I need to be fit or experienced?",
    body: ["Nope. All fitness levels are welcome and you don’t need any stretching experience. Beginners, regular exercisers, athletes and desk workers can all benefit."],
  },
  {
    title: "Can assisted stretching help with pain or stiffness?",
    body: ["Yes. Gentle, guided stretching helps release muscle tension, reduce stiffness, and can ease discomfort from tight muscles, improving how your body feels day-to-day."],
  },
  {
    title: "What are the benefits?",
    body: [
      {
        list: [
          "Improved flexibility and range of motion",
          "Reduced muscle tension",
          "Better posture and alignment",
          "Enhanced athletic performance",
          "Lower risk of injury",
          "Stress relief and relaxation",
        ],
      },
    ],
  },
  {
    title: "How long is a session and what are my options?",
    body: ["We offer a range of session lengths and styles to match your needs — from rapid 20-minute resets to longer 60-minute deep work sessions. You can book the one that suits your goals and schedule."],
  },
  {
    title: "How often should I come?",
    body: ["Regularity depends on your goals. Some people enjoy the maintenance vibe once a week, others start with a couple of sessions for deeper improvement. Ask your therapist for a plan that fits your lifestyle."],
  },
  {
    title: "Is assisted stretching safe?",
    body: ["Absolutely. Our therapists are trained to ensure you get effective, safe stretching every time, with adjustments made for comfort and alignment. If you have specific health conditions or injuries, just let us know so we can tailor the session."],
  },
  {
    title: "What if I have an injury or health condition?",
    body: ["If you have an existing injury, recent surgery or a specific medical condition, it’s a great idea to check with your health professional first. Once cleared, your therapist will adapt stretches to suit your needs."],
  },
  {
    title: "Do I need to stretch between visits?",
    body: ["You’ll get personalised take-home stretches and mobility tips after your session to maximise your results between appointments."],
  },
  {
    title: "Can I make stretching part of my fitness routine?",
    body: ["Yes! Assisted stretching pairs beautifully with workouts, recovery days, athletic training, or just as self-care to keep your body feeling limber and ready for life’s little adventures."],
  },
  {
    title: "What do I need to bring?",
    body: ["Just yourself, and a drink. We provide everything you will need."],
  },
  {
    title: "I’m really not flexible will it hurt?",
    body: ["A little bit, but we never push you too far, as you get more flexible, we can push a little more."],
  },
];

/** Plain text of an answer, for the structured data. */
const plain = (body: Rich[]) =>
  body.map((part) => (typeof part === "string" ? part : "list" in part ? part.list.join(". ") + "." : part.h3)).join(" ");

/** /faqs — content from the live page. */
export const page: PageContent = {
  blocks: [
    faqJsonLd(FAQS.map((item) => ({ q: item.title, a: plain(item.body) }))),
    {
      type: "hero",
      title: "FAQs",
      intro: "We specialise in assisted stretching and mobility therapy designed to reduce tension, improve flexibility, and restore balance to your body.",
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
      image: { src: "/wp-content/uploads/2026/02/openart-image_aAWfT-1G_1770268632537_raw.webp", alt: "A smiling StretchFLEX therapist at the studio front desk", position: "30% 40%" },
    },
    {
      type: "node",
      node: createElement(RichAccordion, {
        name: "faqs",
        tone: "rose",
        title: "Frequently Asked Questions",
        hand: "Asked",
        items: FAQS,
        actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
      }),
    },
    { type: "cta", action: { label: "Book Appointment", href: BOOK_GROUP } },
    { type: "contact" },
  ],
};

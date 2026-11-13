import { createElement } from "react";
import { Savings } from "@/components/pages/info/info-blocks";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /membership — content from the live page. */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      title: "Membership",
      accent: "The Smart Choice",
      facts: ["$480/Month"],
      intro: "Minimum 3 months – Save $240 monthly",
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
      image: { src: u("2026/03/StretchFLEX37.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder and arm", position: "55% 45%" },
    },
    {
      type: "cards",
      id: "what-you-get",
      tone: "rose",
      title: "What You Get Every Month",
      hand: "Every",
      items: [
        { title: "4 × Ultimate Stretch Sessions (60 min)", meta: "Value $480", image: { src: u("2026/03/StretchFLEX39.jpg"), alt: "A therapist guiding a client through an assisted back extension stretch", position: "45% 50%" } },
        { title: "2 × Compression & Mindfulness Sessions", meta: "Value $240", image: { src: u("2026/03/StretchFlex-47.jpg"), alt: "A client relaxing in compression recovery boots with a mindfulness headset at StretchFLEX", position: "50% 60%" } },
      ],
    },
    {
      type: "node",
      node: createElement(Savings, {
        title: "Over 3 Months You Save $720!",
        figures: [
          { label: "Total Monthly Value", value: "$720" },
          { label: "You Pay", value: "$480" },
          { label: "Monthly Savings", value: "$240" },
        ],
        action: { label: "Book Appointment", href: BOOK_GROUP, tone: "light" },
      }),
    },
    {
      type: "cta",
      title: "Get Mobile with Assisted Stretching",
      hand: "Mobile",
      action: { label: "Book Appointment", href: BOOK_GROUP },
    },
    {
      type: "accordion",
      title: "Member Benefits",
      hand: "Benefits",
      items: [
        {
          title: "Consistent progress without big upfront costs",
          body: "Steady progress with affordable monthly investment – Build your mobility journey gradually without the burden of large upfront payments, making consistent improvement accessible and sustainable for your budget.",
        },
        {
          title: "Flexibility to adjust as your needs change",
          body: "Adaptable membership that evolves with you – Modify your plan as your fitness level, schedule, or mobility goals change, ensuring your membership always aligns with your current needs and lifestyle.",
        },
        {
          title: "Priority booking for preferred times",
          body: "Reserved access to your most convenient appointment slots – Secure your preferred time slots before they’re available to non-members, giving you the scheduling flexibility that fits seamlessly into your routine.",
        },
        {
          title: "Member-only wellness tips and resources",
          body: "Exclusive wellness insights and expert guidance – Receive curated tips, specialised resources, and professional advice available only to members, empowering you with the knowledge to accelerate your mobility progress.",
        },
        {
          title: "Exclusive invitations to rejuvenating health and wellness retreats",
          body: "Join us for immersive experiences designed to restore your body and mind while connecting with like-minded individuals focused on optimal mobility and wellbeing.",
        },
        {
          title: "Priority access to new product launches and hands-on workshops",
          body: "Be among the first to experience our latest mobility solutions and participate in expert-led sessions that teach you how to maximise your movement potential and address specific mobility challenges.",
        },
        {
          title: "Exclusive savings on premium supplements and nutritional products",
          body: "Enjoy member-only discounts on our carefully curated selection of high-quality supplements and nutritional solutions, making it more affordable to fuel your body with the nutrients that support optimal mobility and recovery.",
        },
      ],
      actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
    },
  ],
};

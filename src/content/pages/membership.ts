import { createElement } from "react";
import { Collection, SmallPrint } from "@/components/pages/membership/collection";
import { PHOTOS } from "@/content/photos";
import { PHONE } from "@/content/site";
import type { PageContent } from "./types";

const POLICY = "[Refund and Cancellation Policy](/refund-and-cancellation-policy)";

/** /membership: the client's content document (Membership). */
export const page: PageContent = {
  blocks: [
    {
      type: "hero",
      kicker: "StretchFLEX membership",
      heading: "Stretching memberships in Perth",
      title: "Your body is your greatest asset.",
      accent: "Invest in it.",
      intro: "Two professional sessions every week from $89, saving up to $120 a week compared with booking each session individually.",
      actions: [
        { label: "Assisted Stretching · from $89/week", href: "#assisted-stretching" },
        { label: "Performance & Recovery · from $250/week", href: "#performance-recovery", tone: "line" },
      ],
      trust: ["Two sessions every week", "Priority booking", "Billed weekly, GST included"],
      image: PHOTOS.shoulder,
    },
    {
      type: "node",
      node: createElement(Collection, {
        id: "assisted-stretching",
        kicker: "Collection one",
        title: "Assisted Stretching Memberships",
        strap: "Two therapist-guided sessions every week, so you can build a consistent routine and make real progress towards your movement goals.",
        tiers: [
          {
            slug: "revive",
            name: "Revive",
            tagline: "Your foundation for better movement.",
            body: [
              "Ideal if you are introducing regular assisted stretching into your lifestyle. Two 30-minute sessions each week let you address areas of tightness, maintain flexibility and give your body the consistent attention it deserves.",
            ],
            includes: [
              "2 × Revive Stretch sessions (30 minutes) every week",
              "Professional, therapist-guided stretching",
              "Regular attention to flexibility and mobility",
              "A consistent weekly recovery routine",
              "Priority booking for your preferred times",
            ],
            price: "$89",
            was: "$130",
            save: "$41",
            facts: ["$44.50 per session", "3-month minimum"],
          },
          {
            slug: "prime",
            name: "Prime",
            tagline: "More time. More attention. Better movement.",
            body: [
              "For those ready to take their flexibility and mobility routine further. Two 45-minute sessions each week give your therapist time to work through multiple areas of the body and address your individual movement needs.",
              "Whether you train hard, manage a demanding schedule or simply want to look after your body properly, Prime gives you more time to do it.",
            ],
            includes: [
              "2 × Prime Mobility Stretch sessions (45 minutes) every week",
              "Extended therapist-guided stretching",
              "More time for targeted flexibility and mobility work",
              "Personalised attention to your movement needs",
              "Priority booking for your preferred times",
            ],
            price: "$139",
            was: "$190",
            save: "$51",
            facts: ["$69.50 per session", "3-month minimum"],
          },
          {
            slug: "ultimate",
            name: "Ultimate",
            tagline: "Our most complete stretching membership.",
            body: [
              "For those who refuse to compromise on their physical wellbeing. Two 60-minute sessions each week give you the most dedicated therapist time in our Assisted Stretching collection, with room for a thorough, full-body approach to flexibility, mobility and recovery.",
            ],
            includes: [
              "2 × The Ultimate Stretch sessions (60 minutes) every week",
              "Comprehensive therapist-guided stretching",
              "Extended time for full-body mobility and flexibility work",
              "Individual attention to multiple areas of restriction",
              "Priority booking for your preferred times",
            ],
            price: "$180",
            was: "$240",
            save: "$60",
            facts: ["$90 per session", "3-month minimum"],
          },
        ],
        compare: {
          head: ["Membership", "Weekly sessions", "Per session", "Regular value", "Your price", "Weekly saving"],
          rows: [
            ["Revive", "2 × 30 min", "$44.50", "$130", "**$89**", "$41"],
            ["Prime", "2 × 45 min", "$69.50", "$190", "**$139**", "$51"],
            ["Ultimate", "2 × 60 min", "$90", "$240", "**$180**", "$60"],
          ],
        },
        note: "All Assisted Stretching Memberships have a minimum three-month (13-week) commitment. Minimum total cost: Revive $1,157, Prime $1,807, Ultimate $2,340. Prices are in AUD, include GST and are billed weekly by direct debit.",
      }),
    },
    {
      type: "node",
      node: createElement(Collection, {
        id: "performance-recovery",
        dark: true,
        kicker: "Collection two",
        title: "Performance & Recovery Memberships",
        strap: "Beyond stretching. Each membership brings together two of our signature experiences, every week.",
        features: [
          { title: "Photobiotic Assisted Stretching™", body: "A 7-minute light prime, your assisted stretch, then a 7-minute light flush." },
          { title: "The De-Compression Recovery Stack", body: "20 minutes of pneumatic compression, non-invasive vagus nerve stimulation and guided mindfulness." },
        ],
        tiers: [
          {
            slug: "bronze",
            name: "Bronze",
            tagline: "Your introduction to integrated recovery.",
            body: [
              "Designed for those ready to take their routine beyond conventional stretching. Each week you receive two Photobiotic Assisted Stretching sessions and one De-Compression Recovery Stack: mobility work, light technology and dedicated recovery time in one plan.",
            ],
            includes: [
              "2 × The Rapid Reset (44 minutes: 30-minute assisted stretch plus 14 minutes of photobiomodulation) every week",
              "1 × De-Compression Recovery Stack (20 minutes) every week",
              "Professionally guided assisted stretching",
              "Priority booking for your preferred times",
            ],
            price: "$250",
            was: "$360",
            save: "$110",
            facts: ["2 × 44 min + 1 × 20 min recovery", "4-week minimum"],
            after: "Three dedicated recovery experiences every week. One smarter way to look after your body.",
          },
          {
            slug: "silver",
            name: "Silver",
            tagline: "Elevate your recovery. Support your performance.",
            body: [
              "Silver takes your mobility and recovery to another level. Two extended Photobiotic Assisted Stretching sessions and one De-Compression Recovery Stack each week give you more time for comprehensive stretching alongside advanced recovery technology.",
              "Ideal for active individuals, fitness enthusiasts and busy professionals who want a more complete approach to their physical wellbeing.",
            ],
            includes: [
              "2 × The Performance Protocol (59 minutes: 45-minute assisted stretch plus 14 minutes of photobiomodulation) every week",
              "1 × De-Compression Recovery Stack (20 minutes) every week",
              "Extended therapist-guided stretching",
              "Targeted flexibility and mobility work",
              "Priority booking for your preferred times",
            ],
            price: "$295",
            was: "$410",
            save: "$115",
            facts: ["2 × 59 min + 1 × 20 min recovery", "4-week minimum"],
            after: "More time for mobility. More time for recovery. More value every week.",
          },
          {
            slug: "gold",
            name: "Gold",
            tagline: "The complete StretchFLEX experience.",
            body: [
              "Our most comprehensive membership, for those who place a high priority on movement quality and consistent recovery. Gold combines two full Photobiotic Assisted Stretching sessions with one De-Compression Recovery Stack every week, giving you the most therapist time and the fullest access to our integrated recovery technology.",
            ],
            includes: [
              "2 × The Architectural Overhaul (74 minutes: 60-minute assisted stretch plus 14 minutes of photobiomodulation) every week",
              "1 × De-Compression Recovery Stack (20 minutes) every week",
              "Comprehensive therapist-guided stretching",
              "Extended full-body flexibility and mobility work",
              "Priority booking for your preferred times",
            ],
            price: "$330",
            was: "$450",
            save: "$120",
            facts: ["2 × 74 min + 1 × 20 min recovery", "4-week minimum"],
            after: "Three premium recovery experiences every week. One exceptional commitment to your body.",
          },
        ],
        compare: {
          head: ["Included each week", "Bronze", "Silver", "Gold"],
          rows: [
            ["Photobiotic Assisted Stretching", "2 × 44 min", "2 × 59 min", "2 × 74 min"],
            ["Assisted stretch per session", "30 min", "45 min", "60 min"],
            ["Photobiomodulation per session", "14 min", "14 min", "14 min"],
            ["De-Compression Recovery Stack", "1 × 20 min", "1 × 20 min", "1 × 20 min"],
            ["Regular weekly value", "$360", "$410", "$450"],
            ["Membership price", "**$250**", "**$295**", "**$330**"],
            ["Weekly saving", "$110", "$115", "$120"],
          ],
        },
        note: "All Performance & Recovery Memberships have a minimum four-week commitment. Minimum total cost: Bronze $1,000, Silver $1,180, Gold $1,320. Prices are in AUD, include GST and are billed weekly by direct debit.",
      }),
    },
    {
      type: "cards",
      id: "why",
      title: "Why become a StretchFLEX member?",
      hand: "member",
      lead: "**Consistency creates results.** The real value of membership isn't only the money you save. It's a consistent relationship with your body's movement, recovery and wellbeing.",
      items: [
        { title: "A more consistent routine", body: "Regular appointments help you prioritise your physical wellbeing instead of postponing it." },
        { title: "Exceptional value", body: "Save substantially compared with booking the same sessions individually." },
        { title: "Professional guidance", body: "Dedicated therapist-guided stretching and structured recovery experiences." },
        { title: "Advanced technology", body: "Professional-grade photobiomodulation and integrated recovery technology as part of your regular routine." },
        { title: "A commitment to yourself", body: "Make flexibility, mobility and recovery part of your lifestyle, not an afterthought." },
      ],
    },
    {
      type: "checklist",
      id: "benefits",
      tone: "rose",
      title: "Exclusive member benefits",
      hand: "member",
      lead: "Every StretchFLEX membership includes:",
      items: [
        { title: "Priority booking:", body: "reserve your preferred times before they open to casual bookings." },
        { title: "Member-only wellness resources:", body: "curated tips, resources and professional advice to support you between sessions." },
        { title: "Retreat invitations:", body: "exclusive invitations to StretchFLEX health and wellness retreats." },
        { title: "Workshops and launches:", body: "priority access to new product launches and hands-on workshops." },
        { title: "Supplement savings:", body: "exclusive member pricing on premium supplements and nutritional products." },
      ],
    },
    {
      type: "accordion",
      faq: true,
      id: "faqs",
      title: "Membership questions, answered",
      hand: "answered",
      items: [
        {
          title: "What is the difference between the two collections?",
          body: "Assisted Stretching Memberships focus on regular therapist-guided stretching. Performance & Recovery Memberships combine Photobiotic Assisted Stretching (assisted stretching with photobiomodulation) with a weekly De-Compression Recovery Stack for a more complete recovery experience.",
        },
        {
          title: "How long do I need to commit?",
          body: "Assisted Stretching Memberships have a minimum three-month commitment. Performance & Recovery Memberships have a minimum four-week commitment. After the minimum term, your membership continues week to week until you cancel.",
        },
        {
          title: "How am I billed?",
          body: "Memberships are billed weekly by direct debit. All prices are in Australian dollars and include GST.",
        },
        {
          title: "How do my sessions work each week?",
          body: "Your membership includes two stretching sessions every week, plus one De-Compression Recovery Stack on Performance & Recovery Memberships. Sessions are allocated weekly and do not carry over to the following week, so we recommend booking your regular times in advance.",
        },
        {
          title: "What if I need to cancel or miss a session?",
          body: `Please give at least 24 hours notice so we can rebook your session within the same week where possible. In line with our ${POLICY}, sessions cancelled with less than 24 hours notice, and missed appointments, are forfeited.`,
        },
        {
          title: "Can I pause my membership?",
          body: "Yes. Each membership includes one 30-day hold, requested in writing by email or in person at the studio.",
        },
        {
          title: "Can I upgrade my membership?",
          body: "Yes. Speak with our team about moving to a higher tier and we will explain your options and any adjustment to your weekly payment.",
        },
        {
          title: "Can I cancel my membership?",
          body: `Yes, at any time after your minimum commitment. Cancellations must be made in writing, by email or in person at the studio, and take effect at the end of the current weekly billing cycle. Full terms are set out in our ${POLICY} and the membership agreement you receive when you join.`,
        },
        {
          title: "Can someone else use my sessions?",
          body: "Memberships are personal and cannot be transferred to another person.",
        },
        {
          title: "What do I need to bring or wear to my session?",
          body: [
            "Please wear comfortable, flexible activewear and bring a clean, unworn pair of socks to change into immediately before your session. For hygiene, grip and therapist control during assisted stretching, fresh socks are mandatory at every appointment.",
            "Forgot yours? No problem. Custom StretchFLEX grip socks are available to purchase at reception for $15.",
            "For Photobiotic Assisted Stretching, light-coloured activewear works best, as denim and dark, heavy fabrics block the light.",
          ],
        },
        {
          title: "Are the memberships suitable for everyone?",
          body: "Our services are designed for general mobility, recovery and wellbeing. Before your first session we will discuss your health history and suitability. Photobiomodulation, compression and vagus nerve stimulation are not suitable for everyone, for example during pregnancy or if you have an implanted electronic device such as a pacemaker. If you have a recent injury, surgery or diagnosis, please check with your health professional first.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your body deserves more than occasional attention.",
      hand: "more",
      body: "Recovery isn't an occasional luxury. It's part of an active, capable and healthy body. **Don't wait until your body demands attention. Start today.**",
      actions: [
        { label: "Assisted Stretching", href: "#assisted-stretching" },
        { label: "Performance & Recovery", href: "#performance-recovery" },
      ],
    },
    {
      type: "node",
      node: createElement(SmallPrint, {
        text: [
          `Questions? Call us on [${PHONE.label}](${PHONE.href}) or visit us at 111 Trinity Arcade, 72 St Georges Terrace, Perth.`,
          "Regular value is based on our standard single-session prices: Revive Stretch $65, Prime Mobility Stretch $95, The Ultimate Stretch $120, Photobiotic Assisted Stretching™ $120 (44 min), $145 (59 min) and $165 (74 min), and De-Compression Recovery Stack $120. Memberships are subject to availability, our [Refund and Cancellation Policy](/refund-and-cancellation-policy) and the [StretchFLEX membership terms and conditions](/membership-terms).",
        ],
      }),
    },
  ],
};

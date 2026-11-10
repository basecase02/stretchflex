import { createElement } from "react";
import { InfoSplit } from "@/components/pages/info/info-blocks";
import { faqJsonLd } from "@/components/pages/info/team";
import type { PageContent } from "./types";

const BOOK = "https://api.leadconnectorhq.com/widget/groups/stretchflex";

const FAQS = [
  {
    q: "What is Assisted Stretching Perth?",
    a: "Assisted Stretching Perth is a guided, one-on-one mobility session where a trained therapist moves your body through controlled stretches to improve flexibility and range of motion.",
  },
  {
    q: "Is assisted stretching suitable for beginners?",
    a: "Yes. StretchFlex sessions are tailored to your flexibility level and comfort, making them suitable for beginners and experienced individuals alike.",
  },
  {
    q: "How quickly will I notice results?",
    a: "Many people notice reduced stiffness after one session, but consistent mobility improvements typically occur over several weeks.",
  },
  {
    q: "Can Assisted Stretching Perth improve posture?",
    a: "Improving flexibility in tight muscle groups can support better posture and reduce strain caused by prolonged sitting.",
  },
  {
    q: "Is Assisted Stretching Perth safe for older adults?",
    a: "Yes. Sessions at StretchFlex are adjusted based on individual mobility levels and health considerations to ensure safety.",
  },
];

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /assisted-stretching-perth — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    // The live page carried this FAQPage data (twice; one copy was an unfinished draft).
    faqJsonLd(FAQS),
    {
      type: "hero",
      title: "Understanding Assisted Stretching in Perth and",
      accent: "How It Works",
      actions: [{ label: "Book Appointment", href: BOOK }],
      image: { src: u("2026/03/StretchFLEX36.jpg"), alt: "A StretchFLEX therapist stretching a seated client's arm across her chest", position: "45% 45%" },
    },
    {
      type: "text",
      tone: "navy",
      title: "TL;DR",
      body: [
        "Assisted Stretching Perth is a guided mobility service designed to improve flexibility, reduce muscle tension and increase range of motion. At StretchFlex, trained stretch therapists work one-on-one with Perth clients to safely enhance mobility, support posture and improve how the body moves long term.",
      ],
    },
    {
      type: "text",
      tone: "rose",
      title: "Introduction",
      body: [
        "If you are searching for [Assisted Stretching Perth](/), you are likely experiencing stiffness, restricted movement or ongoing muscle tension. StretchFlex is a Perth-based assisted stretching studio specialising in structured, one-on-one mobility therapy. Our focus is simple: help Perth locals move better, feel lighter and maintain long-term flexibility through professionally guided stretch sessions.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    {
      type: "split",
      title: "What Is Assisted Stretching?",
      hand: "Assisted",
      image: { src: u("2026/06/SF67.jpg"), alt: "A StretchFLEX therapist standing with a smiling client in the studio", position: "50% 35%" },
      tone: "navy",
      reverse: true,
      body: [
        "Assisted stretching is a therapist-led mobility session where a trained professional moves your body through controlled ranges of motion while you remain relaxed. Unlike stretching alone at home or in the gym, assisted stretching allows deeper muscle engagement and safer joint positioning. The therapist stabilises specific areas and progressively increases range in a controlled, structured manner. Assisted Stretching Perth at StretchFlex is designed to improve usable flexibility rather than temporary looseness.",
      ],
      actions: [{ label: "Reserve a Slot", href: BOOK, tone: "light" }],
    },
    { type: "cta", action: { label: "Book Appointment", href: BOOK } },
    {
      type: "split",
      title: "How Assisted Stretching Works?",
      hand: "Assisted",
      image: { src: u("2026/03/StretchFLEX35.jpg"), alt: "A StretchFLEX therapist working on a seated client's shoulders", position: "55% 40%" },
      tone: "rose",
      body: [
        "Muscle tightness is often a nervous system response rather than a true shortening of tissue. When the body senses strain or imbalance, it restricts movement as protection. Assisted stretching works by gradually introducing safe tension while maintaining control and alignment. This retrains the nervous system to allow greater movement without resistance. Over time, consistent sessions improve range of motion, joint mobility and overall movement efficiency. StretchFlex applies structured progressions to ensure safe and measurable improvements.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    {
      type: "split",
      title: "Who Benefits from Assisted Stretching Perth?",
      hand: "Benefits",
      image: { src: u("2026/06/SF65.jpg"), alt: "A StretchFLEX therapist chatting with two active clients in the studio", position: "50% 40%" },
      tone: "navy",
      reverse: true,
      body: [
        "Assisted Stretching Perth is suitable for a broad range of individuals. Office professionals experiencing neck, shoulder and hip tightness benefit from improved posture and reduced daily stiffness. Athletes and active individuals often use assisted stretching to support recovery and performance. Adults over 40 and 50 seeking to maintain joint mobility and movement confidence find structured stretching highly beneficial. StretchFlex customises each session based on current mobility levels and individual goals.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK, tone: "light" }],
    },
    {
      type: "split",
      title: "Assisted Stretching vs Physiotherapy vs Massage",
      hand: "vs",
      image: { src: u("2026/06/SF68-scaled.jpg"), alt: "A StretchFLEX therapist guiding a smiling client through a chest-opening stretch on the table", position: "45% 45%" },
      tone: "sky",
      body: [
        "Physiotherapy focuses on injury rehabilitation and clinical treatment. Massage therapy addresses soft tissue tension through manual manipulation. Assisted stretching focuses specifically on increasing flexibility and mobility patterns through guided movement. While these services can complement each other, Assisted Stretching Perth at StretchFlex is structured around improving range of motion and long-term movement quality. Many Perth clients incorporate assisted stretching as part of a broader wellness strategy.",
      ],
    },
    {
      type: "split",
      title: "How Often Should You Book Assisted Stretching Perth?",
      hand: "Often",
      image: { src: u("2026/06/SF-60.jpg"), alt: "A StretchFLEX therapist chatting with a client in the studio", position: "50% 35%" },
      tone: "rose",
      reverse: true,
      body: [
        "Consistency produces mobility change. For general maintenance, weekly or fortnightly sessions are common. For targeted improvements, more frequent sessions may initially be recommended. StretchFlex designs structured mobility plans so Perth clients understand how often they should stretch to meet specific goals. Flexibility improves progressively, not instantly.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    {
      type: "split",
      title: "Is Assisted Stretching Safe?",
      hand: "Assisted",
      image: { src: u("2026/06/SF69-scaled.jpg"), alt: "A StretchFLEX therapist stretching a client's arms overhead as he lies on the table", position: "55% 50%" },
      tone: "navy",
      body: [
        "Yes, when delivered by trained professionals. StretchFlex sessions are guided by trained stretch therapists who understand alignment, joint integrity and controlled progression. Communication remains constant throughout each session to ensure comfort and safety. Assisted Stretching Perth at StretchFlex is tailored to the individual, not delivered as a one-size-fits-all routine.",
      ],
    },
    {
      type: "cards",
      tone: "rose",
      items: [
        {
          title: "Assisted Stretching for Office Workers in Perth",
          body: "Prolonged sitting shortens hip flexors, tightens hamstrings and creates upper back tension. Over time, this contributes to discomfort and postural strain. Assisted Stretching Perth addresses these common restrictions by restoring balance to affected muscle groups. Many StretchFlex clients report improved posture and reduced stiffness after consistent sessions.",
          image: { src: u("2026/06/SF71.jpg"), alt: "A StretchFLEX therapist releasing a seated client's neck and shoulders", position: "55% 40%" },
        },
        {
          title: "Assisted Stretching for Athletes and Active Individuals",
          body: "Mobility directly influences performance. Restricted range can limit strength output and increase strain risk. Assisted Stretching Perth supports recovery, flexibility and movement efficiency for runners, gym members and recreational athletes. Improved hip mobility, thoracic movement and hamstring flexibility often translate into smoother athletic performance.",
          image: { src: u("2026/06/SF70.jpg"), alt: "A StretchFLEX therapist stretching a seated client's shoulder", position: "45% 40%" },
        },
        {
          title: "Assisted Stretching Over 40 and 50",
          body: "Flexibility naturally declines with age. Joint stiffness increases and recovery can slow. Guided mobility sessions provide structured flexibility work without excessive strain. StretchFlex supports Perth adults who want to maintain independence, confidence and long-term joint comfort through safe assisted stretching.",
          image: { src: u("2026/06/SF76.jpg"), alt: "A StretchFLEX therapist stretching a relaxed client's leg as he lies on his side", position: "40% 50%" },
        },
      ],
      actions: [{ label: "Reserve a Slot", href: BOOK }, { label: "Book Appointment", href: BOOK, tone: "navy" }],
    },
    {
      type: "split",
      title: "What to Expect at StretchFlex",
      hand: "Expect",
      image: { src: u("2026/06/StretchFLEX03.jpg"), alt: "A StretchFLEX therapist supporting an older client's lower back as she sits on the table", position: "50% 45%" },
      tone: "sky",
      body: [
        "A session begins with a short mobility discussion and goal assessment. Your stretch therapist then guides you through a personalised series of assisted stretches targeting key muscle groups. Sessions are one-on-one, structured and progressive. You remain relaxed while controlled movements are applied. The environment is professional, supportive and entirely focused on improving mobility.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    {
      type: "split",
      title: "Why Choose StretchFlex for Assisted Stretching Perth",
      hand: "Choose",
      image: { src: u("2026/06/stretchflex-55.jpg"), alt: "A StretchFLEX therapist greeting a new client with a handshake", position: "55% 45%" },
      tone: "navy",
      reverse: true,
      body: [
        "StretchFlex is dedicated specifically to assisted stretching and mobility development. Our sessions are structured, personalised and progression-based. Perth clients choose StretchFlex because results are tracked, movements are purposeful and safety is prioritised. As Assisted Stretching Perth continues to grow in awareness, StretchFlex is positioning itself as a trusted local mobility specialist.",
      ],
    },
    {
      type: "split",
      title: "Long-Term Benefits of Assisted Stretching Perth",
      hand: "Long-Term",
      image: { src: u("2026/06/SF75.jpg"), alt: "A StretchFLEX therapist stretching a client's hamstring with his leg raised", position: "50% 50%" },
      tone: "rose",
      body: [
        "Improved flexibility. Reduced muscle tension. Enhanced posture. Greater range of motion. Increased comfort in daily movement. Over time, consistent assisted stretching may support better movement patterns and improved physical confidence. Assisted Stretching Perth is not a quick fix. It is a structured investment in long-term mobility.",
      ],
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Book Your Assisted Stretching Perth Session at StretchFlex",
        hand: "Session",
        tone: "blue",
        reverse: true,
        image: { src: u("2026/02/openart-image__cfe8QLq_1770268051809_raw.webp"), alt: "A StretchFLEX therapist guiding a client through an assisted leg stretch in Perth", position: "60% 50%" },
        parts: [
          "If you are ready to reduce stiffness, improve flexibility and move with greater ease, StretchFlex offers structured Assisted Stretching Perth sessions tailored to your goals. Whether your focus is performance, posture or long-term joint health, booking your first session is a practical next step.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK, tone: "light" }],
      }),
    },
    {
      type: "accordion",
      id: "faqs",
      tone: "rose",
      title: "FAQs",
      items: FAQS.map((item) => ({ title: item.q, body: item.a })),
      actions: [{ label: "Book Appointment", href: BOOK }],
    },
    { type: "reviews" },
  ],
};

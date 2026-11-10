import { createElement } from "react";
import { InfoHero, InfoSplit, RichAccordion } from "@/components/pages/info/info-blocks";
import { BOOK_GROUP } from "@/content/photos";
import type { PageContent } from "./types";

const u = (path: string) => `/wp-content/uploads/${path}`;

/** /first-time-visitors — the live page's copy and photos. */
export const page: PageContent = {
  blocks: [
    {
      type: "node",
      node: createElement(InfoHero, {
        title: "First Time Visitors",
        subtitle: "Your First Assisted Stretching Session in Perth: What to Expect",
        intro: [
          "If you’ve never tried assisted stretching before, you might be wondering: What actually happens in a session? At StretchFlex in Perth, we make your first visit calm, clear, and completely focused on helping you move more freely and feel better in your body.",
          "This page walks you step by step through your first session, so you know exactly what to expect from the moment you walk in to the moment you float back out.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP }],
        image: { src: u("2026/03/StretchFLEX-43.jpg"), alt: "A StretchFLEX therapist checking in a new client at the front desk", position: "40% 50%" },
      }),
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Who Assisted Stretching Is For",
        hand: "For",
        tone: "rose",
        image: { src: u("2026/06/Stretchflex-60.jpg"), alt: "A StretchFLEX therapist welcoming a client at the studio door", position: "60% 40%" },
        parts: [
          { h3: "Assisted stretching is ideal if you:" },
          {
            list: [
              "Feel tight or stiff from sitting, work, or stress",
              "Train regularly and want better recovery and performance",
              "Are returning from an injury (with appropriate medical clearance)",
              "Struggle with flexibility, mobility, or posture",
              "Simply want to move more comfortably and feel lighter in your body",
            ],
          },
          "You don’t need to be “fit” or flexible to start. Our job is to meet you where you are and help you improve from there.",
        ],
      }),
    },
    { type: "cta", action: { label: "Book Appointment", href: BOOK_GROUP } },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Before You Arrive",
        hand: "Arrive",
        tone: "navy",
        reverse: true,
        image: { src: u("2026/02/openart-image_nkhI3_WQ_1770338923616_raw.webp"), alt: "A StretchFLEX therapist stretching a client's arms overhead on the treatment table", position: "50% 55%" },
        parts: [
          { h3: "To make your first visit smooth:" },
          {
            list: [
              "Wear comfortable clothing you can move in (activewear or loose-fitting clothes)",
              "Avoid heavy meals in the hour or two before your session",
              "Arrive 5–10 minutes early to settle in and complete any brief forms if needed",
            ],
          },
          "We’re centrally located in Perth with easy parking and flexible appointment times, so you can fit a session in before work, after the gym, or on your lunch break without stress.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP, tone: "light" }],
      }),
    },
    {
      type: "node",
      node: createElement(RichAccordion, {
        id: "what-to-expect",
        name: "first-visit",
        tone: "rose",
        image: { src: u("2026/02/openart-image_reWvHdiU_1770338907959_raw.webp"), alt: "A StretchFLEX therapist stretching a relaxed client's shoulder on the treatment table", position: "50% 50%" },
        items: [
          {
            title: "Step 1: Warm Welcome & Quick Check-In",
            body: [
              "When you arrive, you’ll be greeted by one of our friendly stretch specialists and shown into our comfortable studio space. This first few minutes is all about:",
              { list: ["Getting to know you and your goals", "Understanding any injuries, tight spots, or concerns", "Explaining how the session works and answering your questions"] },
              "We’ll never rush this part. The better we understand your body and lifestyle, the more targeted your session can be.",
            ],
          },
          {
            title: "Step 2: Posture & Movement Assessment",
            body: [
              "Next, we’ll do a simple, gentle assessment. This might include:",
              { list: ["Observing your posture", "Checking how your hips, shoulders, and spine move", "Asking where you feel tight, restricted, or sore"] },
              "This isn’t a fitness test. It’s a relaxed way for us to see what’s happening in your body, so we can prioritise the areas that need the most attention.",
            ],
          },
          {
            title: "Step 3: Getting Comfortable on the Table",
            body: [
              "Your assisted stretching session is done on a padded table or mat. You’ll remain fully clothed the entire time. We may use:",
              { list: ["Supportive bolsters or cushions for comfort", "Straps or gentle holds to support certain stretches", "Towels or blankets if you prefer extra warmth or privacy"] },
              "Your comfort and sense of safety are our top priority. You’re always in control and can ask to adjust or pause at any time.",
            ],
          },
          {
            title: "Step 4: Guided Assisted Stretching",
            body: [
              "Now the magic starts. Your stretch specialist will guide your body through a series of slow, targeted stretches, focusing on areas like:",
              { list: ["Hips and lower back", "Hamstrings and hip flexors", "Neck and shoulders", "Chest and upper back"] },
              "They’ll gently move your body while you relax and breathe, using techniques such as:",
              {
                list: [
                  "Passive stretching (you’re relaxed while we move you)",
                  "PNF-style stretching (light resistance followed by a deeper stretch)",
                  "Joint mobility work to free up stuck or stiff areas",
                ],
              },
              "You’ll be asked regularly about pressure and intensity so we stay within your comfortable range. Assisted stretching should feel strong but safe, never painful.",
            ],
          },
          {
            title: "Step 5: Breathing, Relaxation & Body Awareness",
            body: [
              "Throughout the session, your specialist will guide your breathing and help you connect with how your body feels. This helps to:",
              { list: ["Release muscle tension more effectively", "Calm the nervous system", "Create a deeper feeling of relaxation and ease"] },
              "Many first-time clients say it feels like a mix between a stretch, a reset, and a gentle “tune-up” for the whole body.",
            ],
          },
          {
            title: "Step 6: Cool-Down & Personalised Advice",
            body: [
              "At the end of your session, we’ll bring you back to sitting and check in with how you’re feeling. You’ll often notice:",
              { list: ["A greater feeling of lightness and space in the body", "Easier movement when you stand, walk, or turn", "Reduced tightness in your main problem areas"] },
              "We’ll then share simple, tailored recommendations, which may include:",
              { list: ["A suggested plan for follow-up sessions", "Easy at-home stretches to maintain your progress", "Tips for posture, desk setup, or training recovery"] },
            ],
          },
        ],
      }),
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Will I Be Sore After My First Session?",
        hand: "Sore",
        tone: "sky",
        image: { src: u("2026/03/StretchFLEX09.jpg"), alt: "A client chatting with a StretchFLEX therapist at reception", position: "45% 50%" },
        parts: [
          "It’s normal to feel:",
          { list: ["A little looser and more relaxed straight away", "Mild muscle awareness (similar to a light workout) over the next 24 hours"] },
          "Staying hydrated, moving gently, and avoiding sudden overexertion can help your body integrate the session. If you have any concerns, we’re always happy to talk you through them.",
        ],
      }),
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Is Assisted Stretching Safe?",
        hand: "Assisted",
        tone: "navy",
        reverse: true,
        image: { src: u("2026/03/StretchFLEX-012.webp"), alt: "A relaxed client lying on his side during an assisted hip stretch", position: "45% 55%" },
        parts: [
          "At StretchFlex, your session is guided by qualified stretch specialists who:",
          {
            list: [
              "Have training in anatomy and safe stretching techniques",
              "Work within your range of comfort and mobility",
              "Adjust the session if you have injuries or medical conditions (with your guidance)",
            ],
          },
          "If you’re under medical care, we may ask you to discuss assisted stretching with your doctor or allied health professional before starting.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP, tone: "light" }],
      }),
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "How Many Sessions Do I Need?",
        hand: "Sessions",
        tone: "rose",
        image: { src: u("2026/03/StretchFLEX34.jpg"), alt: "A StretchFLEX therapist gently stretching a seated client's neck", position: "50% 45%" },
        parts: [
          "That depends on your goals:",
          {
            list: [
              "**One-off reset:** Great if you’re curious or need a quick tune-up",
              "**Short series of sessions:** Ideal for tight hips, sore backs, or recurring tension",
              "**Ongoing maintenance:** Perfect if you train regularly, work at a desk, or want long-term flexibility and mobility",
            ],
          },
          "We’ll always be honest and realistic about what’s best for your body and your schedule.",
        ],
      }),
    },
    {
      type: "node",
      node: createElement(InfoSplit, {
        title: "Ready to Book Your First Session?",
        hand: "First",
        tone: "blue",
        reverse: true,
        image: { src: u("2026/03/StretchFLEX39.jpg"), alt: "A therapist guiding a client through an assisted back extension stretch", position: "45% 50%" },
        parts: [
          "If you’re tired of feeling stiff, tight, or restricted, your first assisted stretching session is the perfect starting point. You don’t need to be flexible. You just need to be ready to give your body the care it deserves.",
          "👉 Book your first assisted stretching session in Perth today and discover how good it feels to move freely again.",
        ],
        actions: [{ label: "Book Appointment", href: BOOK_GROUP, tone: "light" }],
      }),
    },
    { type: "reviews" },
  ],
};

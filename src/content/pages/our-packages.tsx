import { OverviewSessions } from "@/components/pages/packages/overview-sessions";
import { BOOK_URL, SESSION_GROUPS, SESSIONS } from "@/content/site";
import type { PageContent } from "./types";

/** Each session's line on this page (the client's content document). */
const LINES: Record<string, string> = {
  "revive-stretch": "Your quick reset. Focused work on your tightest areas, perfect for a lunch break.",
  "prime-mobility-stretch": "More time to work through several areas and improve how you move.",
  "ultimate-stretch": "Our deepest stretch session, covering every major muscle group.",
  "de-compression-recovery-stack": "Pneumatic compression, non-invasive vagus nerve stimulation and guided mindfulness in one session.",
  "led-red-light-therapy": "A standalone session in our twin-panel, nine-wavelength light system.",
};

/** Every session from SESSIONS, in its group, with this page's lines and "Learn More" only. */
const sessions = SESSION_GROUPS.flatMap((group) =>
  group.sessionIds.map((id) => {
    const session = SESSIONS.find((s) => s.id === id)!;
    return { ...session, group: group.id, lead: LINES[id] ?? session.lead, bookHref: undefined };
  }),
);

/** /our-packages — every session and price, then packs, memberships and a booking band. */
export const page: PageContent = {
  seo: {
    title: "Stretching & Recovery Sessions Perth | StretchFLEX",
    description:
      "Compare every StretchFLEX session: assisted stretching from $65, Photobiotic Assisted Stretching™, red light therapy and recovery. Perth CBD.",
    ogTitle: "All Sessions and Prices | StretchFLEX Perth",
    ogDescription: "Assisted stretching, light therapy and recovery sessions in Perth CBD. Find the one that fits your body and your schedule.",
  },
  blocks: [
    {
      type: "hero",
      kicker: "Sessions and prices",
      title: "Find your",
      accent: "session",
      intro:
        "Every session at StretchFLEX is private, one-on-one and tailored to you. Choose by the time you have and how far you want to go.",
      actions: [{ label: "Book your session", href: BOOK_URL }],
      trust: [
        "Assisted stretching from $65",
        "Photobiotic Assisted Stretching™ from $120",
        "Recovery from $49",
      ],
      image: {
        src: "/images/stretch/stretch-hip-logo.jpg",
        alt: "A StretchFLEX therapist stretching a client’s leg on the treatment table",
        position: "45% 50%",
      },
    },
    {
      type: "node",
      node: <OverviewSessions sessions={sessions} />,
    },
    {
      type: "cards",
      tone: "rose",
      kicker: "By type",
      title: "Stretching, light and recovery",
      hand: "light",
      items: [
        {
          title: "Assisted Stretching",
          meta: "30, 45 or 60 min · from $65",
          body: "Your therapist guides you through targeted stretches you can’t reach on your own.",
          href: "/our-packages/the-revive-stretch-session",
        },
        {
          title: "Photobiotic Assisted Stretching™",
          meta: "44, 59 or 74 min · from $120",
          body: "Assisted stretching with 14 minutes of professional-grade photobiomodulation: a 7-minute light prime before your stretch and a 7-minute light flush after.",
          href: "/our-packages/photobiotic-assisted-stretching",
        },
        {
          title: "Recovery",
          meta: "14 or 20 min · from $49",
          body: "The De-Compression Recovery Stack (20 min, $120) and LED Red Light Therapy (14 min, $49).",
          href: "/our-packages/de-compression-recovery-stack",
        },
      ],
    },
    {
      type: "text",
      kicker: "Save with a pack or membership",
      title: "Come more often, pay less",
      hand: "less",
      body: ["Session packs save you up to $201. Memberships include two sessions every week from $89."],
      actions: [{ label: "Explore memberships", href: "/membership" }],
    },
    {
      type: "cta",
      title: "Not sure where to start?",
      hand: "start",
      body: "Most first-time clients start with The Revive Stretch or Prime Mobility Stretch. Call us on [0432 569 077](tel:0432569077) and we will help you choose.",
      action: { label: "Book your session", href: BOOK_URL },
    },
  ],
};

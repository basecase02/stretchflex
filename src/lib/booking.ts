import { cloneElement, isValidElement, type ReactElement } from "react";
import type { Action, Block } from "@/content/blocks";
import { SESSIONS } from "@/content/site";

/**
 * Booking on service pages: instead of a general "Book Appointment" that
 * opens a list of every service, each page offers its own sessions with
 * length and price, and each button goes straight to that session's booking.
 *
 * The booking links live in SESSIONS (src/content/site.ts), one per session,
 * so moving from HighLevel to Acuity is one edit there.
 */

/** A link to the booking system (HighLevel today, Acuity next). */
const BOOKING_LINK = /leadconnectorhq\.com\/widget|acuityscheduling\.com/i;

export type BookOption = { id: string; name: string; length: string; price: string; href: string };

/** "30 minutes" → "30 min", "1hr 14 minutes" → "1 hr 14 min". */
function shortLength(duration: string) {
  return duration
    .replace(/(\d)\s*hr/i, "$1 hr")
    .replace(/minutes?/i, "min")
    .trim();
}

export function bookOptions(ids: string[]): BookOption[] {
  return ids.map((id) => {
    const session = SESSIONS.find((s) => s.id === id);
    if (!session?.bookHref) throw new Error(`No booking link for session "${id}"`);
    return {
      id,
      name: session.name,
      length: shortLength(session.duration),
      price: `$${session.price}`,
      href: session.bookHref,
    };
  });
}

/** Buttons for a page's sessions: "Book now · 30 min · $65", or one per length when there are several. */
export function bookActions(options: BookOption[]): Action[] {
  if (options.length === 1) {
    const [o] = options;
    return [{ label: `Book now · ${o.length} · ${o.price}`, href: o.href }];
  }
  return options.map((o) => ({ label: `Book ${o.length} · ${o.price}`, href: o.href }));
}

const isBookingAction = (value: unknown): value is Action =>
  !!value &&
  typeof value === "object" &&
  typeof (value as Action).href === "string" &&
  typeof (value as Action).label === "string" &&
  BOOKING_LINK.test((value as Action).href);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype;

/**
 * Swaps every general booking button in a page's content (in blocks and in
 * the props of its one-off sections) for the page's session buttons. Booking
 * bands with no button of their own get the session buttons too.
 */
export function withSessionButtons(blocks: Block[], actions: Action[]): Block[] {
  const tone = (a: Action, like?: Action) => ({ ...a, ...(like?.tone ? { tone: like.tone } : {}) });
  // A button that already books one of this page's own sessions is specific: keep it.
  const own = new Set(actions.map((a) => a.href));
  const isGeneric = (value: unknown): value is Action => isBookingAction(value) && !own.has(value.href);

  const rewrite = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.flatMap((item) => (isGeneric(item) ? actions.map((a) => tone(a, item)) : [rewrite(item)]));
    }
    if (isValidElement(value)) {
      const el = value as ReactElement<Record<string, unknown>>;
      return cloneElement(el, rewriteProps(el.props));
    }
    if (isPlainObject(value)) return rewriteProps(value);
    return value;
  };

  const rewriteProps = (props: Record<string, unknown>) => {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(props)) {
      if (key === "action" && isGeneric(val)) {
        out.action = undefined;
        out.actions = actions.map((a) => tone(a, val));
      } else {
        out[key] = rewrite(val);
      }
    }
    return out;
  };

  return blocks.map((block) => {
    if (block.type === "cta" && !block.action && !block.actions) return { ...block, actions };
    if (block.type === "contact") return { ...block, actions };
    // The first screen offers the sessions as buttons, which already carry the
    // length and price, so the hero doesn't repeat them as pills.
    if (block.type === "hero") {
      const hero = rewrite(block) as typeof block;
      return { ...hero, facts: undefined, actions: hero.actions?.length ? hero.actions : actions };
    }
    return rewrite(block) as Block;
  });
}

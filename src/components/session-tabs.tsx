"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Session } from "@/content/site";

export type SessionGroupView = {
  id: string;
  tab: string;
  title: string;
  sessions: Session[];
};

const ALL = "all";

/** Card colours by position in the visible row; the pair uses red and blue. */
const TONES: Record<number, string[]> = {
  2: ["rose", "blue"],
  3: ["sky", "blue", "rose"],
};

const count = (n: number) => `${n} session${n === 1 ? "" : "s"}`;

/**
 * Every session as a price card in one carousel with arrows either side,
 * and a row of filters above it: "All" (the default) and one per kind of
 * session, each showing how many sessions it holds.
 *
 * Each card is in the HTML once, so all eight sessions are visible to search
 * engines; a filter only hides the cards outside it.
 */
export function SessionTabs({ groups }: { groups: SessionGroupView[] }) {
  const [active, setActive] = useState<string>(ALL);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });
  const trackRef = useRef<HTMLUListElement>(null);
  const base = useId();

  const all = groups.flatMap((group) => group.sessions.map((session) => ({ session, group: group.id })));
  const visible = all.filter((item) => active === ALL || item.group === active);
  const tones = TONES[visible.length] ?? TONES[3];
  const toneOf = new Map(visible.map((item, i) => [item.session.id, tones[i % tones.length]]));

  const filters = [
    { id: ALL, title: "All sessions", tab: "14 – 74 minutes", size: all.length },
    ...groups.map((group) => ({ id: group.id, title: group.title, tab: group.tab, size: group.sessions.length })),
  ];
  const activeIndex = filters.findIndex((filter) => filter.id === active);
  const activeFilter = filters[activeIndex];

  /** Whether the row scrolls, and whether it is at either end. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // A few pixels of overhang (a tilted badge) is not worth scrolling for.
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ overflow: max > 16, start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  // A new filter starts the row from its first card.
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    measure();
  }, [active, measure]);

  /** Moves the row by as many whole cards as fit on screen. */
  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".plan:not([hidden])");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card.offsetWidth + gap;
    const cards = Math.max(1, Math.floor((track.clientWidth + gap) / step));
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * cards * step, behavior: smooth ? "smooth" : "auto" });
  };

  const nextFilter = filters[(activeIndex + 1) % filters.length];

  return (
    <>
      <p className="picker__lead" id={`${base}-lead`}>
        <span className="caps">Choose a session type</span>
        <span className="picker__total">
          {groups.length} types · {all.length} sessions
        </span>
      </p>
      <div className="tabs" role="group" aria-labelledby={`${base}-lead`}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={filter.id === active}
            aria-controls={`${base}-row`}
            className={`tabs__btn${filter.id === ALL ? " tabs__btn--all" : ""}`}
            onClick={() => setActive(filter.id)}
          >
            <span className="tabs__text">
              <span className="tabs__name">{filter.title}</span>
              <span className="tabs__meta caps">{filter.tab}</span>
            </span>
            <span className="tabs__count" aria-label={count(filter.size)}>
              {filter.size}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {count(visible.length)}
        {active === ALL ? "" : ` of ${activeFilter.title}`}
      </p>

      <div className="carousel">
        <button
          type="button"
          className="carousel__arrow carousel__arrow--prev"
          aria-label="Previous sessions"
          aria-controls={`${base}-row`}
          hidden={!edges.overflow}
          disabled={edges.start}
          onClick={() => page(-1)}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 10H4M9 5l-5 5 5 5" />
          </svg>
        </button>

        <ul className="plans" id={`${base}-row`} ref={trackRef} onScroll={measure}>
          {all.map(({ session, group }) => {
            const shown = active === ALL || group === active;
            return (
              <li className={`plan plan--${toneOf.get(session.id) ?? "sky"}`} key={session.id} hidden={!shown}>
                <p className="plan__badge caps">{session.durationLabel ?? session.duration}</p>
                <h3 className="display plan__name">{session.name}</h3>
                <p className="display plan__price">{session.priceLabel ?? `$${session.price}`}</p>
                <p className="plan__lead">{session.lead}</p>
                {session.points ? (
                  <ul className="plan__points">
                    {session.points.map((point, k) => (
                      <li key={`${point}-${k}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="plan__body">{session.body}</p>
                )}
                <div className="plan__actions">
                  {session.bookHref ? (
                    <a className="btn btn--caps btn--ink" href={session.bookHref}>
                      Book Now
                    </a>
                  ) : null}
                  <a className="btn btn--caps btn--line" href={session.learnHref}>
                    Learn More
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="carousel__arrow carousel__arrow--next"
          aria-label="More sessions"
          aria-controls={`${base}-row`}
          hidden={!edges.overflow}
          disabled={edges.end}
          onClick={() => page(1)}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>

      {active !== ALL && (
        <div className="plans__next">
          <button type="button" className="btn btn--caps btn--light" onClick={() => setActive(nextFilter.id)}>
            {nextFilter.id === ALL ? `See all ${all.length} sessions` : `Next: ${nextFilter.title} (${count(nextFilter.size)})`}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

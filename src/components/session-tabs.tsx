"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Session } from "@/content/site";

export type SessionGroupView = {
  id: string;
  tab: string;
  title: string;
  sessions: Session[];
};

/** Card colours by position; the middle card of three stands out in blue. */
const TONES: Record<number, string[]> = {
  2: ["rose", "blue"],
  3: ["sky", "blue", "rose"],
};

/**
 * The sessions in three tabs, each showing its sessions as price cards side
 * by side (swipeable on phones). Every panel is in the HTML, so all eight
 * sessions are visible to search engines; the inactive ones are only hidden.
 */
export function SessionTabs({ groups }: { groups: SessionGroupView[] }) {
  const [active, setActive] = useState(groups[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    if (!(event.key in keys) && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const current = groups.findIndex((group) => group.id === active);
    let next = current;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else next = (current + keys[event.key] + groups.length) % groups.length;
    setActive(groups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Kinds of session" onKeyDown={onKeyDown}>
        {groups.map((group, i) => {
          const selected = group.id === active;
          return (
            <button
              key={group.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${group.id}`}
              tabIndex={selected ? 0 : -1}
              className="tabs__btn"
              onClick={() => setActive(group.id)}
            >
              <span className="tabs__name">{group.title}</span>
              <span className="tabs__meta caps">{group.tab}</span>
            </button>
          );
        })}
      </div>

      {groups.map((group) => {
        const tones = TONES[group.sessions.length] ?? TONES[3];
        return (
          <ul
            key={group.id}
            className="plans"
            role="tabpanel"
            id={`${base}-panel-${group.id}`}
            aria-labelledby={`${base}-tab-${group.id}`}
            hidden={group.id !== active}
          >
            {group.sessions.map((session, i) => (
              <li className={`plan plan--${tones[i % tones.length]}`} key={session.id}>
                <p className="plan__badge caps">{session.duration}</p>
                <h3 className="display plan__name">{session.name}</h3>
                <p className="display plan__price">${session.price}</p>
                <p className="plan__lead">{session.lead}</p>
                {session.points ? (
                  <ul className="plan__points">
                    {session.points.map((point, n) => (
                      <li key={`${point}-${n}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="plan__body">{session.body}</p>
                )}
                <div className="plan__actions">
                  <a className="btn btn--caps btn--ink" href={session.bookHref}>
                    Book Now
                  </a>
                  <a className="btn btn--caps btn--line" href={session.learnHref}>
                    Learn More
                  </a>
                </div>
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

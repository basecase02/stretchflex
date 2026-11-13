"use client";

import { useState } from "react";

/**
 * "Not sure which to book?" Two quick choices (time and goal) point to one
 * session, with its length, price and a direct booking link. The pairing
 * follows each session's own description in SESSIONS.
 */

export type FinderSession = {
  id: string;
  name: string;
  duration: string;
  price: number;
  lead: string;
  learnHref: string;
  bookHref?: string;
};

const TIMES = [
  { id: "30", label: "About 30 min" },
  { id: "45", label: "45 min" },
  { id: "60", label: "An hour or more" },
] as const;

const GOALS = [
  { id: "ease", label: "Ease tight, stiff muscles" },
  { id: "sport", label: "Move better for sport" },
  { id: "recover", label: "Recover and recharge" },
] as const;

type Time = (typeof TIMES)[number]["id"];
type Goal = (typeof GOALS)[number]["id"];

const PICK: Record<Time, Record<Goal, string>> = {
  "30": { ease: "revive-stretch", sport: "revive-stretch", recover: "de-compression-recovery-stack" },
  "45": { ease: "prime-mobility-stretch", sport: "prime-mobility-stretch", recover: "photobiotic-44" },
  "60": { ease: "ultimate-stretch", sport: "ultimate-stretch", recover: "photobiotic-59" },
};

export function SessionFinder({ sessions }: { sessions: FinderSession[] }) {
  const [time, setTime] = useState<Time | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const pick = time && goal ? sessions.find((s) => s.id === PICK[time][goal]) : undefined;

  return (
    <div className="finder">
      <div className="finder__intro">
        <h3 className="display finder__title">Not sure which to book?</h3>
        <p>Two taps and we’ll point you to the right session.</p>
      </div>

      <fieldset className="finder__q">
        <legend className="caps">How much time do you have?</legend>
        <div className="finder__opts">
          {TIMES.map((t) => (
            <button key={t.id} type="button" className="finder__opt" aria-pressed={time === t.id} onClick={() => setTime(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="finder__q">
        <legend className="caps">What matters most?</legend>
        <div className="finder__opts">
          {GOALS.map((g) => (
            <button key={g.id} type="button" className="finder__opt" aria-pressed={goal === g.id} onClick={() => setGoal(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="finder__result" aria-live="polite">
        {pick ? (
          <div className="finder__pick" key={pick.id}>
            <p className="caps finder__kicker">Our pick for you</p>
            <p className="display finder__name">{pick.name}</p>
            <p className="finder__meta">
              {pick.duration} · ${pick.price}
            </p>
            <p className="finder__lead">{pick.lead}</p>
            <div className="finder__actions">
              {pick.bookHref ? (
                <a className="btn btn--caps btn--red" href={pick.bookHref}>
                  Book this session
                </a>
              ) : null}
              <a className="btn btn--caps btn--light" href={pick.learnHref}>
                Learn more
              </a>
            </div>
          </div>
        ) : (
          <p className="finder__hint">{time || goal ? "One more tap…" : "Pick one from each row."}</p>
        )}
      </div>
    </div>
  );
}

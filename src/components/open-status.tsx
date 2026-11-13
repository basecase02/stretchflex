"use client";

import { useEffect, useState } from "react";

/**
 * "Open now · until 5:30 pm" from the studio's hours in Perth time, so
 * people know whether a call will be answered. Hours match CONTACT.hours:
 * Mon–Fri 8:30 am–5:30 pm, Saturday by appointment, Sunday closed.
 * Rendered after mount only (the server can't know the visitor's "now").
 */

const OPEN = 8 * 60 + 30;
const CLOSE = 17 * 60 + 30;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function perthNow() {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: DAYS.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function status(): { open: boolean; text: string } {
  const { day, minutes } = perthNow();
  const weekday = day >= 1 && day <= 5;
  if (weekday && minutes >= OPEN && minutes < CLOSE) {
    return { open: true, text: CLOSE - minutes <= 45 ? "Open now · closing soon, 5:30 pm" : "Open now · until 5:30 pm" };
  }
  if (weekday && minutes < OPEN) return { open: false, text: "Closed · opens today at 8:30 am" };
  if (day >= 1 && day <= 4) return { open: false, text: "Closed · opens tomorrow at 8:30 am" };
  if (day === 6) return { open: false, text: "Saturday · by appointment only" };
  return { open: false, text: "Closed · opens Monday at 8:30 am" };
}

export function OpenStatus() {
  const [now, setNow] = useState<ReturnType<typeof status> | null>(null);
  useEffect(() => {
    const tick = () => setNow(status());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return <p className="open-status" aria-hidden="true" />;
  return (
    <p className="open-status" data-open={now.open || undefined}>
      <span className="open-status__dot" aria-hidden="true" />
      {now.text}
    </p>
  );
}

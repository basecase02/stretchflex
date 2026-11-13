"use client";

import { useEffect, useState } from "react";
import type { BookOption } from "@/lib/booking";

/**
 * A slim bar pinned to the bottom of a service page once the first screen
 * has scrolled away: the service and a button for each session length and
 * price, so booking is one tap away while people read.
 */
export function BookingBar({ title, options }: { title: string; options: BookOption[] }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 260;
      setShown(pastHero && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="bookbar" data-shown={shown || undefined} aria-label={`Book ${title}`} aria-hidden={!shown || undefined}>
      <p className="bookbar__title">
        <span className="caps">Book</span> {title}
      </p>
      <ul className="bookbar__options">
        {options.map((o) => (
          <li key={o.id}>
            <a className="bookbar__btn" href={o.href} tabIndex={shown ? undefined : -1}>
              <span className="bookbar__len">{o.length}</span>
              <span className="bookbar__price">{o.price}</span>
              <span className="bookbar__go">Book</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

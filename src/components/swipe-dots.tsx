"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dots under a swipeable row of cards (the element just before this one).
 * They appear only when the row actually scrolls sideways (phones and some
 * tablets), show which card is in view, and jump to a card when tapped, so
 * a half-visible card at the edge reads as "there's more", not "cut off".
 */
export function SwipeDots({ count, label = "cards" }: { count: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolls, setScrolls] = useState(false);

  useEffect(() => {
    const row = ref.current?.previousElementSibling as HTMLElement | null;
    if (!row) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setScrolls(row.scrollWidth > row.clientWidth + 4);
      const items = Array.from(row.children) as HTMLElement[];
      const start = row.getBoundingClientRect().left + parseFloat(getComputedStyle(row).paddingLeft || "0");
      let best = 0;
      let bestDistance = Infinity;
      items.forEach((item, i) => {
        const distance = Math.abs(item.getBoundingClientRect().left - start);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      // At the far end the last card may never reach the start edge.
      if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) best = items.length - 1;
      setActive(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    row.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      row.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const go = (i: number) => {
    const row = ref.current?.previousElementSibling as HTMLElement | null;
    const item = row?.children[i] as HTMLElement | undefined;
    if (!row || !item) return;
    const pad = parseFloat(getComputedStyle(row).paddingLeft || "0");
    const left = row.scrollLeft + item.getBoundingClientRect().left - row.getBoundingClientRect().left - pad;
    row.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div className="swipe-dots" ref={ref} hidden={!scrolls}>
      <span className="swipe-dots__hint" aria-hidden="true">
        Swipe
      </span>
      {Array.from({ length: count }, (_, i) => (
        <button
          type="button"
          key={i}
          className="swipe-dots__dot"
          aria-label={`Show ${label} ${i + 1} of ${count}`}
          aria-current={i === active || undefined}
          onClick={() => go(i)}
        />
      ))}
    </div>
  );
}

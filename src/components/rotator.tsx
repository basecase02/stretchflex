"use client";

import { useEffect, useState } from "react";

/**
 * The changing word in the hero headline. All words share one grid cell and
 * cross-fade in place, so the headline never jumps. Every word is real heading
 * text, so the heading reads "Increase your Mobility Strength Flexibility"
 * to search engines and screen readers, as it does on the original site.
 */
export function Rotator({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words.length, interval]);

  const previous = (index + words.length - 1) % words.length;

  return (
    <span className="rotator">
      {words.map((word, i) => (
        <span key={word} data-state={i === index ? "in" : i === previous ? "out" : "wait"}>
          {word}{" "}
        </span>
      ))}
    </span>
  );
}

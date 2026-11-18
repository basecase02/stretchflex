"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A new page always opens at its top. Next.js scrolls a new page so its first
 * section is in view, which on some pages (the booking page, reached from a
 * session's Book button) lands part-way down. Links to an anchor (#...) and
 * Back/Forward keep their own position.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const back = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => (back.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (back.current) {
      back.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Once more after Next.js has finished its own scroll for the new page.
    const id = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

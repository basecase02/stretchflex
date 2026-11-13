"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Sections ease up into place as they scroll into view.
 *
 * Built to cost nothing and break nothing, on every browser:
 * - one IntersectionObserver (supported everywhere), no scroll listeners;
 * - only opacity and translate change, which the GPU handles without layout;
 * - only elements that start below the screen are touched, so nothing the
 *   visitor can already see is ever hidden, and the hero/LCP is untouched;
 * - without JavaScript, or with "reduce motion" on, the page simply shows;
 * - cards inside phone carousels are left alone.
 */

const TARGETS = [
  ".blk__head",
  ".benefits__head",
  ".promise__inner",
  ".first .folder",
  ".contact__grid",
  ".cta__inner",
  ".finder",
  ".split__grid",
  ".pk-text__inner",
  ".acc",
  ".reviews__intro",
  ".journey__head",
  ".journey > li",
  ".journey__end",
].join(",");

/** Card grids: animated one by one on wider screens (on phones they swipe). */
const WIDE_TARGETS = ".notes > li, .tiles > li, .steps > .step";

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const wide = window.matchMedia("(min-width: 760px)").matches;
    const found = Array.from(document.querySelectorAll<HTMLElement>(wide ? `${TARGETS},${WIDE_TARGETS}` : TARGETS));
    const below = found.filter((el) => el.getBoundingClientRect().top > window.innerHeight);

    const done = (el: HTMLElement) => {
      el.removeAttribute("data-reveal");
      el.style.removeProperty("transition-delay");
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.setAttribute("data-reveal", "in");
          // Hand the element back to its own styles once it has settled.
          window.setTimeout(() => done(el), 1100);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const el of below) {
      // A slight stagger for cards sitting side by side.
      const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      if (el.matches(WIDE_TARGETS)) el.style.transitionDelay = `${(index % 3) * 90}ms`;
      el.setAttribute("data-reveal", "wait");
      io.observe(el);
    }

    return () => {
      io.disconnect();
      below.forEach(done);
    };
  }, [pathname]);

  return null;
}

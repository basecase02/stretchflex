"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";

/**
 * A membership card that turns over to show its back (the inclusions).
 * It is a real toggle button: tap, click, Enter or Space turns it, and a
 * mouse pointer resting on it turns it too. aria-pressed always says which
 * side is showing. With reduced motion the sides cross-fade instead
 * (membership.css).
 */
export function MemberCard({ name, slug }: { name: string; slug: string }) {
  const [back, setBack] = useState(false);
  const mouse = (event: PointerEvent, value: boolean) => {
    if (event.pointerType === "mouse") setBack(value);
  };
  return (
    <div className="mcard-wrap">
      <button
        type="button"
        className="mcard"
        aria-pressed={back}
        aria-label={`Show the back of the ${name} card`}
        onClick={() => setBack((value) => !value)}
        onPointerEnter={(event) => mouse(event, true)}
        onPointerLeave={(event) => mouse(event, false)}
      >
        <span className="mcard__inner">
          <span className="mcard__face mcard__face--front">
            <Image src={`/images/membership/${slug}-card-front.webp`} alt="" width={1040} height={656} sizes="(min-width: 1000px) 460px, 84vw" />
          </span>
          <span className="mcard__face mcard__face--back">
            <Image src={`/images/membership/${slug}-card-back.webp`} alt="" width={1040} height={656} sizes="(min-width: 1000px) 460px, 84vw" />
          </span>
        </span>
      </button>
      <p className="mcard__hint" aria-hidden="true">
        <span className="mcard__hint-icon">↻</span>
        <span className="mcard__hint-touch">Tap the card to see inclusions</span>
        <span className="mcard__hint-mouse">Hover the card to see inclusions</span>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";

/**
 * A tier's buttons (Join, Read more) and the extra detail that "Read more"
 * opens, so every tier box shows the same short summary until asked.
 */
export function TierMore({ join, name, children }: { join: string; name: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div className="tier__actions">
        <Link className="btn btn--caps btn--red tier__join" href={join}>
          Join {name}
        </Link>
        <button type="button" className="tier__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          {open ? "Read less" : "Read more"}
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="tier__more" id={id} hidden={!open}>
        {children}
      </div>
    </>
  );
}

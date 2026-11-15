"use client";

import { useEffect, useRef, useState } from "react";

/**
 * On phones, a long list (the element just before this one) shows its first
 * few items and a "Show all" button, so a section fits about one screen.
 * Laptops always show everything (see blocks.css, "Phones: long lists").
 */
export function ShowAll({ count, max = 5, label = "questions" }: { count: number; max?: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const list = ref.current?.previousElementSibling as HTMLElement | null;
    if (!list) return;
    if (open) list.removeAttribute("data-clamped");
    else list.setAttribute("data-clamped", String(max));
  }, [open, max]);
  if (count <= max) return null;
  return (
    <div className="show-all" ref={ref}>
      <button type="button" className="btn btn--caps btn--outline show-all__btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? `Show fewer ${label}` : `Show all ${count} ${label}`}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * The custom-amount dropdown: a pill button that opens a list of amounts.
 * Styled like the site's form fields. Arrow keys, Home/End, Enter and Escape
 * work as in a native select; a click outside closes it.
 */
export function AmountSelect({ value, options, onChange, placeholder = "Choose amount" }: { value: number | null; options: number[]; onChange: (value: number) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const label = (v: number) => `$${v.toLocaleString("en-AU")}`;

  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    list.current?.focus();
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, value == null ? 0 : options.indexOf(value)));
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    button.current?.focus();
  };
  const choose = (v: number) => {
    onChange(v);
    close();
  };

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      show();
    }
  };
  const onListKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    if (e.key === "ArrowDown") setActive((i) => Math.min(last, i + 1));
    else if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(last);
    else if (e.key === "Enter" || e.key === " ") choose(options[active]);
    else if (e.key === "Escape") close();
    else if (e.key === "Tab") return setOpen(false);
    else return;
    e.preventDefault();
  };

  return (
    <div className={`gsel${open ? " gsel--open" : ""}`} ref={root}>
      <button
        type="button"
        ref={button}
        className={`gsel__btn${value == null ? " gsel__btn--empty" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onButtonKey}
      >
        <span>{value == null ? placeholder : label(value)}</span>
        <svg className="gsel__chev" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul className="gsel__list" id={`${id}-list`} ref={list} role="listbox" tabIndex={-1} aria-label="Custom amount" aria-activedescendant={`${id}-${active}`} onKeyDown={onListKey}>
          {options.map((v, i) => (
            <li
              key={v}
              id={`${id}-${i}`}
              role="option"
              aria-selected={v === value}
              className={`gsel__opt${i === active ? " gsel__opt--active" : ""}`}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(v)}
            >
              {label(v)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

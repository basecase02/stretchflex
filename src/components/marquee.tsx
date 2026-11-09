import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Element for the one copy that search engines and screen readers see. */
  as?: "h2" | "p";
  /** Copies in each half of the loop. */
  repeat?: number;
  className?: string;
};

/**
 * Giant running type with a slash between repeats. Only the first copy is
 * real text; every other copy is hidden from assistive technology, so a
 * heading is read (and indexed) once.
 */
export function Marquee({ children, as: Tag = "p", repeat = 2, className = "" }: MarqueeProps) {
  const half = (hidden: boolean) => (
    <div className="marquee__group" aria-hidden={hidden || undefined}>
      {Array.from({ length: repeat }, (_, i) => {
        const real = !hidden && i === 0;
        const Item = real ? Tag : "span";
        return (
          <div className="marquee__unit" key={i} aria-hidden={!hidden && !real ? true : undefined}>
            <Item className="marquee__item">{children}</Item>
            <span className="marquee__sep" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={`marquee ${className}`.trim()}>
      <div className="marquee__track">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

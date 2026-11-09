import type { ReactNode, SVGProps } from "react";
import type { BenefitIcon } from "@/content/site";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
} as const;

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 4.5L6 8l3.5-3.5" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10 1.6l2.47 5.3 5.8.72-4.27 4 1.1 5.74L10 14.53l-5.1 2.83 1.1-5.74-4.27-4 5.8-.72L10 1.6z" />
    </svg>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={className} role="img" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.11A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.27a12 12 0 0 0 0 10.78l4-3.11z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.88 8.87 4.77 12 4.77z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 21v-8.1h2.72l.4-3.16H13.6V7.72c0-.91.25-1.54 1.56-1.54h1.67V3.36A22 22 0 0 0 14.4 3.2c-2.4 0-4.05 1.47-4.05 4.16v2.38H7.6v3.16h2.75V21h3.25z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Benefit icons: one drawing per benefit, 48px grid, 2px stroke. */
const benefitPaths: Record<BenefitIcon, ReactNode> = {
  // An angle opening up: range of motion.
  range: (
    <>
      <path d="M6 40h36" />
      <path d="M6 40L33 8" />
      <path d="M28 40a22 22 0 0 0-7.8-16.8" />
      <circle cx="6" cy="40" r="3.2" fill="currentColor" stroke="none" />
    </>
  ),
  // A tight zigzag easing into a smooth wave: tension releasing.
  release: <path d="M3 24l4-11 6 22 6-22 6 22 4-11c2.5-6.5 6-6.5 8.5 0s6 6.5 8.5 0" />,
  // A head over evenly stacked, centred segments: a spine in alignment.
  posture: (
    <>
      <circle cx="24" cy="7.5" r="4.5" />
      <path d="M17 19h14" />
      <path d="M12 27h24" />
      <path d="M12 35h24" />
      <path d="M17 43h14" />
    </>
  ),
  // A line climbing: performance.
  performance: (
    <>
      <path d="M4 38l13-13 9 7 18-20" />
      <path d="M32 12h12v12" />
    </>
  ),
  // A shield with a tick: protection from injury.
  shield: (
    <>
      <path d="M24 4l17 6.5V23c0 10.5-7 18-17 22-10-4-17-11.5-17-22V10.5L24 4z" />
      <path d="M16 24.5l6 6 11-12.5" />
    </>
  ),
  // A leaf: calm.
  calm: (
    <>
      <path d="M8 40C8 20 20 8 40 8c0 20-12 32-32 32z" />
      <path d="M8 40l20-20" />
    </>
  ),
};

export function BenefitGlyph({ name, className }: { name: BenefitIcon; className?: string }) {
  return (
    <svg
      {...base}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {benefitPaths[name]}
    </svg>
  );
}

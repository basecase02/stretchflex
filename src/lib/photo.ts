import type { CSSProperties } from "react";
import dims from "@/content/image-dims.json";

/**
 * Every photo in /public with its real size, so frames can take the photo's
 * own shape instead of cutting it (src/content/image-dims.json; regenerate it
 * when photos are added — see the README).
 */
const SIZES = dims as unknown as Record<string, [number, number]>;

export type PhotoShape = "wide" | "normal" | "tall";

/** A photo's width ÷ height and real width, from the file (or an override). */
export function photoSize(src: string, ratio?: number): { ratio: number; width?: number } {
  const size = SIZES[src];
  if (ratio) return { ratio, width: size?.[0] };
  if (size) return { ratio: size[0] / size[1], width: size[0] };
  return { ratio: 4 / 3 };
}

/** Banner-like (≥ 1.9:1), portrait (≤ 0.8:1) or in between. */
export function photoShape(ratio: number): PhotoShape {
  return ratio >= 1.9 ? "wide" : ratio <= 0.8 ? "tall" : "normal";
}

/**
 * Props for a photo's frame: its shape as data-shape, and CSS variables for
 * the photo's proportions and real width. src/styles/blocks.css uses them to
 * size frames so nothing important is cut off and nothing is enlarged past
 * its own resolution.
 */
export function photoFrame(image?: { src: string; ratio?: number } | null) {
  if (!image) return {};
  const { ratio, width } = photoSize(image.src, image.ratio);
  const style = {
    "--photo-ratio": ratio.toFixed(4),
    ...(width ? { "--photo-w": `${width}px` } : {}),
  } as CSSProperties;
  return { style, "data-shape": photoShape(ratio) };
}

import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { MOVED } from "./redirects.mjs";
import { IMAGE_WIDTHS } from "./src/lib/image-widths.mjs";

/**
 * The site builds to static files (`out/`), served from S3 behind CloudFront
 * (infra/template.yaml). Redirects run in the CloudFront function there;
 * images are resized at build time by scripts/build-images.mjs and picked by
 * src/lib/image-loader.ts.
 */
export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    output: "export",
    poweredByHeader: false,
    images: {
      loader: "custom",
      loaderFile: "./src/lib/image-loader.ts",
      deviceSizes: IMAGE_WIDTHS.device,
      imageSizes: IMAGE_WIDTHS.image,
    },
    // `next dev` only: the same old addresses the CloudFront function redirects.
    ...(dev
      ? {
          async redirects() {
            const moved = Object.entries(MOVED).map(([source, destination]) => ({ source, destination, statusCode: 301 as const }));
            return [
              ...moved,
              { source: "/:year(\\d{4})", destination: "/blog", statusCode: 301 as const },
              { source: "/:year(\\d{4})/:month(\\d{2})", destination: "/blog", statusCode: 301 as const },
              { source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})", destination: "/blog", statusCode: 301 as const },
              { source: "/category/:slug*", destination: "/blog", statusCode: 301 as const },
              { source: "/author/:slug*", destination: "/blog", statusCode: 301 as const },
            ];
          },
        }
      : {}),
  };
}

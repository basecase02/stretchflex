import type { NextConfig } from "next";

/**
 * Pages that have not been rebuilt in Next.js yet can keep being served by the
 * existing WordPress site. Set WP_ORIGIN to wherever WordPress lives and every
 * URL this app does not own falls through to it, so no existing URL 404s.
 * It must be a different origin from the one this app is deployed on.
 */
const wpOrigin = process.env.WP_ORIGIN?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: wpOrigin ? [{ source: "/:path*", destination: `${wpOrigin}/:path*` }] : [],
    };
  },
};

export default nextConfig;

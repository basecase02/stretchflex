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
  // Pages that moved or were removed keep their old links working.
  async redirects() {
    return [
      { source: "/biljana-stojanovic", destination: "/biljana-mancini", permanent: true },
      { source: "/alan-chapman", destination: "/about", permanent: true },
    ];
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

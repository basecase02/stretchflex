/**
 * next/image loader for the static site: /images/a/b.jpg at width 828 is
 * /_img/images/a/b.jpg.828.webp, made at build time by scripts/build-images.mjs.
 * In `next dev` the original file is served.
 */
export default function loader({ src, width }: { src: string; width: number; quality?: number }) {
  if (process.env.NODE_ENV === "development" || !src.startsWith("/") || src.startsWith("/_next/") || src.endsWith(".svg")) return src;
  return `/_img${src}.${width}.webp`;
}

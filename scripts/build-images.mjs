// Resizes every image next/image can show into out/_img/<path>.<width>.webp
// (see src/lib/image-loader.ts). Run after `next build`. Results are cached in
// .image-cache so unchanged images are not re-encoded.
import { mkdir, readdir, stat, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { IMAGE_WIDTHS } from "../src/lib/image-widths.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "out", "_img");
const CACHE = join(ROOT, ".image-cache");
const WIDTHS = [...IMAGE_WIDTHS.image, ...IMAGE_WIDTHS.device];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield path;
  }
}

let made = 0;
let reused = 0;
const jobs = [];
for await (const file of walk(PUBLIC)) {
  const rel = relative(PUBLIC, file);
  const mtime = (await stat(file)).mtimeMs;
  jobs.push(async () => {
    const meta = await sharp(file).metadata();
    for (const w of WIDTHS) {
      const name = `${rel}.${w}.webp`;
      const cached = join(CACHE, name);
      const target = join(OUT, name);
      await mkdir(dirname(target), { recursive: true });
      if (existsSync(cached) && (await stat(cached)).mtimeMs >= mtime) {
        reused++;
      } else {
        await mkdir(dirname(cached), { recursive: true });
        await sharp(file).rotate().resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true }).webp({ quality: 78 }).toFile(cached);
        made++;
      }
      await copyFile(cached, target);
    }
  });
}

const POOL = 6;
let next = 0;
await Promise.all(Array.from({ length: POOL }, async () => { while (next < jobs.length) await jobs[next++](); }));
console.log(`images: ${jobs.length} files, ${made} sizes made, ${reused} from cache`);

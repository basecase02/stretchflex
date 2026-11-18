// Bundles the gift API (api/gift/handler.ts) into .aws-sam/gift/index.mjs for
// infra/template.yaml. Fonts, the logo and resvg's WebAssembly go in as bytes.
import { build } from "esbuild";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
await build({
  absWorkingDir: root,
  entryPoints: ["api/gift/handler.ts"],
  outfile: ".aws-sam/gift/index.mjs",
  bundle: true,
  platform: "node",
  target: "node22",
  format: "esm",
  minify: true,
  sourcemap: false,
  external: ["@aws-sdk/*"],
  loader: { ".ttf": "binary", ".png": "binary", ".wasm": "binary" },
  tsconfig: "tsconfig.json",
  banner: { js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);" },
  logLevel: "warning",
});
console.log("api bundled: .aws-sam/gift/index.mjs");

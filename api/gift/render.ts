// Draws a certificate (src/lib/gift/certificate.ts) to PNG and PDF.
// Fonts, the logo and resvg's WebAssembly are bundled in (see scripts/build-api.mjs).
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import wasm from "@resvg/resvg-wasm/index_bg.wasm";
import albert400 from "../../infra/gift-assets/albert-400.ttf";
import albert600 from "../../infra/gift-assets/albert-600.ttf";
import cormorant from "../../infra/gift-assets/cormorant-500.ttf";
import cormorantItalic from "../../infra/gift-assets/cormorant-500i.ttf";
import qwitcher from "../../infra/gift-assets/qwitcher-400.ttf";
import logoPng from "../../infra/gift-assets/logo-gold.png";
import { landscapeSvg, portraitSvg, type CertificateFields } from "../../src/lib/gift/certificate";

let ready: Promise<void> | null = null;
const init = () => (ready ??= initWasm(wasm));
const fonts = [albert400, albert600, cormorant, cormorantItalic, qwitcher];
const logo = "data:image/png;base64," + Buffer.from(logoPng as unknown as Uint8Array).toString("base64");

function qr(url: string) {
  const q = QRCode.create(url, { errorCorrectionLevel: "M" });
  return { size: q.modules.size, modules: Array.from(q.modules.data, Boolean) };
}

async function toPng(svg: string, width: number): Promise<Buffer> {
  await init();
  const r = new Resvg(svg, { font: { fontBuffers: fonts, loadSystemFonts: false, defaultFontFamily: "Albert Sans" }, fitTo: { mode: "width", value: width } });
  return Buffer.from(r.render().asPng());
}

/** The landscape certificate as an image (1200 px for email, larger for print). */
export const landscapePng = (f: CertificateFields, viewUrl: string, width = 1200) => toPng(landscapeSvg(f, { logo, qr: qr(viewUrl) }), width);

/** The portrait (mobile) certificate as an image. */
export const portraitPng = (f: CertificateFields, width = 900) => toPng(portraitSvg(f, { logo }), width);

/** A one-page landscape PDF (12 × 7.5 in) for printing. */
export async function certificatePdf(f: CertificateFields, viewUrl: string): Promise<Buffer> {
  const image = await landscapePng(f, viewUrl, 2400);
  const doc = await PDFDocument.create();
  doc.setTitle(`StretchFLEX gift certificate for ${f.recipient}`);
  doc.setAuthor("StretchFLEX");
  doc.setSubject(`${f.title} · ${f.code}`);
  doc.setCreator("stretchflex.au");
  const page = doc.addPage([864, 540]);
  const png = await doc.embedPng(image);
  page.drawImage(png, { x: 0, y: 0, width: 864, height: 540 });
  return Buffer.from(await doc.save());
}

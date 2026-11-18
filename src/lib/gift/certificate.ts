/**
 * The StretchFLEX gift certificate: Ray's own black-and-gold picture, with each
 * gift's details printed where its placeholders were. The picture with the
 * placeholders cleaned out is the "plate" (scripts/make-certificate-plate.mjs).
 *
 * It is SVG so the same file draws the live preview on the gift page and the
 * mobile certificate, and (rendered to PNG/PDF by the gift API) the email
 * image and the printable PDF.
 */

export type CertificateFields = {
  recipient: string;
  from: string;
  /** "The Ultimate Stretch" or "$250". */
  title: string;
  /** "60-minute assisted stretch" or "StretchFLEX credit towards any session". */
  detail: string;
  message?: string;
  code: string;
  /** "18 November 2029". */
  validUntil: string;
};

export type CertificateArt = {
  /** The plate (2752 × 1536 at full size): a URL in the browser, a data: URI on the server. */
  plate: string;
  /** QR modules for the mobile certificate link (row-major, true = dark), or null to keep the picture's own. */
  qr?: { size: number; modules: boolean[] } | null;
};

/** The longest personal message the certificate can show in full. */
export const MESSAGE_MAX = 80;

export const CERT_FONTS = {
  sans: "Albert Sans",
  serif: "Cormorant Garamond Light", // the family name inside the TTF the API renders with (500 weight)
  script: "Qwitcher Grypen",
};

const esc = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Breaks text into at most `lines` lines of about `width` characters (ellipsis if it runs over). */
export function wrap(text: string, width: number, lines: number): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const out: string[] = [];
  let line = "";
  for (const word of words) {
    if (!line) line = word;
    else if ((line + " " + word).length <= width) line += " " + word;
    else {
      out.push(line);
      line = word;
    }
  }
  if (line) out.push(line);
  if (out.length > lines) {
    const kept = out.slice(0, lines);
    kept[lines - 1] = kept[lines - 1].replace(/[\s,.;:!?-]*$/, "") + "…";
    return kept;
  }
  return out;
}

/** Shrinks a font size so `text` stays inside `maxWidth` (approximate glyph width). */
const fit = (text: string, size: number, maxWidth: number, em = 0.52) => Math.min(size, Math.floor(maxWidth / Math.max(1, text.length * em)));

// The picture's own size, and the tilt of the card in it.
const W = 2752, H = 1536, TILT = -2.92;
const SANS = `font-family="${CERT_FONTS.sans}"`;
// A plain gold (not a shared gradient: a second certificate on the page would point at the first one's).
const GOLD = `fill="#e9cb8c"`;

/** Text printed along the card: (x, y) is where its baseline starts (or its middle, with anchor "middle"). */
const print = (x: number, y: number, body: string, size: number, anchor = "start", more = "") =>
  `<text transform="translate(${x} ${y}) rotate(${TILT})" ${SANS} font-size="${size}" text-anchor="${anchor}" ${GOLD} ${more}>${esc(body)}</text>`;
/** Text printed up the stub, centred on (x, y). */
const printUp = (x: number, y: number, body: string, size: number, more = "") =>
  `<text transform="translate(${x} ${y}) rotate(${TILT - 90})" y="${(size * 0.35).toFixed(1)}" ${SANS} font-size="${size}" text-anchor="middle" ${GOLD} ${more}>${esc(body)}</text>`;

function qrPatch(qr: CertificateArt["qr"]) {
  if (!qr) return "";
  const size = 190, cell = size / (qr.size + 2);
  let path = "";
  qr.modules.forEach((on, i) => {
    if (!on) return;
    const x = -size / 2 + (1 + (i % qr.size)) * cell, y = -size / 2 + (1 + Math.floor(i / qr.size)) * cell;
    path += `M${x.toFixed(2)} ${y.toFixed(2)}h${cell.toFixed(2)}v${cell.toFixed(2)}h-${cell.toFixed(2)}z`;
  });
  return `<g transform="translate(2189 359) rotate(${TILT})"><rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" fill="#e3c27e"/><path d="${path}" fill="#1d1c1d"/></g>`;
}

/** The certificate, 2752 × 1536 (landscape): preview, email image, PDF and mobile. */
export function landscapeSvg(f: CertificateFields, art: CertificateArt): string {
  const name = f.recipient || "Recipient’s name";
  const message = f.message ? wrap(f.message, 46, 2) : [];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <image href="${art.plate}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/>
  ${print(1320, 806, name, fit(name, 68, 800), "middle")}
  ${print(1330, 968, f.title, fit(f.title, 72, 800), "middle")}
  ${print(1228, 1072, f.from || "Your name", fit(f.from || "Your name", 54, 640))}
  ${message.length ? `<g transform="translate(1244 1152) rotate(${TILT})" ${SANS} font-size="40" ${GOLD}><g transform="skewX(-10)">${message.map((line, i) => `<text x="${i ? -196 : 0}" y="${i * 50}">${esc(line)}</text>`).join("")}</g></g>` : ""}
  ${print(1196, 1267, "www.stretchflex.au", 37, "start", 'letter-spacing="1.5"')}
  ${qrPatch(art.qr)}
  ${printUp(2210, 712, f.code, fit(f.code, 48, 270, 0.68), 'letter-spacing="1"')}
  ${printUp(2293, 716, "VALID FOR 36 MONTHS", 30, 'letter-spacing="2"')}
</svg>`;
}

/** The mobile certificate is the same certificate (phones show it full width). */
export const portraitSvg = landscapeSvg;

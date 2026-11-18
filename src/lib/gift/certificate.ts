/**
 * The StretchFLEX gift certificate: one master design, filled in per gift.
 * It follows Ray's black-and-gold mock-up ("You are going on a… Stretch
 * Experience at StretchFLEX"), with the real address, the 36-month expiry
 * date and the gift's own code.
 *
 * It is plain SVG so the same file draws the live preview on the gift page,
 * the mobile certificate, and (rendered to PNG/PDF by the gift API) the email
 * image and the printable landscape PDF. Change the design here and every
 * format follows.
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
  /** Gold StretchFLEX logo (1223 × 260): a URL in the browser, a data: URI on the server. */
  logo: string;
  /** QR modules for the mobile certificate link (row-major, true = dark), or null to leave the box out. */
  qr?: { size: number; modules: boolean[] } | null;
};

/** The longest personal message the certificate can show in full. */
export const MESSAGE_MAX = 200;

export const CERT_FONTS = {
  sans: "Albert Sans",
  serif: "Cormorant Garamond Light", // the family name inside the TTF the API renders with (500 weight)
  script: "Qwitcher Grypen",
};

const GOLD = "#d9b46a";
const GOLD_LIGHT = "#f1dba6";
const GOLD_SOFT = "#c9a961";
const LOGO_RATIO = 260 / 1223;

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

/** Shrinks a font size so a line of `text` stays inside `maxWidth` (approximate glyph width). */
const fit = (text: string, size: number, maxWidth: number, em = 0.46) => Math.min(size, Math.floor(maxWidth / Math.max(1, text.length * em)));

const defs = `
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="#b98a3c"/>
      <stop offset="0.45" stop-color="#f3d993"/>
      <stop offset="0.62" stop-color="#dcb567"/>
      <stop offset="1" stop-color="#a87c31"/>
    </linearGradient>
    <radialGradient id="seal" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0" stop-color="#fbe9b0"/>
      <stop offset="0.55" stop-color="#dcb35e"/>
      <stop offset="1" stop-color="#a87a2c"/>
    </radialGradient>
    <radialGradient id="ground" cx="0.5" cy="0.3" r="0.9">
      <stop offset="0" stop-color="#1d1b19"/>
      <stop offset="1" stop-color="#0e0e0e"/>
    </radialGradient>
  </defs>`;

const SANS = `font-family="${CERT_FONTS.sans}"`;
const SERIF = `font-family="${CERT_FONTS.serif}" font-weight="500"`;

const text = (x: number, y: number, body: string, attrs: string) => `<text x="${x}" y="${y}" ${attrs}>${esc(body)}</text>`;
/** Small tracked gold capitals. */
const caps = (x: number, y: number, body: string, size = 19, anchor = "middle") =>
  text(x, y, body.toUpperCase(), `${SANS} font-size="${size}" letter-spacing="${(size * 0.14).toFixed(1)}" fill="${GOLD_SOFT}" text-anchor="${anchor}"`);
const capsSpan = (body: string, size: number) => `<tspan ${SANS} font-size="${size}" letter-spacing="${(size * 0.14).toFixed(1)}" fill="${GOLD_SOFT}">${esc(body.toUpperCase())}</tspan>`;

/** Gold double frame: a heavy outer rule and a fine inner one with notched corners and a dot in each. */
function frame(W: number, H: number) {
  const o = 36, a = 58, r = 30;
  const dot = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="5" fill="url(#gold)"/>`;
  return `<rect x="${o}" y="${o}" width="${W - 2 * o}" height="${H - 2 * o}" fill="none" stroke="url(#gold)" stroke-width="6"/>
  <path d="M${a + r} ${a}H${W - a - r}A${r} ${r} 0 0 0 ${W - a} ${a + r}V${H - a - r}A${r} ${r} 0 0 0 ${W - a - r} ${H - a}H${a + r}A${r} ${r} 0 0 0 ${a} ${H - a - r}V${a + r}A${r} ${r} 0 0 0 ${a + r} ${a}Z" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  ${dot(a + 7, a + 7)}${dot(W - a - 7, a + 7)}${dot(a + 7, H - a - 7)}${dot(W - a - 7, H - a - 7)}`;
}

function qrBox(qr: CertificateArt["qr"], x: number, y: number, size: number) {
  if (!qr) return "";
  const quiet = 2;
  const cell = size / (qr.size + quiet * 2);
  let path = "";
  qr.modules.forEach((on, i) => {
    if (!on) return;
    const cx = x + (quiet + (i % qr.size)) * cell;
    const cy = y + (quiet + Math.floor(i / qr.size)) * cell;
    path += `M${cx.toFixed(2)} ${cy.toFixed(2)}h${cell.toFixed(2)}v${cell.toFixed(2)}h-${cell.toFixed(2)}z`;
  });
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="8" fill="#f1dba6"/><path d="${path}" fill="#0e0e0e"/>`;
}

/** The gold seal with a scalloped edge. */
function seal(cx: number, cy: number, r: number) {
  const edge = 2 * Math.PI * (r + 2);
  const scallops = 26;
  return `<circle cx="${cx}" cy="${cy}" r="${r + 2}" fill="none" stroke="url(#seal)" stroke-width="${(r * 0.2).toFixed(1)}" stroke-linecap="round" stroke-dasharray="0.1 ${(edge / scallops - 0.1).toFixed(2)}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#seal)"/>
  <circle cx="${cx}" cy="${cy}" r="${(r * 0.8).toFixed(1)}" fill="none" stroke="#8f6a25" stroke-opacity="0.55" stroke-width="1.5"/>
  ${text(cx, cy + r * 0.11, "StretchFLEX", `${SERIF} font-size="${(r * 0.27).toFixed(1)}" fill="#3b2b0d" text-anchor="middle"`)}`;
}

const giftLabel = (f: CertificateFields) => (f.title.startsWith("$") ? "For the amount of:" : "For:");

/** Landscape, 1600 × 1000: the PDF and the email image. */
export function landscapeSvg(f: CertificateFields, art: CertificateArt): string {
  const W = 1600, H = 1000, stubX = 1250, cx = (58 + stubX) / 2, sx = (stubX + W - 58) / 2;
  const name = f.recipient || "Recipient’s name";
  const message = f.message ? wrap(f.message, 74, 3) : [];
  const half = 340;
  const logoW = 190;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}
  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  ${frame(W, H)}
  <line x1="${stubX}" y1="118" x2="${stubX}" y2="${H - 118}" stroke="${GOLD}" stroke-width="1.6"/>

  ${caps(cx, 158, "You are going on a…", 27)}
  ${text(cx, 300, "Stretch Experience", `font-family="${CERT_FONTS.script}" font-size="196" fill="url(#gold)" text-anchor="middle"`)}
  <text x="${cx}" y="366" text-anchor="middle">${capsSpan("At ", 26)}<tspan ${SERIF} font-size="52" fill="${GOLD_LIGHT}">StretchFLEX</tspan></text>

  ${caps(cx, 424, "This digital gift certificate is proudly presented to:", 19)}
  ${text(cx, 486, name, `${SERIF} font-size="${fit(name, 58, 2 * half)}" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
  <line x1="${cx - half}" y1="506" x2="${cx + half}" y2="506" stroke="${GOLD}" stroke-width="1.4"/>

  ${caps(cx - half, 552, giftLabel(f), 19, "start")}
  ${text(cx, 606, f.title, `${SERIF} font-size="${fit(f.title, 56, 2 * half)}" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
  <line x1="${cx - half}" y1="626" x2="${cx + half}" y2="626" stroke="${GOLD}" stroke-width="1.4"/>
  ${text(cx, 656, f.detail, `${SANS} font-size="19" fill="${GOLD_SOFT}" text-anchor="middle"`)}

  <text x="${cx}" y="716" text-anchor="middle">${capsSpan("From: ", 22)}<tspan ${SERIF} font-size="40" fill="${GOLD_LIGHT}">${esc(f.from || "Your name")}</tspan></text>
  ${message.length ? caps(cx, 756, "Message:", 17) : ""}
  ${message.map((line, i) => text(cx, 790 + i * 34, line, `${SERIF} font-style="italic" font-size="28" fill="${GOLD_LIGHT}" text-anchor="middle"`)).join("")}

  <image href="${art.logo}" x="118" y="${H - 122}" width="${logoW}" height="${Math.round(logoW * LOGO_RATIO)}"/>
  ${text(cx, H - 92, "www.stretchflex.au", `${SANS} font-size="20" letter-spacing="1" fill="${GOLD_SOFT}" text-anchor="middle"`)}
  ${caps(stubX - 40, H - 92, "Redeemable online & in studio", 16, "end")}

  ${qrBox(art.qr, sx - 92, 112, 184)}
  <g transform="rotate(-90 ${sx} 532)">
    ${caps(sx, 532 - 62, "Online redemption code:", 18)}
    ${text(sx, 532 + 2, f.code, `${SANS} font-weight="600" font-size="${fit(f.code, 44, 380, 0.7)}" letter-spacing="2" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
    <line x1="${sx - 180}" y1="${532 + 30}" x2="${sx + 180}" y2="${532 + 30}" stroke="${GOLD}" stroke-width="1.2"/>
    ${caps(sx, 532 + 70, `Valid until ${f.validUntil}`, 18)}
  </g>
  ${seal(sx, H - 196, 76)}
</svg>`;
}

/** Portrait, 900 × 1600: the mobile certificate shown at the studio. */
export function portraitSvg(f: CertificateFields, art: CertificateArt): string {
  const W = 900, H = 1600, cx = W / 2, half = 300;
  const name = f.recipient || "Recipient’s name";
  const message = f.message ? wrap(f.message, 46, 5) : [];
  const m = message.length * 36;
  const logoW = 170;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${defs}
  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  ${frame(W, H)}

  ${caps(cx, 176, "You are going on a…", 26)}
  ${text(cx, 312, "Stretch Experience", `font-family="${CERT_FONTS.script}" font-size="150" fill="url(#gold)" text-anchor="middle"`)}
  <text x="${cx}" y="378" text-anchor="middle">${capsSpan("At ", 24)}<tspan ${SERIF} font-size="48" fill="${GOLD_LIGHT}">StretchFLEX</tspan></text>

  ${caps(cx, 452, "This digital gift certificate", 18)}
  ${caps(cx, 480, "is proudly presented to:", 18)}
  ${text(cx, 548, name, `${SERIF} font-size="${fit(name, 58, 2 * half)}" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
  <line x1="${cx - half}" y1="572" x2="${cx + half}" y2="572" stroke="${GOLD}" stroke-width="1.4"/>

  ${caps(cx - half, 628, giftLabel(f), 18, "start")}
  ${text(cx, 688, f.title, `${SERIF} font-size="${fit(f.title, 54, 2 * half)}" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
  <line x1="${cx - half}" y1="712" x2="${cx + half}" y2="712" stroke="${GOLD}" stroke-width="1.4"/>
  ${text(cx, 746, f.detail, `${SANS} font-size="19" fill="${GOLD_SOFT}" text-anchor="middle"`)}

  <text x="${cx}" y="818" text-anchor="middle">${capsSpan("From: ", 21)}<tspan ${SERIF} font-size="40" fill="${GOLD_LIGHT}">${esc(f.from || "Your name")}</tspan></text>
  ${message.length ? caps(cx, 866, "Message:", 17) : ""}
  ${message.map((line, i) => text(cx, 904 + i * 36, line, `${SERIF} font-style="italic" font-size="28" fill="${GOLD_LIGHT}" text-anchor="middle"`)).join("")}

  <line x1="100" y1="${880 + (m ? m + 40 : 0)}" x2="${W - 100}" y2="${880 + (m ? m + 40 : 0)}" stroke="${GOLD}" stroke-width="1.4" stroke-dasharray="2 9" stroke-linecap="round"/>
  ${(() => {
    const y = 880 + (m ? m + 40 : 0);
    return `${caps(cx, y + 58, "Online redemption code:", 18)}
  ${text(cx, y + 116, f.code, `${SANS} font-weight="600" font-size="${fit(f.code, 50, 640, 0.7)}" letter-spacing="3" fill="${GOLD_LIGHT}" text-anchor="middle"`)}
  ${caps(cx, y + 172, `Valid until ${f.validUntil}`, 18)}
  ${["Book at stretchflex.au/book-your-session and enter", "your code, or show this screen in studio:", "111 Trinity Arcade, 72 St Georges Terrace, Perth"]
    .map((line, i) => text(cx, y + 226 + i * 30, line, `${SANS} font-size="19" fill="${GOLD_SOFT}" text-anchor="middle"`))
    .join("")}`;
  })()}

  <image href="${art.logo}" x="112" y="${H - 132}" width="${logoW}" height="${Math.round(logoW * LOGO_RATIO)}"/>
  ${seal(W - 170, H - 150, 56)}
</svg>`;
}

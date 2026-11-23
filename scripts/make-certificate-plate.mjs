// Makes the certificate "plate" from Ray's mock-up picture: the same image
// with its placeholder text ([Recipient's Name], SF-XXXXX, …) cleaned out, so
// src/lib/gift/certificate.ts can print each gift's details in those places.
// usage: node scripts/make-certificate-plate.mjs <mock-up.jpg>
import sharp from "sharp";

const SLOPE = -0.0509; // the card is tilted about 2.9° in the picture
const src = process.argv[2];
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
const W = info.width, C = info.channels;
const at = (x, y) => (y * W + x) * C;

/** Median of the values around index i (so a stray letter stroke on the sample row leaves no streak). */
const smooth = (list, i, r = 14) => {
  const out = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const v = [];
    for (let k = Math.max(0, i - r); k <= Math.min(list.length - 1, i + r); k++) v.push(list[k][c]);
    out[c] = v.sort((m, n) => m - n)[v.length >> 1];
  }
  return out;
};
const rgb = (x, y) => [data[at(x, y)], data[at(x, y) + 1], data[at(x, y) + 2]];

/** Clears a tilted horizontal band: each column is blended from the card colour above it to the colour below. */
function clearRow(x0, x1, top, height) {
  const ys = [], above = [], below = [];
  for (let x = x0; x <= x1; x++) {
    const y0 = Math.round(top + SLOPE * (x - x0));
    ys.push(y0);
    above.push(rgb(x, y0 - 2));
    below.push(rgb(x, y0 + height + 2));
  }
  for (let x = x0; x <= x1; x++) {
    const i = x - x0, a = smooth(above, i), b = smooth(below, i);
    for (let y = ys[i]; y <= ys[i] + height; y++) {
      const t = (y - ys[i]) / height;
      for (let c = 0; c < 3; c++) data[at(x, y) + c] = Math.round(a[c] * (1 - t) + b[c] * t);
    }
  }
}
/** The same for the vertical text on the stub: each row is blended from left to right. */
function clearColumn(y0, y1, left, width) {
  for (let y = y0; y <= y1; y++) {
    const xa = Math.round(left - SLOPE * (y - y0)), xb = xa + width;
    for (let x = xa; x <= xb; x++) {
      const t = (x - xa) / width;
      for (let c = 0; c < 3; c++) data[at(x, y) + c] = Math.round(data[at(xa - 2, y) + c] * (1 - t) + data[at(xb + 2, y) + c] * t);
    }
  }
}

clearRow(1030, 1600, 765, 66); // [Recipient's Name]
clearRow(920, 1745, 922, 82); // [Value or Experience Name]
clearRow(1218, 1590, 1016, 70); // [Giver's Name]
clearRow(1232, 1640, 1108, 60); // [Custom Gift Message]
clearRow(1190, 1520, 1240, 32); // www.stretchflex.com
clearColumn(575, 850, 2181, 52); // SF-XXXXX
clearColumn(522, 905, 2252, 40); // VALID FOR 12 MONTHS

const plate = sharp(data, { raw: { width: W, height: info.height, channels: C } }).resize({ width: 1800 });
await plate.clone().jpeg({ quality: 86, mozjpeg: true }).toFile("infra/gift-assets/certificate-plate.jpg");
await plate.clone().jpeg({ quality: 86, mozjpeg: true }).toFile("public/images/gift/certificate-plate.jpg");
console.log("plate written");

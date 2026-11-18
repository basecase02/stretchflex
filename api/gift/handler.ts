// StretchFLEX gift certificates: one Lambda behind CloudFront at /api/gift/*.
//
//   POST /api/gift/checkout  gift details → Square payment link URL
//   GET  /api/gift/order     ?c=&t= → the gift, for the thank-you page (completes it if paid)
//   GET  /api/gift/view      ?c=&t= → certificate fields for the mobile certificate
//   GET  /api/gift/pdf       ?c=&t= → printable PDF
//
// Direct invokes: { action: "deliver", code } (EventBridge Scheduler, for
// scheduled gifts), { action: "sweep" } (every 10 minutes: completes paid gifts
// whose buyer closed the tab before returning), { action: "check" } (setup check).
//
// When a gift is paid: its code is created in Acuity under the matching
// private product (so it can be redeemed when booking online), the buyer gets a
// receipt with the certificate, and the recipient's email goes now or is
// scheduled for 8 am Perth time on the chosen day.
import { randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { acuityProductFor, describe, validUntil, type GiftChoice } from "../../src/lib/gift/catalog";
import type { CertificateFields } from "../../src/lib/gift/certificate";
import { buyerEmail, pdfUrl, recipientEmail, viewUrl } from "./emails";
import { certificatePdf, landscapePng } from "./render";
import {
  acuityCertificate, getGift, param, pendingGifts, putNewGift, scheduleDelivery, sendMail, square, squareLocation, squareOrderPaid, updateGift, type Gift,
} from "./services";

type HttpEvent = {
  rawPath?: string;
  rawQueryString?: string;
  body?: string;
  isBase64Encoded?: boolean;
  requestContext?: { http?: { method: string } };
  action?: string;
  code?: string;
};

const SITE = () => process.env.SITE_ORIGIN ?? "https://stretchflex.au";
const json = (status: number, body: unknown) => ({
  statusCode: status,
  headers: { "content-type": "application/json", "cache-control": "no-store" },
  body: JSON.stringify(body),
});
// CloudFront shows the site's 404 page for 403/404, so "not found" answers use 422.
const notFound = (error: string) => json(422, { error });

export async function handler(event: HttpEvent, context: { invokedFunctionArn: string }) {
  process.env.SELF_ARN = context.invokedFunctionArn;
  try {
    if (event.action) return await direct(event);
    const method = event.requestContext?.http?.method ?? "GET";
    const path = (event.rawPath ?? "").replace(/\/+$/, "");
    const query = new URLSearchParams(event.rawQueryString ?? "");
    const raw = event.body ? (event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body) : "";
    const route = `${method} ${path}`;
    const c = query.get("c") ?? "";
    const t = query.get("t") ?? "";
    if (route === "POST /api/gift/checkout") return await checkout(raw);
    if (route === "GET /api/gift/order") return await order(c, t);
    if (route === "GET /api/gift/view") return await view(c, t);
    if (route === "GET /api/gift/pdf") return await pdf(c, t);
    return notFound("Not found");
  } catch (e) {
    console.error(e);
    return json(500, { error: "Something went wrong. Please try again, or call us on 0432 569 077." });
  }
}

/* ───────────────────────────── buying ───────────────────────────── */

const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i;
const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

// No 0/O, 1/I/L: easy to read out over the phone. No dashes: typed as-is into Acuity.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const newCode = () => "SFX" + Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
const CODE = /^SFX[A-Z0-9]{8}$/;

const perthDay = (offsetDays = 0) => new Date(Date.now() + offsetDays * 864e5).toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });

async function checkout(raw: string) {
  let input: Record<string, unknown>;
  try {
    input = JSON.parse(raw);
  } catch {
    return json(400, { error: "Bad request" });
  }
  const choice: GiftChoice =
    input.kind === "experience" ? { kind: "experience", id: clean(input.id, 60) } : { kind: "value", amount: Number(input.amount) };
  const item = describe(choice);
  const recipientName = clean(input.recipientName, 60);
  const recipientEmail = clean(input.recipientEmail, 120).toLowerCase();
  const fromName = clean(input.fromName, 60);
  const fromEmail = clean(input.fromEmail, 120).toLowerCase();
  const message = clean(input.message, 80);
  let deliver = clean(input.deliver, 10) || "now";
  if (deliver !== "now") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(deliver) || deliver > perthDay(365)) return json(400, { error: "Choose a delivery date within the next 12 months." });
    if (deliver <= perthDay()) deliver = "now";
  }
  const errors: string[] = [];
  if (!item || !acuityProductFor(choice)) errors.push("Choose an experience or a gift value.");
  if (!recipientName) errors.push("Add the recipient’s name.");
  if (!EMAIL.test(recipientEmail)) errors.push("Check the recipient’s email address.");
  if (!fromName) errors.push("Add your name.");
  if (!EMAIL.test(fromEmail)) errors.push("Check your email address.");
  if (errors.length || !item) return json(400, { error: errors.join(" ") });

  const now = new Date();
  const gift: Gift = {
    code: newCode(),
    token: randomBytes(18).toString("base64url"),
    status: "pending",
    choice,
    title: item.title,
    detail: item.detail,
    price: item.price,
    recipientName,
    recipientEmail,
    fromName,
    fromEmail,
    message,
    deliver,
    validUntil: validUntil(now),
    createdAt: now.toISOString(),
  };
  await putNewGift(gift);

  const location = await squareLocation();
  const back = `${SITE()}/gift-certificates/thank-you?c=${gift.code}&t=${gift.token}`;
  const link = await square("online-checkout/payment-links", {
    idempotency_key: gift.code,
    order: {
      location_id: location,
      reference_id: gift.code,
      line_items: [
        {
          name: `StretchFLEX gift certificate: ${item.title}`,
          note: `For ${recipientName}. Code ${gift.code}. Valid 36 months.`,
          quantity: "1",
          base_price_money: { amount: Math.round(item.price * 100), currency: "AUD" },
        },
      ],
      metadata: { site: "stretchflex-gift", gift_code: gift.code },
    },
    checkout_options: { redirect_url: back, ask_for_shipping_address: false, merchant_support_email: "info@stretchflex.au" },
    pre_populated_data: { buyer_email: fromEmail },
    payment_note: `StretchFLEX gift certificate ${gift.code}`,
  });
  await updateGift(gift.code, { squareOrder: link.payment_link?.order_id, squareLink: link.payment_link?.id });
  return json(200, { url: link.payment_link?.url });
}

/** Checks Square and, if paid, completes the gift. Safe to call any number of times. */
async function settle(g: Gift): Promise<Gift> {
  if (g.status !== "pending" || !g.squareOrder) return g;
  if (!(await squareOrderPaid(g.squareOrder))) return g;
  if (!(await updateGift(g.code, { status: "paid", paidAt: new Date().toISOString() }, "pending", "paid in Square"))) return (await getGift(g.code)) ?? g;
  const paid: Gift = { ...g, status: "paid" };

  // The code in Acuity, so it can be redeemed when booking online.
  try {
    await acuityCertificate(acuityProductFor(g.choice)!, g.code, g.recipientEmail);
    await updateGift(g.code, { acuity: true }, undefined, "code created in Acuity");
  } catch (e) {
    console.error("acuity", g.code, e);
    await updateGift(g.code, { acuity: false }, undefined, `Acuity code not created: ${(e as Error).message}`);
  }

  if (g.deliver === "now") await deliver(paid);
  else await scheduleDelivery(g.code, g.deliver);
  await mailWithCertificate(paid, g.fromEmail, buyerEmail(paid));
  return (await getGift(g.code)) ?? paid;
}

async function order(code: string, token: string) {
  const g = await mine(code, token, true);
  if (!g) return notFound("We couldn’t find your order.");
  const now = await settle(g);
  const done = now.status !== "pending";
  return json(200, {
    paid: done,
    code: now.code,
    title: now.title,
    recipientName: now.recipientName,
    recipientEmail: now.recipientEmail,
    deliver: now.deliver,
    pdf: done ? pdfUrl(now) : null,
    view: done ? viewUrl(now) : null,
  });
}

function fields(g: Gift): CertificateFields {
  return { recipient: g.recipientName, from: g.fromName, title: g.title, detail: g.detail, message: g.message, code: g.code, validUntil: g.validUntil };
}

async function mailWithCertificate(g: Gift, to: string, mail: { subject: string; html: string; text: string }) {
  const [png, doc] = await Promise.all([landscapePng(fields(g), viewUrl(g)), certificatePdf(fields(g), viewUrl(g))]);
  await sendMail({
    to,
    ...mail,
    replyTo: "info@stretchflex.au",
    files: [
      { name: "certificate.png", type: "image/png", data: png, inline: true },
      { name: `StretchFLEX-gift-${g.code}.pdf`, type: "application/pdf", data: doc },
    ],
  });
}

async function deliver(g: Gift) {
  await mailWithCertificate(g, g.recipientEmail, recipientEmail(g));
  await updateGift(g.code, { status: "sent", sentAt: new Date().toISOString() }, "paid", `emailed to ${g.recipientEmail}`);
}

/* ───────────────────────────── receiving ───────────────────────────── */

const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

async function mine(code: string, token: string, pendingOk = false) {
  if (!CODE.test(code) || !token) return null;
  const g = await getGift(code);
  if (!g || g.status === "void" || (!pendingOk && g.status === "pending")) return null;
  return same(g.token, token) ? g : null;
}

async function view(code: string, token: string) {
  const g = await mine(code, token);
  if (!g) return notFound("We couldn’t find that certificate.");
  return json(200, { ...fields(g), kind: g.choice.kind, pdf: pdfUrl(g) });
}

async function pdf(code: string, token: string) {
  const g = await mine(code, token);
  if (!g) return notFound("We couldn’t find that certificate.");
  const doc = await certificatePdf(fields(g), viewUrl(g));
  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: { "content-type": "application/pdf", "content-disposition": `inline; filename="StretchFLEX-gift-${g.code}.pdf"`, "cache-control": "private, max-age=3600" },
    body: doc.toString("base64"),
  };
}

/* ───────────────────────────── direct invokes ───────────────────────────── */

async function direct(event: HttpEvent) {
  if (event.action === "deliver" && event.code) {
    const g = await getGift(event.code);
    if (g?.status === "paid") await deliver(g);
    return { ok: true };
  }
  if (event.action === "sweep") {
    const pending = await pendingGifts();
    let done = 0;
    for (const g of pending) {
      try {
        if ((await settle(g)).status !== "pending") done++;
      } catch (e) {
        console.error("sweep", g.code, e);
      }
    }
    return { pending: pending.length, completed: done };
  }
  if (event.action === "check") {
    // Setup check: which connections work (no secrets returned).
    const out: Record<string, string> = {};
    try {
      out.square = `ok, location ${await squareLocation()}`;
    } catch (e) {
      out.square = (e as Error).message;
    }
    try {
      const user = await param(process.env.ACUITY_USER_PARAM ?? "");
      const key = await param(process.env.ACUITY_KEY_PARAM ?? "");
      const r = await fetch("https://acuityscheduling.com/api/v1/me", { headers: { Authorization: "Basic " + Buffer.from(`${user}:${key}`).toString("base64") } });
      const me = (await r.json().catch(() => ({}))) as Record<string, any>;
      out.acuity = r.ok ? `ok, ${me.name ?? me.email ?? "account"}` : `Acuity ${r.status}`;
    } catch (e) {
      out.acuity = (e as Error).message;
    }
    return out;
  }
  return { ok: false };
}

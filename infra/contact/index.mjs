// POST /api/contact (API Gateway): the contact form's message.
// Sends two emails with SES:
//   1. the enquiry to the studio (TO_EMAIL), with Reply-To set to the visitor
//   2. a short "thanks, we got it" reply to the visitor
// The reply to the visitor never repeats what they typed (only their first
// name), so the form can't be used to send other people arbitrary text.
// Each visitor IP may send RATE_LIMIT messages an hour (DynamoDB counter).
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const ses = new SESv2Client({});
const db = new DynamoDBClient({});

const {
  TO_EMAIL = "info@stretchflex.au",
  FROM_DOMAIN = "stretchflex.au",
  TABLE = "",
  RATE_LIMIT = "5",
} = process.env;

const SITE = "https://stretchflex.au";
const PHONE = "0432 569 077";
const ADDRESS = "111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, phone: 40, message: 5000 };

const reply = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json", "cache-control": "no-store" },
  body: JSON.stringify(body),
});

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/** Strips line breaks and control characters (for headers and subjects). */
const oneLine = (s) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

function parse(event) {
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString("utf8") : event.body ?? "";
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

function clean(data) {
  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const fields = {
    name: oneLine(str(data.name)),
    email: oneLine(str(data.email)),
    phone: oneLine(str(data.phone)),
    message: str(data.message).replace(/\r\n?/g, "\n"),
  };
  if (!fields.name || !fields.email || !fields.message) return null;
  if (!EMAIL_PATTERN.test(fields.email)) return null;
  if (fields.phone && !/^[\d\s()+-]{6,}$/.test(fields.phone)) return null;
  for (const [k, max] of Object.entries(LIMITS)) if (fields[k].length > max) return null;
  return fields;
}

/** True when this IP is still under its hourly limit. Fails open if DynamoDB is unreachable. */
async function allowed(ip) {
  if (!TABLE || !ip) return true;
  const hour = Math.floor(Date.now() / 3_600_000);
  try {
    const out = await db.send(
      new UpdateItemCommand({
        TableName: TABLE,
        Key: { pk: { S: `${ip}#${hour}` } },
        UpdateExpression: "ADD #n :one SET #ttl = if_not_exists(#ttl, :ttl)",
        ExpressionAttributeNames: { "#n": "count", "#ttl": "expires" },
        ExpressionAttributeValues: { ":one": { N: "1" }, ":ttl": { N: String((hour + 2) * 3600) } },
        ReturnValues: "UPDATED_NEW",
      }),
    );
    return Number(out.Attributes?.count?.N ?? 0) <= Number(RATE_LIMIT);
  } catch (err) {
    console.error("rate limit check failed", err);
    return true;
  }
}

function emailHtml(title, rows) {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#DDE7F1;font-family:Arial,Helvetica,sans-serif;color:#06314E">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px" cellpadding="0" cellspacing="0"><tr><td>
<p style="margin:0 0 4px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#0F75BC;font-weight:bold">StretchFLEX</p>
<h1 style="margin:0 0 18px;font-size:22px;color:#06314E">${title}</h1>
${rows}
</td></tr></table></body></html>`;
}

function studioEmail(f) {
  const subject = `Website enquiry from ${f.name}`;
  const text = [
    `New message from the contact form on ${SITE}/contact-us`,
    "",
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "Not given"}`,
    "",
    f.message,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
  const row = (label, value) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#5a6b7b;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0">${value}</td></tr>`;
  const html = emailHtml(
    `New enquiry from ${esc(f.name)}`,
    `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px">
${row("Name", esc(f.name))}
${row("Email", `<a href="mailto:${esc(f.email)}" style="color:#0F75BC">${esc(f.email)}</a>`)}
${row("Phone", f.phone ? `<a href="tel:${esc(f.phone.replace(/[^\d+]/g, ""))}" style="color:#0F75BC">${esc(f.phone)}</a>` : "Not given")}
</table>
<div style="margin:18px 0;padding:16px;background:#E6EFF8;border-radius:10px;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(f.message)}</div>
<p style="margin:0;font-size:13px;color:#5a6b7b">Reply to this email to answer ${esc(f.name.split(" ")[0])} directly.</p>`,
  );
  return { subject, text, html };
}

function visitorEmail(f) {
  const first = f.name.split(" ")[0].slice(0, 40);
  const subject = "Thanks for contacting StretchFLEX";
  const text = [
    `Hi ${first},`,
    "",
    "Thanks for getting in touch with StretchFLEX. We've received your message and will get back to you soon, usually within one business day.",
    "",
    `Ready to book? Choose a session and time online: ${SITE}/book-your-session`,
    "",
    `Need us sooner? Call ${PHONE} (Monday to Friday, 8:30 am to 5:30 pm).`,
    "",
    "The StretchFLEX team",
    ADDRESS,
  ].join("\n");
  const html = emailHtml(
    `Thanks, ${esc(first)}. We've got your message.`,
    `<p style="margin:0 0 14px;font-size:15px;line-height:1.55">Thanks for getting in touch with StretchFLEX. We've received your message and will get back to you soon, usually within one business day.</p>
<p style="margin:22px 0"><a href="${SITE}/book-your-session" style="display:inline-block;background:#EF4036;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:999px;letter-spacing:.04em;text-transform:uppercase;font-size:14px">Book a session</a></p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.55">Need us sooner? Call <a href="tel:0432569077" style="color:#0F75BC">${PHONE}</a>, Monday to Friday, 8:30 am to 5:30 pm.</p>
<p style="margin:22px 0 0;font-size:15px">The StretchFLEX team</p>
<p style="margin:4px 0 0;font-size:13px;color:#5a6b7b">${ADDRESS}</p>`,
  );
  return { subject, text, html };
}

const send = (from, to, replyTo, { subject, text, html }) =>
  ses.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [replyTo],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: { Text: { Data: text, Charset: "UTF-8" }, Html: { Data: html, Charset: "UTF-8" } },
        },
      },
    }),
  );

export async function handler(event) {
  const headers = event.headers ?? {};
  if (event.requestContext?.http?.method !== "POST") return reply(405, { error: "method not allowed" });

  const data = parse(event);
  if (!data) return reply(400, { error: "invalid request" });
  // Honeypot: a hidden field people never see. Bots that fill it get a quiet "ok".
  if (typeof data.company === "string" && data.company.trim()) return reply(200, { ok: true });

  const fields = clean(data);
  if (!fields) return reply(400, { error: "invalid fields" });

  // CloudFront-Viewer-Address is "ip:port" (IPv6 has colons too, so drop only the last part).
  // On the live domain API Gateway sees the visitor; behind CloudFront (the preview) the visitor is in CloudFront-Viewer-Address.
  const viaCloudFront = (event.requestContext?.domainName ?? "").endsWith(".amazonaws.com") && headers["cloudfront-viewer-address"];
  const ip = viaCloudFront ? headers["cloudfront-viewer-address"].replace(/:\d+$/, "") : event.requestContext?.http?.sourceIp ?? "";
  if (!(await allowed(ip))) return reply(429, { error: "too many messages" });

  try {
    await send(`StretchFLEX website <website@${FROM_DOMAIN}>`, TO_EMAIL, fields.email, studioEmail(fields));
  } catch (err) {
    console.error("studio email failed", err);
    return reply(502, { error: "could not send" });
  }
  try {
    await send(`StretchFLEX <${TO_EMAIL}>`, fields.email, TO_EMAIL, visitorEmail(fields));
  } catch (err) {
    // The studio has the message; a bad visitor address shouldn't show an error.
    console.error("visitor reply failed", err);
  }
  console.log("enquiry sent", JSON.stringify({ ip }));
  return reply(200, { ok: true });
}

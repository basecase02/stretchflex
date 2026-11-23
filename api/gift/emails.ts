// The two gift emails: the certificate for the recipient, and the receipt
// (with a copy of the certificate) for the buyer. Black-and-gold, table
// layout and inline styles so they hold up in every mail app.
import type { Gift } from "./services";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const GOLD = "#d9b46a";
const SITE = () => process.env.SITE_ORIGIN ?? "https://stretchflex.au";

export const viewUrl = (g: Gift) => `${SITE()}/gift-certificates/view?c=${encodeURIComponent(g.code)}&t=${encodeURIComponent(g.token)}`;
export const pdfUrl = (g: Gift) => `${SITE()}/api/gift/pdf?c=${encodeURIComponent(g.code)}&t=${encodeURIComponent(g.token)}`;

function shell(preheader: string, body: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark light"></head>
<body style="margin:0;padding:0;background:#0b0b0b;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b0b;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;font-family:'Helvetica Neue',Arial,sans-serif;color:#f4eee2;">
<tr><td align="center" style="padding:8px 0 24px;font-size:12px;letter-spacing:5px;color:${GOLD};text-transform:uppercase;">StretchFLEX · The gift of movement</td></tr>
${body}
<tr><td align="center" style="padding:28px 16px 0;font-size:12px;line-height:20px;color:#8f877a;">
StretchFLEX · 111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000<br>
<a href="tel:0432569077" style="color:#8f877a;">0432 569 077</a> · <a href="mailto:info@stretchflex.au" style="color:#8f877a;">info@stretchflex.au</a> · <a href="${SITE()}" style="color:#8f877a;">stretchflex.au</a>
</td></tr></table></td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${GOLD};color:#0b0b0b;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 26px;border-radius:999px;margin:6px;">${label}</a>`;

const howTo = (g: Gift) => `
<tr><td style="padding:26px 28px;background:#141210;border:1px solid #3a3226;border-radius:14px;">
<p style="margin:0 0 10px;font-size:12px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;">How to redeem</p>
<p style="margin:0 0 8px;font-size:15px;line-height:23px;">1. Book online at <a href="${SITE()}/book-your-session" style="color:${GOLD};">stretchflex.au/book-your-session</a> and enter code <strong style="letter-spacing:1px;">${esc(g.code)}</strong> at checkout, or call us on 0432 569 077.</p>
<p style="margin:0 0 8px;font-size:15px;line-height:23px;">2. Show this certificate on your phone, or printed, when you arrive.</p>
<p style="margin:0;font-size:13px;line-height:20px;color:#a99f8e;">Valid until ${esc(g.validUntil)}. ${g.choice.kind === "value" ? "Any amount left over stays on the certificate for next time." : "Covers one session of the experience shown."}</p>
</td></tr>`;

/** What to do before the session, from the site's First Time Visitors and FAQs (same wording). */
const PREP: [string, string][] = [
  ["Socks are compulsory", "Bring a clean, unworn pair of socks to change into before your session, for hygiene and grip. Forgot yours? StretchFLEX grip socks are $15 at reception."],
  ["What to wear", "Comfortable, flexible activewear. You stay clothed for the whole session. For Photobiotic or light sessions, light-coloured activewear works best, as denim and dark, heavy fabrics block the light."],
  ["Before you arrive", "Eat lightly and avoid a heavy meal in the one to two hours before, bring a water bottle, and arrive 5 to 10 minutes early."],
  ["Your health", "Tell us about any injuries, surgery or health conditions when you book. If you have had a recent injury, surgery or diagnosis, check with your health professional first."],
  ["Changing your booking", "Give us at least 48 hours notice to reschedule. See our Refund and Cancellation Policy at stretchflex.au/refund-and-cancellation-policy."],
  ["Finding us", "111 Trinity Arcade, 72 St Georges Terrace, Perth. Trinity Arcade runs between St Georges Terrace and Hay Street Mall, a short walk from Perth Underground and Elizabeth Quay stations."],
];

const prepHtml = () => `
<tr><td style="padding:22px 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:26px 28px;background:#141210;border:1px solid #3a3226;border-radius:14px;">
<p style="margin:0 0 12px;font-size:12px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;">Before your session</p>
${PREP.map(([h, b]) => `<p style="margin:0 0 12px;font-size:15px;line-height:23px;"><strong style="color:${GOLD};">${esc(h)}.</strong> ${esc(b)}</p>`).join("\n")}
</td></tr></table></td></tr>`;

const prepText = () => "\nBEFORE YOUR SESSION\n" + PREP.map(([h, b]) => `- ${h}: ${b}`).join("\n") + "\n";

export function recipientEmail(g: Gift) {
  const first = g.recipientName.split(" ")[0];
  const html = shell(
    `${g.fromName} has sent you a StretchFLEX gift`,
    `<tr><td align="center" style="padding:0 16px 22px;">
<h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:38px;color:#f4eee2;">${esc(first)}, you’ve been given the gift of movement</h1>
<p style="margin:0;font-size:16px;line-height:25px;color:#cfc6b4;">${esc(g.fromName)} has gifted you <strong style="color:${GOLD};">${esc(g.title)}</strong> at StretchFLEX, Perth.</p>
</td></tr>
<tr><td style="padding:0 0 22px;"><img src="cid:certificate.png" width="600" alt="Your StretchFLEX gift certificate: ${esc(g.title)}, code ${esc(g.code)}" style="display:block;width:100%;height:auto;border-radius:10px;"></td></tr>
${g.message ? `<tr><td align="center" style="padding:0 24px 22px;font-family:Georgia,serif;font-style:italic;font-size:18px;line-height:28px;color:#f4eee2;">“${esc(g.message)}”<br><span style="font-style:normal;font-size:14px;color:${GOLD};">— ${esc(g.fromName)}</span></td></tr>` : ""}
<tr><td align="center" style="padding:0 0 26px;">${button(`${SITE()}/book-your-session`, "Book your session")}${button(viewUrl(g), "Open mobile certificate")}</td></tr>
${howTo(g)}
${prepHtml()}
<tr><td align="center" style="padding:18px 0 0;font-size:13px;color:#a99f8e;">The printable certificate is attached as a PDF.</td></tr>`,
  );
  const text = `${first}, ${g.fromName} has gifted you ${g.title} at StretchFLEX, Perth.
${g.message ? `\n"${g.message}"\n` : ""}
Your code: ${g.code}
Valid until: ${g.validUntil}

Book online at ${SITE()}/book-your-session and enter your code, or call 0432 569 077.
Show your certificate when you arrive: ${viewUrl(g)}
${prepText()}
StretchFLEX, 111 Trinity Arcade, 72 St Georges Terrace, Perth WA 6000`;
  return { subject: `${g.fromName} has sent you a StretchFLEX gift`, html, text };
}

export function buyerEmail(g: Gift) {
  const when =
    g.deliver === "now"
      ? `We’ve emailed it to ${g.recipientName} at ${g.recipientEmail}.`
      : `We’ll email it to ${g.recipientName} at ${g.recipientEmail} on ${new Date(g.deliver + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, at 12 am (midnight) Perth time, as the day begins.`;
  const html = shell(
    `Your StretchFLEX gift for ${g.recipientName} is confirmed`,
    `<tr><td align="center" style="padding:0 16px 22px;">
<h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:30px;line-height:38px;">Thank you, ${esc(g.fromName.split(" ")[0])}</h1>
<p style="margin:0;font-size:16px;line-height:25px;color:#cfc6b4;">Your gift of <strong style="color:${GOLD};">${esc(g.title)}</strong> for ${esc(g.recipientName)} is confirmed. ${esc(when)}</p>
</td></tr>
<tr><td style="padding:0 0 22px;"><img src="cid:certificate.png" width="600" alt="The gift certificate" style="display:block;width:100%;height:auto;border-radius:10px;"></td></tr>
<tr><td style="padding:22px 28px;background:#141210;border:1px solid #3a3226;border-radius:14px;font-size:15px;line-height:24px;">
<strong style="color:${GOLD};">Receipt</strong><br>
${esc(g.title)} (${esc(g.detail)})<br>
Paid: $${g.price.toFixed(2)} AUD (incl. GST)<br>
Certificate: ${esc(g.code)} · valid until ${esc(g.validUntil)}
</td></tr>
<tr><td align="center" style="padding:24px 0 0;">${button(pdfUrl(g), "Download printable PDF")}</td></tr>
<tr><td align="center" style="padding:14px 16px 0;font-size:13px;line-height:20px;color:#a99f8e;">Prefer to hand it over yourself? The PDF is attached, ready to print.</td></tr>`,
  );
  const text = `Thank you. Your gift of ${g.title} for ${g.recipientName} is confirmed. ${when}

Paid: $${g.price.toFixed(2)} AUD (incl. GST)
Certificate: ${g.code}, valid until ${g.validUntil}
Printable PDF: ${pdfUrl(g)}`;
  return { subject: `Your StretchFLEX gift for ${g.recipientName} is confirmed`, html, text };
}

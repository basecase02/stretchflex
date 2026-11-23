// Square (payment), Acuity (redeemable codes), AWS SES (email) and the gift
// table. Keys live in SSM Parameter Store under /raymancini/<env>/stretchflex/*
// and are read once per cold start.
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { randomBytes } from "node:crypto";

const env = (name: string) => process.env[name] ?? "";
const ssm = new SSMClient({});
const cache = new Map<string, Promise<string>>();

export function param(name: string): Promise<string> {
  if (!cache.has(name)) {
    cache.set(
      name,
      ssm.send(new GetParameterCommand({ Name: name, WithDecryption: true })).then((r) => r.Parameter?.Value ?? "").catch(() => ""),
    );
  }
  return cache.get(name)!;
}

/* ─────────────────────────────── Square ─────────────────────────────── */

const SQUARE = "https://connect.squareup.com/v2";

export async function square(path: string, body?: unknown) {
  const token = await param(env("SQUARE_TOKEN_PARAM"));
  if (!token) throw new Error("Square token missing");
  const res = await fetch(`${SQUARE}/${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "Square-Version": "2025-01-23" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = (await res.json()) as Record<string, any>;
  if (!res.ok) throw new Error(`Square ${res.status}: ${json.errors?.[0]?.detail ?? "error"}`);
  return json;
}

let locationId: Promise<string> | null = null;
/** The StretchFLEX location in Square (the one Acuity uses too). */
export function squareLocation(): Promise<string> {
  return (locationId ??= square("locations").then((r) => {
    const all = (r.locations ?? []).filter((l: any) => l.status === "ACTIVE");
    const named = all.find((l: any) => /stretchflex/i.test(l.name ?? ""));
    const loc = named ?? all[0];
    if (!loc) throw new Error("No active Square location");
    return loc.id as string;
  }));
}

/** True once the order behind a payment link has been paid in full. */
export async function squareOrderPaid(orderId: string): Promise<boolean> {
  const { order } = await square(`orders/${orderId}`);
  if (!order) return false;
  const due = order.net_amount_due_money?.amount;
  return (order.tenders?.length ?? 0) > 0 && (due === undefined || due === 0) && order.state !== "CANCELED";
}

/* ─────────────────────────────── Acuity ─────────────────────────────── */

/** Issues a code in Acuity under a gift product, so it can be redeemed when booking online. */
export async function acuityCertificate(productID: number, code: string, email: string) {
  const user = await param(env("ACUITY_USER_PARAM"));
  const key = await param(env("ACUITY_KEY_PARAM"));
  if (!user || !key) throw new Error("Acuity API key missing");
  const res = await fetch("https://acuityscheduling.com/api/v1/certificates", {
    method: "POST",
    headers: { Authorization: "Basic " + Buffer.from(`${user}:${key}`).toString("base64"), "Content-Type": "application/json" },
    body: JSON.stringify({ productID, certificate: code, email }),
  });
  const json = (await res.json().catch(() => ({}))) as Record<string, any>;
  if (!res.ok) throw new Error(`Acuity ${res.status}: ${json.message ?? json.error ?? "error"}`);
  return json;
}

/* ─────────────────────────────── Email (SES) ─────────────────────────────── */

export type Attachment = { name: string; type: string; data: Buffer; inline?: boolean };
const ses = new SESv2Client({});

const b64 = (b: Buffer) => b.toString("base64").replace(/.{76}/g, "$&\r\n");
const header = (t: string) => (/^[\x20-\x7e]*$/.test(t) ? t : `=?UTF-8?B?${Buffer.from(t).toString("base64")}?=`);

/** Sends HTML + text with attachments (inline ones by Content-ID = file name). */
export async function sendMail(m: { to: string; subject: string; html: string; text: string; replyTo?: string; files?: Attachment[] }) {
  const mixed = "mix_" + randomBytes(8).toString("hex");
  const related = "rel_" + randomBytes(8).toString("hex");
  const alt = "alt_" + randomBytes(8).toString("hex");
  const inline = (m.files ?? []).filter((f) => f.inline);
  const attached = (m.files ?? []).filter((f) => !f.inline);
  const part = (f: Attachment, disposition: string) =>
    [
      `Content-Type: ${f.type}; name="${f.name}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: ${disposition}; filename="${f.name}"`,
      ...(f.inline ? [`Content-ID: <${f.name}>`] : []),
      "",
      b64(f.data),
    ].join("\r\n");
  const raw = [
    `From: ${env("MAIL_FROM")}`,
    `To: ${m.to}`,
    ...(m.replyTo ? [`Reply-To: ${m.replyTo}`] : []),
    `Subject: ${header(m.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${mixed}"`,
    "",
    `--${mixed}`,
    `Content-Type: multipart/related; boundary="${related}"`,
    "",
    `--${related}`,
    `Content-Type: multipart/alternative; boundary="${alt}"`,
    "",
    `--${alt}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(Buffer.from(m.text)),
    `--${alt}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    b64(Buffer.from(m.html)),
    `--${alt}--`,
    ...inline.flatMap((f) => [`--${related}`, part(f, "inline")]),
    `--${related}--`,
    ...attached.flatMap((f) => [`--${mixed}`, part(f, "attachment")]),
    `--${mixed}--`,
    "",
  ].join("\r\n");
  await ses.send(new SendEmailCommand({ Content: { Raw: { Data: Buffer.from(raw) } } }));
}

/* ─────────────────────────────── Gift table ─────────────────────────────── */

export type Gift = {
  code: string;
  token: string;
  status: "pending" | "paid" | "sent" | "void";
  choice: { kind: "experience"; id: string } | { kind: "value"; amount: number };
  title: string;
  detail: string;
  price: number;
  recipientName: string;
  recipientEmail: string;
  fromName: string;
  fromEmail: string;
  message: string;
  /** "now" or a Perth date, YYYY-MM-DD. */
  deliver: string;
  validUntil: string;
  createdAt: string;
  paidAt?: string;
  sentAt?: string;
  squareOrder?: string;
  squareLink?: string;
  /** True once the code exists in Acuity (redeemable online). */
  acuity?: boolean;
  log?: { at: string; what: string }[];
};

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), { marshallOptions: { removeUndefinedValues: true } });
const TABLE = () => env("GIFT_TABLE");

export async function getGift(code: string): Promise<Gift | null> {
  const r = await db.send(new GetCommand({ TableName: TABLE(), Key: { code } }));
  return (r.Item as Gift) ?? null;
}

export async function putNewGift(g: Gift) {
  await db.send(new PutCommand({ TableName: TABLE(), Item: g, ConditionExpression: "attribute_not_exists(code)" }));
}

/** Gifts still waiting for payment, created in the last two days. */
export async function pendingGifts(): Promise<Gift[]> {
  const since = new Date(Date.now() - 2 * 864e5).toISOString();
  const out: Gift[] = [];
  let start: Record<string, any> | undefined;
  do {
    const r = await db.send(
      new ScanCommand({
        TableName: TABLE(),
        FilterExpression: "#s = :p AND createdAt > :since",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":p": "pending", ":since": since },
        ExclusiveStartKey: start,
      }),
    );
    out.push(...((r.Items as Gift[]) ?? []));
    start = r.LastEvaluatedKey;
  } while (start);
  return out;
}

/** Sets fields, optionally only if the status is `from` (returns false if it wasn't). */
export async function updateGift(code: string, fields: Partial<Gift>, from?: Gift["status"], note?: string): Promise<boolean> {
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {};
  const sets = Object.entries(fields).map(([k, v], i) => {
    names[`#f${i}`] = k;
    values[`:v${i}`] = v;
    return `#f${i} = :v${i}`;
  });
  if (note) {
    names["#log"] = "log";
    values[":note"] = [{ at: new Date().toISOString(), what: note }];
    values[":empty"] = [];
    sets.push("#log = list_append(if_not_exists(#log, :empty), :note)");
  }
  if (from) {
    names["#status"] = "status";
    values[":from"] = from;
  }
  try {
    await db.send(
      new UpdateCommand({
        TableName: TABLE(),
        Key: { code },
        UpdateExpression: "SET " + sets.join(", "),
        ConditionExpression: from ? "#status = :from" : "attribute_exists(code)",
        ExpressionAttributeNames: names,
        ExpressionAttributeValues: values,
      }),
    );
    return true;
  } catch (e) {
    if ((e as Error).name === "ConditionalCheckFailedException") return false;
    throw e;
  }
}

/** Paid gifts not yet emailed to the recipient: "now" ones (a failed send is retried) and later days that have arrived (`today` is the Perth date, YYYY-MM-DD). */
export async function dueGifts(today: string): Promise<Gift[]> {
  const out: Gift[] = [];
  let start: Record<string, any> | undefined;
  do {
    const r = await db.send(
      new ScanCommand({
        TableName: TABLE(),
        FilterExpression: "#s = :paid AND (#d = :now OR #d <= :today)",
        ExpressionAttributeNames: { "#s": "status", "#d": "deliver" },
        ExpressionAttributeValues: { ":paid": "paid", ":now": "now", ":today": today },
        ExclusiveStartKey: start,
      }),
    );
    out.push(...((r.Items as Gift[]) ?? []));
    start = r.LastEvaluatedKey;
  } while (start);
  return out;
}

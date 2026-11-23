"use client";

import "@/styles/contact-form.css";
import { useEffect, useId, useState, type FormEvent } from "react";
import { rich } from "@/components/text";
import { EMAIL, PHONE } from "@/content/site";

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "sent" | "failed" | "mail"; text: string } | null;

/** Where the form posts. Without one, the visitor's email app opens instead. */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const TO = EMAIL.label;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function check(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = "Please enter a valid email address, like name@example.com.";
  if (fields.phone.trim() && !/^[\d\s()+-]{6,}$/.test(fields.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!fields.message.trim()) errors.message = "Please enter your message.";
  return errors;
}

/** "?membership=Revive" (from a Join button) → a ready-made first line. */
function membershipMessage(): string {
  const value = new URLSearchParams(window.location.search).get("membership")?.trim() ?? "";
  if (!/^[A-Za-z][A-Za-z &-]{0,30}$/.test(value)) return "";
  return `I'd like to join the ${value} membership.`;
}

/**
 * The contact page's "Send us a message" form. With
 * NEXT_PUBLIC_CONTACT_ENDPOINT set it posts JSON {name, email, phone,
 * message} there; otherwise it opens the visitor's email app with the
 * message written out to the studio.
 */
export function ContactForm({ note }: { note: string }) {
  const id = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const message = membershipMessage();
    if (message) setFields((current) => (current.message ? current : { ...current, message }));
  }, []);

  const set = (key: keyof Fields) => (event: { target: { value: string } }) => {
    const value = event.target.value;
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = check(fields);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      setStatus(null);
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const data = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      message: fields.message.trim(),
    };

    if (ENDPOINT) {
      setSending(true);
      setStatus(null);
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          // `company` is a hidden field only bots fill in; the server drops those messages.
          body: JSON.stringify({ ...data, company: (event.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "" }),
        });
        if (response.status === 429) {
          setStatus({
            kind: "failed",
            text: `You've sent a few messages already. Please call us on [${PHONE.label}](${PHONE.href}) or email [${TO}](${EMAIL.href}).`,
          });
          return;
        }
        if (!response.ok) throw new Error(String(response.status));
        setFields({ name: "", email: "", phone: "", message: "" });
        setStatus({
          kind: "sent",
          text: `Thank you, ${data.name.split(" ")[0]}. Your message has been sent and a confirmation is on its way to ${data.email}. We will be in touch soon.`,
        });
      } catch {
        setStatus({
          kind: "failed",
          text: `Sorry, your message could not be sent. Please try again, call us on [${PHONE.label}](${PHONE.href}) or email [${TO}](${EMAIL.href}).`,
        });
      } finally {
        setSending(false);
      }
      return;
    }

    const subject = `Website enquiry from ${data.name}`;
    const body = [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not given"}`, "", data.message].join("\n");
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({
      kind: "mail",
      text: `Your email app should now open with your message ready to send. If it doesn't, email us at [${TO}](${EMAIL.href}) or call [${PHONE.label}](${PHONE.href}).`,
    });
  }

  const field = (key: keyof Fields) => ({
    id: `${id}-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
  });

  const error = (key: keyof Fields) =>
    errors[key] ? (
      <p className="cform__error" id={`${id}-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform__trap" aria-hidden="true">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="cform__row">
        <div className="cform__field">
          <label htmlFor={`${id}-name`}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input {...field("name")} type="text" autoComplete="name" required />
          {error("name")}
        </div>
        <div className="cform__field">
          <label htmlFor={`${id}-email`}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required />
          {error("email")}
        </div>
      </div>
      <div className="cform__field">
        <label htmlFor={`${id}-phone`}>
          Phone <span className="cform__optional">(optional)</span>
        </label>
        <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" />
        {error("phone")}
      </div>
      <div className="cform__field">
        <label htmlFor={`${id}-message`}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea {...field("message")} rows={6} required />
        {error("message")}
      </div>
      <div className="cform__send">
        <button type="submit" className="btn btn--caps btn--red" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className="cform__note">{rich(note)}</p>
      </div>
      <div className="cform__status" role="status" aria-live="polite">
        {status ? <p className={`cform__msg cform__msg--${status.kind}`}>{rich(status.text)}</p> : null}
      </div>
    </form>
  );
}

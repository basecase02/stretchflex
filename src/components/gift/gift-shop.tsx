"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AmountSelect } from "./amount-select";
import { CertificateFace } from "./certificate-face";
import { CUSTOM_AMOUNTS, GIFT_EXPERIENCES, GIFT_VALUES, SAMPLE_CODE, describe, validUntil, type GiftChoice } from "@/lib/gift/catalog";

const GROUPS = [
  { name: "Assisted stretching", label: "Assisted stretching" },
  { name: "Photobiotic stretching", label: "Photobiotic Assisted Stretching™" },
  { name: "Recovery", label: "Recovery" },
] as const;

/**
 * Signature Experiences and Choose Your Gift Value (one choice between them),
 * then the personal details, with the certificate drawn live beside the form.
 * "Continue to payment" opens Square checkout (/api/gift/checkout). Styled
 * with the site's own panels, headings, cards and form fields.
 */
export function GiftShop() {
  const [choice, setChoice] = useState<GiftChoice>({ kind: "experience", id: "ultimate-stretch" });
  const [custom, setCustom] = useState<number | null>(null);
  const [form, setForm] = useState({ recipientName: "", recipientEmail: "", fromName: "", fromEmail: "", message: "" });
  const [later, setLater] = useState(false);
  const [date, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const item = describe(choice);
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const pick = (c: GiftChoice) => {
    setChoice(c);
    setError("");
  };
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });
  const maxDate = new Date(Date.now() + 364 * 864e5).toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });

  const fields = useMemo(
    () => ({
      recipient: form.recipientName.trim() || "Recipient’s name",
      from: form.fromName.trim() || "Your name",
      title: item?.title ?? "Choose a gift",
      detail: item?.detail ?? "An experience or a gift value",
      message: form.message.trim() || undefined,
      code: SAMPLE_CODE,
      validUntil: validUntil(new Date()),
    }),
    [form, item],
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!item) {
      setError("Choose an experience or a gift value.");
      return;
    }
    if (later && !date) {
      setError("Choose the day to send it, or pick “Send now”.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/gift/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...choice, ...form, deliver: later ? date : "now" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || "We couldn’t start the payment. Please try again.");
      window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <form className="giftForm" onSubmit={submit} noValidate>
      <section className="blk blk--rose panel" id="gift-experiences" aria-labelledby="gift-experiences-title">
        <div className="wrap">
          <header className="blk__head blk__head--center">
            <p className="kicker">Signature Experiences</p>
            <h2 className="display blk__title" id="gift-experiences-title">
              Gift a StretchFLEX <span className="hand">experience</span>
            </h2>
            <p className="blk__lead">The exact session, at its studio price. They choose a time that suits them.</p>
          </header>
          <div className="gcols">
            {GROUPS.map((group) => (
              <div className="gcol" key={group.name} role="group" aria-label={group.label}>
                <h3 className="gcol__title caps">{group.label}</h3>
                {GIFT_EXPERIENCES.filter((x) => x.group === group.name).map((x) => (
                  <label className="gopt" key={x.id}>
                    <input type="radio" name="gift" checked={choice.kind === "experience" && choice.id === x.id} onChange={() => {
                        setCustom(null);
                        pick({ kind: "experience", id: x.id });
                      }}
                    />
                    <span className="gopt__box">
                      <span className="gopt__radio" aria-hidden="true" />
                      <span className="gopt__main">
                        <span className="gopt__meta caps">{x.minutes} minutes</span>
                        <span className="gopt__name display">{x.name}</span>
                        <span className="gopt__lead">{x.lead}</span>
                      </span>
                      <span className="gopt__price display">${x.price}</span>
                    </span>
                  </label>
                ))}
                {group.name === "Recovery" ? (
                  <a className="gopt__hint" href="#gift-values">
                    <strong>Not sure which one?</strong>
                    Let them choose, with a gift value that works for any session.
                    <span className="caps">Choose a gift value ↓</span>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk blk--blush panel giftValuesPanel" id="gift-values" aria-labelledby="gift-values-title">
        <div className="wrap">
          <header className="blk__head blk__head--center">
            <p className="kicker">Choose your gift value</p>
            <h2 className="display blk__title" id="gift-values-title">
              Or give a <span className="hand">dollar</span> value
            </h2>
            <p className="blk__lead">Credit towards any session they like. Anything left over stays on their code for next time.</p>
          </header>
          <div className="gvals">
            {GIFT_VALUES.map((v) => (
              <label className="gopt gval" key={v}>
                <input
                  type="radio"
                  name="gift"
                  checked={choice.kind === "value" && choice.amount === v && custom == null}
                  onChange={() => {
                    setCustom(null);
                    pick({ kind: "value", amount: v });
                  }}
                />
                <span className="gopt__box">
                  <span className="gopt__radio" aria-hidden="true" />
                  <span className="gopt__price display">${v}</span>
                  <span className="gopt__meta caps">Gift card</span>
                </span>
              </label>
            ))}
            <div className={`gopt gval gval--custom${custom != null ? " gval--on" : ""}`}>
              <div className="gopt__box">
                <span className="gopt__radio" aria-hidden="true" />
                <AmountSelect
                  value={custom}
                  options={CUSTOM_AMOUNTS}
                  placeholder="Other"
                  onChange={(v) => {
                    setCustom(v);
                    pick({ kind: "value", amount: v });
                  }}
                />
                <span className="gopt__meta caps">Custom amount</span>
              </div>
            </div>
          </div>

          <div className="gpick" aria-live="polite">
            <p className="gpick__text">
              <span className="caps">Your gift</span>
              <strong>{item ? item.title : "Choose a gift"}</strong>
              {item ? <span className="gpick__detail">{item.detail}</span> : null}
            </p>
            <strong className="gpick__price display">{item ? `$${item.price.toLocaleString("en-AU")}` : ""}</strong>
            <a className="btn btn--red btn--caps" href="#buy">
              Personalise it
            </a>
          </div>
        </div>
      </section>

      <section className="blk blk--sky panel" id="buy" aria-labelledby="gift-make-title">
        <div className="wrap">
          <header className="blk__head blk__head--center">
            <p className="kicker">Make it personal</p>
            <h2 className="display blk__title" id="gift-make-title">
              Their certificate, as they’ll <span className="hand">receive</span> it
            </h2>
          </header>
          <div className="giftMake">
            <div className="cform">
              <p className="giftForm__legend caps">For</p>
              <div className="cform__row">
                <div className="cform__field">
                  <label htmlFor="g-rname">Recipient’s name</label>
                  <input id="g-rname" required maxLength={60} autoComplete="off" value={form.recipientName} onChange={set("recipientName")} />
                </div>
                <div className="cform__field">
                  <label htmlFor="g-remail">Recipient’s email</label>
                  <input id="g-remail" required type="email" maxLength={120} autoComplete="off" value={form.recipientEmail} onChange={set("recipientEmail")} />
                </div>
              </div>
              <div className="cform__field">
                <label htmlFor="g-msg">
                  Personal message <span className="cform__optional">(optional)</span>
                </label>
                <textarea id="g-msg" maxLength={200} value={form.message} onChange={set("message")} placeholder="Happy birthday! Time to look after you." />
              </div>

              <p className="giftForm__legend caps">From</p>
              <div className="cform__row">
                <div className="cform__field">
                  <label htmlFor="g-fname">Your name</label>
                  <input id="g-fname" required maxLength={60} autoComplete="name" value={form.fromName} onChange={set("fromName")} />
                </div>
                <div className="cform__field">
                  <label htmlFor="g-femail">
                    Your email <span className="cform__optional">(for your receipt)</span>
                  </label>
                  <input id="g-femail" required type="email" maxLength={120} autoComplete="email" value={form.fromEmail} onChange={set("fromEmail")} />
                </div>
              </div>

              <p className="giftForm__legend caps">Delivery</p>
              <div className="giftWhen" role="radiogroup" aria-label="Delivery">
                <label className="giftWhen__opt">
                  <input type="radio" name="when" checked={!later} onChange={() => setLater(false)} />
                  <span>
                    <strong>Send now</strong> Straight after payment
                  </span>
                </label>
                <label className="giftWhen__opt">
                  <input type="radio" name="when" checked={later} onChange={() => setLater(true)} />
                  <span>
                    <strong>Schedule it</strong> 8 am Perth time on the day
                  </span>
                </label>
              </div>
              {later ? (
                <div className="cform__field">
                  <label htmlFor="g-date">Send on</label>
                  <input id="g-date" type="date" min={today} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
              ) : null}

              <div className="giftSummary" aria-live="polite">
                <span>{item ? item.title : "Choose a gift"}</span>
                <strong className="display">{item ? `$${item.price.toLocaleString("en-AU")}` : "—"}</strong>
              </div>
              {error ? (
                <p className="cform__msg cform__msg--failed" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="cform__send">
                <button className="btn btn--red btn--caps btn--lg" type="submit" disabled={busy}>
                  {busy ? "Opening secure payment…" : "Continue to payment"}
                </button>
                <p className="cform__note">
                  Secure payment by Square. Valid for 36 months. See our <a href="/refund-and-cancellation-policy">Refund and Cancellation Policy</a>.
                </p>
              </div>
            </div>

            <div className="giftPreview">
              <div className="giftPreview__face">
                <CertificateFace fields={fields} qrUrl="https://stretchflex.au/gift-certificates" label={`Preview of the gift certificate for ${fields.recipient}: ${fields.title}`} />
              </div>
              <p className="giftPreview__note">Live preview. Your certificate gets its own unique redemption code.</p>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

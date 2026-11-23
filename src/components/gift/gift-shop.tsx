"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AmountSelect } from "./amount-select";
import { CertificateFace } from "./certificate-face";
import { CUSTOM_AMOUNTS, GIFT_EXPERIENCES, GIFT_VALUES, SAMPLE_CODE, describe, validUntil, type GiftChoice } from "@/lib/gift/catalog";
import { MESSAGE_MAX } from "@/lib/gift/certificate";

const STEPS = ["Choose", "Personalise", "Delivery", "Review"] as const;
const SAVE_KEY = "stretchflex-gift";
const EMAIL = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i;

const GROUPS = [
  { name: "Assisted stretching", label: "Assisted stretching" },
  { name: "Photobiotic stretching", label: "Photobiotic Assisted Stretching™" },
  { name: "Recovery", label: "Recovery" },
] as const;

/**
 * The gift checkout: four steps on the left (choose, personalise, delivery,
 * review), the cart on the right (the live certificate, the line item and the
 * total). It fills one screen; long steps scroll inside their card. Paying
 * opens Square checkout (/api/gift/checkout).
 */
export function GiftShop() {
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState<"experience" | "value">("experience");
  const [choice, setChoice] = useState<GiftChoice | null>({ kind: "experience", id: "ultimate-stretch" });
  const [custom, setCustom] = useState<number | null>(null);
  const [form, setForm] = useState({ recipientName: "", recipientEmail: "", fromName: "", fromEmail: "", message: "" });
  const [later, setLater] = useState(false);
  const [date, setDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const body = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // What they have chosen and typed is kept for this browser tab, so leaving the
  // page (to read a policy, or by mistake) and coming back loses nothing.
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY) ?? "null");
      if (saved) {
        if (saved.choice && describe(saved.choice)) setChoice(saved.choice);
        setCustom(saved.custom ?? null);
        setForm((f) => ({ ...f, ...saved.form, message: String(saved.form?.message ?? "").slice(0, MESSAGE_MAX) }));
        setLater(!!saved.later);
        setDate(saved.date ?? "");
        setTab(saved.tab === "value" ? "value" : "experience");
        setStep(Math.min(3, Math.max(0, Number(saved.step) || 0)));
      }
    } catch {}
    setRestored(true);
  }, []);
  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(SAVE_KEY, JSON.stringify({ choice, custom, form, later, date, tab, step }));
    } catch {}
  }, [restored, choice, custom, form, later, date, tab, step]);

  const item = choice ? describe(choice) : null;
  const price = item ? `$${item.price.toLocaleString("en-AU")}.00` : "$0.00";
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });
  const maxDate = new Date(Date.now() + 364 * 864e5).toLocaleDateString("en-CA", { timeZone: "Australia/Perth" });
  const sendOn = later && date ? new Date(date + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : null;

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

  /** What stops a step from moving on, or "" if nothing. */
  function problem(i: number): string {
    if (i === 0 && !item) return "Choose an experience or a gift value.";
    if (i === 1) {
      if (!form.recipientName.trim()) return "Add the recipient’s name.";
      if (!EMAIL.test(form.recipientEmail.trim())) return "Check the recipient’s email address.";
      if (!form.fromName.trim()) return "Add your name.";
      if (!EMAIL.test(form.fromEmail.trim())) return "Check your email address (for your receipt).";
    }
    if (i === 2 && later && !date) return "Choose the day to send it, or pick “Send now”.";
    return "";
  }

  function go(to: number) {
    if (to > step) {
      for (let i = step; i < to; i++) {
        const p = problem(i);
        if (p) {
          setStep(i);
          setError(p);
          toTop();
          return;
        }
      }
    }
    setError("");
    setStep(to);
    toTop();
  }

  /** Brings the start of the new step into view: the steps line on phones (the page scrolls), the top of the column on laptops. */
  function toTop() {
    requestAnimationFrame(() => {
      body.current?.scrollTo({ top: 0 });
      const crumbs = document.getElementById("gco-steps");
      if (crumbs && Math.abs(crumbs.getBoundingClientRect().top) > 4) crumbs.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function pay(e: FormEvent) {
    e.preventDefault();
    for (let i = 0; i < 3; i++) {
      const p = problem(i);
      if (p) {
        setStep(i);
        setError(p);
        toTop();
        return;
      }
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
      if (!res.ok || !data.url) throw new Error(data.error || "We couldn’t start the payment. Please try again, or call us on 0432 569 077.");
      window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  const pickExperience = (id: string) => {
    setCustom(null);
    setChoice({ kind: "experience", id });
    setError("");
  };
  const pickValue = (amount: number, isCustom = false) => {
    setCustom(isCustom ? amount : null);
    setChoice({ kind: "value", amount });
    setError("");
  };

  return (
    <section className="blk blk--rose panel gco" id="buy" aria-labelledby="gco-title">
      <div className="wrap gco__wrap">
        <header className="gco__head">
          <div>
            <p className="gco__label caps">Gift certificates</p>
            <h1 className="display gco__title" id="gco-title">
              Give the gift of <span className="hand">movement</span>
            </h1>
          </div>
          <ol className="gco__crumbs" id="gco-steps" aria-label="Checkout steps">
            {STEPS.map((name, i) => (
              <li key={name}>
                <button type="button" className={`gco__crumb${i === step ? " gco__crumb--on" : ""}${i < step ? " gco__crumb--done" : ""}`} aria-current={i === step ? "step" : undefined} onClick={() => go(i)}>
                  {name}
                </button>
              </li>
            ))}
          </ol>
        </header>

        <form className="gco__grid" onSubmit={pay} noValidate>
          {/* ───────── The step ───────── */}
          <div className="gco__card">
            <div className="gco__body" ref={body}>
              {step === 0 ? (
                <>
                  <div className="gco__intro">
                    <h2 className="display gco__h2">Choose a gift</h2>
                    <div className="gco__tabs" role="tablist" aria-label="Gift type">
                      <button type="button" role="tab" aria-selected={tab === "experience"} className="gco__tab" onClick={() => setTab("experience")}>
                        Experiences
                      </button>
                      <button type="button" role="tab" aria-selected={tab === "value"} className="gco__tab" onClick={() => setTab("value")}>
                        Gift value
                      </button>
                    </div>
                  </div>

                  {tab === "experience" ? (
                    <div role="tabpanel" aria-label="Signature Experiences">
                      <p className="gco__note">The exact session, at its studio price. They choose a time that suits them.</p>
                      {GROUPS.map((group) => (
                        <div className="gco__group" key={group.name} role="radiogroup" aria-label={group.label}>
                          <h3 className="gcol__title caps">{group.label}</h3>
                          <div className="gco__opts">
                            {GIFT_EXPERIENCES.filter((x) => x.group === group.name).map((x) => (
                              <label className="gopt" key={x.id}>
                                <input type="radio" name="gift" checked={choice?.kind === "experience" && choice.id === x.id} onChange={() => pickExperience(x.id)} />
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
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div role="tabpanel" aria-label="Gift value">
                      <p className="gco__note">Credit towards any session they like. Anything left over stays on their code for next time.</p>
                      <div className="gvals" role="radiogroup" aria-label="Gift value">
                        {GIFT_VALUES.map((v) => (
                          <label className="gopt gval" key={v}>
                            <input type="radio" name="gift" checked={choice?.kind === "value" && choice.amount === v && custom == null} onChange={() => pickValue(v)} />
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
                            <AmountSelect value={custom} options={CUSTOM_AMOUNTS} placeholder="Other" onChange={(v) => pickValue(v, true)} />
                            <span className="gopt__meta caps">Custom amount</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              {step === 1 ? (
                <div className="cform gco__form">
                  <h2 className="display gco__h2">Make it personal</h2>
                  <p className="giftForm__legend caps">For</p>
                  <div className="cform__row">
                    <div className="cform__field">
                      <label htmlFor="g-rname">Recipient’s name</label>
                      <input id="g-rname" maxLength={60} autoComplete="off" value={form.recipientName} onChange={set("recipientName")} />
                    </div>
                    <div className="cform__field">
                      <label htmlFor="g-remail">Recipient’s email</label>
                      <input id="g-remail" type="email" maxLength={120} autoComplete="off" value={form.recipientEmail} onChange={set("recipientEmail")} />
                    </div>
                  </div>
                  <div className="cform__field">
                    <label htmlFor="g-msg">
                      Personal message <span className="cform__optional">(optional · {MESSAGE_MAX - form.message.length} left)</span>
                    </label>
                    <textarea id="g-msg" maxLength={MESSAGE_MAX} value={form.message} onChange={set("message")} placeholder="Happy birthday! Time to look after you." />
                  </div>
                  <p className="giftForm__legend caps">From</p>
                  <div className="cform__row">
                    <div className="cform__field">
                      <label htmlFor="g-fname">Your name</label>
                      <input id="g-fname" maxLength={60} autoComplete="name" value={form.fromName} onChange={set("fromName")} />
                    </div>
                    <div className="cform__field">
                      <label htmlFor="g-femail">
                        Your email <span className="cform__optional">(for your receipt)</span>
                      </label>
                      <input id="g-femail" type="email" maxLength={120} autoComplete="email" value={form.fromEmail} onChange={set("fromEmail")} />
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="cform gco__form">
                  <h2 className="display gco__h2">When should it arrive?</h2>
                  <div className="giftWhen giftWhen--big" role="radiogroup" aria-label="Delivery">
                    <label className="giftWhen__opt">
                      <input type="radio" name="when" checked={!later} onChange={() => setLater(false)} />
                      <span>
                        <strong>Send now</strong> Emailed straight after payment.
                      </span>
                    </label>
                    <label className="giftWhen__opt">
                      <input type="radio" name="when" checked={later} onChange={() => setLater(true)} />
                      <span>
                        <strong>Schedule it</strong> For a birthday or anniversary: emailed at 12 am (midnight) Perth time, the moment the day begins.
                      </span>
                    </label>
                  </div>
                  {later ? (
                    <div className="cform__field gco__date">
                      <label htmlFor="g-date">Send on</label>
                      <input id="g-date" type="date" min={today} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                  ) : null}
                  <p className="gco__note">Either way, you get your receipt and a printable PDF straight away, so you can also hand it over yourself.</p>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="gco__review">
                  <h2 className="display gco__h2">Review your gift</h2>
                  <dl className="gco__dl">
                    <div>
                      <dt>Gift</dt>
                      <dd>
                        {item?.title} <span>{item?.detail}</span>
                      </dd>
                      <button type="button" className="gco__edit" onClick={() => go(0)}>Edit</button>
                    </div>
                    <div>
                      <dt>For</dt>
                      <dd>
                        {form.recipientName} <span>{form.recipientEmail}</span>
                      </dd>
                      <button type="button" className="gco__edit" onClick={() => go(1)}>Edit</button>
                    </div>
                    <div>
                      <dt>From</dt>
                      <dd>
                        {form.fromName} <span>{form.fromEmail}</span>
                      </dd>
                      <button type="button" className="gco__edit" onClick={() => go(1)}>Edit</button>
                    </div>
                    {form.message.trim() ? (
                      <div>
                        <dt>Message</dt>
                        <dd className="gco__msg">“{form.message.trim()}”</dd>
                        <button type="button" className="gco__edit" onClick={() => go(1)}>Edit</button>
                      </div>
                    ) : null}
                    <div>
                      <dt>Delivery</dt>
                      <dd>{sendOn ? `${sendOn}, 12 am (midnight) Perth time` : "Straight after payment"}</dd>
                      <button type="button" className="gco__edit" onClick={() => go(2)}>Edit</button>
                    </div>
                  </dl>
                  <p className="gco__note">
                    Valid for 36 months. Redeem online when booking, or in studio. See our <a href="/refund-and-cancellation-policy" target="_blank" rel="noopener">Refund and Cancellation Policy<span className="sr-only"> (opens in a new tab)</span></a>.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="gco__foot">
              {error ? (
                <p className="cform__msg cform__msg--failed gco__error" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="gco__nav">
                {step > 0 ? (
                  <button type="button" className="gco__back" onClick={() => go(step - 1)}>
                    ‹ Return to {STEPS[step - 1].toLowerCase()}
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button type="button" className="btn btn--red btn--caps" onClick={() => go(step + 1)}>
                    Continue<span className="gco__next">&nbsp;to {STEPS[step + 1].toLowerCase()}</span>&nbsp;→
                  </button>
                ) : (
                  <button type="submit" className="btn btn--red btn--caps" disabled={busy}>
                    {busy ? "Opening secure payment…" : "Pay now"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ───────── Order summary ───────── */}
          <aside className={`gco__cart${preview ? " gco__cart--open" : ""}`} aria-label="Order summary">
            <button type="button" className="gco__peek" aria-expanded={preview} onClick={() => setPreview((v) => !v)}>
              <span>{preview ? "Hide order summary" : "Show order summary"}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <strong>{price}</strong>
            </button>
            <div className="gco__sum">
              <div className="gco__line">
                <div className="gco__thumb">
                  <CertificateFace fields={fields} label="" />
                  <span className="gco__qty" aria-label="Quantity 1">1</span>
                </div>
                <div className="gco__linetext">
                  <strong>{item ? item.title : "No gift chosen yet"}</strong>
                  <span>{item ? `Gift certificate · ${item.detail}` : "Choose an experience or a value"}</span>
                  {form.recipientName.trim() ? <span>For {form.recipientName.trim()}</span> : null}
                </div>
                <span className="gco__amt">{price}</span>
              </div>
              <dl className="gco__rows">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{price}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>{sendOn ? `Email · ${sendOn}` : "Email · Free"}</dd>
                </div>
                <div className="gco__total">
                  <dt>
                    Total <small>Including GST</small>
                  </dt>
                  <dd>
                    <small>AUD</small> <strong>{price}</strong>
                  </dd>
                </div>
              </dl>
              <div className="gco__face">
                <p className="caps">Certificate preview</p>
                <button type="button" className="gco__zoom" onClick={() => dialog.current?.showModal()} aria-label="Preview your card full screen">
                  <CertificateFace fields={fields} qrUrl="https://stretchflex.au/gift-certificates" label="" />
                </button>
                <button type="button" className="btn btn--caps btn--outline gco__zoombtn" onClick={() => dialog.current?.showModal()}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Preview your card
                </button>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* Full-screen preview of the card. Escape, the Close button or a click outside closes it. */}
      <dialog className="gprev" ref={dialog} aria-label="Your gift card preview" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <div className="gprev__bar">
          <p>
            <strong>Preview your card</strong>
            <span>This is what {form.recipientName.trim() || "they"} will receive. The redemption code is added after payment.</span>
          </p>
          <button type="button" className="btn btn--caps btn--light" onClick={() => dialog.current?.close()}>
            Close ✕
          </button>
        </div>
        <div className="gprev__stage" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
          <div className="gprev__cert">
            <CertificateFace fields={fields} qrUrl="https://stretchflex.au/gift-certificates" label={`Preview of the gift certificate for ${fields.recipient}: ${fields.title}`} />
          </div>
        </div>
      </dialog>
    </section>
  );
}

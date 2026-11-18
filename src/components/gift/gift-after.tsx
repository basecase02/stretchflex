"use client";

import "@/styles/gift.css";
import { useEffect, useState } from "react";
import { CertificateFace } from "./certificate-face";
import type { CertificateFields } from "@/lib/gift/certificate";

const query = (key: string) => (typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get(key) ?? "");

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="blk blk--rose panel giftTop">
      <div className="wrap giftNarrow" aria-live="polite">
        {children}
      </div>
    </section>
  );
}

function Head({ kicker, title, hand, lead }: { kicker: string; title: string; hand?: string; lead?: React.ReactNode }) {
  const [before, after] = hand ? title.split(hand) : [title, ""];
  return (
    <header className="blk__head blk__head--center">
      <p className="kicker">{kicker}</p>
      <h1 className="display blk__title">
        {before}
        {hand ? <span className="hand">{hand}</span> : null}
        {after}
      </h1>
      {lead ? <p className="blk__lead">{lead}</p> : null}
    </header>
  );
}

/** Back from Square: confirms the gift (the API completes it once Square shows it paid). */
export function GiftThanks() {
  type Order = { paid: boolean; code: string; title: string; recipientName: string; recipientEmail: string; deliver: string; pdf: string | null; view: string | null };
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const c = query("c");
    const t = query("t");
    if (!c || !t) return setError("We couldn’t find your order.");
    let tries = 0;
    const load = async () => {
      const res = await fetch(`/api/gift/order?c=${encodeURIComponent(c)}&t=${encodeURIComponent(t)}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error || "We couldn’t find your order.");
      if (!data.paid && ++tries < 10) return void setTimeout(load, 2500);
      setOrder(data);
    };
    load().catch(() => setError("We couldn’t load your order. Your receipt is on its way by email."));
  }, []);

  const when =
    order?.deliver && order.deliver !== "now"
      ? `on ${new Date(order.deliver + "T00:00:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })} at 8 am`
      : "now";

  if (error)
    return (
      <Panel>
        <Head kicker="Sorry" title="Something went wrong" lead={<>{error} If you were charged, call us on 0432 569 077 and we’ll sort it out straight away.</>} />
      </Panel>
    );
  if (!order)
    return (
      <Panel>
        <Head kicker="One moment" title="Confirming your gift" lead="This takes a few seconds." />
      </Panel>
    );
  if (!order.paid)
    return (
      <Panel>
        <Head kicker="Almost there" title="Payment not confirmed yet" lead="Square hasn’t confirmed the payment yet. If it went through, your receipt will arrive by email within a few minutes." />
        <div className="giftActions">
          <a className="btn btn--red btn--caps" href="/gift-certificates#buy">
            Back to gift certificates
          </a>
        </div>
      </Panel>
    );
  return (
    <Panel>
      <Head
        kicker="Thank you"
        title="Your gift is on its way"
        hand="gift"
        lead={
          <>
            {order.title} for {order.recipientName}. We’ll email it to {order.recipientEmail} {when}. Your receipt and a printable copy are in your inbox.
          </>
        }
      />
      <p className="blk__lead">
        Certificate code <span className="giftCode">{order.code}</span>
      </p>
      <div className="giftActions">
        {order.pdf ? (
          <a className="btn btn--red btn--caps" href={order.pdf}>
            Download printable PDF
          </a>
        ) : null}
        {order.view ? (
          <a className="btn btn--line btn--caps" href={order.view}>
            View mobile certificate
          </a>
        ) : null}
      </div>
    </Panel>
  );
}

/** The recipient's mobile certificate (opened from the email or the QR code). */
export function GiftView() {
  type View = CertificateFields & { kind: string; pdf: string };
  const [cert, setCert] = useState<View | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`/api/gift/view?c=${encodeURIComponent(query("c"))}&t=${encodeURIComponent(query("t"))}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "We couldn’t find that certificate.");
        setCert(data);
      })
      .catch((e) => setError(e.message));
  }, []);
  if (error)
    return (
      <Panel>
        <Head kicker="Sorry" title="Certificate not found" lead={<>{error} Open the link from your gift email again, or call us on 0432 569 077.</>} />
      </Panel>
    );
  if (!cert)
    return (
      <Panel>
        <Head kicker="One moment" title="Your certificate" lead="Loading…" />
      </Panel>
    );
  return (
    <Panel>
      <Head kicker="Your gift" title="Your StretchFLEX gift certificate" hand="gift" lead="Show this at the studio, or book online and enter your code at checkout." />
      <div className="giftCert">
        <CertificateFace fields={cert} layout="portrait" label={`Gift certificate for ${cert.recipient}: ${cert.title}, code ${cert.code}, valid until ${cert.validUntil}`} />
      </div>
      <div className="giftActions">
        <a className="btn btn--red btn--caps" href="/book-your-session">
          Book your session
        </a>
        <a className="btn btn--line btn--caps" href={cert.pdf}>
          Printable PDF
        </a>
      </div>
    </Panel>
  );
}

"use client";

import "@/styles/booking.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import { ACUITY_URL, PHONE, SESSIONS } from "@/content/site";

/**
 * The Acuity scheduler, inside the site. Its look (fonts, colours, buttons)
 * is set in Acuity under Scheduling Page → Styles and Advanced CSS, so it
 * matches the pages around it.
 *
 * A session's "Book" button links here with ?session=<id>; the scheduler then
 * opens straight on that session's calendar, with a way back to every session.
 * Acuity's embed script grows the frame to fit each step, so the page scrolls,
 * not the frame.
 */
export function BookingEmbed() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // The query string is read in the browser, so this page stays static.
  useEffect(() => {
    const read = () => setSessionId(new URLSearchParams(window.location.search).get("session"));
    read();
    setReady(true);
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const session = SESSIONS.find((s) => s.id === sessionId && s.acuityId);
  const src = `${ACUITY_URL}${session ? `&appointmentType=${session.acuityId}` : ""}&ref=embedded_csp`;

  const showAll = () => {
    window.history.pushState(null, "", window.location.pathname);
    setSessionId(null);
  };

  return (
    <section id="book" className="blk panel booking">
      <div className="wrap booking__wrap">
        <header className="booking__head">
          <div>
            <p className="booking__label">Book online</p>
            <h1 className="booking__title">Book your session</h1>
          </div>
          <p className="booking__note">Private, one-on-one · Instant email confirmation · Free reschedule with 48 hours notice</p>
        </header>

        {/* What to know before booking, above the scheduler (the full list is under it). */}
        <ul className="booking__before" aria-label="Before you book">
          <li>
            <strong>Socks are compulsory:</strong> bring a clean, unworn pair (grip socks $15 at reception)
          </li>
          <li>
            <strong>Health:</strong> tell us about any injuries or conditions in your booking
          </li>
          <li>
            <strong>Changes:</strong> 48 hours notice for a full refund (<a href="/refund-and-cancellation-policy">policy</a>)
          </li>
        </ul>

        <div className="booking__bar" aria-live="polite">
          {session ? (
            <>
              <p className="booking__picked">
                <span className="booking__label">Booking</span>
                <strong>{session.name}</strong>
                <span className="booking__meta">
                  {session.duration} · ${session.price}
                </span>
              </p>
              <button type="button" className="booking__all" onClick={showAll}>
                See all sessions
              </button>
            </>
          ) : (
            <p className="booking__picked booking__picked--hint">Choose your session, then a time that suits you.</p>
          )}
        </div>

        <div className="booking__frame">
          {ready ? (
            <iframe
              key={src}
              src={src}
              title={session ? `Book ${session.name}` : "Book a StretchFLEX session"}
              width="100%"
              height="1000"
              allow="payment"
              loading="eager"
              // Acuity scrolls the page to the top of the scheduler at each step; this keeps that top clear of the fixed header.
              data-offset-top="-96"
            />
          ) : (
            <div className="booking__loading" aria-hidden="true" />
          )}
        </div>

        <p className="booking__help">
          Trouble booking? Call us on <a href={PHONE.href}>{PHONE.label}</a>, Monday to Friday 8:30 am to 5:30 pm.
        </p>
      </div>
      <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
    </section>
  );
}

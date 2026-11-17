"use client";

import "@/styles/shorts.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { hand } from "@/components/text";
import { SwipeDots } from "@/components/swipe-dots";

export type Short = { id: string; title: string };

/** The "Client stories" layout: words and a pull quote beside the framed videos. */
export type Story = { rating: string };

/**
 * A row of YouTube Shorts (StretchFLEX's channel). Each shows its thumbnail;
 * tapping one opens it in a full-screen viewer (a native modal dialog) with
 * close, previous/next and "Open on YouTube". The YouTube player loads only
 * then (privacy-enhanced domain), so the page stays fast and sets no YouTube
 * cookies on arrival. Phones: the thumbnails swipe.
 */
export function Shorts({ id, kicker, title, handWord, lead, items, tone = "navy", story }: { id?: string; kicker?: string; title: string; handWord?: string; lead?: string; items: Short[]; tone?: "navy" | "rose" | "blue"; story?: Story }) {
  const dialog = useRef<HTMLDialogElement>(null);
  // The stories row is a carousel: arrows show only when not every video fits.
  const row = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ scrolls: false, start: true, end: false });
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () =>
      setEdges({
        scrolls: el.scrollWidth > el.clientWidth + 4,
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);
  const slide = (by: number) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: by * (card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0")), behavior: "smooth" });
  };
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : items[index];

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((by: number) => setIndex((i) => (i === null ? i : (i + by + items.length) % items.length)), [items.length]);

  // Arrow keys move between videos while the viewer is open.
  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <section id={id} className={`blk panel shorts${story ? " stories" : ""} ${tone === "rose" ? "blk--rose" : `blk--${tone} on-dark`}`}>
      {story ? (
        <div className="wrap stories__grid">
          <div className="stories__copy">
            {kicker ? <p className="kicker">{kicker}</p> : null}
            <h2 className="display blk__title">{hand(title, handWord)}</h2>
            {lead ? <p className="blk__lead">{lead}</p> : null}
            <p className="stories__rating">
              <span className="stories__stars" aria-hidden="true">
                ★★★★★
              </span>
              {story.rating}
            </p>
            <p className="stories__hint">
              <span className="stories__hint-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
              Tap a video to watch
            </p>
          </div>
          <div className="stories__carousel">
          <ul className="stories__videos" ref={row}>
            {items.map((item, i) => (
              <li className="story-card" key={item.id + i}>
                <button type="button" className="story-card__play" onClick={() => open(i)} aria-label={`Play video: ${item.title}`} aria-haspopup="dialog">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
                  <span className="short__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
                <p className="story-card__title">{item.title}</p>
              </li>
            ))}
          </ul>
          <SwipeDots count={items.length} label="videos" />
          {items.length > 2 ? (
            <>
              <button type="button" className="carousel__arrow stories__arrow stories__arrow--prev" onClick={() => slide(-1)} disabled={!edges.scrolls || edges.start} aria-label="Previous video">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 10H4M9 5l-5 5 5 5" />
                </svg>
              </button>
              <button type="button" className="carousel__arrow stories__arrow stories__arrow--next" onClick={() => slide(1)} disabled={!edges.scrolls || edges.end} aria-label="Next video">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </button>
            </>
          ) : null}
          </div>
        </div>
      ) : (
      <div className="wrap">
        <header className="blk__head blk__head--center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="display blk__title">{hand(title, handWord)}</h2>
          {lead ? <p className="blk__lead">{lead}</p> : null}
        </header>
        <ul className="shorts__row">
          {items.map((item, i) => (
            <li className="short" key={item.id}>
              <button type="button" className="short__play" onClick={() => open(i)} aria-label={`Play video: ${item.title}`} aria-haspopup="dialog">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
                <span className="short__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                  </svg>
                </span>
              </button>
              <p className="short__title">{item.title}</p>
            </li>
          ))}
        </ul>
        <SwipeDots count={items.length} label="videos" />
      </div>
      )}

      {/* The full-screen viewer. Esc (or the back gesture) closes it; clicking the dark backdrop does too. */}
      <dialog
        ref={dialog}
        className="viewer"
        aria-label={current ? current.title : "Video"}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === dialog.current) close();
        }}
      >
        {current ? (
          <div className="viewer__inner">
            <div className="viewer__frame">
              <iframe
                key={current.id}
                src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&playsinline=1`}
                title={current.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <div className="viewer__bar">
              <p className="viewer__title">{current.title}</p>
              <a className="viewer__yt" href={`https://www.youtube.com/shorts/${current.id}`} target="_blank" rel="noopener">
                Open on YouTube ↗
              </a>
            </div>
            {items.length > 1 ? (
              <>
                <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => step(-1)} aria-label="Previous video">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M16 10H4M9 5l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" className="viewer__nav viewer__nav--next" onClick={() => step(1)} aria-label="Next video">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        ) : null}
        <button type="button" className="viewer__close" onClick={close} aria-label="Close video">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </section>
  );
}

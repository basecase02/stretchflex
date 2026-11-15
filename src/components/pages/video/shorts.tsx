"use client";

import "@/styles/shorts.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { hand } from "@/components/text";
import { SwipeDots } from "@/components/swipe-dots";

export type Short = { id: string; title: string };

/**
 * A row of YouTube Shorts (StretchFLEX's channel). Each shows its thumbnail;
 * tapping one opens it in a full-screen viewer (a native modal dialog) with
 * close, previous/next and "Open on YouTube". The YouTube player loads only
 * then (privacy-enhanced domain), so the page stays fast and sets no YouTube
 * cookies on arrival. Phones: the thumbnails swipe.
 */
export function Shorts({ kicker, title, handWord, lead, items }: { kicker?: string; title: string; handWord?: string; lead?: string; items: Short[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
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
    <section className="blk blk--navy panel on-dark shorts">
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

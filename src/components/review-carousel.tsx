"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GoogleIcon, Stars } from "./icons";

type Review = { id: string; name: string; avatar: string; text: string };

/** Reviews this short are set as a headline instead of body text. */
const SHORT = 90;

/**
 * The review cards: a two-column grid on larger screens, a swipeable
 * carousel with dots on phones. Long reviews are cut to a few lines with a
 * "Read more" button; the full text is always in the HTML.
 */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const onScroll = () => {
      const cards = [...list.children] as HTMLElement[];
      const left = list.scrollLeft + parseFloat(getComputedStyle(list).scrollPaddingLeft || "0");
      let best = 0;
      cards.forEach((card, i) => {
        if (Math.abs(card.offsetLeft - left) < Math.abs(cards[best].offsetLeft - left)) best = i;
      });
      setCurrent(best);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const list = listRef.current;
    const card = list?.children[i] as HTMLElement | undefined;
    if (!list || !card) return;
    const pad = parseFloat(getComputedStyle(list).scrollPaddingLeft || "0");
    list.scrollTo({ left: card.offsetLeft - pad, behavior: "smooth" });
  };

  return (
    <div className="reviews__cards">
      <ul className="reviews__list" ref={listRef}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
      <div className="carousel-dots" aria-label="Choose a review">
        {reviews.map((review, i) => (
          <button
            key={review.id}
            type="button"
            aria-label={`Review ${i + 1} of ${reviews.length}`}
            aria-current={i === current}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const short = review.text.length <= SHORT;

  useEffect(() => {
    const text = textRef.current;
    if (!text || short) return;
    const measure = () => setClamped(text.scrollHeight > text.clientHeight + 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    return () => observer.disconnect();
  }, [short]);

  return (
    <li className={`review${short ? " review--short" : ""}`} data-open={open || undefined}>
      <Stars className="stars" />
      <blockquote className="review__text">
        <p ref={textRef}>{review.text}</p>
        {!short && (clamped || open) && (
          <button type="button" className="review__more" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </blockquote>
      <div className="review__by">
        <Image src={review.avatar} alt={`${review.name} profile picture`} width={36} height={36} />
        <span className="review__who">
          <strong>{review.name}</strong>
          <span>
            <GoogleIcon /> Posted on Google
          </span>
        </span>
      </div>
    </li>
  );
}

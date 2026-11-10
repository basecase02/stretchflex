import Image from "next/image";
import { GoogleIcon, Stars } from "@/components/icons";
import { ReviewCarousel } from "@/components/review-carousel";
import { hand, rich } from "@/components/text";
import { images } from "@/content/images";
import { BOOK_URL, CONTACT, CTA_BAND, PHONE, REVIEWS } from "@/content/site";

/**
 * Sections shared by the homepage and the inner pages, so every page ends the
 * same way: the booking question over the team photo, the Google reviews and
 * the contact panel.
 */

export function CtaBand({
  title = CTA_BAND.title,
  handWord = "for",
  label = CTA_BAND.cta,
  href = BOOK_URL,
  body = [],
}: {
  title?: string;
  handWord?: string;
  label?: string;
  href?: string;
  body?: string[];
}) {
  return (
    <section className="cta panel on-dark">
      <Image className="cta__photo" src={images.team} alt="" fill sizes="100vw" />
      <div className="cta__inner">
        <p className="display cta__title">{hand(title, handWord)}</p>
        {body.map((text) => (
          <p className="cta__body" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        <a className="btn btn--caps btn--light" href={href}>
          {label}
        </a>
      </div>
    </section>
  );
}

export function ReviewsPanel() {
  return (
    <section className="reviews panel on-dark" id="reviews" aria-label="Google reviews">
      <div className="reviews__grid wrap">
        <div className="reviews__intro">
          <p className="reviews__business caps">
            <GoogleIcon className="reviews__g" />
            {REVIEWS.business}
          </p>
          <p className="display reviews__count">{hand(REVIEWS.countLabel, "reviews")}</p>
          <Stars className="stars stars--lg" />
          <a
            className="btn btn--caps btn--light"
            href={REVIEWS.writeReview.href}
            target="_blank"
            rel="noopener"
            aria-label="Write a review to Google"
          >
            {REVIEWS.writeReview.label}
          </a>
        </div>
        <ReviewCarousel reviews={REVIEWS.items} />
      </div>
    </section>
  );
}

export function ContactPanel({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const Heading = heading;
  return (
    <section className="contact panel" id="contact">
      <div className="contact__grid wrap">
        <div className="contact__copy">
          <Heading className="display">{hand(CONTACT.title, "Us")}</Heading>
          <p className="contact__lead">{CONTACT.body}</p>
          <dl className="contact__facts">
            <div>
              <dt className="caps">Address:</dt>
              <dd>{CONTACT.address}</dd>
            </div>
            <div>
              <dt className="caps">Phone:</dt>
              <dd>
                <a href={PHONE.href}>{PHONE.label}</a>
              </dd>
            </div>
            <div>
              <dt className="caps">Opening Hours:</dt>
              <dd>
                {CONTACT.hours.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </dd>
            </div>
          </dl>
          <a className="btn btn--caps" href={BOOK_URL}>
            {CONTACT.cta}
          </a>
        </div>
        <div className="contact__map">
          <iframe
            src={CONTACT.mapSrc}
            title="StretchFlex on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

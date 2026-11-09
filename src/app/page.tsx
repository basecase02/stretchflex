import Image from "next/image";
import type { ReactNode } from "react";
import { BenefitGlyph, GoogleIcon, Stars } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { ReviewCarousel } from "@/components/review-carousel";
import { Rotator } from "@/components/rotator";
import { SessionTabs } from "@/components/session-tabs";
import { images } from "@/content/images";
import { localBusiness, yoastGraph } from "@/content/schema";
import {
  BENEFITS,
  BOOK_URL,
  CONTACT,
  CTA_BAND,
  FIRST_SESSION,
  HERO,
  INTRO,
  PHONE,
  REVIEWS,
  SESSION_GROUPS,
  SESSIONS,
  SESSIONS_TITLE,
} from "@/content/site";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * Sets one word of a phrase in the handwritten face. The text itself is
 * unchanged, so headings read exactly as they do in the content file.
 */
function hand(text: string, word: string): ReactNode {
  const at = text.indexOf(word);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="hand">{word}</span>
      {text.slice(at + word.length)}
    </>
  );
}

/** Note colours for the six benefits, so no two neighbours match. */
const NOTE_TONES = ["rose", "navy", "sky", "sky", "rose", "navy"] as const;

/** The session groups with their sessions looked up from the content file. */
const SESSION_TABS = SESSION_GROUPS.map((group) => ({
  id: group.id,
  tab: group.tab,
  title: group.title,
  sessions: group.sessionIds.map((id) => SESSIONS.find((session) => session.id === id)!),
}));

export default function HomePage() {
  return (
    <>
      {/* Open Graph article tags from the live page (React hoists these into <head>). */}
      <meta property="article:publisher" content="https://www.facebook.com/profile.php?id=61583797823853" />
      <meta property="article:modified_time" content="2026-06-23T06:50:13+00:00" />
      <JsonLd data={yoastGraph} />
      <JsonLd data={localBusiness} />

      {/* ───────── Hero: the headline on a rose tile beside the team photo ───────── */}
      <section className="hero panel">
        <div className="hero__card">
          <svg className="hero__sparkle" viewBox="0 0 40 40" aria-hidden="true">
            <path fill="currentColor" d="M20 0c1.2 10.6 8.8 18.8 20 20-11.2 1.2-18.8 9.4-20 20-1.2-10.6-8.8-18.8-20-20C11.2 18.8 18.8 10.6 20 0z" />
          </svg>
          <h2 className="hero__title">
            {HERO.lead}
            <br />
            <Rotator words={HERO.words} />
          </h2>
          <p className="hero__intro">{HERO.body}</p>
          <a className="btn hero__cta" href={BOOK_URL}>
            {HERO.cta}
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </a>
          <span className="hero__dots" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </div>
        <figure className="hero__media">
          <Image
            className="hero__photo"
            src={images.team}
            alt="The StretchFLEX stretch therapy team in their Perth CBD studio"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 900px) 54vw, 100vw"
          />
        </figure>
      </section>

      {/* ───────── Intro (page H1): a grid of tiles and photos ───────── */}
      <section className="intro panel">
        <div className="intro__grid">
          <div className="intro__head on-dark">
            <h1 className="display intro__title">{hand(INTRO.title, "Assisted")}</h1>
            <p>{INTRO.paragraphs[1]}</p>
            <a className="btn btn--caps btn--light" href={INTRO.cta.href}>
              {INTRO.cta.label}
            </a>
          </div>
          <figure className="intro__photo intro__photo--tall">
            <Image
              src={images.kneeStretch}
              alt="A StretchFLEX therapist guiding a client through an assisted leg stretch in Perth"
              fill
              placeholder="blur"
              sizes="(min-width: 900px) 42vw, 50vw"
            />
          </figure>
          <div className="intro__text">
            <p>{INTRO.paragraphs[0]}</p>
          </div>
          <figure className="intro__photo intro__photo--pill">
            <Image
              src={images.legStretch}
              alt="A stretch therapist assisting a client with a hip stretch at StretchFLEX"
              fill
              sizes="(min-width: 900px) 18vw, 50vw"
            />
          </figure>
          <a className="intro__sticker" href="#contact">
            <span>Perth CBD</span>
          </a>
        </div>
      </section>

      {/* ───────── Stretch & Recovery: running title, tabs, price cards ───────── */}
      <section className="sessions panel on-dark" id="packages">
        <Marquee as="h2" className="sessions__title display">
          {SESSIONS_TITLE}
        </Marquee>
        <div className="wrap">
          <SessionTabs groups={SESSION_TABS} />
        </div>
      </section>

      {/* ───────── Call to action over the tinted team photo ───────── */}
      <section className="cta panel on-dark">
        <Image className="cta__photo" src={images.team} alt="" fill sizes="100vw" />
        <div className="cta__inner">
          <p className="display cta__title">{hand(CTA_BAND.title, "for")}</p>
          <a className="btn btn--caps btn--light" href={BOOK_URL}>
            {CTA_BAND.cta}
          </a>
        </div>
      </section>

      {/* ───────── Key benefits: notes pinned around the question ───────── */}
      <section className="benefits panel">
        <BenefitGlyph name="range" className="doodle doodle--a" />
        <BenefitGlyph name="performance" className="doodle doodle--b" />
        <BenefitGlyph name="calm" className="doodle doodle--c" />
        <BenefitGlyph name="shield" className="doodle doodle--d" />
        <div className="wrap">
          <header className="benefits__head">
            <p className="kicker">{BENEFITS.kicker}</p>
            <h2 className="display">{hand(BENEFITS.title, "Assisted")}</h2>
          </header>
          <ul className="notes">
            {BENEFITS.items.map((item, i) => (
              <li className={`note note--${NOTE_TONES[i % NOTE_TONES.length]}`} key={item.title}>
                <BenefitGlyph name={item.icon} className="note__icon" />
                <h3 className="display">{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="benefits__cta">
            <a className="btn btn--caps" href={BOOK_URL}>
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Your first session: one tabbed folder, photo beside the steps ───────── */}
      <section className="first panel">
        <div className="wrap">
          <div className="folder folder--blush">
            <p className="folder__tab caps">{FIRST_SESSION.kicker}</p>
            <div className="folder__body">
              <figure className="folder__pic first__pic">
                <Image
                  src={images.legStretch}
                  alt="A stretch therapist assisting a client with a hip stretch at StretchFLEX"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 900px) 480px, 100vw"
                />
              </figure>
              <div className="folder__copy first__copy">
                <h2 className="display">{hand(FIRST_SESSION.title, "to")}</h2>
                <div className="steps">
                  {FIRST_SESSION.steps.map((step, i) => (
                    <details className="step" name="first-session" key={step.title} open={i === 0}>
                      <summary>
                        <span className="step__num display">{i + 1}.</span>{" "}
                        <span className="step__title">{step.title}</span>
                        <span className="step__mark" aria-hidden="true" />
                      </summary>
                      <div className="step__body">
                        <p>{step.body}</p>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="first__notes">
                  {FIRST_SESSION.closing.map((text) => (
                    <p key={text.slice(0, 24)}>{text}</p>
                  ))}
                </div>
                <a className="btn btn--caps" href={BOOK_URL}>
                  {FIRST_SESSION.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Google reviews: rating on the left, the reviews on the right ───────── */}
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

      {/* ───────── Contact ───────── */}
      <section className="contact panel" id="contact">
        <div className="contact__grid wrap">
          <div className="contact__copy">
            <h2 className="display">{hand(CONTACT.title, "Us")}</h2>
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
    </>
  );
}

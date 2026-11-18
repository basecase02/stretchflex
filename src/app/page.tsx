import Image from "next/image";
import { BenefitGlyph } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { ContactPanel, CtaBand, ReviewsPanel } from "@/components/sections";
import { SessionTabs } from "@/components/session-tabs";
import { SessionFinder } from "@/components/session-finder";
import { ClientStories } from "@/components/pages/video/client-stories";
import { hand, JsonLd } from "@/components/text";
import { SeoTags } from "@/components/seo-tags";
import { images } from "@/content/images";
import { localBusiness } from "@/content/schema";
import { pageMetadata, seoFor } from "@/lib/seo";
import {
  BENEFITS,
  COMFORT,
  FIRST_SESSION,
  HERO,
  INTRO,
  MEMBERSHIP_BAND,
  QUICK_FAQS,
  SESSION_GROUPS,
  SESSIONS,
  SESSIONS_TITLE,
} from "@/content/site";
import { SwipeDots } from "@/components/swipe-dots";

/** The live homepage's SEO (title, description, Open Graph, schema), as Yoast prints it. */
const seo = seoFor("/");
export const metadata = pageMetadata(seo, "/");

/** Note colours for the benefits, so no two neighbours match. */
const NOTE_TONES = ["rose", "navy", "sky", "navy", "rose"] as const;

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
      <SeoTags entry={seo} path="/" />
      {seo.schema ? <JsonLd data={seo.schema} /> : null}
      <JsonLd data={localBusiness} />

      {/* ───────── Hero: the promise on a rose tile beside the team photo ───────── */}
      <section className="hero hero--home panel">
        <div className="hero__card">
          {/* The live page's main heading, so the homepage keeps ranking for it; the promise is the big line under it. */}
          <h1 className="kicker hero__kicker">{HERO.kicker}</h1>
          <p className="hero__title hero__title--lines">
            {HERO.lines.map((line, i) => (
              <span className={i === HERO.lines.length - 1 ? "hero__accent" : undefined} key={line}>
                {line}
              </span>
            ))}
          </p>
          <p className="hero__intro">{HERO.body}</p>
          <div className="hero__ctas">
            <a className="btn hero__cta" href={HERO.cta.href}>
              {HERO.cta.label}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>
            <a className="btn btn--caps btn--outline hero__cta-2" href={HERO.secondary.href}>
              {HERO.secondary.label}
            </a>
          </div>
          <ul className="hero__trust">
            {HERO.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <span className="hero__dots" aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </div>
        <figure className="hero__media">
          <Image
            className="hero__photo hero__photo--team"
            src={images.teamTall}
            alt="The StretchFLEX team at reception in Trinity Arcade, Perth CBD"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 900px) 54vw, 100vw"
          />
        </figure>
      </section>

      {/* ───────── Intro: a grid of tiles and photos ───────── */}
      <section className="intro panel">
        <div className="intro__grid">
          <div className="intro__head on-dark">
            <h2 className="display intro__title">{hand(INTRO.title, INTRO.hand)}</h2>
            <p>{INTRO.paragraphs[0]}</p>
            <a className="btn btn--caps btn--light" href={INTRO.cta.href}>
              {INTRO.cta.label}
            </a>
          </div>
          <figure className="intro__photo intro__photo--tall">
            <Image
              src={images.kneeStretch}
              alt="StretchFLEX therapist guiding a client through an assisted stretch in the Perth CBD studio"
              fill
              placeholder="blur"
              sizes="(min-width: 900px) 42vw, 100vw"
            />
          </figure>
          <div className="intro__text">
            <p>{INTRO.paragraphs[1]}</p>
          </div>
          <figure className="intro__photo intro__photo--pill">
            <Image
              src={images.legStretch}
              alt="A StretchFLEX therapist gently stretching a relaxed client’s neck"
              fill
              placeholder="blur"
              sizes="(min-width: 900px) 18vw, 100vw"
            />
          </figure>
          <a className="intro__sticker" href="#contact">
            <span>Perth CBD</span>
          </a>
        </div>
      </section>

      {/* ───────── Your comfort: private, one-on-one, your choice of therapist ───────── */}
      <section className="promise panel" aria-labelledby="promise-title">
        <div className="promise__inner wrap">
          <p className="kicker promise__kicker">{COMFORT.kicker}</p>
          <h2 className="display promise__title" id="promise-title">
            {COMFORT.lines.map((line) => (
              <span className="promise__line" key={line.hand}>
                {line.lead} <span className="hand">{line.hand}</span>
              </span>
            ))}
          </h2>
          <p className="promise__body">{COMFORT.body}</p>
        </div>
      </section>

      {/* ───────── Choose your session: running title, tabs, price cards, finder ───────── */}
      <section className="sessions panel on-dark" id="packages">
        <Marquee as="h2" className="sessions__title display">
          {SESSIONS_TITLE}
        </Marquee>
        <div className="wrap">
          <SessionTabs groups={SESSION_TABS} maxPoints={3} />
          <SessionFinder
            sessions={SESSIONS.map(({ id, name, duration, price, lead, learnHref, bookHref }) => ({ id, name, duration, price, lead, learnHref, bookHref }))}
          />
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
            {BENEFITS.kicker ? <p className="kicker">{BENEFITS.kicker}</p> : null}
            <h2 className="display">{hand(BENEFITS.title, BENEFITS.hand)}</h2>
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
        </div>
      </section>

      {/* ───────── Your first session: a winding path through the four steps ───────── */}
      <section className="first panel on-dark">
        <div className="wrap">
          <header className="journey__head">
            <p className="kicker">{FIRST_SESSION.kicker}</p>
            <h2 className="display">{hand(FIRST_SESSION.title, FIRST_SESSION.hand)}</h2>
          </header>
          <ol className="journey">
            {FIRST_SESSION.steps.map((step, i) => (
              <li className="journey__step" key={step.title}>
                <span className="journey__dot display" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="journey__copy">
                  <h3 className="display journey__title">{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                {i < FIRST_SESSION.steps.length - 1 ? (
                  <span className="journey__turn" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10h12M11 5l5 5-5 5" />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="journey__end">
            <span className="journey__end-arrow" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 4v12M5 11l5 5 5-5" />
              </svg>
            </span>
            <a className="btn btn--caps btn--light" href={FIRST_SESSION.cta.href}>
              {FIRST_SESSION.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Google reviews: rating on the left, the reviews on the right ───────── */}
      <ReviewsPanel />

      {/* ───────── Client stories: video testimonials (tap to watch, full screen) ───────── */}
      <ClientStories />

      {/* ───────── Memberships: the six member cards, each linking to its tier ───────── */}
      <section className="blk blk--rose panel home-members" aria-labelledby="home-members-title">
        <div className="wrap home-members__grid">
          <header className="home-members__copy">
            <p className="kicker">{MEMBERSHIP_BAND.kicker}</p>
            <h2 className="display blk__title" id="home-members-title">
              {hand(MEMBERSHIP_BAND.title, MEMBERSHIP_BAND.hand)}
            </h2>
            <p className="blk__lead">{MEMBERSHIP_BAND.body}</p>
            <a className="btn btn--caps btn--red" href={MEMBERSHIP_BAND.cta.href}>
              {MEMBERSHIP_BAND.cta.label}
            </a>
          </header>
          <div className="home-members__sets">
            {MEMBERSHIP_BAND.collections.map((set) => (
              <div className="home-members__set" key={set.title}>
                <h3 className="home-members__label">
                  <span className="display">{set.title}</span>
                  <span className="home-members__from">from {set.tiers[0].price}/week</span>
                </h3>
                <ul className="home-members__cards">
                  {set.tiers.map((tier) => (
                    <li key={tier.slug}>
                      <a className="home-card" href={`/membership#${tier.slug}`}>
                        <Image
                          src={`/images/membership/${tier.slug}-card-front.webp`}
                          alt={`${tier.name} member card`}
                          width={1040}
                          height={656}
                          sizes="(min-width: 1000px) 230px, 62vw"
                        />
                        <span className="home-card__meta">
                          <span className="home-card__name">{tier.name}</span>
                          <span className="home-card__price">
                            {tier.price}
                            <small>/week</small>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <SwipeDots count={set.tiers.length} label="memberships" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Quick answers ───────── */}
      <section className="blk blk--blush panel quick-faq">
        <div className="wrap">
          <header className="blk__head blk__head--center">
            <p className="kicker">{QUICK_FAQS.kicker}</p>
            <h2 className="display blk__title">{hand(QUICK_FAQS.title, QUICK_FAQS.hand)}</h2>
          </header>
          <dl className="quick-faq__list">
            {QUICK_FAQS.items.map((item) => (
              <div className="quick-faq__item" key={item.q}>
                <dt className="display">{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
          <SwipeDots count={QUICK_FAQS.items.length} label="answers" />
          <div className="blk__actions blk__actions--center">
            <a className="btn btn--caps btn--outline" href={QUICK_FAQS.cta.href}>
              {QUICK_FAQS.cta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ───────── Booking band: you don't need to be flexible, just ready ───────── */}
      <CtaBand />

      {/* ───────── Contact ───────── */}
      <ContactPanel />
    </>
  );
}

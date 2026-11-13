import Image from "next/image";
import { BenefitGlyph } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { Rotator } from "@/components/rotator";
import { ContactPanel, CtaBand, ReviewsPanel } from "@/components/sections";
import { SessionTabs } from "@/components/session-tabs";
import { SessionFinder } from "@/components/session-finder";
import { hand, JsonLd } from "@/components/text";
import { images } from "@/content/images";
import { localBusiness, yoastGraph } from "@/content/schema";
import {
  BENEFITS,
  BOOK_URL,
  FIRST_SESSION,
  HERO,
  INTRO,
  SAME_GENDER,
  SESSION_GROUPS,
  SESSIONS,
  SESSIONS_TITLE,
} from "@/content/site";

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
      <section className="hero hero--home panel">
        <div className="hero__card">
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
            className="hero__photo hero__photo--team"
            src={images.teamTall}
            alt="The StretchFLEX stretch therapy team at the front desk of their Perth CBD studio"
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
              sizes="(min-width: 900px) 42vw, 100vw"
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
              placeholder="blur"
              sizes="(min-width: 900px) 18vw, 100vw"
            />
          </figure>
          <a className="intro__sticker" href="#contact">
            <span>Perth CBD</span>
          </a>
        </div>
      </section>

      {/* ───────── Same-gender therapists: women stretch women, men stretch men ───────── */}
      <section className="promise panel" aria-labelledby="promise-title">
        <div className="promise__inner wrap">
          <p className="kicker promise__kicker">{SAME_GENDER.kicker}</p>
          <h2
            className="display promise__title"
            id="promise-title"
            aria-label={`${SAME_GENDER.women.lead} ${SAME_GENDER.women.ending} ${SAME_GENDER.women.hand}, ${SAME_GENDER.men.lead.toLowerCase()} ${SAME_GENDER.men.ending} ${SAME_GENDER.men.hand}`}
          >
            <span className="promise__line">
              {SAME_GENDER.women.lead}{" "}
              <span className="promise__end">
                {SAME_GENDER.women.ending} <span className="hand">{SAME_GENDER.women.hand}</span>
              </span>
            </span>
            <span className="promise__line">
              {SAME_GENDER.men.lead}{" "}
              <span className="promise__end">
                {SAME_GENDER.men.ending} <span className="hand">{SAME_GENDER.men.hand}</span>
              </span>
            </span>
          </h2>
          <p className="promise__body">{SAME_GENDER.body}</p>
        </div>
      </section>

      {/* ───────── Stretch & Recovery: running title, tabs, price cards ───────── */}
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
        </div>
      </section>

      {/* ───────── Your first session: a winding path through the four steps ───────── */}
      <section className="first panel on-dark">
        <div className="wrap">
          <header className="journey__head">
            <p className="kicker">{FIRST_SESSION.kicker}</p>
            <h2 className="display">{hand(FIRST_SESSION.title, "to")}</h2>
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
            <p className="journey__note">{FIRST_SESSION.closing[0]}</p>
            <p className="display journey__promise">{hand(FIRST_SESSION.closing[1], "lighter")}</p>
          </div>
        </div>
      </section>

      {/* ───────── Call to action over the tinted team photo, once the visit is clear ───────── */}
      <CtaBand />

      {/* ───────── Google reviews: rating on the left, the reviews on the right ───────── */}
      <ReviewsPanel />

      {/* ───────── Contact ───────── */}
      <ContactPanel />
    </>
  );
}

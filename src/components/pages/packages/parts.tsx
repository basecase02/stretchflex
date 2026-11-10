import Image from "next/image";
import type { ReactNode } from "react";
import { hand, rich, SmartLink } from "@/components/text";
import { images as siteImages } from "@/content/images";
import type { Action, Img, Tone } from "@/content/blocks";
import "@/styles/packages.css";
import { photoFrame } from "@/lib/photo";

/**
 * Package-page sections that need the live page's exact heading structure
 * (an H2 followed by H3s, H3/H4 headings inside price cards, a booking band
 * whose title is a real H2). They reuse the shared block classes, so they
 * look like the rest of the site.
 */

/** One run of content inside a section, in live order. */
export type Part = {
  h2?: string;
  /** One H3, or several H3 lines in a row. */
  h3?: string | string[];
  /** A word of this part's heading to set in the handwritten face. */
  hand?: string;
  /** Rich paragraphs. */
  p?: string[];
  list?: string[];
  /** Ticked items with a bold lead-in (the text up to and including the first colon). */
  checks?: string[];
  actions?: Action[];
};

function Actions({ actions }: { actions?: Action[] }) {
  if (!actions?.length) return null;
  return (
    <div className="blk__actions">
      {actions.map((action) => (
        <SmartLink
          key={action.label + action.href}
          className={`btn btn--caps btn--${action.tone === "line" ? "outline" : (action.tone ?? "red")}`}
          href={action.href}
        >
          {action.label}
        </SmartLink>
      ))}
    </div>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="ticks">
      {items.map((item) => (
        <li key={item}>{rich(item)}</li>
      ))}
    </ul>
  );
}

/** "Lead-in: rest" → <strong>Lead-in:</strong> rest. */
function leadIn(text: string): ReactNode {
  const at = text.indexOf(":");
  if (at < 0 || at > 70) return rich(text);
  return (
    <>
      <strong>{text.slice(0, at + 1)}</strong>
      {rich(text.slice(at + 1))}
    </>
  );
}

function Parts({ parts, center = false }: { parts: Part[]; center?: boolean }) {
  return (
    <>
      {parts.map((part, i) => (
        <div className={`pk-part${center ? " pk-part--center" : ""}`} key={(part.h2 ?? String(part.h3 ?? "")) + i}>
          {part.h2 ? <h2 className="display blk__title pk-h2">{hand(part.h2, part.hand)}</h2> : null}
          {(Array.isArray(part.h3) ? part.h3 : part.h3 ? [part.h3] : []).map((h) => (
            <h3 className="display pk-h3" key={h}>
              {hand(h, part.h2 ? undefined : part.hand)}
            </h3>
          ))}
          {part.p?.map((text) => (
            <p className="split__p" key={text.slice(0, 48)}>
              {rich(text)}
            </p>
          ))}
          {part.list ? <Ticks items={part.list} /> : null}
          {part.checks ? (
            <ul className="checks pk-checks">
              {part.checks.map((item) => (
                <li className="check" key={item}>
                  <span className="check__mark" aria-hidden="true" />
                  <p>{leadIn(item)}</p>
                </li>
              ))}
            </ul>
          ) : null}
          <Actions actions={part.actions} />
        </div>
      ))}
    </>
  );
}

/** A photo tile beside a text tile holding one or more parts. */
export function RichSplit({
  id,
  image,
  tone = "rose",
  reverse,
  parts,
}: {
  id?: string;
  image: Img;
  tone?: Exclude<Tone, "blush">;
  reverse?: boolean;
  parts: Part[];
}) {
  const dark = tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`split panel${reverse ? " split--reverse" : ""}`}>
      <div className="split__grid">
        <figure className="split__pic" {...photoFrame(image)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </figure>
        <div className={`split__copy split__copy--${tone}${dark ? " on-dark" : ""} pk-copy`}>
          <Parts parts={parts} />
        </div>
      </div>
    </section>
  );
}

/** A full-width panel of parts, centred, with an optional photo strip on top. */
export function RichText({ id, tone = "blush", parts, image }: { id?: string; tone?: Tone; parts: Part[]; image?: Img }) {
  const dark = tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`blk blk--${tone} panel${dark ? " on-dark" : ""} pk-text`}>
      <div className="wrap">
        {image ? (
          <figure className="pk-banner" {...photoFrame(image)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1320px) 1280px, 100vw"
              style={image.position ? { objectPosition: image.position } : undefined}
            />
          </figure>
        ) : null}
        <div className="pk-text__inner">
          <Parts parts={parts} center />
        </div>
      </div>
    </section>
  );
}

/** A section heading over a grid of accordion groups, each under its own H3. */
export type QaItem = { q: string; a?: string[]; list?: string[]; after?: string[] };

function Qa({ items, name }: { items: QaItem[]; name: string }) {
  return (
    <div className="steps steps--plain acc__list">
      {items.map((item, i) => (
        <details className="step" name={name} key={item.q + i} open={i === 0}>
          <summary>
            <span className="step__title">{item.q}</span>
            <span className="step__mark" aria-hidden="true" />
          </summary>
          <div className="step__body">
            {item.a?.map((text) => <p key={text.slice(0, 48)}>{rich(text)}</p>)}
            {item.list ? <Ticks items={item.list} /> : null}
            {item.after?.map((text) => <p key={text.slice(0, 48)}>{rich(text)}</p>)}
          </div>
        </details>
      ))}
    </div>
  );
}

export function QaSection({
  id,
  tone = "blush",
  title,
  titleLevel = 2,
  handWord,
  lead,
  image,
  image2,
  top,
  groups,
  actions,
  name,
}: {
  id?: string;
  tone?: Tone;
  title: string;
  titleLevel?: 2 | 3;
  handWord?: string;
  lead?: string[];
  image?: Img;
  /** A second photo from the same live section, under the first. */
  image2?: Img;
  /** Shown above the questions (e.g. a live picture). */
  top?: ReactNode;
  groups: { h3?: string; items: QaItem[] }[];
  actions?: Action[];
  name: string;
}) {
  const dark = tone === "navy" || tone === "blue";
  const Title = titleLevel === 2 ? "h2" : "h3";
  return (
    <section id={id} className={`blk blk--${tone} panel${dark ? " on-dark" : ""} blk--accordion`}>
      <div className="wrap">
        <div className={`acc${image ? " acc--pic" : ""}`}>
          <div className="acc__side">
            <header className="blk__head blk__head--left">
              <Title className={`display blk__title${title.length > 60 ? " pk-title--long" : ""}`}>{hand(title, handWord)}</Title>
              {lead?.map((text) => (
                <p className="blk__lead" key={text.slice(0, 48)}>
                  {rich(text)}
                </p>
              ))}
            </header>
            {[image, image2].map((pic) =>
              pic ? (
                <figure className="acc__pic" key={pic.src} {...photoFrame(pic)}>
                  <Image
                    src={pic.src}
                    alt={pic.alt}
                    fill
                    sizes="(min-width: 900px) 34vw, 100vw"
                    style={pic.position ? { objectPosition: pic.position } : undefined}
                  />
                </figure>
              ) : null,
            )}
            <Actions actions={actions} />
          </div>
          <div className="pk-groups">
            {top}
            {groups.map((group, g) => (
              <div className="pk-group" key={(group.h3 ?? "") + g}>
                {group.h3 ? <h3 className="display pk-group__title">{group.h3}</h3> : null}
                <Qa items={group.items} name={`${name}-${g}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Package bundles: the homepage price cards with the live H3/H4 headings. */
export type Offer = {
  name: string;
  tag?: string;
  badge?: string;
  /** As written live, e.g. "$295.00". */
  price: string;
  /** The line under the price, e.g. "5 × Revive Stretch Sessions (30 min each)". */
  detail: string;
  /** The full price, shown struck through after the detail, e.g. "$325". */
  was: string;
  sections: { h: string; p?: string; list?: string[] }[];
  note?: string;
  quote?: string;
  closing?: string;
  action: Action;
};

const OFFER_TONES = ["blue", "rose"];

export function PackageOffers({ id, items, image }: { id?: string; items: Offer[]; image?: Img }) {
  return (
    <section id={id} className="blk blk--navy panel on-dark blk--offers pk-offers">
      {image ? (
        <Image
          className="pk-offers__photo"
          src={image.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      ) : null}
      <div className="wrap">
        <ul className={`offers offers--${Math.min(items.length, 3)}`}>
          {items.map((item, i) => (
            <li className={`plan offer plan--${OFFER_TONES[i % OFFER_TONES.length]}`} key={item.name}>
              {item.badge ? <p className="plan__badge caps">{item.badge}</p> : null}
              <h3 className="display plan__name">{item.name}</h3>
              {item.tag ? <p className="offer__tag caps">{item.tag}</p> : null}
              <p className="display plan__price">{item.price}</p>
              <p className="plan__lead">
                {item.detail}{" "}
                <s className="offer__was">
                  <span className="sr-only">was </span>
                  {item.was}
                </s>
              </p>
              <div className="offer__body">
                {item.sections.map((section) => (
                  <div className="pk-offer__sec" key={section.h}>
                    <h4 className="offer__label caps">{section.h}</h4>
                    {section.p ? <p className="plan__body">{rich(section.p)}</p> : null}
                    {section.list ? (
                      <ul className="plan__points">
                        {section.list.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
                {item.note ? <p className="offer__note">{rich(item.note)}</p> : null}
                {item.quote ? <blockquote className="offer__quote">{item.quote}</blockquote> : null}
              </div>
              {item.closing ? <p className="pk-offer__closing">{item.closing}</p> : null}
              <div className="plan__actions">
                <SmartLink className="btn btn--caps btn--ink" href={item.action.href}>
                  {item.action.label}
                </SmartLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The booking band over a photo, with the title as a real H2 (it is one live). */
export function HeadingCta({
  title,
  handWord,
  body = [],
  action,
  image,
}: {
  title: string;
  handWord?: string;
  body?: string[];
  action: Action;
  /** The live section photo; without one, the shared team photo. */
  image?: Img;
}) {
  return (
    <section className="cta panel on-dark">
      <Image
        className="cta__photo"
        src={image?.src ?? siteImages.team}
        alt=""
        fill
        sizes="100vw"
        style={image?.position ? { objectPosition: image.position } : undefined}
      />
      <div className="cta__inner">
        <h2 className="display cta__title pk-cta__title">{hand(title, handWord)}</h2>
        {body.map((text) => (
          <p className="cta__body" key={text.slice(0, 48)}>
            {rich(text)}
          </p>
        ))}
        <SmartLink className="btn btn--caps btn--light" href={action.href}>
          {action.label}
        </SmartLink>
      </div>
    </section>
  );
}

/** A live picture shown on its own (the Photobiotic specification table). */
export function Figure({ image, width, height, tone = "blush" }: { image: Img; width: number; height: number; tone?: Tone }) {
  return (
    <section className={`blk blk--${tone} panel pk-figure`}>
      <div className="wrap">
        <Image src={image.src} alt={image.alt} width={width} height={height} sizes="(min-width: 1000px) 900px, 100vw" />
      </div>
    </section>
  );
}

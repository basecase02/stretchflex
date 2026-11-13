import { photoFrame } from "@/lib/photo";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { hand, rich, SmartLink } from "@/components/text";
import type { Action, Img, Tone } from "@/content/blocks";
import { images } from "@/content/images";
import "@/styles/info.css";
import { CtaButtons } from "@/components/sections";

/**
 * Sections used only by the about / info pages. They reuse the shared block
 * classes (.blk, .acc, .steps, .ticks) so they look like the other blocks.
 */

/** A paragraph (rich string), a ticked list, or a sub-heading. */
export type Rich = string | { list: string[] } | { h3: string };

type HeadProps = { kicker?: string; title?: string; hand?: string; lead?: string[] };

function Head({ kicker, title, hand: word, lead = [], align = "center" }: HeadProps & { align?: "center" | "left" }) {
  if (!kicker && !title && !lead.length) return null;
  return (
    <header className={`blk__head blk__head--${align}`}>
      {kicker ? <p className="kicker">{kicker}</p> : null}
      {title ? <h2 className="display blk__title">{hand(title, word)}</h2> : null}
      {lead.map((text) => (
        <p className="blk__lead" key={text.slice(0, 40)}>
          {rich(text)}
        </p>
      ))}
    </header>
  );
}

function Shell({ tone = "blush", id, className = "", children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  const dark = tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`blk blk--${tone} panel${dark ? " on-dark" : ""} ${className}`.trim()}>
      <div className="wrap">{children}</div>
    </section>
  );
}

function Body({ parts }: { parts: Rich[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <p key={i}>{rich(part)}</p>
        ) : "h3" in part ? (
          <h3 className="info-sub" key={i}>
            {part.h3}
          </h3>
        ) : (
          <ul className="ticks" key={i}>
            {part.list.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

function Buttons({ actions }: { actions?: Action[] }) {
  if (!actions?.length) return null;
  return (
    <div className="blk__actions">
      {actions.map((a) => (
        <SmartLink key={a.label + a.href} className={`btn btn--caps btn--${a.tone === "line" ? "outline" : (a.tone ?? "red")}`} href={a.href}>
          {a.label}
        </SmartLink>
      ))}
    </div>
  );
}

/** An accordion whose answers can hold lists as well as paragraphs. */
export function RichAccordion({
  id,
  name,
  tone,
  numbered,
  items,
  actions,
  image,
  ...head
}: HeadProps & { id?: string; name: string; tone?: Tone; numbered?: boolean; items: { title: string; body: Rich[] }[]; actions?: Action[]; image?: Img }) {
  return (
    <Shell tone={tone} id={id} className="blk--accordion">
      <div className={`acc${image ? " acc--pic" : ""}`}>
        <div className="acc__side">
          <Head {...head} align="left" />
          {image ? (
            <figure className="acc__pic" {...photoFrame(image)}>
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 34vw, 100vw" style={image.position ? { objectPosition: image.position } : undefined} />
            </figure>
          ) : null}
          <Buttons actions={actions} />
        </div>
        <div className={`steps acc__list info-acc${numbered ? "" : " steps--plain"}`}>
          {items.map((item, i) => (
            <div className="step step--open" key={item.title}>
              <h3 className="step__head">
                {numbered ? <span className="step__num display">{i + 1}.</span> : null}{" "}
                <span className="step__title">{item.title}</span>
              </h3>
              <div className="step__body">
                <Body parts={item.body} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/** Short sections side by side, each with its own heading. */
export function InfoColumns({
  tone,
  columns,
  actions,
  ...head
}: HeadProps & { tone?: Tone; columns: { title: string; body: Rich[]; action?: Action }[]; actions?: Action[] }) {
  return (
    <Shell tone={tone}>
      <Head {...head} />
      <div className={`info-cols info-cols--${Math.min(columns.length, 3)}`}>
        {columns.map((col) => (
          <article className="info-col" key={col.title}>
            <h2 className="display info-col__title">{col.title}</h2>
            <div className="info-col__body">
              <Body parts={col.body} />
            </div>
            {col.action ? <Buttons actions={[col.action]} /> : null}
          </article>
        ))}
      </div>
      {actions?.length ? (
        <div className="info-cols__actions">
          <Buttons actions={actions} />
        </div>
      ) : null}
    </Shell>
  );
}

/**
 * Membership: the monthly maths as three big figures. The figures are one
 * heading, so it reads "Total Monthly Value: $720 You Pay: $480 Monthly
 * Savings: $240" as on the live page.
 */
export function Savings({
  kicker,
  title,
  figures,
  action,
}: {
  kicker?: string;
  title: string;
  figures: { label: string; value: string }[];
  action: Action;
}) {
  return (
    <Shell tone="blue" className="savings">
      <header className="blk__head blk__head--center">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <p className="display blk__title savings__title">{title}</p>
      </header>
      <h3 className="savings__row">
        {figures.map((f) => (
          <span className="savings__fig" key={f.label}>
            <span className="caps savings__label">{`${f.label}:`}</span>{" "}
            <span className="display savings__value">{f.value}</span>{" "}
          </span>
        ))}
      </h3>
      <div className="info-cols__actions">
        <Buttons actions={[action]} />
      </div>
    </Shell>
  );
}

/**
 * The page hero (the homepage's two tiles), with an optional sub-heading
 * under the H1, for pages whose live hero has one (a role, a tagline).
 */
export function InfoHero({
  crumbs = [],
  title,
  accent,
  subtitle,
  intro = [],
  actions,
  image,
}: {
  crumbs?: { label: string; href: string }[];
  title: string;
  accent?: string;
  subtitle?: string;
  intro?: string[];
  actions?: Action[];
  image?: Img;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className={`hero hero--page panel${image ? "" : " hero--solo"}${image?.portrait ? " hero--portrait" : ""}`}>
      <div className="hero__card">
        <svg className="hero__sparkle" viewBox="0 0 40 40" aria-hidden="true">
          <path fill="currentColor" d="M20 0c1.2 10.6 8.8 18.8 20 20-11.2 1.2-18.8 9.4-20 20-1.2-10.6-8.8-18.8-20-20C11.2 18.8 18.8 10.6 20 0z" />
        </svg>
        <nav className="crumbs caps" aria-label="Breadcrumb">
          <ol>
            {trail.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="hero__title">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="hero__accent">{accent}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? <h2 className="info-hero__sub">{subtitle}</h2> : null}
        {intro.map((text) => (
          <p className="hero__intro" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        {actions?.length ? (
          <div className="blk__actions hero__actions">
            {actions.map((a) => (
              <SmartLink key={a.label + a.href} className={`btn btn--caps btn--${a.tone === "line" ? "outline" : (a.tone ?? "red")}`} href={a.href}>
                {a.label}
              </SmartLink>
            ))}
          </div>
        ) : null}
      </div>
      {image ? (
        <figure className="hero__media" {...photoFrame(image)}>
          <Image
            className="hero__photo"
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 900px) 54vw, 100vw"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        </figure>
      ) : null}
    </section>
  );
}

/** A photo tile beside a text tile whose copy can hold sub-headings and lists. */
export function InfoSplit({
  id,
  title,
  hand: word,
  parts,
  image,
  tone = "rose",
  reverse,
  actions,
}: {
  id?: string;
  title: string;
  hand?: string;
  parts: Rich[];
  image: Img;
  tone?: Exclude<Tone, "blush">;
  reverse?: boolean;
  actions?: Action[];
}) {
  const dark = tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`split panel${reverse ? " split--reverse" : ""}`}>
      <div className="split__grid">
        <figure className="split__pic" {...photoFrame(image)}>
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 900px) 45vw, 100vw" style={image.position ? { objectPosition: image.position } : undefined} />
        </figure>
        <div className={`split__copy split__copy--${tone}${dark ? " on-dark" : ""} info-split`}>
          <header className="blk__head blk__head--left">
            <h2 className="display blk__title">{hand(title, word)}</h2>
          </header>
          <Body parts={parts} />
          <Buttons actions={actions} />
        </div>
      </div>
    </section>
  );
}

/** The booking band over the team photo, with its question as a real heading. */
export function HeadingCta({
  title,
  hand: word,
  body = [],
  action,
  actions,
}: {
  title: string;
  hand?: string;
  body?: string[];
  action?: Action;
  /** Session buttons on service pages (they replace `action`). */
  actions?: Action[];
}) {
  return (
    <section className="cta panel on-dark">
      <Image className="cta__photo" src={images.team} alt="" fill sizes="100vw" />
      <div className="cta__inner">
        <h2 className="display cta__title">{hand(title, word)}</h2>
        {body.map((text) => (
          <p className="cta__body" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        <CtaButtons actions={actions?.length ? actions : action ? [action] : []} />
      </div>
    </section>
  );
}

/** One long heading set large on its own panel, like a closing statement. */
export function Statement({ text, tone = "navy", actions }: { text: string; tone?: Tone; actions?: Action[] }) {
  return (
    <Shell tone={tone} className="statement">
      <h2 className="statement__text">{text}</h2>
      {actions?.length ? (
        <div className="info-cols__actions">
          <Buttons actions={actions} />
        </div>
      ) : null}
    </Shell>
  );
}

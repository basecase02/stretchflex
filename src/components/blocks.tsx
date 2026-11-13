import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Marquee } from "@/components/marquee";
import { ContactPanel, CtaBand, ReviewsPanel } from "@/components/sections";
import { SessionTabs } from "@/components/session-tabs";
import { hand, rich, SmartLink } from "@/components/text";
import type {
  AccordionBlock,
  Action,
  Block,
  CardsBlock,
  ChecklistBlock,
  EmbedBlock,
  Head,
  HeroBlock,
  OffersBlock,
  PeopleBlock,
  ProseBlock,
  SplitBlock,
  TextBlock,
  Tone,
} from "@/content/blocks";
import { SESSION_GROUPS, SESSIONS, SESSIONS_TITLE } from "@/content/site";
export { photoFrame } from "@/lib/photo";
import { photoFrame } from "@/lib/photo";


const list = (value?: string | string[]) => (value === undefined ? [] : Array.isArray(value) ? value : [value]);

function Actions({ actions, className = "" }: { actions?: Action[]; className?: string }) {
  if (!actions?.length) return null;
  return (
    <div className={`blk__actions ${className}`.trim()}>
      {actions.map((action) => (
        <SmartLink key={action.label + action.href} className={`btn btn--caps btn--${action.tone === "line" ? "outline" : (action.tone ?? "red")}`} href={action.href}>
          {action.label}
        </SmartLink>
      ))}
    </div>
  );
}

function SectionHead({ head, align = "center", level = 2 }: { head: Head; align?: "center" | "left"; level?: 2 | 3 }) {
  if (!head.kicker && !head.title && !head.lead) return null;
  const H = level === 2 ? "h2" : "h3";
  return (
    <header className={`blk__head blk__head--${align}`}>
      {head.kicker ? <p className="kicker">{head.kicker}</p> : null}
      {head.title ? <H className="display blk__title">{hand(head.title, head.hand)}</H> : null}
      {list(head.lead).map((text) => (
        <p className="blk__lead" key={text.slice(0, 40)}>
          {rich(text)}
        </p>
      ))}
    </header>
  );
}

function Panel({ tone = "blush", id, className = "", children }: { tone?: Tone; id?: string; className?: string; children: ReactNode }) {
  const dark = tone === "navy" || tone === "blue";
  return (
    <section id={id} className={`blk blk--${tone} panel ${dark ? "on-dark" : ""} ${className}`.replace(/\s+/g, " ").trim()}>
      <div className="wrap">{children}</div>
    </section>
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

/* ───────── Hero: the first panel, the header sits along its top ───────── */

function Hero({ block }: { block: HeroBlock }) {
  const crumbs = [{ label: "Home", href: "/" }, ...(block.crumbs ?? [])];
  return (
    <section className={`hero hero--page panel${block.image ? "" : " hero--solo"}${block.image?.portrait ? " hero--portrait" : ""}`}>
      <div className="hero__card">
        <nav className="crumbs caps" aria-label="Breadcrumb">
          <ol>
            {crumbs.map((crumb) => (
              <li key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        {block.kicker ? <p className="kicker hero__kicker">{block.kicker}</p> : null}
        <h1 className="hero__title">
          {block.title}
          {block.accent ? (
            <>
              {" "}
              <span className="hero__accent">{block.accent}</span>
            </>
          ) : null}
        </h1>
        {block.facts?.length ? (
          <ul className="facts">
            {block.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        ) : null}
        {list(block.intro).map((text) => (
          <p className="hero__intro" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        <Actions actions={block.actions} className="hero__actions" />
      </div>
      {block.image ? (
        <figure className="hero__media" {...photoFrame(block.image)}>
          <Image
            className="hero__photo"
            src={block.image.src}
            alt={block.image.alt}
            fill
            priority
            sizes="(min-width: 900px) 54vw, 100vw"
            style={block.image.position ? { objectPosition: block.image.position } : undefined}
          />
        </figure>
      ) : null}
    </section>
  );
}

/* ───────── Split: a photo tile beside a text tile ───────── */

function Split({ block }: { block: SplitBlock }) {
  const dark = block.tone === "navy" || block.tone === "blue";
  return (
    <section id={block.id} className={`split panel${block.reverse ? " split--reverse" : ""}${block.image.portrait ? " split--portrait" : ""}`}>
      <div className="split__grid">
        <figure className="split__pic" {...photoFrame(block.image)}>
          <Image
            src={block.image.src}
            alt={block.image.alt}
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            style={block.image.position ? { objectPosition: block.image.position } : undefined}
          />
        </figure>
        <div className={`split__copy split__copy--${block.tone ?? "rose"}${dark ? " on-dark" : ""}`}>
          <SectionHead head={block} align="left" />
          {block.body?.map((text) => (
            <p className="split__p" key={text.slice(0, 40)}>
              {rich(text)}
            </p>
          ))}
          {block.list ? <Ticks items={block.list} /> : null}
          {block.after?.map((text) => (
            <p className="split__p" key={text.slice(0, 40)}>
              {rich(text)}
            </p>
          ))}
          <Actions actions={block.actions} />
        </div>
      </div>
    </section>
  );
}

/* ───────── Checklist: ticked points, with an optional bold lead-in ───────── */

function Checklist({ block }: { block: ChecklistBlock }) {
  return (
    <Panel tone={block.tone} id={block.id}>
      <SectionHead head={block} />
      <ul className={`checks${block.items.length < 4 ? " checks--few" : ""}`}>
        {block.items.map((item, i) => (
          <li className="check" key={(item.title ?? "") + i}>
            <span className="check__mark" aria-hidden="true" />
            <p>
              {item.title ? <strong>{item.title}</strong> : null}
              {item.title && item.body ? " " : null}
              {item.body ? rich(item.body) : null}
            </p>
          </li>
        ))}
      </ul>
      <Actions actions={block.actions} className="blk__actions--center" />
    </Panel>
  );
}

/* ───────── Cards: photo tiles, or the homepage's pinned notes ───────── */

const NOTE_TONES = ["rose", "navy", "sky", "sky", "rose", "navy"] as const;

/** Columns that fill the rows evenly: 2, 3 or 4 (6 cards → 3 + 3, not 4 + 2). */
const tileColumns = (n: number) => (n <= 2 ? 2 : n === 4 || n === 7 || n === 8 ? 4 : 3);

function Cards({ block }: { block: CardsBlock }) {
  const notes = block.style === "notes";
  return (
    <Panel tone={block.tone} id={block.id} className={notes ? "blk--notes" : ""}>
      <SectionHead head={block} />
      <ul className={notes ? "notes" : `tiles tiles--${tileColumns(block.items.length)}`}>
        {block.items.map((item, i) => {
          const body = (
            <>
              {item.image ? (
                <figure className="tile__pic" {...photoFrame(item.image)}>
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 900px) 30vw, 100vw"
                    style={item.image.position ? { objectPosition: item.image.position } : undefined}
                  />
                </figure>
              ) : null}
              <div className="tile__copy">
                {item.meta ? <p className="tile__meta caps">{item.meta}</p> : null}
                <h3 className="display">{item.title}</h3>
                {item.body ? <p>{rich(item.body)}</p> : null}
                {item.href ? (
                  <span className="tile__more caps" aria-hidden="true">
                    Read more →
                  </span>
                ) : null}
              </div>
            </>
          );
          if (notes) {
            return (
              <li className={`note note--${NOTE_TONES[i % NOTE_TONES.length]}`} key={item.title}>
                <h3 className="display">{item.title}</h3>
                {item.body ? <p>{rich(item.body)}</p> : null}
              </li>
            );
          }
          return (
            <li className={`tile${item.href ? " tile--link" : ""}`} key={item.title}>
              {item.href ? (
                <Link className="tile__link" href={item.href}>
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ul>
      <Actions actions={block.actions} className="blk__actions--center" />
    </Panel>
  );
}

/* ───────── Accordion: FAQs and numbered steps, one open at a time ───────── */

function Accordion({ block, index }: { block: AccordionBlock; index: number }) {
  return (
    <Panel tone={block.tone} id={block.id} className="blk--accordion">
      <div className={`acc${block.image ? " acc--pic" : ""}`}>
        <div className="acc__side">
          <SectionHead head={block} align="left" />
          {block.image ? (
            <figure className="acc__pic" {...photoFrame(block.image)}>
              <Image src={block.image.src} alt={block.image.alt} fill sizes="(min-width: 900px) 34vw, 100vw" />
            </figure>
          ) : null}
          <Actions actions={block.actions} />
        </div>
        <div className={`steps acc__list${block.numbered ? "" : " steps--plain"}`}>
          {block.items.map((item, i) => (
            <div className="step step--open" key={item.title}>
              <h3 className="step__head">
                {block.numbered ? <span className="step__num display">{i + 1}.</span> : null}{" "}
                <span className="step__title">{item.title}</span>
              </h3>
              <div className="step__body">
                {list(item.body).map((text) => (
                  <p key={text.slice(0, 40)}>{rich(text)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

/* ───────── Offers: package and bundle price cards ───────── */

const OFFER_TONES = ["sky", "blue", "rose"];

function Offers({ block }: { block: OffersBlock }) {
  return (
    <Panel tone={block.tone ?? "navy"} id={block.id} className="blk--offers">
      <SectionHead head={block} />
      <ul className={`offers offers--${Math.min(block.items.length, 3)}`}>
        {block.items.map((item, i) => (
          <li className={`plan offer plan--${OFFER_TONES[(block.items.length === 2 ? i + 1 : i) % 3]}`} key={item.name}>
            {item.badge ? <p className="plan__badge caps">{item.badge}</p> : null}
            {item.tag ? <p className="offer__tag caps">{item.tag}</p> : null}
            <h3 className="display plan__name">{item.name}</h3>
            <p className="display plan__price">
              {item.price}
              {item.was ? (
                <>
                  {" "}
                  <s className="offer__was">
                    <span className="sr-only">was </span>
                    {item.was}
                  </s>
                </>
              ) : null}
            </p>
            {item.detail ? <p className="plan__lead">{item.detail}</p> : null}
            <div className="offer__body">
              {item.body ? <p className="plan__body">{rich(item.body)}</p> : null}
              {item.pointsTitle ? <p className="offer__label caps">{item.pointsTitle}</p> : null}
              {item.points ? (
                <ul className="plan__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {item.note ? <p className="offer__note">{rich(item.note)}</p> : null}
              {item.quote ? <blockquote className="offer__quote">{item.quote}</blockquote> : null}
            </div>
            <div className="plan__actions">
              <SmartLink className="btn btn--caps btn--ink" href={item.action.href}>
                {item.action.label}
              </SmartLink>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ───────── Text: a statement with paragraphs ───────── */

function Text({ block }: { block: TextBlock }) {
  return (
    <Panel tone={block.tone} id={block.id} className="blk--text">
      <div className="text">
        <SectionHead head={block} />
        {block.body?.map((text) => (
          <p className="text__p" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        {block.list ? <Ticks items={block.list} /> : null}
        {block.after?.map((text) => (
          <p className="text__p text__p--after" key={text.slice(0, 40)}>
            {rich(text)}
          </p>
        ))}
        <Actions actions={block.actions} className="blk__actions--center" />
      </div>
    </Panel>
  );
}

/* ───────── Prose: long-form HTML (blog posts, policies) ───────── */

function Prose({ block }: { block: ProseBlock }) {
  return (
    <Panel tone={block.tone} className="blk--prose">
      <div className="prose" dangerouslySetInnerHTML={{ __html: block.html }} />
      <Actions actions={block.aside} className="blk__actions--center" />
    </Panel>
  );
}

/* ───────── People: the team ───────── */

function People({ block }: { block: PeopleBlock }) {
  return (
    <Panel tone={block.tone} id={block.id}>
      <SectionHead head={block} />
      <ul className="people">
        {block.items.map((person) => {
          const inner = (
            <>
              <figure className="person__pic" {...photoFrame(person.image)}>
                {person.image ? <Image src={person.image.src} alt={person.image.alt} fill sizes="(min-width: 900px) 30vw, 90vw" /> : null}
              </figure>
              <p className="person__role caps">{person.role}</p>
              <h3 className="display person__name">{person.name}</h3>
              {person.body ? <p className="person__body">{person.body}</p> : null}
              {person.href ? <span className="tile__more caps">Meet {person.name.split(" ")[0]} →</span> : null}
            </>
          );
          return (
            <li className="person" key={person.name}>
              {person.href ? (
                <Link className="person__link" href={person.href}>
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ───────── Embed: the booking calendar ───────── */

function Embed({ block }: { block: EmbedBlock }) {
  return (
    <Panel tone={block.tone} id={block.id} className="blk--embed">
      <SectionHead head={block} />
      <div className="embed" style={{ height: block.height ?? 900 }}>
        <iframe src={block.src} title={block.label} loading="lazy" />
      </div>
    </Panel>
  );
}

/* ───────── The sessions from the homepage ───────── */

const SESSION_TABS = SESSION_GROUPS.map((group) => ({
  id: group.id,
  tab: group.tab,
  title: group.title,
  sessions: group.sessionIds.map((id) => SESSIONS.find((session) => session.id === id)!),
}));

function Sessions() {
  return (
    <section className="sessions panel on-dark" id="packages">
      <Marquee as="h2" className="sessions__title display">
        {SESSIONS_TITLE}
      </Marquee>
      <div className="wrap">
        <SessionTabs groups={SESSION_TABS} />
      </div>
    </section>
  );
}

/** Renders a page's blocks in order. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "hero":
            return <Hero block={block} key={key} />;
          case "split":
            return <Split block={block} key={key} />;
          case "checklist":
            return <Checklist block={block} key={key} />;
          case "cards":
            return <Cards block={block} key={key} />;
          case "accordion":
            return <Accordion block={block} index={i} key={key} />;
          case "offers":
            return <Offers block={block} key={key} />;
          case "text":
            return <Text block={block} key={key} />;
          case "prose":
            return <Prose block={block} key={key} />;
          case "people":
            return <People block={block} key={key} />;
          case "embed":
            return <Embed block={block} key={key} />;
          case "cta":
            return (
              <CtaBand
                key={key}
                title={block.title}
                handWord={block.hand}
                label={block.action?.label}
                href={block.action?.href}
                actions={block.actions}
                body={list(block.body)}
              />
            );
          case "node":
            return <Fragment key={key}>{block.node}</Fragment>;
          case "sessions":
            return <Sessions key={key} />;
          case "reviews":
            return <ReviewsPanel key={key} />;
          case "contact":
            return <ContactPanel key={key} actions={block.actions} />;
          default:
            return <Fragment key={key} />;
        }
      })}
    </>
  );
}

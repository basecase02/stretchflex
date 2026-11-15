import "@/styles/membership.css";
import { hand, rich } from "@/components/text";
import { MemberCard } from "./member-card";
import { TierMore } from "./tier-more";

export type Tier = {
  /** Card artwork name in /public/images/membership, e.g. "revive". */
  slug: string;
  name: string;
  tagline: string;
  /** The longer description: shown under "Read more". */
  body: string[];
  /** Everything included; the first three show, the rest are under "Read more". */
  includes: string[];
  price: string;
  was: string;
  save: string;
  /** Small facts beside the price, e.g. "$44.50 per session", "3-month minimum". */
  facts: string[];
  /** A closing line, under "Read more". */
  after?: string;
};

export type CollectionProps = {
  id: string;
  dark?: boolean;
  kicker: string;
  title: string;
  hand?: string;
  /** One short line under the title. */
  strap: string;
  /** What the collection brings together, as short chips. */
  features?: { title: string; body: string }[];
  tiers: Tier[];
  /** The comparison table, folded away under "Compare memberships". */
  compare: { head: string[]; rows: string[][] };
  /** Minimum terms and billing, always shown. */
  note: string;
};

/** The member signup doesn't exist yet: Join opens the contact form, filled in. */
export const joinHref = (name: string) => `/contact-us?membership=${encodeURIComponent(name)}#message`;

/** How many inclusions each tier shows before "Read more". */
const SHOWN = 3;

/**
 * One membership collection: a short heading, then each tier as one wide box
 * of the same size (the member card beside its name, top inclusions and a
 * big weekly price), with the full detail under "Read more" and the
 * comparison table folded away.
 */
export function Collection(props: CollectionProps) {
  return (
    <section id={props.id} className={`blk panel mship ${props.dark ? "blk--navy on-dark" : "blk--rose"}`}>
      <div className="wrap">
        <header className="blk__head blk__head--center">
          <p className="kicker">{props.kicker}</p>
          <h2 className="display blk__title">{hand(props.title, props.hand)}</h2>
          <p className="blk__lead mship__strap">{props.strap}</p>
        </header>

        {props.features?.length ? (
          <ul className="mship__features">
            {props.features.map((feature) => (
              <li className="mship__feature" key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.body}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ol className="tiers">
          {props.tiers.map((tier, i) => (
            <li className={`tier tier--${tier.slug}`} id={tier.slug} key={tier.slug}>
              <div className="tier__card">
                <MemberCard name={tier.name} slug={tier.slug} />
              </div>
              <div className="tier__info">
                <p className="tier__num">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display tier__name">{tier.name}</h3>
                <p className="tier__tagline">{tier.tagline}</p>
                <ul className="tier__list">
                  {tier.includes.slice(0, SHOWN).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="tier__price">
                  <p className="tier__amount">
                    <span className="display">{tier.price}</span>
                    <span className="tier__per">/week</span>
                  </p>
                  <p className="tier__was">
                    <span className="sr-only">Regular value </span>
                    <s>{tier.was}</s>
                  </p>
                  <p className="tier__save">Save {tier.save} every week</p>
                </div>
                <p className="tier__facts">{tier.facts.join(" · ")}</p>
                <TierMore join={joinHref(tier.name)} name={tier.name}>
                  {tier.body.map((text) => (
                    <p key={text.slice(0, 40)}>{rich(text)}</p>
                  ))}
                  {tier.includes.length > SHOWN ? (
                    <ul className="tier__list">
                      {tier.includes.slice(SHOWN).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {tier.after ? <p className="tier__after">{tier.after}</p> : null}
                </TierMore>
              </div>
            </li>
          ))}
        </ol>

        <details className="mship__compare">
          <summary>
            Compare {props.title.replace(/ Memberships$/, "").toLowerCase()} memberships
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="tbl" role="region" aria-label={`Compare ${props.title}`} tabIndex={0}>
            <table>
              <thead>
                <tr>
                  {props.compare.head.map((cell) => (
                    <th scope="col" key={cell}>
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.compare.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th scope="row" key={c}>
                          {rich(cell)}
                        </th>
                      ) : (
                        <td key={c} data-label={props.compare.head[c]}>
                          {rich(cell)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <p className="mship__note">{props.note}</p>
      </div>
    </section>
  );
}

/** The small print at the foot of the page. */
export function SmallPrint({ text }: { text: string[] }) {
  return (
    <section className="blk blk--blush panel mship-print">
      <div className="wrap">
        {text.map((line) => (
          <p className="blk__footnote" key={line.slice(0, 40)}>
            {rich(line)}
          </p>
        ))}
      </div>
    </section>
  );
}

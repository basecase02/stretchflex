import "@/styles/utility.css";
import Image from "next/image";
import type { Img } from "@/content/blocks";
import { photoFrame } from "@/lib/photo";

/**
 * Sections of the unfinished Elementor template pages (/risk-of-injury,
 * /muscle-tension-and-stiffness) that the shared blocks cannot hold as they
 * stand on the live page: the booking banner over its own photo, and the last
 * section with its two H3s.
 */

/** "Looking for Assisted Stretching?" over the section's own background photo. */
export function PhotoCta({ title, label, href, image }: { title: string; label: string; href: string; image: Img }) {
  return (
    <section className="cta panel on-dark">
      <Image
        className="cta__photo"
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      <div className="cta__inner">
        <p className="display cta__title">{title}</p>
        <a className="btn btn--caps btn--light" href={href}>
          {label}
        </a>
      </div>
    </section>
  );
}

/** The closing section: heading, copy, an H3, the button, and the last H3 beside the photo. */
export function ClosingSplit({
  title,
  body,
  lineOne,
  lineTwo,
  action,
  image,
}: {
  title: string;
  body: string[];
  lineOne: string;
  lineTwo: string;
  action: { label: string; href: string };
  image: Img;
}) {
  return (
    <section className="split split--reverse panel">
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
        <div className="split__copy split__copy--rose">
          <header className="blk__head blk__head--left">
            <h2 className="display blk__title">{title}</h2>
          </header>
          {body.map((text, i) => (
            <p className="split__p" key={i}>
              {text}
            </p>
          ))}
          <h3 className="closing__line">{lineOne}</h3>
          <div className="blk__actions">
            <a className="btn btn--caps btn--red" href={action.href}>
              {action.label}
            </a>
          </div>
          <h3 className="closing__line closing__line--soft">{lineTwo}</h3>
        </div>
      </div>
    </section>
  );
}

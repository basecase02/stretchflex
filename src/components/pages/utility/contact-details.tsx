import { hand } from "@/components/text";
import { BOOK_URL, CONTACT, PHONE } from "@/content/site";

/**
 * The contact page's details beside the map. Same parts as the homepage
 * contact panel, under the live page's own heading ("Hey, let's talk"), so
 * the page does not repeat its H1. The live page's Elementor form posted to
 * WordPress and cannot work here; the homepage's details take its place.
 */
export function ContactDetails() {
  return (
    <section className="contact panel" id="contact">
      <div className="contact__grid wrap">
        <div className="contact__copy">
          <h2 className="display">{hand("Hey, let's talk", "talk")}</h2>
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

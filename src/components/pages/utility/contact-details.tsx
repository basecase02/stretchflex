import "@/styles/contact-form.css";
import { ContactForm } from "@/components/contact-form";
import { OpenStatus } from "@/components/open-status";
import { CONTACT, EMAIL, HOURS, PHONE } from "@/content/site";

/**
 * The contact page's details beside the map (Visit, Call, Email, Opening
 * hours), from the client's content document. Contact data comes from
 * site.ts so it matches the header, footer and homepage.
 */
export function ContactDetails() {
  return (
    <section className="contact panel" id="contact">
      <div className="contact__grid wrap">
        <div className="contact__copy">
          <OpenStatus />
          <div className="contact__list">
            <div className="contact__block">
              <h2 className="display">Visit</h2>
              <p>{CONTACT.address}</p>
              <p className="contact__aside">{CONTACT.directions}</p>
            </div>
            <div className="contact__block">
              <h2 className="display">Call</h2>
              <p>
                <a href={PHONE.href}>{PHONE.label}</a>
              </p>
            </div>
            <div className="contact__block">
              <h2 className="display">Email</h2>
              <p>
                <a href={EMAIL.href}>{EMAIL.label}</a>
              </p>
            </div>
            <div className="contact__block">
              <h2 className="display">Opening hours</h2>
              <table className="contact__hours">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map(([days, time]) => (
                    <tr key={days}>
                      <th scope="row">{days}</th>
                      <td>{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <a
          className="btn btn--caps btn--outline contact__directions"
          href="https://www.google.com/maps/dir/?api=1&destination=StretchFLEX%2C%20111%20Trinity%20Arcade%2C%2072%20St%20Georges%20Terrace%2C%20Perth%20WA%206000"
          target="_blank"
          rel="noopener"
        >
          Get directions ↗
        </a>
        <div className="contact__map">
          <iframe
            src={CONTACT.mapSrc}
            title="StretchFLEX on Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/** "Send us a message": the form, which the membership Join buttons land on (#message). */
export function ContactMessage() {
  return (
    <section className="blk blk--rose panel message" id="message">
      <div className="wrap message__grid">
        <header className="blk__head blk__head--left">
          <h2 className="display blk__title">
            Send us a <span className="hand">message</span>
          </h2>
        </header>
        <ContactForm note="We usually reply within one business day. Your details are handled in line with our [Privacy Policy](/privacy-policy)." />
      </div>
    </section>
  );
}

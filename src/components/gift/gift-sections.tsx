import "@/styles/contact-form.css";
import "@/styles/gift.css";
import Image from "next/image";
import { GiftShop } from "./gift-shop";

/** The choosing, personalising and paying panels (one form). */
export function GiftBuy() {
  return <GiftShop />;
}

/** What arrives: one certificate in three formats. */
export function GiftFormats() {
  const formats = [
    { title: "A beautiful email", body: "Sent straight away, or at midnight as the day you choose begins, with their certificate and your message." },
    { title: "A printable PDF", body: "A landscape certificate, ready to print and place in a card. You get a copy too, to hand over yourself." },
    { title: "A mobile certificate", body: "One tap opens it on their phone, ready to show at the studio, with their unique code." },
  ];
  return (
    <section className="blk blk--blush panel" aria-labelledby="gift-formats-title">
      <div className="wrap">
        <header className="blk__head blk__head--center">
          <p className="kicker">Beautiful to receive</p>
          <h2 className="display blk__title" id="gift-formats-title">
            One certificate, <span className="hand">three</span> ways to enjoy it
          </h2>
          <p className="blk__lead">Personalised with their name, your name, your message and a unique redemption code.</p>
        </header>
        <div className="giftFormats">
          <figure className="giftFormats__pic">
            <Image src="/images/gift/gift-certificate-print.jpg" alt="A printed StretchFLEX gift certificate in black and gold" width={2000} height={1116} sizes="(min-width: 1000px) 640px, 92vw" />
          </figure>
          <ul className="giftFormats__list">
            {formats.map((f, i) => (
              <li className="tile" key={f.title}>
                <div className="tile__copy">
                  <span className="tile__meta caps">0{i + 1}</span>
                  <h3 className="display">{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

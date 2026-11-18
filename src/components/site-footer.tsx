import Image from "next/image";
import Link from "next/link";
import { ADDRESS, EMAIL, FOOTER, PHONE, SOCIAL, TAGLINE } from "@/content/site";
import { images } from "@/content/images";
import { FacebookIcon, InstagramIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="footer panel on-dark">
      <div className="footer__grid">
        <div className="footer__brand">
          <Link href="/" className="footer__logo" aria-label="StretchFLEX home">
            <Image src={images.logoWhite} alt="StretchFLEX" sizes="220px" />
          </Link>
          <p className="footer__blurb">{FOOTER.blurb}</p>
          <p className="footer__tagline display">{TAGLINE}</p>
          <address className="footer__contact">
            <span>{ADDRESS}</span>
            <span>
              <a href={PHONE.href}>{PHONE.label}</a> · <a href={EMAIL.href}>{EMAIL.label}</a>
            </span>
            <span>{FOOTER.hours}</span>
          </address>
          <ul className="footer__social">
            <li>
              <a href={SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>

        {FOOTER.columns.map((column) => (
          <nav className="footer__col" key={column.title} aria-label={column.title}>
            <h6>{column.title}</h6>
            <ul>
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__base">
        <div className="footer__legal">
          <p>{FOOTER.copyright}</p>
          <p className="footer__disclaimer">{FOOTER.disclaimer}</p>
        </div>
        {/* A followed link with the brand as its text (Google treats keyword-stuffed footer links as link schemes). */}
        <a className="footer__credit" href="https://www.basecasetech.com.au" target="_blank" rel="noopener">
          Technology by <strong>Basecase Tech</strong>
        </a>
      </div>
    </footer>
  );
}

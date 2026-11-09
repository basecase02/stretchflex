import Image from "next/image";
import Link from "next/link";
import { FOOTER, SOCIAL } from "@/content/site";
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
                  {link.href === "/" ? <Link href="/">{link.label}</Link> : <a href={link.href}>{link.label}</a>}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer__base">
        <p>
          {FOOTER.copyright} |{" "}
          <a href={FOOTER.credit.href} target="_blank" rel="noopener">
            {FOOTER.credit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}

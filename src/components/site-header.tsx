"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { BOOK_URL, NAV, PHONE, SOCIAL, type NavItem } from "@/content/site";
import { images } from "@/content/images";
import { ChevronIcon, FacebookIcon, InstagramIcon } from "./icons";

/**
 * Sits inside the top of the first panel, then becomes a white bar once the
 * page scrolls. The logo is always the original colour logo. Below 1180px the
 * links move into a full-screen menu.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navId = useId();

  // Once the page has scrolled, the bar gets its blue pill background.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock the page behind it.
  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", menuOpen);
    return () => document.documentElement.classList.remove("is-locked");
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setOpenSub(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenSub(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  // Leaving the mobile breakpoint closes the overlay.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1180px)");
    const onChange = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      ref={headerRef}
      className="header"
      data-menu-open={menuOpen || undefined}
      data-stuck={stuck || undefined}
    >
      <div className="header__bar">
        <Link href="/" className="header__logo" aria-label="StretchFLEX home">
          <Image src={images.logo} alt="StretchFLEX" priority sizes="180px" />
        </Link>

        <nav id={navId} className="nav" aria-label="Main">
          <ul className="nav__list">
            {NAV.map((item) => (
              <NavEntry
                key={item.href}
                item={item}
                open={openSub === item.href}
                onToggle={() => setOpenSub((current) => (current === item.href ? null : item.href))}
              />
            ))}
          </ul>
          <div className="nav__extra">
            <a className="btn btn--lg" href={BOOK_URL}>
              Book Appointment
            </a>
            <a className="nav__phone" href={PHONE.href}>
              {PHONE.label}
            </a>
          </div>
        </nav>

        <ul className="header__social">
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

        <a className="btn header__cta" href={BOOK_URL} aria-label="Book Appointment">
          <span>
            Book<span className="header__cta-rest"> Appointment</span>
          </span>
        </a>

        <button
          type="button"
          className="header__menu"
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="header__menu-icon" aria-hidden="true" />
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
    </header>
  );
}

function NavEntry({ item, open, onToggle }: { item: NavItem; open: boolean; onToggle: () => void }) {
  const subId = useId();
  const hasSub = Boolean(item.children?.length || item.groups?.length);

  if (!hasSub) {
    return (
      <li className="nav__item">
        <a className="nav__link" href={item.href}>
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li className="nav__item nav__item--sub" data-open={open || undefined}>
      <a className="nav__link" href={item.href}>
        {item.label}
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls={subId}
        aria-label={`${item.label} submenu`}
        onClick={onToggle}
      >
        <ChevronIcon />
      </button>
      <div className="nav__sub" id={subId}>
        {item.children && (
          <ul className="nav__sublist">
            {item.children.map((child) => (
              <li key={child.href}>
                <a href={child.href}>{child.label}</a>
              </li>
            ))}
          </ul>
        )}
        {item.groups?.map((group) => (
          <div className="nav__group" key={group.label}>
            <p className="nav__group-label">{group.label}</p>
            <ul className="nav__sublist">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
}

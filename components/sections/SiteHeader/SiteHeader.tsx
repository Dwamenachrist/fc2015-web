"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Club } from "@/content/schema";
import { Crest } from "@/components/ui/Crest";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ChevronDown, Close, Menu } from "@/components/ui/Icons";
import styles from "./SiteHeader.module.css";

/** Club ▾ dropdown (Atlanta City pattern): each page with one line on what's inside. */
export const CLUB_MENU = [
  { href: "/club", label: "Our story", text: "How FC 2015 began in Legon, and where we're going." },
  { href: "/club#crest", label: "The crest", text: "The Golden Eagle, the star and the gold and blue, explained." },
  { href: "/partners", label: "Partners", text: "The businesses behind the club, and how to join them." },
] as const;

export const NAV = [
  { href: "/squad", label: "Squad" },
  { href: "/matches", label: "Matches" },
  { href: "/kits", label: "Kits" },
  { href: "/contact", label: "Contact" },
] as const;

const isActive = (pathname: string, href: string) => pathname === href.split("#")[0];

export function SiteHeader({ socials }: { socials: Club["socials"] }) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [clubOpen, setClubOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const clubWrap = useRef<HTMLLIElement>(null);
  // Hover opens the menu; a click that lands right after that hover must not close it again.
  const hoverOpenedAt = useRef(0);
  const clubActive = CLUB_MENU.some((m) => isActive(pathname, m.href));

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSheetOpen(false);
    setClubOpen(false);
  }

  // Club dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!clubOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!clubWrap.current?.contains(e.target as Node)) setClubOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setClubOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [clubOpen]);

  // Mobile sheet: lock scroll, close on Escape, keep focus inside.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(sheet.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [menuButton.current!, ...focusables()];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="FC 2015 home">
          <Crest height={48} eager decorative className={styles.crest} />
          <span className={styles.wordmark}>
            <span className={styles.name}>FC 2015</span>
            <span className={styles.place}>Legon · Accra</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul role="list" className={styles.links}>
            <li ref={clubWrap} className={styles.clubItem} onMouseLeave={() => setClubOpen(false)}>
              <button
                type="button"
                className={styles.link}
                aria-expanded={clubOpen}
                aria-controls="club-menu"
                data-active={clubActive || undefined}
                // Use the latest state: a click straight after a hover-open keeps the menu open.
                onClick={() => setClubOpen((open) => (open && Date.now() - hoverOpenedAt.current < 400 ? true : !open))}
                onMouseEnter={() => {
                  hoverOpenedAt.current = Date.now();
                  setClubOpen(true);
                }}
              >
                Club <ChevronDown className={styles.chevron} aria-hidden="true" />
              </button>
              <div id="club-menu" className={styles.dropdown} hidden={!clubOpen}>
                <ul role="list" className={styles.dropdownGrid}>
                  {CLUB_MENU.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} className={styles.dropdownLink} onClick={() => setClubOpen(false)}>
                        <span className={styles.dropdownTitle}>{m.label} ›</span>
                        <span className={styles.dropdownText}>{m.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={styles.link} aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button href="/trials" size="sm">
            Join Open Trials
          </Button>
        </div>

        <ThemeToggle />

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={sheetOpen}
          aria-controls="mobile-menu"
          aria-label={sheetOpen ? "Close menu" : "Open menu"}
          onClick={() => setSheetOpen((o) => !o)}
        >
          {sheetOpen ? <Close /> : <Menu />}
        </button>
      </div>

      <div id="mobile-menu" ref={sheet} className={styles.sheet} hidden={!sheetOpen}>
        <nav aria-label="Mobile">
          <p className={styles.sheetGroup}>Club</p>
          <ul role="list" className={styles.sheetLinks}>
            {CLUB_MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
                  {m.label}
                </Link>
              </li>
            ))}
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={styles.sheetLink}
                  aria-current={isActive(pathname, n.href) ? "page" : undefined}
                  onClick={() => setSheetOpen(false)}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="/trials" full onClick={() => setSheetOpen(false)}>
          Join Open Trials
        </Button>
        <SocialLinks socials={socials} />
      </div>
    </header>
  );
}

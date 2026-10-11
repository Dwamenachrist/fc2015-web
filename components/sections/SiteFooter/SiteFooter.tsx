import Link from "next/link";
import type { Club } from "@/content/schema";
import { Crest } from "@/components/ui/Crest";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { TBD } from "@/content/markers";
import styles from "./SiteFooter.module.css";

const COLUMNS = [
  {
    title: "Club",
    links: [
      { href: "/club", label: "Our story" },
      { href: "/club#crest", label: "The crest" },
      { href: "/squad", label: "Squad" },
      { href: "/partners", label: "Partners" },
    ],
  },
  {
    title: "Matchday",
    links: [
      { href: "/matches", label: "Fixtures & results" },
      { href: "/kits", label: "Kits" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/trials", label: "Open trials" },
      { href: "/partners", label: "Partner with us" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/** SITE_BLUEPRINT §3.9: Atlanta City watermark footer + Arsenal legal bar. */
export function SiteFooter({ club, showCookieSettings }: { club: Club; showCookieSettings: boolean }) {
  return (
    <footer className={styles.footer} data-surface="black">
      <div className={styles.watermark} aria-hidden="true">
        <Crest height={640} decorative />
      </div>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Crest height={88} decorative />
          <p className={styles.name}>FC 2015</p>
          <p className={styles.tagline}>{TBD("footer tagline (client approval)", "Built in Legon. Playing for more.")}</p>
          <SocialLinks socials={club.socials} size="sm" />
        </div>
        <nav className={styles.columns} aria-label="Footer">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className={styles.colTitle}>{c.title}</p>
              <ul role="list" className={styles.colLinks}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.bar}>
        <div className={`container ${styles.barInner}`}>
          <p>© {new Date().getFullYear()} FC 2015 · Legon, Accra</p>
          <ul role="list" className={styles.legal}>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/privacy#cookies">Cookies</Link>
            </li>
            {showCookieSettings && (
              <li>
                <button type="button" data-cookie-settings className={styles.linkButton}>
                  Cookie settings
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

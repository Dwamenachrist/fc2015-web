import Link from "next/link";
import Image from "next/image";
import type { Fixture } from "@/content/schema";
import { Button } from "@/components/ui/Button";
import { Crest } from "@/components/ui/Crest";
import { ArrowRight } from "@/components/ui/Icons";
import { formatKickoffTime, formatMatchDate } from "@/lib/dates";
import heroImage from "@/public/images/hero.jpg";
import styles from "./Hero.module.css";

/** PRD §5.1 · SITE_BLUEPRINT §3.1 (Atlanta City hero pattern). */
export function Hero({ next, video }: { next?: Fixture; video?: string }) {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title" data-surface="black">
      <Image
        src={heroImage}
        alt=""
        fill
        preload
        fetchPriority="high"
        quality={70}
        sizes="100vw"
        placeholder="blur"
        className={styles.photo}
      />
      {/* Muted loop over the photo when the club has footage (content/club.ts heroVideo).
          Hidden for people who ask for reduced motion; the photo stays as the poster. */}
      {video && <video className={styles.video} src={video} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />}
      <div className={styles.scrim} aria-hidden="true" />

      {/* Atlanta City composition: the photo and the crest carry it, one line of type in the bottom left. */}
      <div className={`container ${styles.content}`}>
        <Crest height={360} eager className={styles.crest} />
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            FC 2015 — <span className={styles.keep}>The Pride of Legon</span>
          </h1>
          <p className={styles.subtitle}>Division Two Football Club | Est. 2015 | Legon, Greater Accra</p>
          <div className={styles.actions}>
            <Button href="/club">Explore Club Story</Button>
            <Link href="/matches" className={styles.textLink}>
              View Fixtures <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {next && (
        <Link href="/matches" className={styles.strip}>
          <span className={`container ${styles.stripInner}`}>
            <span className={styles.stripLabel}>Next</span>
            <span className={styles.stripText}>
              {next.home ? `FC 2015 v ${next.opponent}` : `${next.opponent} v FC 2015`}
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              {formatMatchDate(next.kickoff)}
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              {formatKickoffTime(next.kickoff)}
              <span className={styles.dot} aria-hidden="true">
                ·
              </span>
              {next.venue.address}
            </span>
            <ArrowRight className={styles.stripArrow} aria-hidden="true" />
          </span>
        </Link>
      )}
    </section>
  );
}

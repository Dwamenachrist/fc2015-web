import Link from "next/link";
import type { Fixture } from "@/content/schema";
import { Countdown } from "@/components/ui/Countdown";
import { Crest } from "@/components/ui/Crest";
import { MonogramCrest } from "@/components/ui/MonogramCrest";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icons";
import { formatKickoffTime, formatMatchDate } from "@/lib/dates";
import styles from "./MatchCards.module.css";

function Side({ fixture, us }: { fixture: Fixture; us: boolean }) {
  return (
    <div className={styles.side}>
      {us ? (
        <Crest height={56} className={styles.crest} />
      ) : (
        <MonogramCrest initials={fixture.opponentShort} size={56} label={`${fixture.opponent} crest`} />
      )}
      <span className={styles.team}>{us ? "FC 2015" : fixture.opponent}</span>
    </div>
  );
}

function Card({ label, fixture, live }: { label: string; fixture: Fixture; live?: boolean }) {
  const r = fixture.result;
  const [ls, rs] = r ? (fixture.home ? [r.for, r.against] : [r.against, r.for]) : [0, 0];
  return (
    <article className={styles.card} data-next={live || undefined} aria-label={label}>
      <h3 className={styles.label}>{label}</h3>
      <time className={styles.date} dateTime={fixture.kickoff}>
        {formatMatchDate(fixture.kickoff)}
      </time>
      <div className={styles.versus}>
        <Side fixture={fixture} us={fixture.home} />
        {r ? (
          <span className={styles.score} aria-label={`${ls} to ${rs}, full time`}>
            {ls} – {rs}
            <small>FT</small>
          </span>
        ) : (
          <time className={styles.time} dateTime={fixture.kickoff}>
            {formatKickoffTime(fixture.kickoff)}
          </time>
        )}
        <Side fixture={fixture} us={!fixture.home} />
      </div>
      <p className={styles.meta}>
        <span className={styles.comp}>{fixture.competition}</span>
        <span>
          {fixture.venue.name}, {fixture.venue.address}
        </span>
      </p>
      {live && <Countdown kickoff={fixture.kickoff} size="sm" />}
    </article>
  );
}

/**
 * Homepage match block: Last match · Next match · Upcoming
 * (Man United pattern, DECISIONS.md 11 Oct). Full lists live on /matches.
 */
export function MatchCards({ last, next, upcoming }: { last?: Fixture; next?: Fixture; upcoming?: Fixture }) {
  const cards = [
    last && { label: "Last match", fixture: last },
    next && { label: "Next match", fixture: next, live: true },
    upcoming && { label: "Upcoming", fixture: upcoming },
  ].filter(Boolean) as { label: string; fixture: Fixture; live?: boolean }[];

  return (
    <section id="matches" className="section" aria-labelledby="matches-title">
      <div className="container">
        <SectionHeading
          id="matches-title"
          kicker="Matchday"
          title="Matches"
          action={
            <Link href="/matches" className={styles.all}>
              All fixtures <ArrowRight aria-hidden="true" />
            </Link>
          }
        />
        {cards.length > 0 ? (
          <div className={styles.grid}>
            {cards.map((c) => (
              <Card key={c.label} {...c} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Fixtures for the new season will be announced soon.</p>
        )}
      </div>
    </section>
  );
}

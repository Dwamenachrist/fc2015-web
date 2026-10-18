import type { Fixture } from "@/content/schema";
import { Countdown } from "@/components/ui/Countdown";
import { Crest } from "@/components/ui/Crest";
import { MonogramCrest } from "@/components/ui/MonogramCrest";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin } from "@/components/ui/Icons";
import { formatKickoffTime, formatMatchDate, formatShortDate } from "@/lib/dates";
import { outcome } from "@/lib/fixtures";
import styles from "./MatchCenter.module.css";

function TeamBlock({ fixture, side }: { fixture: Fixture; side: "us" | "them" }) {
  if (side === "us") {
    return (
      <div className={styles.team}>
        <Crest height={96} className={styles.teamCrest} />
        <span className={styles.teamName}>FC 2015</span>
      </div>
    );
  }
  return (
    <div className={styles.team}>
      <MonogramCrest initials={fixture.opponentShort} size={96} label={`${fixture.opponent} crest`} />
      <span className={styles.teamName}>{fixture.opponent}</span>
    </div>
  );
}

/** PRD §5.2 · SITE_BLUEPRINT §3.2 (Arsenal preview graphic + Man United match block). */
export function MatchCenter({ next, results }: { next?: Fixture; results: Fixture[] }) {
  return (
    <section id="matches" className="section" aria-labelledby="matches-title">
      <div className="container">
        <SectionHeading id="matches-title" kicker="Matchday" title="Next match" subtitle="Every home game at Legon." />

        <div className={styles.grid}>
          {next ? (
            <article className={styles.next} aria-label="Next match" data-tone="dark">
              <span className={`brand-pattern ${styles.pattern}`} aria-hidden="true" />
              <header className={styles.nextMeta}>
                <span className={styles.competition}>{next.competition}</span>
                <span>
                  <time dateTime={next.kickoff}>{formatMatchDate(next.kickoff)}</time>
                </span>
              </header>

              <div className={styles.versus}>
                <TeamBlock fixture={next} side={next.home ? "us" : "them"} />
                <div className={styles.vs}>
                  <span className={styles.vsText}>v</span>
                  <time className={styles.kickoff} dateTime={next.kickoff}>
                    {formatKickoffTime(next.kickoff)}
                  </time>
                </div>
                <TeamBlock fixture={next} side={next.home ? "them" : "us"} />
              </div>

              <Countdown kickoff={next.kickoff} />

              <footer className={styles.venue}>
                <span className={styles.venueText}>
                  <MapPin aria-hidden="true" />
                  <span>
                    {next.venue.name}, {next.venue.address}
                  </span>
                </span>
                <Button href={next.venue.mapsUrl} variant="secondary" size="sm">
                  Directions
                </Button>
              </footer>
            </article>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Fixtures coming soon</p>
              <p>Fixtures for the new season will be announced soon.</p>
            </div>
          )}

          {results.length > 0 && (
            <aside className={styles.results} aria-labelledby="results-title">
              <h3 id="results-title" className={styles.resultsTitle}>
                Recent results
              </h3>
              <ol role="list" className={styles.resultList}>
                {results.map((r) => {
                  const res = r.result!;
                  const o = outcome(res);
                  const [left, right] = r.home ? ["FC 2015", r.opponent] : [r.opponent, "FC 2015"];
                  const [ls, rs] = r.home ? [res.for, res.against] : [res.against, res.for];
                  return (
                    <li key={r.id} className={styles.result}>
                      <time className={styles.resultDate} dateTime={r.kickoff}>
                        {formatShortDate(r.kickoff)}
                      </time>
                      <span className={styles.resultTeams}>
                        <span>{left}</span>
                        <span className={styles.score} aria-label={`${ls} to ${rs}`}>
                          {ls}–{rs}
                        </span>
                        <span>{right}</span>
                      </span>
                      <span className={styles.badge} data-outcome={o}>
                        {o}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

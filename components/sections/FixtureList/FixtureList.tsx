import type { Fixture } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatKickoffTime, formatMatchDate } from "@/lib/dates";
import { outcome } from "@/lib/fixtures";
import styles from "./FixtureList.module.css";

/** Matches page: every upcoming fixture, then every result (newest first). */
export function FixtureList({ upcoming, results }: { upcoming: Fixture[]; results: Fixture[] }) {
  const row = (f: Fixture) => {
    const [left, right] = f.home ? ["FC 2015", f.opponent] : [f.opponent, "FC 2015"];
    const r = f.result;
    const [ls, rs] = r ? (f.home ? [r.for, r.against] : [r.against, r.for]) : [0, 0];
    return (
      <li key={f.id} className={styles.row}>
        <time className={styles.date} dateTime={f.kickoff}>
          {formatMatchDate(f.kickoff)}
        </time>
        <span className={styles.teams}>
          <span>{left}</span>
          {r ? (
            <span className={styles.score} aria-label={`${ls} to ${rs}`}>
              {ls}–{rs}
            </span>
          ) : (
            <span className={styles.time}>{formatKickoffTime(f.kickoff)}</span>
          )}
          <span>{right}</span>
        </span>
        <span className={styles.where}>
          {f.home ? "Home" : "Away"} · {f.venue.address}
        </span>
        {r ? (
          <span className={styles.badge} data-outcome={outcome(r)}>
            {outcome(r)}
          </span>
        ) : (
          <span className={styles.comp}>{f.competition}</span>
        )}
      </li>
    );
  };

  return (
    <section className="section" aria-label="Fixtures and results">
      <div className="container">
        <SectionHeading id="fixtures-title" kicker="Season 2026" title="Fixtures" />
        {upcoming.length ? (
          <ol role="list" className={styles.list}>
            {upcoming.map(row)}
          </ol>
        ) : (
          <p className={styles.empty}>Fixtures for the new season will be announced soon.</p>
        )}
        <div className={styles.spacer} />
        <SectionHeading id="results-title" kicker="Season 2026" title="Results" />
        {results.length ? (
          <ol role="list" className={styles.list}>
            {results.map(row)}
          </ol>
        ) : (
          <p className={styles.empty}>No results yet this season.</p>
        )}
      </div>
    </section>
  );
}

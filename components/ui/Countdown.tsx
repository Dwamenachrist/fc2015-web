"use client";

import { useEffect, useState } from "react";
import { countdown, pad2, type CountdownParts } from "@/lib/countdown";
import styles from "./Countdown.module.css";

/**
 * Kick-off countdown (TDD §6.2). The server renders "--" so server and
 * browser HTML always match; digits start once the page is interactive.
 * Screen readers get a label that only changes once a minute.
 */
export function Countdown({ kickoff, size = "md" }: { kickoff: string; size?: "sm" | "md" }) {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setParts(countdown(kickoff, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [kickoff]);

  if (parts?.state === "live") return <p className={styles.status}>Kick-off — match in progress</p>;
  if (parts?.state === "finished") return <p className={styles.status}>Full time — result to follow</p>;

  const units: [string, number | undefined][] = [
    ["Days", parts?.days],
    ["Hrs", parts?.hours],
    ["Mins", parts?.minutes],
    ["Secs", parts?.seconds],
  ];
  const spoken = parts ? `Kick-off in ${parts.days} days ${parts.hours} hours ${parts.minutes} minutes` : "Kick-off countdown";

  return (
    <div className={`${styles.countdown} ${size === "sm" ? styles.sm : ""}`}>
      <p className="visually-hidden" aria-live="polite">
        {spoken}
      </p>
      <ol className={styles.units} aria-hidden="true">
        {units.map(([label, value]) => (
          <li key={label} className={styles.unit}>
            <span className={styles.num}>{value === undefined ? "--" : pad2(value)}</span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import styles from "./SquadRail.module.css";

const ROLE = { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward", STAFF: "Staff" } as const;

/**
 * Homepage squad preview: one swipeable row (Man United rail pattern,
 * DECISIONS.md 11 Oct). Native scroll-snap does the swiping; the arrow
 * buttons are a convenience for mouse users.
 */
export function SquadRail({ players }: { players: Person[] }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="section" aria-labelledby="squad-rail-title">
      <div className="container">
        <SectionHeading
          id="squad-rail-title"
          kicker="First team"
          title="The Squad"
          action={
            <div className={styles.controls}>
              <button type="button" className={styles.arrow} onClick={() => scroll(-1)} aria-label="Scroll players left">
                <ChevronLeft />
              </button>
              <button type="button" className={styles.arrow} onClick={() => scroll(1)} aria-label="Scroll players right">
                <ChevronRight />
              </button>
              <Link href="/squad" className={styles.all}>
                Meet the squad <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          }
        />
      </div>
      <ul ref={track} role="list" className={styles.track} aria-label="Players">
        {players.map((p) => (
          <li key={p.id} className={styles.card} data-tone="dark">
            <Link href={`/squad?squad=${p.role}`} className={styles.link}>
              <div className={styles.portrait}>
                <Image
                  src={p.photo ?? "/images/player-placeholder.svg"}
                  alt={p.photo ? `${p.firstName} ${p.lastName}` : ""}
                  fill
                  sizes="260px"
                  quality={70}
                  unoptimized={!p.photo}
                  className={styles.photo}
                />
              </div>
              <div className={styles.info}>
                {p.number !== undefined && <span className={styles.number}>{p.number}</span>}
                <span className={styles.first}>{p.firstName}</span>
                <span className={styles.last}>{p.lastName}</span>
                <span className={styles.role}>{ROLE[p.role]}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useRef } from "react";
import type { About } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";
import styles from "./Timeline.module.css";

/** Sliding history timeline (Atlanta City "Timeline to 2028" pattern). */
export function Timeline({ items }: { items: About["timeline"] }) {
  const track = useRef<HTMLOListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="timeline-title">
      <div className="container">
        <SectionHeading
          id="timeline-title"
          kicker="Moments in our history"
          title="Our journey"
          action={
            <div className={styles.controls}>
              <button type="button" className={styles.arrow} onClick={() => scroll(-1)} aria-label="Earlier">
                <ChevronLeft />
              </button>
              <button type="button" className={styles.arrow} onClick={() => scroll(1)} aria-label="Later">
                <ChevronRight />
              </button>
            </div>
          }
        />
        <ol ref={track} role="list" className={styles.track} tabIndex={0} aria-label="Timeline, scroll sideways for more">
          {items.map((t) => (
            <li key={t.title} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.year}>{t.year}</span>
              <h3 className={styles.title}>{t.title}</h3>
              <p className={styles.text}>{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

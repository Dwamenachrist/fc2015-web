"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import type { About } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./CrestExplorer.module.css";

type Part = About["crestParts"][number];

/**
 * "Behind the crest" (DECISIONS.md 11 Oct): pick a part on the crest itself
 * or in the list; the crest zooms to it and a spotlight dims the rest.
 * Tabs follow the WAI-ARIA tabs pattern (arrow keys, Home, End).
 */
export function CrestExplorer({ parts }: { parts: Part[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const part = parts[active];

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const last = parts.length - 1;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select((next + parts.length) % parts.length, true);
  };

  const stage = { "--x": `${part.x}%`, "--y": `${part.y}%`, "--zoom": part.zoom } as CSSProperties;

  return (
    <section id="crest" className={`section ${styles.wrap}`} aria-labelledby="crest-title">
      <div className="container">
        <SectionHeading id="crest-title" kicker="Our identity" title="Behind the crest" subtitle="Tap any part of the crest." />

        <div className={styles.layout}>
          <div className={styles.stage} style={stage} data-zoomed={part.zoom > 1 || undefined}>
            <div className={styles.crestWrap}>
              <Image
                src="/brand/crest.png"
                alt="FC 2015 crest"
                width={400}
                height={501}
                sizes="(min-width: 1024px) 28rem, 80vw"
                className={styles.crest}
              />
              {parts.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.hotspot}
                  style={{ left: `${p.x}%`, top: `${p.y}%` } as CSSProperties}
                  data-active={i === active || undefined}
                  aria-label={`Show ${p.title}`}
                  tabIndex={-1}
                  onClick={() => select(i)}
                />
              ))}
            </div>
            <div className={styles.spotlight} aria-hidden="true" />
          </div>

          <div className={styles.panel}>
            <div className={styles.tabs} role="tablist" aria-label="Parts of the crest" aria-orientation="vertical" onKeyDown={onKey}>
              {parts.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`crest-tab-${p.id}`}
                  aria-selected={i === active}
                  aria-controls="crest-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  onClick={() => select(i)}
                >
                  <span className={styles.tabIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </button>
              ))}
            </div>
            <div id="crest-panel" role="tabpanel" aria-labelledby={`crest-tab-${part.id}`} className={styles.story} key={part.id}>
              <h3 className={styles.storyTitle}>{part.title}</h3>
              <p className={styles.storyText}>{part.text}</p>
              <div className={styles.progress} aria-hidden="true">
                {parts.map((p, i) => (
                  <span key={p.id} data-active={i === active || undefined} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

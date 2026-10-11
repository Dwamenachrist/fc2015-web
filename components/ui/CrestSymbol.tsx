import styles from "./CrestSymbol.module.css";

/** Line icons traced from the crest's own shapes (SITE_BLUEPRINT §4.5). */
export function CrestSymbol({ id }: { id: "eagle" | "star" | "bars" }) {
  return (
    <svg className={styles.icon} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {id === "eagle" && (
        <g className={styles.line}>
          <path d="M24 14c-2 0-3.5 1.6-3.5 3.5 0 1.2.6 2.2 1.4 2.8L20 34l4 6 4-6-1.9-13.7c.8-.6 1.4-1.6 1.4-2.8 0-1.9-1.5-3.5-3.5-3.5Z" />
          <path d="M21 22C16 20 9 15 4 9c2 7 6 12 10 15-3 0-5 0-8-1 3 3 7 5 13 5" />
          <path d="M27 22c5-2 12-7 17-13-2 7-6 12-10 15 3 0 5 0 8-1-3 3-7 5-13 5" />
          <path d="M26.3 14.4 29 15.5l-2.6 1" />
        </g>
      )}
      {id === "star" && (
        <path className={styles.line} d="m24 5 5.6 11.8 12.9 1.6-9.5 8.9 2.4 12.8L24 33.8 12.6 40.1 15 27.3 5.5 18.4l12.9-1.6Z" />
      )}
      {id === "bars" && (
        <g className={styles.line}>
          <path d="M11 8h7v28l-3.5 5-3.5-5Z" />
          <path className={styles.blue} d="M20.5 8h7v28L24 41l-3.5-5Z" />
          <path d="M30 8h7v28l-3.5 5-3.5-5Z" />
        </g>
      )}
    </svg>
  );
}

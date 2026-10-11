import styles from "./MonogramCrest.module.css";

/**
 * Placeholder crest for opponents (SITE_BLUEPRINT §4.4): the FC 2015 shield
 * silhouette, simplified, in neutral slate — never gold or blue.
 */
export function MonogramCrest({ initials, size = 72, label }: { initials: string; size?: number; label: string }) {
  return (
    <svg className={styles.crest} width={(size * 80) / 96} height={size} viewBox="0 0 80 96" role="img" aria-label={label}>
      <path className={styles.shield} d="M40 3 L76 13 V48 C76 70 60 86 40 93 C20 86 4 70 4 48 V13 Z" />
      <text className={styles.text} x="40" y="57" textAnchor="middle">
        {initials.toUpperCase()}
      </text>
    </svg>
  );
}

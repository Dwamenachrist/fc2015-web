import styles from "./PageBanner.module.css";

/**
 * Title banner at the top of every inner page (Atlanta City inner-page
 * recipe, DECISIONS.md 11 Oct): kicker, page title, one italic line.
 */
export function PageBanner({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <header className={styles.banner}>
      <span className={`brand-pattern ${styles.pattern}`} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>{kicker}</p>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}

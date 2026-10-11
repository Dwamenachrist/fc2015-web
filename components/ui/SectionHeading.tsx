import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

/**
 * The one heading pattern every section uses (SITE_BLUEPRINT §3, after Man
 * United): kicker, title, optional Fraunces subtitle, optional action on the right.
 */
export function SectionHeading({
  id,
  kicker,
  title,
  subtitle,
  action,
  align = "start",
}: {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <header className={`${styles.heading} ${align === "center" ? styles.center : ""}`}>
      <div className={styles.text}>
        <p className={styles.kicker}>{kicker}</p>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}

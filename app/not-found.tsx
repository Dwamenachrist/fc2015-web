import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

/** Themed 404 (Man United "That's a yellow!" pattern, DECISIONS.md 11 Oct). */
export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <div className={styles.flag} aria-hidden="true">
        <span className={styles.pole} />
        <span className={styles.cloth} />
      </div>
      <div className={styles.text}>
        <p className={styles.code}>404</p>
        <h1 id="nf-title" className={styles.title}>
          Offside!
        </h1>
        <p className={styles.lede}>This page doesn&rsquo;t exist, or it was moved. The linesman has spotted it.</p>
        <div className={styles.actions}>
          <Button href="/">Back to the home page</Button>
          <Link href="/matches" className={styles.link}>
            See the fixtures
          </Link>
        </div>
      </div>
      <Crest height={160} decorative className={styles.crest} />
    </section>
  );
}

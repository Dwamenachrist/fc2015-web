import Image from "next/image";
import type { About } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import heroImage from "@/public/images/hero.jpg";
import trialsImage from "@/public/images/trials.jpg";
import styles from "./ClubColours.module.css";

const BACKDROPS = [heroImage, trialsImage];

/** "Behind the colours" (Atlanta City pattern): swatch cards over club photos. */
export function ClubColours({ colours }: { colours: About["colours"] }) {
  return (
    <section className="section" aria-labelledby="colours-title">
      <div className="container">
        <SectionHeading id="colours-title" kicker="Our identity" title="Behind the colours" />
        <ul role="list" className={styles.grid}>
          {colours.map((c, i) => (
            <li key={c.name} className={styles.card}>
              <Image
                src={BACKDROPS[i % BACKDROPS.length]}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={70}
                className={styles.photo}
              />
              <div className={styles.swatchCard}>
                {/* The swatch colour is content (the club's brand colour), not a design token. */}
                <div className={styles.swatch} style={{ backgroundColor: c.hex }} />
                <p className={styles.name}>{c.name}</p>
                <p className={styles.hex}>{c.hex}</p>
                <p className={styles.meaning}>{c.meaning}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

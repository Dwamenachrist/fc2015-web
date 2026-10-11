import Image from "next/image";
import type { About } from "@/content/schema";
import { Button } from "@/components/ui/Button";
import aboutImage from "@/public/images/about.jpg";
import styles from "./StoryTeaser.module.css";

/** Homepage: short club story with a door to /club (Atlanta City "About the club"). */
export function StoryTeaser({ about }: { about: About }) {
  return (
    <section className={`section ${styles.wrap}`} aria-labelledby="story-title">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.body}>
            <p className={styles.kicker}>Our story</p>
            <h2 id="story-title" className={styles.title}>
              About FC 2015
            </h2>
            <p className={styles.intro}>{about.intro}</p>
            <p className={styles.text}>{about.body[0]}</p>
            <div>
              <Button href="/club" variant="secondary">
                Our story
              </Button>
            </div>
          </div>
          <div className={styles.media}>
            <Image
              src={aboutImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={70}
              placeholder="blur"
              className={styles.photo}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

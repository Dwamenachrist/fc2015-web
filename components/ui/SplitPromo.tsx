import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Button } from "./Button";
import styles from "./SplitPromo.module.css";

/**
 * Photo on one side, short pitch and one button on the other (Atlanta City
 * "Become a Founding Member" block). Used for the homepage Trials ask and
 * the closing call to action on inner pages.
 */
export function SplitPromo({
  image,
  kicker,
  title,
  children,
  cta,
  surface,
}: {
  image: StaticImageData;
  kicker: string;
  title: string;
  children?: ReactNode;
  cta: { href: string; label: string };
  surface?: "gold";
}) {
  return (
    <section className={`section ${styles.wrap}`} data-surface={surface} aria-label={title}>
      <div className="container">
        <div className={styles.card} data-surface="dark">
          <div className={styles.media}>
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={70}
              placeholder="blur"
              className={styles.photo}
            />
          </div>
          <div className={styles.body}>
            <p className={styles.kicker}>{kicker}</p>
            <h2 className={styles.title}>{title}</h2>
            {children}
            <div>
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

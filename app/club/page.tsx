import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/ui/PageBanner";
import { SplitPromo } from "@/components/ui/SplitPromo";
import { CrestExplorer } from "@/components/sections/CrestExplorer/CrestExplorer";
import { ClubColours } from "@/components/sections/ClubColours/ClubColours";
import { Timeline } from "@/components/sections/Timeline/Timeline";
import { about } from "@/content/about";
import aboutImage from "@/public/images/about.jpg";
import trialsImage from "@/public/images/trials.jpg";
import styles from "./club.module.css";

export const metadata: Metadata = {
  title: "Our story",
  description: "How FC 2015 began in Legon in 2015, what our Golden Eagle crest means, and the road to promotion from Division Two.",
  alternates: { canonical: "/club" },
};

export default function ClubPage() {
  return (
    <>
      <PageBanner kicker="The club" title="Our story" subtitle="Built in Legon. Founded on discipline and football excellence." />

      <section className="section" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <div className={styles.text}>
            <h2 id="story-title" className={styles.title}>
              Since 2015
            </h2>
            <p className={styles.intro}>{about.intro}</p>
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className={styles.media}>
            <Image
              src={aboutImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={70}
              placeholder="blur"
              className={styles.photo}
            />
          </div>
        </div>
      </section>

      <CrestExplorer parts={about.crestParts} />
      <ClubColours colours={about.colours} />
      <Timeline items={about.timeline} />

      <SplitPromo
        image={trialsImage}
        kicker="Be part of what comes next"
        title="Join the Eagles"
        cta={{ href: "/trials", label: "Join Open Trials" }}
        surface="gold"
      >
        <p>Open trials for players aged 16 to 23 in Greater Accra.</p>
      </SplitPromo>
    </>
  );
}

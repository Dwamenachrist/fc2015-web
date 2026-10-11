import Image from "next/image";
import type { Trials as TrialsContent } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { trialsEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import trialsImage from "@/public/images/trials.jpg";
import { TrialForm } from "./TrialForm";
import styles from "./Trials.module.css";

/** PRD §5.4 · SITE_BLUEPRINT §3.5. The page's single gold band (DESIGN_TOKENS §6 rule 4). */
export function Trials({ trials, whatsapp, whatsappGroup }: { trials: TrialsContent; whatsapp: string; whatsappGroup: string }) {
  return (
    <section id="trials" className={`section ${styles.trials}`} data-surface="gold" aria-labelledby="trials-title">
      <div className="container">
        <SectionHeading id="trials-title" kicker={`Open trials ${trials.season}`} title="Your shot at Division Two" />

        <div className={styles.layout}>
          <div className={styles.briefing} data-surface="dark">
            <div className={styles.briefMedia}>
              <Image
                src={trialsImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={70}
                placeholder="blur"
                className={styles.photo}
              />
            </div>
            <div className={styles.briefBody}>
              <p className={styles.kicker}>Age groups</p>
              <ul role="list" className={styles.ages}>
                {trials.ageGroups.map((g) => (
                  <li key={g.name} className={styles.age}>
                    <span className={styles.ageName}>{g.name}</span>
                    <span className={styles.ageDetail}>{g.detail}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.eligibility}>{trials.eligibility}</p>

              <dl className={styles.facts}>
                <div>
                  <dt className={styles.kicker}>Dates</dt>
                  <dd>{trials.dates}</dd>
                </div>
                <div>
                  <dt className={styles.kicker}>Venue</dt>
                  <dd>{trials.venue}</dd>
                </div>
                <div>
                  <dt className={styles.kicker}>What to bring</dt>
                  <dd>
                    <ul className={styles.bring}>
                      {trials.bring.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <Button href={whatsappLink(whatsapp, trialsEnquiryMessage)} variant="secondary" icon={<WhatsApp />}>
                Inquire via WhatsApp
              </Button>
            </div>
          </div>

          <div className={styles.formCard} data-surface="dark">
            <TrialForm trialDate={trials.trialDate} whatsappGroup={whatsappGroup} />
          </div>
        </div>
      </div>
    </section>
  );
}

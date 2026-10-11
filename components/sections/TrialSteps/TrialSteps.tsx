import type { Trials } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./TrialSteps.module.css";

/**
 * "How it works" (Atlanta City Founding Membership pattern): show exactly
 * what happens next before asking anyone to sign up.
 */
export function TrialSteps({ trials }: { trials: Trials }) {
  const steps = [
    { title: "Register online", text: "Fill in the short form below. It takes about two minutes. We'll confirm on WhatsApp." },
    { title: "Trial day at Legon", text: `${trials.dates}. Bring your boots, shin guards and ID. Coaches watch every player.` },
    { title: "Selection", text: "Players who impress are invited back for another session with the coaching staff." },
  ];
  return (
    <section className="section" aria-labelledby="steps-title">
      <div className="container">
        <SectionHeading id="steps-title" kicker={`Open trials ${trials.season}`} title="How it works" />
        <ol role="list" className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>
              <p className={styles.label}>Step {i + 1}</p>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

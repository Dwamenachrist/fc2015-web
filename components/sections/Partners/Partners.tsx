import Image from "next/image";
import type { Partner } from "@/content/schema";
import { Button } from "@/components/ui/Button";
import { Download } from "@/components/ui/Icons";
import styles from "./Partners.module.css";

const TIERS: { tier: Partner["tier"]; label: string }[] = [
  { tier: "principal", label: "Principal partners" },
  { tier: "official", label: "Official partners" },
  { tier: "supporter", label: "Supporters" },
];

/** PRD §5.7 · SITE_BLUEPRINT §3.7 (Man United tiers + Atlanta City pattern). */
export function Partners({ partners, principalSlots, deck }: { partners: Partner[]; principalSlots: number; deck?: string }) {
  const principal = partners.filter((p) => p.tier === "principal");
  const openSlots = Math.max(0, principalSlots - principal.length);

  return (
    <section id="partners" className={`section ${styles.partners}`} aria-labelledby="partners-title">
      <div className="container">
        <h2 id="partners-title" className={styles.title}>
          Official partners
        </h2>

        {TIERS.map(({ tier, label }) => {
          const list = partners.filter((p) => p.tier === tier);
          const slots = tier === "principal" ? openSlots : 0;
          if (list.length === 0 && slots === 0) return null;
          return (
            <div key={tier} className={styles.tier}>
              <p className={styles.tierLabel}>{label}</p>
              <ul role="list" className={`${styles.logos} ${styles[tier]}`}>
                {list.map((p) => (
                  <li key={p.name} className={styles.logo}>
                    <a href={p.url ?? "#partners"} {...(p.url ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={p.name}>
                      <Image src={p.logo} alt={p.name} width={200} height={80} className={styles.logoImg} />
                    </a>
                  </li>
                ))}
                {Array.from({ length: slots }, (_, i) => (
                  <li key={`slot-${i}`}>
                    <a href="#partner-pitch" className={styles.slot}>
                      <span className={styles.slotTier}>Principal partner</span>
                      <span className={styles.slotState}>Available</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div id="partner-pitch" className={styles.pitch}>
          <span className={`brand-pattern ${styles.pattern}`} aria-hidden="true" />
          <div className={styles.pitchText}>
            <p className={styles.kicker}>Partner with FC 2015</p>
            <h3 className={styles.pitchTitle}>Align your business with Greater Accra&rsquo;s fastest rising Division Two football club.</h3>
          </div>
          <div className={styles.pitchActions}>
            {deck && (
              <Button href={deck} variant="secondary" icon={<Download />} download>
                Download partnership deck (PDF)
              </Button>
            )}
            {/* Hash link (no reload): the contact form pre-selects "Sponsorship". */}
            <Button href="/contact#contact-sponsorship">Inquire</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

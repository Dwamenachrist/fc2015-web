import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/content/schema";
import { ArrowRight } from "@/components/ui/Icons";
import styles from "./PartnersStrip.module.css";

/** Homepage partners strip, just above the footer (Man United pattern). */
export function PartnersStrip({ partners, slots }: { partners: Partner[]; slots: number }) {
  const principal = partners.filter((p) => p.tier === "principal");
  const open = Math.max(0, slots - principal.length);
  return (
    <section className={styles.strip} aria-label="Official partners">
      <div className="container">
        <p className={styles.label}>Official partners</p>
        <ul role="list" className={styles.row}>
          {principal.map((p) => (
            <li key={p.name} className={styles.logo}>
              <Image src={p.logo} alt={p.name} width={160} height={64} />
            </li>
          ))}
          {Array.from({ length: open }, (_, i) => (
            <li key={i}>
              <Link href="/partners" className={styles.slot}>
                <span className={styles.slotTitle}>Principal partner</span>
                <span className={styles.slotState}>Available</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/partners" className={styles.more}>
          Partner with FC 2015 <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

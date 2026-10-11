import type { Kit } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { KitRender } from "@/components/ui/KitRender";
import { WhatsApp } from "@/components/ui/Icons";
import { kitPreorderMessage, whatsappLink } from "@/lib/whatsapp";
import styles from "./Kits.module.css";

const ghs = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", maximumFractionDigits: 0 });

/** PRD §5.6 · SITE_BLUEPRINT §3.6 (Man United tall cards + Arsenal product card). */
export function Kits({ kits, whatsapp, showHeading = true }: { kits: Kit[]; whatsapp: string; showHeading?: boolean }) {
  return (
    <section
      id="kits"
      className="section"
      data-surface="blue"
      {...(showHeading ? { "aria-labelledby": "kits-title" } : { "aria-label": "Kits" })}
    >
      <div className="container">
        {showHeading && (
          <SectionHeading id="kits-title" kicker="Official 2015 Matchwear" title="The Kits" subtitle="Pre-order for available sizes." />
        )}

        <ul role="list" className={styles.list}>
          {kits.map((kit) => (
            <li key={kit.id} className={styles.card}>
              <header className={styles.head}>
                <span className={styles.label}>{kit.label}</span>
                <h3 className={styles.name}>{kit.name}</h3>
              </header>
              <div className={styles.stage}>
                <KitRender
                  id={`kit-${kit.id}`}
                  body={kit.bodyColor}
                  trim={kit.trimColor}
                  label={`FC 2015 ${kit.label.toLowerCase()} kit, ${kit.name.toLowerCase()}`}
                />
              </div>
              <div className={styles.body}>
                <p className={styles.description}>{kit.description}</p>
                <p className={styles.sizes}>
                  <span className={styles.meta}>Sizes</span> {kit.sizes.join(" · ")}
                </p>
                <p className={styles.price}>{kit.priceGHS ? ghs.format(kit.priceGHS) : "Price on enquiry"}</p>
                <Button href={whatsappLink(whatsapp, kitPreorderMessage(kit.label))} full icon={<WhatsApp />}>
                  Pre-order via WhatsApp
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

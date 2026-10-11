import type { Club } from "@/content/schema";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MapPin, WhatsApp } from "@/components/ui/Icons";
import { hasSocials, SocialLinks } from "@/components/ui/SocialLinks";
import { whatsappLink } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

const formatPhone = (n: string) => `+${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 8)} ${n.slice(8)}`;

/** PRD §5.8 · SITE_BLUEPRINT §3.8. */
export function Contact({ club, showHeading = true }: { club: Club; showHeading?: boolean }) {
  return (
    <section
      id="contact"
      className="section"
      {...(showHeading ? { "aria-labelledby": "contact-title" } : { "aria-label": "Contact the club" })}
    >
      {/* Targets for links that pre-select a subject (see ContactForm). */}
      <span id="contact-sponsorship" className={styles.anchor} aria-hidden="true" />
      <span id="contact-trials" className={styles.anchor} aria-hidden="true" />
      <div className="container">
        {showHeading && <SectionHeading id="contact-title" kicker="Get in touch" title="Contact the club" />}

        <div className={styles.layout}>
          <div className={styles.details}>
            <dl className={styles.list}>
              <div className={styles.item}>
                <dt>
                  <Mail aria-hidden="true" /> Email
                </dt>
                <dd>
                  <a href={`mailto:${club.email}`}>{club.email}</a>
                </dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <WhatsApp aria-hidden="true" /> WhatsApp
                </dt>
                <dd>
                  <a href={whatsappLink(club.whatsapp)} target="_blank" rel="noopener noreferrer">
                    {formatPhone(club.whatsapp)}
                  </a>
                </dd>
              </div>
              <div className={styles.item}>
                <dt>
                  <MapPin aria-hidden="true" /> Location
                </dt>
                <dd>
                  <a href={club.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {club.address}
                  </a>
                </dd>
              </div>
            </dl>

            {hasSocials(club.socials) && (
              <>
                <p className={styles.followLabel}>Follow us</p>
                <SocialLinks socials={club.socials} />
              </>
            )}
          </div>

          <div className={styles.formCard}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

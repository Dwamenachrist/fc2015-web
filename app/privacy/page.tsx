import type { Metadata } from "next";
import Link from "next/link";
import { club } from "@/content/club";
import { TBD } from "@/content/markers";
import { nonEssentialScripts } from "@/content/site";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy & cookies | FC 2015",
  description: "How FC 2015 handles the personal data you send us through this website.",
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy and cookie notice (TDD §10, Ghana Data Protection Act 2012, Act 843).
 * Plain-language draft: the club must review it before launch.
 */
export default function PrivacyPage() {
  const retention = TBD("data retention period (client to confirm)", "12 months");
  return (
    <article className={`container section ${styles.page}`}>
      <p className={styles.kicker}>Legal</p>
      <h1 className={styles.title}>Privacy &amp; cookies</h1>
      <p className={styles.updated}>Last updated: {TBD("privacy notice date", "October 2026")}</p>

      <h2>Who we are</h2>
      <p>
        FC 2015 is a Division Two football club based in Legon, Accra. We are responsible for the personal data you send us through this
        website. Contact us at <a href={`mailto:${club.email}`}>{club.email}</a>.
      </p>

      <h2>What we collect and why</h2>
      <ul>
        <li>
          <strong>Open trials form:</strong> your name, date of birth, playing position, dominant foot, previous club, phone or WhatsApp
          number and location, so we can assess your application and contact you about trials. For players under 18 we also collect a parent
          or guardian&rsquo;s name and phone number, so we can involve them.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email or phone number, subject and message, so we can reply to you.
        </li>
      </ul>
      <p>We only use these details for the purpose you sent them. We never sell them or share them with advertisers.</p>

      <h2>Where it is stored and for how long</h2>
      <p>
        Submissions are emailed to the club administrator and recorded in a spreadsheet that only named club staff can open. We keep them
        for {retention}, then delete them. You can ask us to see, correct or delete your data at any time by emailing{" "}
        <a href={`mailto:${club.email}`}>{club.email}</a>.
      </p>

      <h2>Spam protection</h2>
      <p>
        Our forms use Cloudflare Turnstile to check that submissions come from people, not bots. Turnstile does not use cookies for
        advertising.
      </p>

      <h2 id="cookies">Cookies</h2>
      {nonEssentialScripts.length === 0 ? (
        <p>
          This website does not set any tracking or advertising cookies. We measure visits with Vercel Web Analytics, which counts page
          views without cookies and without identifying you, so there is nothing to accept or reject.
        </p>
      ) : (
        <p>
          With your permission, we use {nonEssentialScripts.map((s) => `${s.name} (${s.purpose})`).join(", ")}, which set cookies. They only
          load if you choose &ldquo;Accept&rdquo; in the cookie banner, and you can change your choice at any time using &ldquo;Cookie
          settings&rdquo; in the footer.
        </p>
      )}

      <p className={styles.back}>
        <Link href="/">← Back to the FC 2015 home page</Link>
      </p>
    </article>
  );
}

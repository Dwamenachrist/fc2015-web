import type { Club } from "@/content/schema";
import { Facebook, Instagram, TikTok, WhatsApp, XLogo, YouTube } from "./Icons";
import styles from "./SocialLinks.module.css";

const NETWORKS = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "tiktok", label: "TikTok", Icon: TikTok },
  { key: "x", label: "X", Icon: XLogo },
  { key: "youtube", label: "YouTube", Icon: YouTube },
  { key: "whatsappChannel", label: "WhatsApp channel", Icon: WhatsApp },
] as const;

/** Renders an icon only for accounts the club actually gave us (content/club.ts). */
export function SocialLinks({ socials, size = "md" }: { socials: Club["socials"]; size?: "sm" | "md" }) {
  const links = NETWORKS.filter((n) => socials[n.key]);
  if (links.length === 0) return null;
  return (
    <ul role="list" className={`${styles.list} ${styles[size]}`}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={socials[key]} target="_blank" rel="noopener noreferrer" aria-label={`FC 2015 on ${label}`}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export const hasSocials = (socials: Club["socials"]) => NETWORKS.some((n) => socials[n.key]);

import "server-only";
import { Resend } from "resend";
import { env } from "./env";

/**
 * Sends the admin alert as plain text. Plain text means user input can never
 * inject HTML into the club's inbox (TDD §10).
 */
export async function sendAdminEmail(subject: string, fields: Record<string, string>): Promise<boolean> {
  const text = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");

  if (env.dryRun) {
    console.info(`[email:dry-run] ${subject}\n${text}`);
    return true;
  }
  if (!env.resendKey || !env.mailFrom || !env.adminEmail) {
    if (env.isProd) {
      console.error("[email] RESEND_API_KEY / MAIL_FROM / CLUB_ADMIN_EMAIL missing");
      return false;
    }
    console.info(`[email:dev] ${subject}\n${text}`);
    return true;
  }

  try {
    const resend = new Resend(env.resendKey);
    const { error } = await resend.emails.send({ from: env.mailFrom, to: env.adminEmail, subject, text });
    if (error) {
      console.error("[email] Resend error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send failed", err);
    return false;
  }
}

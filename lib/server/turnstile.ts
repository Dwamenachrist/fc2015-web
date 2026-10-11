import "server-only";
import { env } from "./env";

/** Verifies a Turnstile token server-side (TDD §6.4 step 3). */
export async function verifyTurnstile(token: string | null, ip?: string | null): Promise<boolean> {
  if (!env.turnstileSecret) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret: env.turnstileSecret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification request failed", err);
    return false;
  }
}

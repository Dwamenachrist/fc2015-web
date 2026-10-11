import "server-only";
import { headers } from "next/headers";
import { verifyTurnstile } from "./turnstile";

export const MIN_FILL_MS = 3_000;

/**
 * Cheap bot checks, run before anything else (TDD §6.4 steps 1–2):
 * honeypot field, then minimum fill time.
 */
export function botCheck(formData: FormData): "ok" | "bot-silent" | "too-fast" {
  // Real people never see or fill the honeypot. Pretend success.
  if (String(formData.get("company_website") ?? "").length > 0) return "bot-silent";
  const startedAt = Number(formData.get("started_at"));
  if (!Number.isFinite(startedAt) || startedAt <= 0 || Date.now() - startedAt < MIN_FILL_MS) return "too-fast";
  return "ok";
}

/**
 * Turnstile (TDD §6.4 step 3). Runs after field validation so people always
 * see their own mistakes first; a token is only spent on a send attempt.
 */
export async function humanCheck(formData: FormData): Promise<boolean> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  return verifyTurnstile(formData.get("cf-turnstile-response") as string | null, ip);
}

export const MESSAGES = {
  tooFast: "That was quick! Please check your details and submit again.",
  notHuman: "We couldn't confirm you're human. Please wait a moment and try again.",
} as const;

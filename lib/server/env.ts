import "server-only";

const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

// Cloudflare's documented test keys: always pass. Used only outside production
// so local development and CI work without real credentials.
export const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

export const env = {
  isProd,
  // E2E tests: log submissions instead of sending them. Never honoured on Vercel production.
  dryRun: process.env.FORMS_DRY_RUN === "1" && process.env.VERCEL_ENV !== "production",
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY ?? (isProd ? undefined : TURNSTILE_TEST_SECRET),
  resendKey: process.env.RESEND_API_KEY,
  mailFrom: process.env.MAIL_FROM,
  adminEmail: process.env.CLUB_ADMIN_EMAIL,
  sheetsId: process.env.SHEETS_SPREADSHEET_ID,
  googleEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  googleKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

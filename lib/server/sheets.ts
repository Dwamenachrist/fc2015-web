import "server-only";
import { JWT } from "google-auth-library";
import { env } from "./env";

/** Appends one row to a tab of the club's lead spreadsheet (TDD §1, lead storage). */
export async function appendRow(tab: "Trials" | "Contact", row: string[]): Promise<boolean> {
  if (env.dryRun) {
    console.info(`[sheets:dry-run] ${tab}: ${row.join(" | ")}`);
    return true;
  }
  if (!env.sheetsId || !env.googleEmail || !env.googleKey) {
    if (env.isProd) {
      console.error("[sheets] SHEETS_SPREADSHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY missing");
      return false;
    }
    console.info(`[sheets:dev] ${tab}: ${row.join(" | ")}`);
    return true;
  }

  try {
    const auth = new JWT({
      email: env.googleEmail,
      key: env.googleKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const { token } = await auth.getAccessToken();
    const range = encodeURIComponent(`${tab}!A1`);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${env.sheetsId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        // Prefix with ' so spreadsheet apps never evaluate user input as a formula.
        body: JSON.stringify({ values: [row.map((v) => (/^[=+\-@]/.test(v) ? `'${v}` : v))] }),
      },
    );
    if (!res.ok) {
      console.error("[sheets] append failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sheets] append failed", err);
    return false;
  }
}

/**
 * Daily rebuild (TDD §8). The page is static, so "next match" and the
 * countdown target are fixed at build time. Vercel Cron calls this route once
 * a day (vercel.json); it triggers a fresh deployment through a Deploy Hook.
 *
 * Env: CRON_SECRET (Vercel sends it as a Bearer token), DEPLOY_HOOK_URL.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return new Response("DEPLOY_HOOK_URL is not set", { status: 500 });

  const res = await fetch(hook, { method: "POST" });
  return new Response(res.ok ? "Rebuild triggered" : `Deploy hook failed (${res.status})`, { status: res.ok ? 200 : 502 });
}

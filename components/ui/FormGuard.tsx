"use client";

import { useEffect, useRef } from "react";

// Cloudflare's documented always-pass test site key, for local dev and CI only.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? (process.env.NODE_ENV === "production" ? "" : TEST_SITE_KEY);
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const VERIFY_FALLBACK_MS = 12_000;

interface TurnstileApi {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// One script for the whole page, shared by every form. (Two next/script tags
// with the same src are de-duplicated, and only the first one reports ready,
// which left the second form without a widget.)
let loader: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile did not initialise")));
    script.onerror = () => {
      loader = null; // allow a retry on the next mount
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

/**
 * Records when the visitor first saw the form. The form adds it to the
 * submission (see withStartTime) so the server can reject instant bot posts.
 * Kept out of the DOM because React resets form fields after each action.
 */
export function useFormStart() {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  return startedAt;
}

export function withStartTime(startedAt: { current: number }, action: (fd: FormData) => void) {
  return (fd: FormData) => {
    fd.set("started_at", String(startedAt.current));
    action(fd);
  };
}

/**
 * Hidden spam controls rendered inside every form (TDD §6.4): a honeypot
 * field and Turnstile in "interaction-only" mode (invisible unless
 * Cloudflare needs a click). Reports readiness through onVerifiedChange so
 * the form can hold its submit button until a token exists. Tokens are
 * single-use, so the widget is reset whenever `resetKey` changes.
 */
export function FormGuard({ resetKey, onVerifiedChange }: { resetKey: unknown; onVerifiedChange: (verified: boolean) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Render the widget once the shared script is ready.
  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || widgetId.current || !container.current) return;
        widgetId.current = api.render(container.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          appearance: "interaction-only",
          callback: () => onVerifiedChange(true),
          "expired-callback": () => onVerifiedChange(false),
          "error-callback": () => onVerifiedChange(true), // let the server explain instead of a dead button
        });
      })
      .catch(() => onVerifiedChange(true));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [onVerifiedChange]);

  // Nothing to wait for without a site key. If Cloudflare is slow or blocked,
  // unlock the button after a while; the server then explains what went wrong.
  useEffect(() => {
    if (!SITE_KEY) {
      onVerifiedChange(true);
      return;
    }
    onVerifiedChange(false);
    const t = window.setTimeout(() => onVerifiedChange(true), VERIFY_FALLBACK_MS);
    return () => window.clearTimeout(t);
  }, [resetKey, onVerifiedChange]);

  // A submitted token is spent: get a fresh one.
  useEffect(() => {
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetKey]);

  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {SITE_KEY && <div ref={container} />}
    </>
  );
}

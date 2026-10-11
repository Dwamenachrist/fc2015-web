"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import type { ConsentScript } from "@/content/site";
import { Button } from "@/components/ui/Button";
import styles from "./ConsentBanner.module.css";

const KEY = "fc2015-consent";
type Choice = "accepted" | "rejected";

const CHANGE = "fc2015-consent-change";
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Cookie consent in Man United's bottom-panel style, with Accept and Reject
 * given equal weight. Only mounted when content/site.ts lists scripts that
 * set cookies; those scripts load only after "Accept".
 * Reopened by any element with [data-cookie-settings].
 */
export function ConsentBanner({ scripts }: { scripts: ConsentScript[] }) {
  // "pending" on the server so nothing renders until the browser has checked storage.
  const stored = useSyncExternalStore(subscribe, readChoice, () => "pending" as const);
  const [sessionChoice, setSessionChoice] = useState<Choice | null>(null);
  const [reopened, setReopened] = useState(false);
  const choice = sessionChoice ?? (stored === "pending" ? null : stored);
  const open = reopened || (stored !== "pending" && choice === null);

  useEffect(() => {
    const reopen = (e: Event) => {
      if ((e.target as HTMLElement).closest("[data-cookie-settings]")) {
        e.preventDefault();
        setReopened(true);
      }
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, []);

  const decide = (c: Choice) => {
    try {
      window.localStorage.setItem(KEY, c);
      window.dispatchEvent(new Event(CHANGE));
    } catch {
      /* storage blocked: the choice applies for this visit only */
    }
    setSessionChoice(c);
    setReopened(false);
  };

  return (
    <>
      {choice === "accepted" && scripts.map((s) => <Script key={s.id} id={s.id} src={s.src} strategy="afterInteractive" />)}
      {open && (
        <div className={styles.banner} role="dialog" aria-modal="false" aria-labelledby="consent-title" data-surface="dark">
          <h2 id="consent-title" className={styles.title}>
            About cookies
          </h2>
          <p className={styles.text}>
            We&rsquo;d like to use {scripts.map((s) => s.name).join(", ")} to {scripts.map((s) => s.purpose).join(" and ")}. These set
            cookies on your device. Nothing loads unless you accept. Read our{" "}
            <a href="/privacy#cookies" className={styles.link}>
              cookie notice
            </a>
            .
          </p>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={() => decide("rejected")}>
              Reject
            </Button>
            <Button onClick={() => decide("accepted")}>Accept</Button>
          </div>
        </div>
      )}
    </>
  );
}

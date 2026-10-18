"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/theme";
import { Moon, Sun } from "@/components/ui/Icons";
import styles from "./ThemeToggle.module.css";

// The theme lives on <html data-theme>, set before paint by THEME_INIT_SCRIPT.
// Watching that attribute keeps every toggle on the page in sync.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const serverTheme = (): Theme => "dark";

/** Sun / moon button that switches the site between the dark and light themes. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className ?? ""}`}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={() => applyTheme(next)}
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}

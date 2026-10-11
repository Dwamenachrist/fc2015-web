"use client";

import { useEffect, useRef } from "react";
import type { FieldErrors } from "@/lib/forms";
import { fieldInputId } from "./Field";
import styles from "./FormFeedback.module.css";

/**
 * Error summary at the top of a form (TDD §6.4): announced to screen readers,
 * focused after a failed submit, each item links to its field.
 */
export function ErrorSummary({
  message,
  fieldErrors,
  labels,
}: {
  message: string;
  fieldErrors: FieldErrors;
  labels: Record<string, string>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [message, fieldErrors]);

  const entries = Object.entries(fieldErrors).filter(([k]) => labels[k]);
  return (
    <div ref={ref} className={styles.summary} role="alert" tabIndex={-1}>
      <p className={styles.summaryTitle}>{message}</p>
      {entries.length > 0 && (
        <ul className={styles.list}>
          {entries.map(([k, v]) => (
            <li key={k}>
              <a href={`#${fieldInputId(k)}`}>
                {labels[k]}: {v}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./Field.module.css";

interface Base {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

const ids = (name: string) => ({ input: `f-${name}`, error: `f-${name}-error`, hint: `f-${name}-hint` });

function Label({ name, label, required }: Pick<Base, "name" | "label" | "required">) {
  return (
    <label className={styles.label} htmlFor={ids(name).input}>
      {label}
      {required ? <span aria-hidden="true"> *</span> : <span className={styles.optional}> (optional)</span>}
    </label>
  );
}

function Meta({ name, error, hint }: Pick<Base, "name" | "error" | "hint">) {
  return (
    <>
      {hint && !error && (
        <p className={styles.hint} id={ids(name).hint}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.error} id={ids(name).error}>
          {error}
        </p>
      )}
    </>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  [error && ids(name).error, hint && !error && ids(name).hint].filter(Boolean).join(" ") || undefined;

export function TextField({
  name,
  label,
  error,
  hint,
  required,
  className,
  type = "text",
  defaultValue,
  autoComplete,
  inputMode,
  max,
  placeholder,
}: Base & {
  type?: "text" | "email" | "tel" | "date";
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  max?: string;
  placeholder?: string;
}) {
  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <Label name={name} label={label} required={required} />
      <input
        className={styles.input}
        id={ids(name).input}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        max={max}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
      />
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  error,
  hint,
  required,
  className,
  defaultValue,
  rows = 5,
}: Base & { defaultValue?: string; rows?: number }) {
  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <Label name={name} label={label} required={required} />
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        id={ids(name).input}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
      />
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  error,
  hint,
  required,
  className,
  options,
  defaultValue,
}: Base & { options: { value: string; label: string }[]; defaultValue?: string }) {
  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <Label name={name} label={label} required={required} />
      <div className={styles.selectWrap}>
        <select
          className={`${styles.input} ${styles.select}`}
          id={ids(name).input}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, error, hint)}
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <Meta name={name} error={error} hint={hint} />
    </div>
  );
}

export function RadioGroup({
  name,
  label,
  error,
  required,
  className,
  options,
  defaultValue,
}: Base & { options: string[]; defaultValue?: string }) {
  return (
    <fieldset
      className={`${styles.field} ${styles.fieldset} ${className ?? ""}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? ids(name).error : undefined}
    >
      <legend className={styles.label} id={ids(name).input}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </legend>
      <div className={styles.radios}>
        {options.map((o) => (
          <label key={o} className={styles.radio}>
            <input type="radio" name={name} value={o} required={required} defaultChecked={defaultValue === o} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <Meta name={name} error={error} />
    </fieldset>
  );
}

export function CheckboxField({
  name,
  error,
  required,
  children,
  defaultChecked,
}: Omit<Base, "label"> & { children: ReactNode; defaultChecked?: boolean }) {
  return (
    <div className={styles.field}>
      <label className={styles.checkbox} htmlFor={ids(name).input}>
        <input
          type="checkbox"
          id={ids(name).input}
          name={name}
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? ids(name).error : undefined}
        />
        <span>{children}</span>
      </label>
      <Meta name={name} error={error} />
    </div>
  );
}

export const fieldInputId = (name: string) => ids(name).input;

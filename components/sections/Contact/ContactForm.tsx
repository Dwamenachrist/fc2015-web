"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/submit-contact";
import { initialFormState } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { RadioGroup, TextArea, TextField } from "@/components/ui/Field";
import { FormGuard, useFormStart, withStartTime } from "@/components/ui/FormGuard";
import { ErrorSummary } from "@/components/ui/FormFeedback";
import { Check } from "@/components/ui/Icons";
import styles from "./Contact.module.css";

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  subject: "Subject",
  message: "Message",
};

const SUBJECTS = ["Sponsorship", "Trials", "General"];
// Links elsewhere on the page target #contact-sponsorship / #contact-trials.
const subjectFromHash = (hash: string) => SUBJECTS.find((s) => hash === `#contact-${s.toLowerCase()}`);

export function ContactForm() {
  const startedAt = useFormStart();
  const [verified, setVerified] = useState(false);
  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const [presetSubject, setPresetSubject] = useState<string | undefined>();
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const apply = () => {
      const s = subjectFromHash(window.location.hash);
      if (s) setPresetSubject(s);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (state.status === "success") successHeading.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon} aria-hidden="true">
          <Check />
        </span>
        <h3 ref={successHeading} tabIndex={-1} className={styles.formTitle}>
          Message sent
        </h3>
        <p className={styles.muted}>Thank you. Someone from the club will get back to you soon.</p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : {};
  const errors = state.status === "error" ? state.fieldErrors : {};
  const subject = values.subject || presetSubject;

  return (
    <form
      key={`${JSON.stringify(values)}-${presetSubject}`}
      action={withStartTime(startedAt, action)}
      className={styles.form}
      noValidate
      aria-labelledby="contact-form-title"
    >
      <h3 id="contact-form-title" className={styles.formTitle}>
        Send a message
      </h3>
      {state.status === "error" && <ErrorSummary message={state.message} fieldErrors={errors} labels={LABELS} />}

      <TextField name="name" label="Name" required autoComplete="name" defaultValue={values.name} error={errors.name} />
      <div className={styles.row}>
        <TextField
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
          hint="Email or phone — at least one"
        />
        <TextField
          name="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={values.phone}
          error={errors.phone}
        />
      </div>
      <RadioGroup name="subject" label="Subject" required options={SUBJECTS} defaultValue={subject} error={errors.subject} />
      <TextArea name="message" label="Message" required defaultValue={values.message} error={errors.message} />

      <FormGuard resetKey={state} onVerifiedChange={setVerified} />

      <Button type="submit" disabled={pending || !verified}>
        {pending ? "Sending…" : verified ? "Send message" : "Checking you're human…"}
      </Button>
    </form>
  );
}

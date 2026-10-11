"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitTrial } from "@/app/actions/submit-trial";
import { ageOn, GUARDIAN_AGE, initialFormState } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { CheckboxField, RadioGroup, SelectField, TextField } from "@/components/ui/Field";
import { FormGuard, useFormStart, withStartTime } from "@/components/ui/FormGuard";
import { ErrorSummary } from "@/components/ui/FormFeedback";
import { Check, WhatsApp } from "@/components/ui/Icons";
import styles from "./Trials.module.css";

const LABELS: Record<string, string> = {
  fullName: "Full name",
  dateOfBirth: "Date of birth",
  position: "Playing position",
  foot: "Dominant foot",
  previousClub: "Previous club",
  phone: "WhatsApp / phone",
  location: "Current location",
  guardianName: "Parent / guardian name",
  guardianPhone: "Parent / guardian phone",
  consent: "Consent",
};

export function TrialForm({ trialDate, whatsappGroup }: { trialDate: string; whatsappGroup: string }) {
  const startedAt = useFormStart();
  const [verified, setVerified] = useState(false);
  const [state, action, pending] = useActionState(submitTrial, initialFormState);
  const [dob, setDob] = useState("");
  const successHeading = useRef<HTMLHeadingElement>(null);

  const values = state.status === "error" ? state.values : {};
  const errors = state.status === "error" ? state.fieldErrors : {};
  const dobValue = dob || values.dateOfBirth || "";
  const isMinor = /^\d{4}-\d{2}-\d{2}$/.test(dobValue) && ageOn(dobValue, trialDate) < GUARDIAN_AGE;

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
          Application received
        </h3>
        <p className={styles.formIntro}>
          Thank you. The club will contact you on WhatsApp with your trial details. Join the trials group for updates.
        </p>
        {Object.keys(state.summary).length > 0 && (
          <dl className={styles.summary}>
            {Object.entries(state.summary).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <Button href={whatsappGroup} full icon={<WhatsApp />}>
          Join the trials WhatsApp group
        </Button>
      </div>
    );
  }

  return (
    // Keyed on the returned values: React resets a form after its action runs,
    // so remounting is what reliably restores the user's input after an error.
    <form
      key={JSON.stringify(values)}
      action={withStartTime(startedAt, action)}
      className={styles.form}
      noValidate
      aria-labelledby="trial-form-title"
    >
      <div>
        <h3 id="trial-form-title" className={styles.formTitle}>
          Register for trials
        </h3>
        <p className={styles.formIntro}>Takes about 2 minutes. Fields marked * are required.</p>
      </div>

      {state.status === "error" && <ErrorSummary message={state.message} fieldErrors={errors} labels={LABELS} />}

      <TextField name="fullName" label="Full name" required autoComplete="name" defaultValue={values.fullName} error={errors.fullName} />
      <div className={styles.row}>
        <div className={styles.dobField} onChange={(e) => setDob((e.target as HTMLInputElement).value)}>
          <TextField
            name="dateOfBirth"
            label="Date of birth"
            type="date"
            required
            autoComplete="bday"
            defaultValue={values.dateOfBirth}
            error={errors.dateOfBirth}
          />
        </div>
        <SelectField
          name="position"
          label="Playing position"
          required
          defaultValue={values.position}
          error={errors.position}
          options={[
            { value: "GK", label: "Goalkeeper" },
            { value: "DF", label: "Defender" },
            { value: "MF", label: "Midfielder" },
            { value: "FW", label: "Forward" },
          ]}
        />
      </div>
      <RadioGroup
        name="foot"
        label="Dominant foot"
        required
        options={["Left", "Right", "Both"]}
        defaultValue={values.foot}
        error={errors.foot}
      />
      <TextField name="previousClub" label="Previous club or academy" defaultValue={values.previousClub} error={errors.previousClub} />
      <div className={styles.row}>
        <TextField
          name="phone"
          label="WhatsApp / phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="024 123 4567"
          defaultValue={values.phone}
          error={errors.phone}
        />
        <TextField
          name="location"
          label="Current location"
          required
          autoComplete="address-level2"
          placeholder="e.g. Madina"
          defaultValue={values.location}
          error={errors.location}
        />
      </div>

      {isMinor && (
        <fieldset className={styles.guardian}>
          <legend className={styles.guardianLegend}>Under 18? We need a parent or guardian.</legend>
          <div className={styles.row}>
            <TextField
              name="guardianName"
              label="Parent / guardian name"
              required
              defaultValue={values.guardianName}
              error={errors.guardianName}
            />
            <TextField
              name="guardianPhone"
              label="Parent / guardian phone"
              type="tel"
              inputMode="tel"
              required
              defaultValue={values.guardianPhone}
              error={errors.guardianPhone}
            />
          </div>
        </fieldset>
      )}

      <CheckboxField name="consent" required error={errors.consent} defaultChecked={values.consent === "on"}>
        I agree that FC 2015 may store these details and contact me about trials. See the{" "}
        <a href="/privacy" className={styles.inlineLink}>
          privacy notice
        </a>
        .
      </CheckboxField>

      <FormGuard resetKey={state} onVerifiedChange={setVerified} />

      <Button type="submit" full disabled={pending || !verified}>
        {pending ? "Sending…" : verified ? "Submit application" : "Checking you're human…"}
      </Button>
    </form>
  );
}

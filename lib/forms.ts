import { z } from "zod";

/**
 * Shared form schemas (TDD §6.4, §6.8). Used by the client components for
 * field attributes and by the Server Actions for the real validation.
 */

/** Ghana numbers: 0XXXXXXXXX, +233XXXXXXXXX or 233XXXXXXXXX where the first
 *  digit after the prefix is 2, 3 or 5. Returns 233XXXXXXXXX or null. */
export function normalizeGhanaPhone(input: string): string | null {
  const compact = input.replace(/[\s\-().]/g, "");
  const m = compact.match(/^(?:\+?233|0)([235]\d{8})$/);
  return m ? `233${m[1]}` : null;
}

/** Whole years between dateOfBirth and onDate (both ISO dates). */
export function ageOn(dateOfBirthISO: string, onDateISO: string): number {
  const dob = new Date(`${dateOfBirthISO}T00:00:00Z`);
  const on = new Date(`${onDateISO}T00:00:00Z`);
  let age = on.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    on.getUTCMonth() < dob.getUTCMonth() || (on.getUTCMonth() === dob.getUTCMonth() && on.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export function ageGroupFor(age: number): "U-17" | "U-19" | "Senior" {
  if (age < 17) return "U-17";
  if (age < 19) return "U-19";
  return "Senior";
}

export const MIN_TRIAL_AGE = 16;
export const MAX_TRIAL_AGE = 23;
export const GUARDIAN_AGE = 18;

const ghanaPhone = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { error: `Enter your ${label}` })
    .transform((v, ctx) => {
      const n = normalizeGhanaPhone(v);
      if (!n) {
        ctx.addIssue({ code: "custom", message: "Enter a Ghana number, e.g. 024 123 4567 or +233 24 123 4567" });
        return z.NEVER;
      }
      return n;
    });

const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

export function trialSchema(trialDateISO: string) {
  return z
    .object({
      fullName: z.string().trim().min(2, { error: "Enter your full name" }).max(80, { error: "Name is too long" }),
      dateOfBirth: z.iso.date({ error: "Enter your date of birth" }),
      position: z.enum(["GK", "DF", "MF", "FW"], { error: "Choose your playing position" }),
      foot: z.enum(["Left", "Right", "Both"], { error: "Choose your dominant foot" }),
      previousClub: z.string().trim().max(80).optional().default(""),
      phone: ghanaPhone("WhatsApp or phone number"),
      location: z.string().trim().min(2, { error: "Enter where you live" }).max(80),
      guardianName: z.string().trim().max(80).optional().default(""),
      guardianPhone: z.string().trim().optional().default(""),
      consent: checkbox.refine((v) => v, { error: "You must agree before we can contact you" }),
    })
    .superRefine((d, ctx) => {
      const age = ageOn(d.dateOfBirth, trialDateISO);
      if (age < MIN_TRIAL_AGE || age > MAX_TRIAL_AGE) {
        ctx.addIssue({
          code: "custom",
          path: ["dateOfBirth"],
          message: `Trials are open to players aged ${MIN_TRIAL_AGE} to ${MAX_TRIAL_AGE}`,
        });
        return;
      }
      if (age < GUARDIAN_AGE) {
        if (d.guardianName.length < 2) {
          ctx.addIssue({ code: "custom", path: ["guardianName"], message: "Players under 18 need a parent or guardian's name" });
        }
        if (!normalizeGhanaPhone(d.guardianPhone)) {
          ctx.addIssue({ code: "custom", path: ["guardianPhone"], message: "Enter a parent or guardian's Ghana phone number" });
        }
      }
    })
    .transform((d) => {
      const age = ageOn(d.dateOfBirth, trialDateISO);
      return {
        ...d,
        guardianPhone: d.guardianPhone ? (normalizeGhanaPhone(d.guardianPhone) ?? "") : "",
        age,
        ageGroup: ageGroupFor(age),
      };
    });
}

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, { error: "Enter your name" }).max(80),
    email: z.union([z.literal(""), z.email({ error: "Enter a valid email address" })]).default(""),
    phone: z.string().trim().optional().default(""),
    subject: z.enum(["Sponsorship", "Trials", "General"], { error: "Choose a subject" }),
    message: z
      .string()
      .trim()
      .min(10, { error: "Message must be at least 10 characters" })
      .max(2000, { error: "Message is too long (2,000 characters max)" }),
  })
  .superRefine((d, ctx) => {
    if (!d.email && !d.phone) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Give us an email address or a phone number" });
    }
    if (d.phone && !normalizeGhanaPhone(d.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Enter a Ghana number, e.g. 024 123 4567" });
    }
  });

export type FieldErrors = Record<string, string>;

export type FormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors: FieldErrors; values: Record<string, string> }
  | { status: "success"; summary: Record<string, string> };

export const initialFormState: FormState = { status: "idle" };

/** First error message per field, for inline display. */
export function firstErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

"use server";

import { trials } from "@/content/trials";
import { firstErrors, trialSchema, type FormState } from "@/lib/forms";
import { botCheck, humanCheck, MESSAGES } from "@/lib/server/guard";
import { sendAdminEmail } from "@/lib/server/email";
import { appendRow } from "@/lib/server/sheets";

const FIELDS = [
  "fullName",
  "dateOfBirth",
  "position",
  "foot",
  "previousClub",
  "phone",
  "location",
  "guardianName",
  "guardianPhone",
  "consent",
] as const;

const POSITION_LABEL: Record<string, string> = { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward" };

export async function submitTrial(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries(FIELDS.map((k) => [k, String(formData.get(k) ?? "")]));

  const bot = botCheck(formData);
  if (bot === "bot-silent") return { status: "success", summary: {} };
  if (bot === "too-fast") return { status: "error", message: MESSAGES.tooFast, fieldErrors: {}, values };

  const parsed = trialSchema(trials.trialDate).safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: firstErrors(parsed.error), values };
  }

  if (!(await humanCheck(formData))) return { status: "error", message: MESSAGES.notHuman, fieldErrors: {}, values };

  const d = parsed.data;
  const submittedAt = new Date().toISOString();
  const row = {
    "Submitted (UTC)": submittedAt,
    "Full name": d.fullName,
    "Date of birth": d.dateOfBirth,
    Age: String(d.age),
    "Age group": d.ageGroup,
    Position: POSITION_LABEL[d.position],
    "Dominant foot": d.foot,
    "Previous club": d.previousClub,
    "WhatsApp / phone": `+${d.phone}`,
    Location: d.location,
    "Guardian name": d.guardianName,
    "Guardian phone": d.guardianPhone ? `+${d.guardianPhone}` : "",
  };

  const [saved, emailed] = await Promise.all([
    appendRow("Trials", Object.values(row)),
    sendAdminEmail(`[Trials] ${d.fullName} — ${POSITION_LABEL[d.position]}, ${d.ageGroup}`, row),
  ]);

  // TDD §6.4: show success if at least one channel recorded the application.
  if (!saved && !emailed) {
    return {
      status: "error",
      message: "Something went wrong on our side and your application was not sent. Please message us on WhatsApp instead.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    summary: {
      Name: d.fullName,
      Position: POSITION_LABEL[d.position],
      "Age group": d.ageGroup,
      "WhatsApp / phone": `+${d.phone}`,
    },
  };
}

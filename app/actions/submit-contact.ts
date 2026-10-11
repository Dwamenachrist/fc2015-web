"use server";

import { contactSchema, firstErrors, normalizeGhanaPhone, type FormState } from "@/lib/forms";
import { botCheck, humanCheck, MESSAGES } from "@/lib/server/guard";
import { sendAdminEmail } from "@/lib/server/email";
import { appendRow } from "@/lib/server/sheets";

const FIELDS = ["name", "email", "phone", "subject", "message"] as const;

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = Object.fromEntries(FIELDS.map((k) => [k, String(formData.get(k) ?? "")]));

  const bot = botCheck(formData);
  if (bot === "bot-silent") return { status: "success", summary: {} };
  if (bot === "too-fast") return { status: "error", message: MESSAGES.tooFast, fieldErrors: {}, values };

  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: firstErrors(parsed.error), values };
  }

  if (!(await humanCheck(formData))) return { status: "error", message: MESSAGES.notHuman, fieldErrors: {}, values };

  const d = parsed.data;
  const phone = d.phone ? `+${normalizeGhanaPhone(d.phone)}` : "";
  const row = {
    "Submitted (UTC)": new Date().toISOString(),
    Name: d.name,
    Email: d.email,
    Phone: phone,
    Subject: d.subject,
    Message: d.message,
  };

  const [saved, emailed] = await Promise.all([
    appendRow("Contact", Object.values(row)),
    sendAdminEmail(`[Contact:${d.subject}] ${d.name}`, row),
  ]);

  if (!saved && !emailed) {
    return {
      status: "error",
      message: "Something went wrong on our side and your message was not sent. Please reach us on WhatsApp or email instead.",
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", summary: { Name: d.name, Subject: d.subject } };
}

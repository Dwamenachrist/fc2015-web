import { describe, expect, it } from "vitest";
import { ageGroupFor, ageOn, contactSchema, firstErrors, normalizeGhanaPhone, trialSchema } from "@/lib/forms";

describe("normalizeGhanaPhone (PRD §5.4: valid phone number)", () => {
  it.each([
    ["0241234567", "233241234567"],
    ["024 123 4567", "233241234567"],
    ["+233 24 123 4567", "233241234567"],
    ["233501234567", "233501234567"],
    ["0302123456", "233302123456"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeGhanaPhone(input)).toBe(expected);
  });

  it.each(["", "024123456", "02412345678", "0141234567", "+44 7700 900123", "abc"])("rejects %s", (input) => {
    expect(normalizeGhanaPhone(input)).toBeNull();
  });
});

describe("ageOn / ageGroupFor", () => {
  it("counts whole years, before and after the birthday", () => {
    expect(ageOn("2008-11-02", "2026-11-01")).toBe(17);
    expect(ageOn("2008-11-01", "2026-11-01")).toBe(18);
  });

  it("maps ages to the PRD age groups", () => {
    expect(ageGroupFor(16)).toBe("U-17");
    expect(ageGroupFor(18)).toBe("U-19");
    expect(ageGroupFor(19)).toBe("Senior");
  });
});

const TRIAL_DATE = "2026-11-01";
const adult = {
  fullName: "Kofi Mensah",
  dateOfBirth: "2004-05-10",
  position: "MF",
  foot: "Right",
  previousClub: "",
  phone: "024 123 4567",
  location: "Madina",
  consent: "on",
};

describe("trialSchema", () => {
  const schema = trialSchema(TRIAL_DATE);

  it("accepts a valid adult application and derives the age group", () => {
    const r = schema.safeParse(adult);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.phone).toBe("233241234567");
      expect(r.data.age).toBe(22);
      expect(r.data.ageGroup).toBe("Senior");
    }
  });

  it("requires a name (PRD §5.4: non-empty name)", () => {
    const r = schema.safeParse({ ...adult, fullName: " " });
    expect(r.success).toBe(false);
    if (!r.success) expect(firstErrors(r.error).fullName).toBeDefined();
  });

  it("requires consent", () => {
    const { consent: _omit, ...rest } = adult;
    void _omit;
    const r = schema.safeParse(rest);
    expect(r.success).toBe(false);
    if (!r.success) expect(firstErrors(r.error).consent).toBeDefined();
  });

  it("rejects players outside 16–23", () => {
    for (const dob of ["2012-01-01", "2000-01-01"]) {
      const r = schema.safeParse({ ...adult, dateOfBirth: dob });
      expect(r.success).toBe(false);
      if (!r.success) expect(firstErrors(r.error).dateOfBirth).toMatch(/16 to 23/);
    }
  });

  it("requires a guardian for under-18s", () => {
    const minor = { ...adult, dateOfBirth: "2009-06-01" };
    const r = schema.safeParse(minor);
    expect(r.success).toBe(false);
    if (!r.success) {
      const e = firstErrors(r.error);
      expect(e.guardianName).toBeDefined();
      expect(e.guardianPhone).toBeDefined();
    }
    const ok = schema.safeParse({ ...minor, guardianName: "Ama Mensah", guardianPhone: "0201234567" });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.guardianPhone).toBe("233201234567");
  });
});

describe("contactSchema (PRD §5.8)", () => {
  const base = { name: "Esi Owusu", subject: "Sponsorship", message: "We would like to discuss a kit deal." };

  it("needs an email or a phone number", () => {
    const r = contactSchema.safeParse({ ...base, email: "", phone: "" });
    expect(r.success).toBe(false);
    expect(contactSchema.safeParse({ ...base, email: "esi@example.com" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, phone: "0241234567" }).success).toBe(true);
  });

  it("rejects a short message and an unknown subject", () => {
    expect(contactSchema.safeParse({ ...base, email: "esi@example.com", message: "Hi" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, email: "esi@example.com", subject: "Tickets" }).success).toBe(false);
  });
});

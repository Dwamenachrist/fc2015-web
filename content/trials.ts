import { Trials } from "./schema";
import { TBD } from "./markers";

export const trials = Trials.parse({
  season: "2026",
  // Group names are from the PRD; the birth-year cut-offs are our reading of them.
  ageGroups: TBD("age-group cut-offs", [
    { name: "U-17", detail: "Born 2010 or later" },
    { name: "U-19", detail: "Born 2008 or later" },
    { name: "Senior", detail: "Up to 23 years old" },
  ]),
  dates: TBD("trial dates", "Dates to be announced"),
  venue: TBD("trial venue", "Legon, Accra"),
  bring: TBD("what to bring", ["Football boots and shin guards", "Water and training kit", "Ghana Card, passport or birth certificate"]),
  eligibility: "Open to players aged 16 to 23 living in Greater Accra.",
  trialDate: TBD("first trial date (ISO)", "2026-11-01"),
});

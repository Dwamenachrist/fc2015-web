import { z } from "zod";
import { Person } from "./schema";
import { sample } from "./markers";

// We never invent player names (SITE_BLUEPRINT §3.4). Until the client sends
// the registered squad, cards show the placeholder portrait and "Player / Name".
const p = (id: string, role: "GK" | "DF" | "MF" | "FW", number: number, captain = false) => ({
  id,
  firstName: "Player",
  lastName: "Name",
  role,
  number,
  captain,
});

export const squad = z
  .array(Person)
  .parse(
    sample("first-team squad and staff", [
      p("gk-1", "GK", 1),
      p("gk-16", "GK", 16),
      p("df-2", "DF", 2),
      p("df-3", "DF", 3),
      p("df-4", "DF", 4),
      p("df-5", "DF", 5),
      p("mf-6", "MF", 6),
      p("mf-8", "MF", 8),
      p("mf-10", "MF", 10, true),
      p("mf-14", "MF", 14),
      p("fw-7", "FW", 7),
      p("fw-9", "FW", 9),
      p("fw-11", "FW", 11),
      { id: "staff-head-coach", firstName: "Staff", lastName: "Name", role: "STAFF", staffTitle: "Head Coach" },
      { id: "staff-assistant", firstName: "Staff", lastName: "Name", role: "STAFF", staffTitle: "Assistant Coach" },
    ]),
  );

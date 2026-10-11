import { describe, expect, it } from "vitest";
import type { Fixture } from "@/content/schema";
import { nextFixture, outcome, recentResults } from "@/lib/fixtures";

const venue = { name: "Home ground", address: "Legon, Accra", mapsUrl: "https://maps.example/x" };
const f = (id: string, kickoff: string, result?: { for: number; against: number }): Fixture => ({
  id,
  opponent: "Opponent FC",
  opponentShort: "OPP",
  competition: "GARFA Division Two",
  kickoff,
  home: true,
  venue,
  result,
});

const list = [
  f("a", "2026-09-13T15:00:00Z", { for: 2, against: 1 }),
  f("b", "2026-09-20T15:00:00Z", { for: 0, against: 0 }),
  f("c", "2026-09-27T15:00:00Z", { for: 1, against: 3 }),
  f("d", "2026-10-04T15:00:00Z", { for: 3, against: 0 }),
  f("e", "2026-10-25T15:00:00Z"),
  f("f", "2026-11-01T15:00:00Z"),
];

describe("outcome", () => {
  it("derives WIN / DRAW / LOSS from the score", () => {
    expect(outcome({ for: 2, against: 1 })).toBe("WIN");
    expect(outcome({ for: 1, against: 1 })).toBe("DRAW");
    expect(outcome({ for: 0, against: 1 })).toBe("LOSS");
  });
});

describe("nextFixture", () => {
  it("returns the earliest fixture without a result", () => {
    expect(nextFixture(list, Date.parse("2026-10-07T00:00:00Z"))?.id).toBe("e");
  });

  it("keeps a match as next while it is being played", () => {
    expect(nextFixture(list, Date.parse("2026-10-25T16:00:00Z"))?.id).toBe("e");
  });

  it("moves on once the live window has passed", () => {
    expect(nextFixture(list, Date.parse("2026-10-25T18:00:00Z"))?.id).toBe("f");
  });

  it("returns undefined when nothing is scheduled", () => {
    expect(nextFixture(list, Date.parse("2027-01-01T00:00:00Z"))).toBeUndefined();
  });
});

describe("recentResults (PRD §5.2: last 3 matches)", () => {
  it("returns the three latest results, newest first", () => {
    expect(recentResults(list).map((r) => r.id)).toEqual(["d", "c", "b"]);
  });
});

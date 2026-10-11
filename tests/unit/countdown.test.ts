import { describe, expect, it } from "vitest";
import { countdown, LIVE_WINDOW_MS, pad2 } from "@/lib/countdown";

const KICKOFF = "2026-10-25T15:00:00Z";
const k = Date.parse(KICKOFF);

describe("countdown (PRD §5.2: computes time to kick-off)", () => {
  it("splits the remaining time into days, hours, minutes, seconds", () => {
    const now = k - (2 * 86_400 + 3 * 3_600 + 4 * 60 + 5) * 1000;
    expect(countdown(KICKOFF, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5, state: "upcoming" });
  });

  it("is live from kick-off until two hours after", () => {
    expect(countdown(KICKOFF, k).state).toBe("live");
    expect(countdown(KICKOFF, k + LIVE_WINDOW_MS - 1).state).toBe("live");
  });

  it("is finished two hours after kick-off", () => {
    expect(countdown(KICKOFF, k + LIVE_WINDOW_MS).state).toBe("finished");
  });

  it("rejects an invalid kick-off", () => {
    expect(() => countdown("not a date", 0)).toThrow();
  });

  it("pads to two digits", () => {
    expect(pad2(5)).toBe("05");
    expect(pad2(12)).toBe("12");
  });
});

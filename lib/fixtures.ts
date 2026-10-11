import type { Fixture } from "@/content/schema";
import { LIVE_WINDOW_MS } from "./countdown";

export type Outcome = "WIN" | "DRAW" | "LOSS";

export function outcome(result: NonNullable<Fixture["result"]>): Outcome {
  if (result.for > result.against) return "WIN";
  if (result.for < result.against) return "LOSS";
  return "DRAW";
}

/** The earliest fixture without a result that has not finished yet. */
export function nextFixture(fixtures: Fixture[], nowMs: number): Fixture | undefined {
  return fixtures
    .filter((f) => !f.result && Date.parse(f.kickoff) + LIVE_WINDOW_MS > nowMs)
    .sort((a, b) => Date.parse(a.kickoff) - Date.parse(b.kickoff))[0];
}

/** The most recent fixtures that have a result, newest first. */
export function recentResults(fixtures: Fixture[], count = 3): Fixture[] {
  return fixtures
    .filter((f) => f.result)
    .sort((a, b) => Date.parse(b.kickoff) - Date.parse(a.kickoff))
    .slice(0, count);
}

/** Every fixture still to be played (or being played), soonest first. */
export function upcomingFixtures(fixtures: Fixture[], nowMs: number): Fixture[] {
  return fixtures
    .filter((f) => !f.result && Date.parse(f.kickoff) + LIVE_WINDOW_MS > nowMs)
    .sort((a, b) => Date.parse(a.kickoff) - Date.parse(b.kickoff));
}

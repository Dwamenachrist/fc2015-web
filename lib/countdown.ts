export type MatchState = "upcoming" | "live" | "finished";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  state: MatchState;
}

/** A match is treated as "live" for two hours after kick-off (TDD §6.2). */
export const LIVE_WINDOW_MS = 2 * 60 * 60 * 1000;

export function countdown(kickoffISO: string, nowMs: number): CountdownParts {
  const kickoff = Date.parse(kickoffISO);
  if (Number.isNaN(kickoff)) throw new Error(`Invalid kickoff: ${kickoffISO}`);

  const diff = kickoff - nowMs;
  if (diff <= 0) {
    const state: MatchState = -diff < LIVE_WINDOW_MS ? "live" : "finished";
    return { days: 0, hours: 0, minutes: 0, seconds: 0, state };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    state: "upcoming",
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

// Accra is UTC+0 with no daylight saving; always format in Africa/Accra so the
// server-rendered HTML and the browser agree (TDD §5).
const TZ = "Africa/Accra";

const dayDate = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, weekday: "short", day: "numeric", month: "short", year: "numeric" });
const shortDate = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, day: "2-digit", month: "short" });
const time = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });

/** "Sun, 25 Oct 2026" */
export const formatMatchDate = (iso: string) => dayDate.format(new Date(iso));
/** "25 Oct" */
export const formatShortDate = (iso: string) => shortDate.format(new Date(iso));
/** "15:00" */
export const formatKickoffTime = (iso: string) => time.format(new Date(iso));

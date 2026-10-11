import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { MatchCenter } from "@/components/sections/MatchCenter/MatchCenter";
import { FixtureList } from "@/components/sections/FixtureList/FixtureList";
import { fixtures } from "@/content/fixtures";
import { nextFixture, recentResults, upcomingFixtures } from "@/lib/fixtures";

export const metadata: Metadata = {
  title: "Fixtures & results",
  description: "FC 2015 fixtures, kick-off times, venues and results in the Greater Accra Regional FA Division Two.",
  alternates: { canonical: "/matches" },
};

// Computed at build time; the daily rebuild keeps it current (TDD §8).
const BUILT_AT = Date.now();

export default function MatchesPage() {
  const next = nextFixture(fixtures, BUILT_AT);
  const upcoming = upcomingFixtures(fixtures, BUILT_AT);
  const results = recentResults(fixtures, 100);
  return (
    <>
      <PageBanner kicker="Matchday" title="Fixtures & results" subtitle="Every home game at Legon." />
      <MatchCenter next={next} results={results.slice(0, 3)} />
      <FixtureList upcoming={upcoming} results={results} />
    </>
  );
}

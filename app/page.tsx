import { Hero } from "@/components/sections/Hero/Hero";
import { MatchCards } from "@/components/sections/MatchCards/MatchCards";
import { StoryTeaser } from "@/components/sections/StoryTeaser/StoryTeaser";
import { SquadRail } from "@/components/sections/SquadRail/SquadRail";
import { PartnersStrip } from "@/components/sections/PartnersStrip/PartnersStrip";
import { SplitPromo } from "@/components/ui/SplitPromo";
import { about } from "@/content/about";
import { club } from "@/content/club";
import { fixtures } from "@/content/fixtures";
import { partners, PRINCIPAL_SLOTS } from "@/content/partners";
import { squad } from "@/content/squad";
import { trials } from "@/content/trials";
import { SITE_URL } from "@/content/site";
import { nextFixture, recentResults, upcomingFixtures } from "@/lib/fixtures";
import trialsImage from "@/public/images/trials.jpg";

// Statically prerendered: "next match" is computed once, at build time.
// A daily Vercel cron redeploy keeps it current (TDD §8).
const BUILT_AT = Date.now();

/** Homepage as a hub (DECISIONS.md 11 Oct): each block previews a full page. */
export default function Home() {
  const next = nextFixture(fixtures, BUILT_AT);
  const [last] = recentResults(fixtures, 1);
  const upcoming = upcomingFixtures(fixtures, BUILT_AT).find((f) => f.id !== next?.id);
  const players = squad.filter((p) => p.role !== "STAFF").slice(0, 8);

  const sameAs = Object.values(club.socials).filter(Boolean);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      name: "FC 2015",
      alternateName: "2015 FC",
      sport: "Soccer",
      foundingDate: "2015",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/crest.png`,
      location: {
        "@type": "Place",
        name: "Legon, Accra",
        address: { "@type": "PostalAddress", addressLocality: "Legon, Accra", addressCountry: "GH" },
      },
      ...(sameAs.length ? { sameAs } : {}),
    },
    ...(next
      ? [
          {
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: next.home ? `FC 2015 v ${next.opponent}` : `${next.opponent} v FC 2015`,
            startDate: next.kickoff,
            location: { "@type": "Place", name: next.venue.name, address: next.venue.address },
            homeTeam: { "@type": "SportsTeam", name: next.home ? "FC 2015" : next.opponent },
            awayTeam: { "@type": "SportsTeam", name: next.home ? next.opponent : "FC 2015" },
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero next={next} video={club.heroVideo} />
      <MatchCards last={last} next={next} upcoming={upcoming} />
      <StoryTeaser about={about} />
      <SquadRail players={players} />
      <SplitPromo
        image={trialsImage}
        kicker={`Open trials ${trials.season}`}
        title="Your shot at Division Two"
        cta={{ href: "/trials", label: "Join Open Trials" }}
        surface="gold"
      >
        <ul>
          <li>Ages 16 to 23: U-17, U-19 and Senior groups</li>
          <li>
            {trials.dates} · {trials.venue}
          </li>
        </ul>
      </SplitPromo>
      <PartnersStrip partners={partners} slots={PRINCIPAL_SLOTS} />
    </>
  );
}

import { z } from "zod";
import { Fixture } from "./schema";
import { sample } from "./markers";
import { homeVenue } from "./club";

const awayVenue = {
  name: "Away ground",
  address: "Greater Accra",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Greater+Accra",
};

// Staging sample data so the client can review a filled-in Match Centre.
// Replace with the real GARFA Division Two schedule before launch.
export const fixtures = z.array(Fixture).parse(
  sample("fixtures and results", [
    {
      id: "2026-09-13",
      opponent: "Opponent FC",
      opponentShort: "OPP",
      competition: "GARFA Division Two",
      kickoff: "2026-09-13T15:00:00Z",
      home: true,
      venue: homeVenue,
      result: { for: 2, against: 0 },
    },
    {
      id: "2026-09-20",
      opponent: "Opponent FC",
      opponentShort: "OPP",
      competition: "GARFA Division Two",
      kickoff: "2026-09-20T15:00:00Z",
      home: false,
      venue: awayVenue,
      result: { for: 2, against: 1 },
    },
    {
      id: "2026-09-27",
      opponent: "Opponent FC",
      opponentShort: "OPP",
      competition: "GARFA Division Two",
      kickoff: "2026-09-27T15:00:00Z",
      home: true,
      venue: homeVenue,
      result: { for: 3, against: 1 },
    },
    {
      id: "2026-10-25",
      opponent: "Opponent FC",
      opponentShort: "OPP",
      competition: "GARFA Division Two",
      kickoff: "2026-10-25T15:00:00Z",
      home: true,
      venue: homeVenue,
    },
    {
      id: "2026-11-01",
      opponent: "Opponent FC",
      opponentShort: "OPP",
      competition: "GARFA Division Two",
      kickoff: "2026-11-01T15:00:00Z",
      home: false,
      venue: awayVenue,
    },
  ]),
);

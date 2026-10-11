import { z } from "zod";
import { Kit } from "./schema";
import { TBD } from "./markers";

// Colours are the PRD-signed brand values (PRD §5.6, tokens.css primitives).
export const kits = z.array(Kit).parse([
  {
    id: "home",
    label: "Home",
    name: "Royal Blue",
    description: "Royal blue base with metallic gold trims and the Golden Eagle crest.",
    bodyColor: "#0047AB",
    trimColor: "#E5A93C",
    priceGHS: TBD("home kit price (GH₵)", undefined),
    sizes: TBD("home kit sizes", ["S", "M", "L", "XL", "XXL"]),
  },
  {
    id: "away",
    label: "Away",
    name: "Imperial Gold",
    description: "Gold base with royal blue collar and trims.",
    bodyColor: "#E5A93C",
    trimColor: "#0047AB",
    priceGHS: TBD("away kit price (GH₵)", undefined),
    sizes: TBD("away kit sizes", ["S", "M", "L", "XL", "XXL"]),
  },
]);

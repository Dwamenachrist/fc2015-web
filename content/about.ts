import { About } from "./schema";
import { TBD } from "./markers";

// Copy is the PRD wording (PRD §5.5) until the club supplies its own story.
export const about = About.parse({
  intro: "Founded in Legon in 2015 with one commitment: discipline and football excellence.",
  body: TBD("club story copy", [
    "FC 2015 was established in Legon, Greater Accra, to give the area's most determined young footballers a serious, organised home.",
    "Today the club competes in Division Two of the Greater Accra Regional FA league, building towards promotion with a squad shaped by hard work, structure and local pride.",
  ]),
  // Eagle, star and colours: PRD §5.5 wording. Shield and lettering: our wording, needs client approval.
  // x / y: where the part sits on /brand/crest.png (percent); zoom: how far the explorer zooms in.
  crestParts: [
    {
      id: "shield",
      title: "The Shield",
      text: TBD(
        "shield meaning (client approval)",
        "One badge, one club. The shield holds everything FC 2015 stands for, and everyone who wears it defends it together.",
      ),
      x: 50,
      y: 50,
      zoom: 1,
    },
    {
      id: "name",
      title: "FC 2015",
      text: TBD("lettering meaning (client approval)", "Our name and the year it all began in Legon. Every season since is built on 2015."),
      x: 50,
      y: 21,
      zoom: 2,
    },
    {
      id: "star",
      title: "The Star",
      text: "Excellence. The standard we hold ourselves to, on and off the pitch.",
      x: 50,
      y: 35,
      zoom: 2.1,
    },
    {
      id: "eagle",
      title: "The Golden Eagle",
      text: "Vision, strength and high ambition. The eagle sees further and flies higher.",
      x: 50,
      y: 58,
      zoom: 1.7,
    },
    { id: "bars", title: "Gold & Blue", text: "Victory and loyalty, the club colours, worn on every shirt.", x: 50, y: 88, zoom: 2 },
  ],
  colours: [
    { name: "Imperial Gold", hex: "#E5A93C", meaning: "Victory. The colour of the eagle and of every trophy we're chasing." },
    { name: "Royal Blue", hex: "#0047AB", meaning: "Loyalty. To the club, to Legon, and to each other." },
  ],
  timeline: [
    { year: "2015", title: "Founded in Legon", text: "The club is established with a commitment to discipline and football excellence." },
    {
      year: TBD("Division Two entry year", "20XX"),
      title: "Division Two",
      text: "FC 2015 enters the Greater Accra Regional FA Division Two league.",
    },
    { year: "Now", title: "Promotion campaign", text: "Building a squad and a supporter base ready for the next level." },
  ],
});

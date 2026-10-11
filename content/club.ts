import { Club } from "./schema";
import { TBD } from "./markers";

export const LEGON_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Legon%2C+Accra%2C+Ghana";

export const club = Club.parse({
  name: "FC 2015",
  email: TBD("official club email", "hello@fc2015.example"),
  whatsapp: TBD("official WhatsApp number", "233000000000"),
  trialsWhatsappGroup: TBD("trials WhatsApp group invite link", "https://chat.whatsapp.com/"),
  address: "Legon, Accra",
  mapsUrl: LEGON_MAPS_URL,
  // Add only the accounts the club gives us. Each one becomes a clickable icon
  // in the header menu, footer and contact page; missing ones never appear.
  socials: TBD("the club's real social media accounts", {}),
  heroVideo: undefined,
  // Partnership deck download stays hidden until the real PDF exists (SITE_BLUEPRINT §4.1 A12).
  partnershipDeck: undefined,
  aboutVideoYouTubeId: undefined,
});

export const homeVenue = {
  name: TBD("home ground name", "Home ground"),
  address: "Legon, Accra",
  mapsUrl: LEGON_MAPS_URL,
};

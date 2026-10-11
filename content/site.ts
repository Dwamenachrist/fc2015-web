/**
 * Site-wide settings.
 *
 * Cookie consent (SITE_BLUEPRINT §1.3): the three reference sites show a
 * banner because they load ad and analytics trackers that set cookies.
 * This site's analytics (Vercel) are cookieless, so by law no banner is
 * needed and none is shown. If the club ever adds a tracker that sets
 * cookies (Google Analytics, Meta Pixel…), list it here: the consent banner
 * then appears automatically and the script only loads after "Accept".
 */
export interface ConsentScript {
  id: string;
  name: string;
  purpose: string;
  src: string;
}

export const nonEssentialScripts: ConsentScript[] = [];

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

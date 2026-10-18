import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/sections/SiteHeader/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter/SiteFooter";
import { ConsentBanner } from "@/components/sections/ConsentBanner/ConsentBanner";
import { club } from "@/content/club";
import { nonEssentialScripts, SITE_URL } from "@/content/site";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme";
import "./globals.css";

// Fonts per DESIGN_TOKENS.md §3.1. tokens.css reads these variables.
const oswald = Oswald({ subsets: ["latin"], weight: ["700"], variable: "--font-oswald", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], weight: ["600"], style: ["italic"], variable: "--font-fraunces", display: "swap" });

// Title and description word for word from PRD §7.
const TITLE = "FC 2015 | Official Division Two Football Club | Legon, Accra";
const DESCRIPTION =
  "Welcome to the official digital home of FC 2015, Division Two club based in Legon, Accra. Check upcoming match fixtures, squad rosters, open trial dates, and partnership opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Inner pages set a short title; the template adds the club name.
  title: { default: TITLE, template: "%s | FC 2015, Legon" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "FC 2015", title: TITLE, description: DESCRIPTION, url: "/", locale: "en_GH" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.dark,
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme script sets data-theme on <html> before React hydrates, hence suppressHydrationWarning.
    <html lang="en-GH" className={`${oswald.variable} ${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader socials={club.socials} />
        <main id="main">{children}</main>
        <SiteFooter club={club} showCookieSettings={nonEssentialScripts.length > 0} />
        {nonEssentialScripts.length > 0 && <ConsentBanner scripts={nonEssentialScripts} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

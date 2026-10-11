import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { SplitPromo } from "@/components/ui/SplitPromo";
import { Squad } from "@/components/sections/Squad/Squad";
import { squad } from "@/content/squad";
import trialsImage from "@/public/images/trials.jpg";

export const metadata: Metadata = {
  title: "Squad",
  description: "Meet the FC 2015 first-team squad and technical staff: goalkeepers, defenders, midfielders and forwards.",
  alternates: { canonical: "/squad" },
};

export default function SquadPage() {
  return (
    <>
      <PageBanner kicker="First team" title="The squad" subtitle="The players and staff wearing the Golden Eagle this season." />
      <Squad squad={squad} />
      <SplitPromo
        image={trialsImage}
        kicker="Think you belong here?"
        title="Earn your shirt"
        cta={{ href: "/trials", label: "Join Open Trials" }}
        surface="gold"
      >
        <p>Open trials for players aged 16 to 23 in Greater Accra.</p>
      </SplitPromo>
    </>
  );
}

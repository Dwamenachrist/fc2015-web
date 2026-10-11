import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { TrialSteps } from "@/components/sections/TrialSteps/TrialSteps";
import { Trials } from "@/components/sections/Trials/Trials";
import { club } from "@/content/club";
import { trials } from "@/content/trials";

export const metadata: Metadata = {
  title: "Open trials",
  description: "Register for FC 2015 open trials in Legon, Accra. U-17, U-19 and Senior players aged 16 to 23. Takes two minutes.",
  alternates: { canonical: "/trials" },
};

export default function TrialsPage() {
  return (
    <>
      <PageBanner kicker={`Open trials ${trials.season}`} title="Become an Eagle" subtitle="Your shot at Division Two football in Legon." />
      <TrialSteps trials={trials} />
      <Trials trials={trials} whatsapp={club.whatsapp} whatsappGroup={club.trialsWhatsappGroup} />
    </>
  );
}

import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { Partners } from "@/components/sections/Partners/Partners";
import { club } from "@/content/club";
import { partners, PRINCIPAL_SLOTS } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with FC 2015, Greater Accra's rising Division Two football club, and reach Legon's football community.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageBanner kicker="The club" title="Partners" subtitle="The businesses that help bring FC 2015 to life." />
      <Partners partners={partners} principalSlots={PRINCIPAL_SLOTS} deck={club.partnershipDeck} />
    </>
  );
}

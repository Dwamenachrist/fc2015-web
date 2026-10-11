import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { Kits } from "@/components/sections/Kits/Kits";
import { club } from "@/content/club";
import { kits } from "@/content/kits";

export const metadata: Metadata = {
  title: "Kits",
  description: "The official FC 2015 home and away kits. Pre-order yours on WhatsApp.",
  alternates: { canonical: "/kits" },
};

export default function KitsPage() {
  return (
    <>
      <PageBanner kicker="Official 2015 matchwear" title="The kits" subtitle="Pre-order for available sizes on WhatsApp." />
      <Kits kits={kits} whatsapp={club.whatsapp} showHeading={false} />
    </>
  );
}

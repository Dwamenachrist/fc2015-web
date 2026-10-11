import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
import { Contact } from "@/components/sections/Contact/Contact";
import { club } from "@/content/club";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact FC 2015 in Legon, Accra about sponsorship, trials or anything else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner kicker="Get in touch" title="Contact the club" subtitle="Sponsorship, trials or a question: we'll get back to you." />
      <Contact club={club} showHeading={false} />
    </>
  );
}

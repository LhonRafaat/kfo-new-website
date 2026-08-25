import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutVision } from "@/components/sections/AboutVision";
import { PeopleGrid } from "@/components/sections/PeopleGrid";
import { PartnersStrip } from "@/components/sections/PartnersStrip";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Kurdistan Film Commission is the newly established non-profit film commission in the Kurdistan region of Iraq — our mission, our vision, the team behind it and the partners we work with.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      {/* Same page body as the homepage: a tiled paper scan at 40% over cream,
          with every section transparent so it shows through. */}
      <main className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />
        <AboutHero />
        <AboutMission />
        <AboutVision />
        <PeopleGrid section="team" />
        <PeopleGrid section="advisory" />
        <PartnersStrip />
      </main>
      <Footer />
    </>
  );
}

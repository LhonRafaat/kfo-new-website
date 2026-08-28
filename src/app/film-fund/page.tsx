import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FundHero } from "@/components/sections/FundHero";
import { FundAbout } from "@/components/sections/FundAbout";
import { FundGrants } from "@/components/sections/FundGrants";
import { FundApplication } from "@/components/sections/FundApplication";
import { FundTimeline } from "@/components/sections/FundTimeline";
import { FundGuidelines } from "@/components/sections/FundGuidelines";
import { FundTeam } from "@/components/sections/FundTeam";
import { FundFaq } from "@/components/sections/FundFaq";

export const metadata: Metadata = {
  title: "Kurdistan Film Fund",
  description:
    "A grant initiative of the Kurdistan Film Commission supporting the development, production, co-production, post-production and distribution of Kurdish film and TV through two annual funding cycles.",
  alternates: { canonical: "/film-fund" },
};

export default function FilmFundPage() {
  return (
    <>
      <Navbar tone="dark" />
      {/* The only dark page on the site. It runs the same paper as every other
          page, turned down: a near-black neutral ground with the tile
          multiplied over it, so the scan's specks and fibres still read while
          the field stays dark. The tile is desaturated first — the paper is
          cream, and any blend that lifts it washes the page brown. (The frame
          asks for flat black at 8% "hard light", which composites to pure
          black in the browser and loses the paper entirely.) */}
      <main className="relative isolate overflow-x-clip bg-black/90">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-50 grayscale mix-blend-multiply"
          aria-hidden
        />
        <FundHero />
        <FundAbout />
        <FundGrants />
        <FundApplication />
        <FundTimeline />
        <FundGuidelines />
        <FundTeam />
        <FundFaq />
      </main>
      <Footer variant="fund" />
    </>
  );
}

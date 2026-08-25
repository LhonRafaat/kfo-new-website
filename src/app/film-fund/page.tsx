import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FundHero } from "@/components/sections/FundHero";
import { FundAbout } from "@/components/sections/FundAbout";
import { FundGrants } from "@/components/sections/FundGrants";
import { FundApplication } from "@/components/sections/FundApplication";
import { FundTimeline } from "@/components/sections/FundTimeline";
import { FundGuidelines } from "@/components/sections/FundGuidelines";
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
      <Navbar />
      {/* The only dark page on the site: the frame fills it black and lays the
          shared paper scan over it at 8% "hard light" rather than the cream
          pages' 40% normal. */}
      <main className="relative isolate overflow-x-clip bg-black">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-hard-light"
          aria-hidden
        />
        <FundHero />
        <FundAbout />
        <FundGrants />
        <FundApplication />
        <FundTimeline />
        <FundGuidelines />
        <FundFaq />
      </main>
      <Footer />
    </>
  );
}

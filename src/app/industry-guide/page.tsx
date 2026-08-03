import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IndustryGuideHero } from "@/components/sections/IndustryGuideHero";
import { IndustryDirectory } from "@/components/sections/IndustryDirectory";

export const metadata: Metadata = {
  title: "Industry Guide",
  description:
    "The KFO Slemani Industry Guide is the first for filmmaking in the region — find the services, crews and companies working across Slemani for your project.",
  alternates: { canonical: "/industry-guide" },
};

export default function IndustryGuidePage() {
  return (
    <>
      <Navbar />
      {/* Same page body as the homepage and /services: a tiled paper scan at
          40% over cream, with every section transparent so it shows through.
          The hero's own photo covers it for the first viewport. */}
      <main className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />

        <IndustryGuideHero />
        <IndustryDirectory />
      </main>
      <Footer />
    </>
  );
}

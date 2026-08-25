import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PeopleDirectory } from "@/components/sections/PeopleDirectory";

export const metadata: Metadata = {
  title: "Advisory Board",
  description:
    "The advisory board of the Kurdistan Film Commission — the industry voices guiding the commission’s work.",
  alternates: { canonical: "/about/advisory-board" },
};

export default function AdvisoryBoardPage() {
  return (
    <>
      {/* Cream under the same tiled paper scan as the rest of the site, running
          behind the navbar (Figma paints the texture from y=0). */}
      <div className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />
        <Navbar variant="solid" />
        <main className="relative">
          <PeopleDirectory section="advisory" />
        </main>
      </div>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocationsIntro } from "@/components/sections/LocationsIntro";
import { LocationsList } from "@/components/sections/LocationsList";

export const metadata: Metadata = {
  title: "Location Database",
  description:
    "The largest location database in the Kurdistan Region — explore catalogued filming locations across Duhok, Erbil, Kifri, Sulaymaniyah and Halabjah.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      {/* The redesigned frame drops the hero's own texture and flowing curve:
          the whole page is now cream under the same tiled paper scan as the
          homepage, running behind the navbar too (Figma paints it from y=0). */}
      <div className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />

        <Navbar variant="solid" />
        <LocationsIntro />

        <main className="relative">
          <LocationsList />
        </main>
      </div>
      <Footer />
    </>
  );
}

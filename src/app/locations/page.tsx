import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { ScrollCurve } from "@/components/ScrollCurve";
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
      <Navbar variant="solid" />
      <main className="relative bg-cream">
        {/* Texture + curve are confined to the hero, matching the Figma's
            832px-tall floral-texture rectangle — the filter bar and row list
            below sit on plain cream. */}
        <div className="relative overflow-hidden">
          <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />

          {/* Signature flowing line threading the headline. It draws itself
              once on load rather than tracking the scroll — it already sits
              in the first viewport. */}
          <ScrollCurve
            variant="intro"
            trigger="load"
            className="pointer-events-none absolute left-0 top-[10%] z-0 h-[55%] w-full text-ink/45"
          />

          <LocationsIntro />
        </div>

        <LocationsList />
      </main>
      <Footer />
    </>
  );
}

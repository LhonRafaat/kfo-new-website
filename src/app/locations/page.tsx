import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { ScrollCurve } from "@/components/ScrollCurve";
import { LocationsIntro } from "@/components/sections/LocationsIntro";
import { LocationsMap } from "@/components/sections/LocationsMap";

export const metadata: Metadata = {
  title: "Location Database",
  description:
    "The largest location database in the Kurdistan Region — explore catalogued filming locations across Duhok, Erbil, Kifri, Sulaymaniyah and Halabjah.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      {/* The texture and the curve wrap the page body only — in the Figma the
          footer is painted over both. */}
      <div className="relative overflow-hidden bg-cream">
        <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />

        {/* Signature flowing line, threading the headline and bottoming out
            just above the Locations bar */}
        <ScrollCurve
          variant="intro"
          className="pointer-events-none absolute left-0 top-[13.5%] z-0 h-[22%] w-full text-ink/45"
        />

        <Navbar variant="solid" />
        <main className="relative">
          <LocationsIntro />
          <LocationsMap />
        </main>
      </div>
      <Footer />
    </>
  );
}

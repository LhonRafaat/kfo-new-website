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
      {/* Texture + curve are confined to the hero, matching the Figma's
          832px-tall texture rectangle — the filter bar and row list below
          sit on plain cream. That rectangle is named "Grunge Floral Texture 1"
          in Figma but its actual image fill is the same folded-paper asset as
          the homepage founder section, not the floral texture — confirmed by
          rendering the fill's imageRef directly. It also sits behind the
          Header in Figma's own layer order, so the Navbar lives inside this
          wrapper too — otherwise the texture stops short and leaves a seam
          under the navbar. */}
      {/* isolate: standard practice alongside mix-blend-mode so it can never
          reach past this section, even if content here changes later. */}
      <div className="relative isolate overflow-hidden bg-cream">
        <TextureOverlay
          src="/images/texture-paper-founder.webp"
          opacity={0.24}
          blend="multiply"
        />

        {/* Signature flowing line threading the headline. It draws itself
            once on load rather than tracking the scroll — it already sits
            in the first viewport. */}
        <ScrollCurve
          variant="intro"
          trigger="load"
          className="pointer-events-none absolute left-0 top-[10%] z-0 h-[55%] w-full text-ink/45"
        />

        <Navbar variant="solid" />
        <LocationsIntro />
      </div>

      <main className="relative bg-cream">
        <LocationsList />
      </main>
      <Footer />
    </>
  );
}

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
      {/* One wrapper for the whole page body: it owns the cream background and
          clips the decorative curve's horizontal bleed. `isolate` lets the
          curve sit at -z-10 (behind both sections' content) while staying
          above this wrapper's own background. */}
      <div className="relative isolate overflow-x-clip bg-cream">
        {/* Textured hero. The texture rectangle is named "Grunge Floral
            Texture 1" in Figma but its actual image fill is the same
            folded-paper asset as the homepage founder section — confirmed by
            rendering the fill's imageRef directly. It sits behind the Header
            in Figma's layer order, so the Navbar lives inside this wrapper
            too. The inner `isolate` fences the texture's mix-blend-mode. */}
        <div className="relative isolate overflow-hidden">
          <TextureOverlay
            src="/images/texture-paper-founder.webp"
            opacity={0.24}
            blend="multiply"
          />

          <Navbar variant="solid" />
          <LocationsIntro />
        </div>

        {/* Signature flowing line. Figma places it at y 670→1249 on the
            1280-wide frame: its top starts 162px above the hero's bottom edge
            and it sweeps down across the Locations bar, bottoming out behind
            the refine panel and the first row. Anchored to this zero-height
            div at the hero/list boundary and sized in vw to keep the Figma
            proportions (1686×579 on a 1280 frame, bleeding 198px left).
            It draws itself once on load — it starts in the first viewport. */}
        <div aria-hidden className="relative -z-10">
          <ScrollCurve
            variant="intro"
            trigger="load"
            className="pointer-events-none absolute left-[-15.5vw] top-[-12.7vw] h-[45.2vw] w-[131.7vw] text-ink/45"
          />
        </div>

        <main className="relative">
          <LocationsList />
        </main>
      </div>
      <Footer />
    </>
  );
}

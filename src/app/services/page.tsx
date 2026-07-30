import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServiceCategory } from "@/components/sections/ServiceCategory";
import { ProductionTeaser } from "@/components/sections/ProductionTeaser";

export const metadata: Metadata = {
  title: "Services",
  description:
    "KFO Slemani is the ultimate destination for all your production requirements — facilities and logistics for national and international productions filming in the Kurdistan Region.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      {/* Same page body as the homepage: a tiled paper scan at 40% over cream,
          with every section transparent so it shows through. */}
      <main className="relative isolate overflow-x-clip bg-cream pb-12">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />
        {/* Figma lays a watercolour scan across the bottom of the frame (node
            364:499 — 1280×1875 from y2400, 32% "Darken"), behind the production
            card and the footer. Only its top band is ever visible, in the
            gutters beside the card and in the gap above the footer, so the box
            is clipped to that band and the scan is stretched to the frame's
            proportions (1875/1280 ≈ 146.5% of the page width).

            It carries its own z-index rather than sitting in a wrapper: an
            absolutely-positioned ancestor with a z-index would isolate the
            blend and leave `darken` with nothing to darken. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[393px] mix-blend-darken"
          style={{
            backgroundImage: "url(/images/services-wash.webp)",
            backgroundSize: "100% 146.5vw",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
            opacity: 0.32,
          }}
          aria-hidden
        />

        <ServicesHero />
        <ServiceCategory slug="facilities" />
        <ServiceCategory slug="logistics" />
        <ProductionTeaser />
      </main>
      <Footer />
    </>
  );
}

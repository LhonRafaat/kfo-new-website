import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IndustryGuideHero } from "@/components/sections/IndustryGuideHero";
import { IndustryDirectory } from "@/components/sections/IndustryDirectory";
import { seoMetadata } from "@/lib/seo";
import { getAgencies, getIndustryGuidePage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getIndustryGuidePage();
  return seoMetadata(page.seo);
}

export default async function IndustryGuidePage() {
  const [page, agencies] = await Promise.all([
    getIndustryGuidePage(),
    getAgencies(),
  ]);

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

        <IndustryGuideHero page={page} />
        <IndustryDirectory page={page} agencies={agencies} />
      </main>
      <Footer />
    </>
  );
}

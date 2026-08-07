import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocationsIntro } from "@/components/sections/LocationsIntro";
import { LocationsList } from "@/components/sections/LocationsList";
import { seoMetadata } from "@/lib/seo";
import {
  getCities,
  getLocationCategories,
  getLocations,
  getLocationsPage,
} from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLocationsPage();
  return seoMetadata(page.seo);
}

export default async function LocationsPage() {
  const [page, rows, cities, categories] = await Promise.all([
    getLocationsPage(),
    getLocations(),
    getCities(),
    getLocationCategories(),
  ]);

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
        <LocationsIntro page={page} cities={cities} />

        <main className="relative">
          <LocationsList
            copy={page}
            rows={rows}
            cities={cities}
            categories={categories}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}

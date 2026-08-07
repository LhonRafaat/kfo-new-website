import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AgencyDetail } from "@/components/sections/AgencyDetail";
import { getAgency, getAgencySlugs, getIndustryGuidePage } from "@/lib/strapi";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAgencySlugs();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const agency = await getAgency(slug);
  if (!agency) return {};

  return {
    title: agency.displayName,
    description: agency.blurb,
    alternates: { canonical: `/industry-guide/${slug}` },
  };
}

export default async function AgencyPage({ params }: Params) {
  const { slug } = await params;
  const [agency, copy] = await Promise.all([
    getAgency(slug),
    getIndustryGuidePage(),
  ]);
  if (!agency) notFound();

  return (
    <>
      {/* Cream under the tiled paper scan, with the navbar inside the texture
          so there is no seam above it — the same shell as /locations. */}
      <div className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />

        <Navbar variant="solid" />
        <main className="relative">
          <AgencyDetail agency={agency} copy={copy} />
        </main>
      </div>
      <Footer />
    </>
  );
}

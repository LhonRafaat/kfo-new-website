import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AgencyDetail } from "@/components/sections/AgencyDetail";
import { industryAgencies, industryAgencyProfile } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industryAgencies.map((agency) => ({ slug: agency.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const agency = industryAgencies.find((a) => a.slug === slug);
  if (!agency) return {};

  return {
    title: industryAgencyProfile.displayName,
    description: industryAgencyProfile.blurb,
    alternates: { canonical: `/industry-guide/${slug}` },
  };
}

export default async function AgencyPage({ params }: Params) {
  const { slug } = await params;
  const agency = industryAgencies.find((a) => a.slug === slug);
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
          <AgencyDetail photo={agency.image} photoAlt={agency.imageAlt} />
        </main>
      </div>
      <Footer />
    </>
  );
}

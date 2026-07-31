import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight } from "@/components/icons";
import { LocationGallery } from "@/components/sections/LocationGallery";
import { LocationSlider } from "@/components/sections/LocationSlider";
import { LocationRegion } from "@/components/sections/LocationRegion";
import { locationProductionBlurb, locations } from "@/lib/content";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  return {
    title: location.title,
    description: location.summary,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: location.title,
      description: location.summary,
      images: [{ url: location.gallery[0].src, alt: location.gallery[0].alt }],
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  // [0] is the hero tile, [1] the full-width band; the rest feed the slider.
  const strip = location.gallery.slice(2);

  return (
    <>
      {/* Cream under the same tiled paper scan as the rest of the site, running
          behind the navbar (Figma paints the texture from y=0). */}
      <div className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />

        <Navbar variant="solid" />

        <main className="relative">
          <Container className="relative z-10 pt-12">
            <Reveal className="flex justify-center">
              <Link
                href="/locations"
                className="flex items-center gap-2 font-sans text-base font-semibold uppercase tracking-[0.02em] text-espresso opacity-64 transition-opacity duration-300 hover:opacity-100"
              >
                <CaretRight className="h-5 w-5 rotate-180" />
                Back to Location Database
              </Link>
            </Reveal>

            <Reveal
              as="h1"
              delay={60}
              className="heading-section mx-auto mt-10 max-w-70 text-center text-ink"
            >
              {location.title}
            </Reveal>
          </Container>

          <LocationGallery
            gallery={location.gallery}
            category={location.category}
            summary={location.summary}
          />

          <Container className="relative z-10 mt-16">
            <Reveal as="p" className="body-md mx-auto max-w-160 leading-6">
              {locationProductionBlurb}
            </Reveal>
          </Container>

          {strip.length > 0 && (
            <Container className="relative z-10 mt-16">
              <Reveal>
                <LocationSlider images={strip} />
              </Reveal>
            </Container>
          )}

          <LocationRegion
            city={location.city}
            cityBlurb={location.cityBlurb}
            pin={location.pin}
            mapsUrl={location.mapsUrl}
          />

          <Container className="relative z-10 pb-16 pt-12">
            <Reveal
              as="p"
              className="mx-auto max-w-100 text-center font-serif text-base leading-6 text-ink"
            >
              For logistics, Public Relations, and Information please{" "}
              <Link
                href="/contact"
                className="link-underline font-medium italic"
              >
                contact us
              </Link>
              .
            </Reveal>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}

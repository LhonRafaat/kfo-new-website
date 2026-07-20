import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextureOverlay } from "@/components/ui/TextureOverlay";
import { Reveal } from "@/components/Reveal";
import { ScrollCurve } from "@/components/ScrollCurve";
import { LocationGallery } from "@/components/sections/LocationGallery";
import { LocationRegion } from "@/components/sections/LocationRegion";
import { locations } from "@/lib/content";

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

  return (
    <>
      {/* Texture and curve cover the body only — the footer paints over both */}
      <div className="relative overflow-hidden bg-cream">
        <TextureOverlay src="/images/floral-texture.webp" opacity={0.48} />
        <ScrollCurve
          variant="intro"
          trigger="load"
          className="pointer-events-none absolute left-0 top-[5%] z-0 h-[17%] w-full text-ink/45"
        />

        <Navbar variant="solid" backHref="/locations" />

        <main className="relative">
          <Container className="relative z-10 pt-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[434px_439px] lg:justify-between">
              <Reveal as="div">
                <Eyebrow>{location.category}</Eyebrow>
                <h1 className="display-lg mt-4 text-ink">{location.title}</h1>
              </Reveal>
              <Reveal
                as="p"
                delay={80}
                className="body-lg lg:col-start-2 lg:pt-16"
              >
                {location.summary}
              </Reveal>
            </div>
          </Container>

          <LocationGallery gallery={location.gallery} />

          <LocationRegion
            city={location.city}
            cityBlurb={location.cityBlurb}
            pin={location.pin}
            mapsUrl={location.mapsUrl}
          />

          <Container className="relative z-10 pt-24 pb-18">
            <p className="text-center font-sans text-2xl leading-normal text-ink">
              For logistics, Public Relations, and Information please{" "}
              <Link
                href="/contact"
                className="link-underline font-serif font-medium italic"
              >
                contact us
              </Link>
              .
            </p>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}

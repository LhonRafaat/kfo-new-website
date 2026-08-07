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
import { mediaList } from "@/lib/media";
import { getLocation, getLocationSlugs, getLocationsPage } from "@/lib/strapi";

export async function generateStaticParams() {
  return getLocationSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocation(slug);
  if (!location) return {};

  const [hero] = mediaList(location.gallery);
  return {
    title: location.title,
    description: location.summary,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: location.title,
      description: location.summary,
      ...(hero ? { images: [{ url: hero.src, alt: hero.alt }] } : {}),
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [location, copy] = await Promise.all([
    getLocation(slug),
    getLocationsPage(),
  ]);
  if (!location) notFound();

  const gallery = mediaList(location.gallery);
  // [0] is the hero tile, [1] the full-width band; the rest feed the slider.
  const strip = gallery.slice(2);

  // The blurb lives on the city record so every location in a city shares it;
  // an entry can still override it with its own.
  const cityName = location.citySuffix || location.city?.name || "";
  const cityBlurb = location.cityBlurb ?? location.city?.blurb ?? "";

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
                {copy.backLabel}
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
            gallery={gallery}
            category={location.category?.name ?? ""}
            summary={location.summary}
          />

          <Container className="relative z-10 mt-16">
            <Reveal as="p" className="body-md mx-auto max-w-160 leading-6">
              {copy.productionBlurb}
            </Reveal>
          </Container>

          {strip.length > 0 && (
            <Container className="relative z-10 mt-16">
              <Reveal>
                <LocationSlider images={strip} />
              </Reveal>
            </Container>
          )}

          {/* The region map needs a placed pin and somewhere for it to link;
              an entry whose page is published before those are filled in shows
              the rest of the page without it. */}
          {location.pinX != null &&
            location.pinY != null &&
            location.mapsUrl && (
              <LocationRegion
                city={cityName}
                cityBlurb={cityBlurb}
                pin={{ x: location.pinX, y: location.pinY }}
                mapsUrl={location.mapsUrl}
              />
            )}

          <Container className="relative z-10 pb-16 pt-12">
            <Reveal
              as="p"
              className="mx-auto max-w-100 text-center font-serif text-base leading-6 text-ink"
            >
              {/* The closing line ends in "contact us", which the Figma sets as
                  a link — so the last two words are pulled out of the CMS
                  string and re-rendered as one. */}
              <ContactLine text={copy.contactLine} />
            </Reveal>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
}

/** Renders the standing contact line with its final "contact us" linked. */
function ContactLine({ text }: { text: string }) {
  const match = text.match(/^(.*?)(contact us)(\.?)$/i);
  if (!match) return <>{text}</>;

  const [, lead, phrase, stop] = match;
  return (
    <>
      {lead}
      <Link href="/contact" className="link-underline font-medium italic">
        {phrase}
      </Link>
      {stop}
    </>
  );
}

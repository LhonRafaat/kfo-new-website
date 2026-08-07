import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { LocationsShowcase } from "@/components/sections/LocationsShowcase";
import { MoviesMade } from "@/components/sections/MoviesMade";
import { Testimonial } from "@/components/sections/Testimonial";
import { NewsExperts } from "@/components/sections/NewsExperts";
import { seoMetadata } from "@/lib/seo";
import { getGlobal, getHomePage, getMovies, getNews } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  return seoMetadata(home.seo);
}

export default async function HomePage() {
  const [home, movies, news, site] = await Promise.all([
    getHomePage(),
    getMovies(),
    getNews(),
    getGlobal(),
  ]);

  // Organization JSON-LD, from `global` — `sameAs` is the socials list, so the
  // markup stays in step with the footer without being maintained twice.
  const org = site.organization;
  const jsonLd = org && {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    ...(org.alternateName ? { alternateName: org.alternateName } : {}),
    url: org.url,
    description: org.description,
    ...(org.areaServed ? { areaServed: org.areaServed } : {}),
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Navbar />
      {/* The V2 frame lays a tiled paper scan at 40% over cream behind every
          section — sections stay transparent so it shows through. */}
      <main className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />
        <Hero hero={home.hero} />
        <Introduction intro={home.introduction} />
        <LocationsShowcase showcase={home.showcase} />
        <MoviesMade section={home.moviesSection} movies={movies} />
        <Testimonial
          testimonial={home.testimonial}
          founder={home.founderMessage}
        />
        <NewsExperts section={home.newsSection} news={news} />
      </main>
      <Footer />
    </>
  );
}

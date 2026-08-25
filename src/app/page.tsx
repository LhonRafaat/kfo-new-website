import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { LocationsShowcase } from "@/components/sections/LocationsShowcase";
import { MoviesMade } from "@/components/sections/MoviesMade";
import { Testimonial } from "@/components/sections/Testimonial";
import { Insights } from "@/components/sections/Insights";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kurdistan Film Commission",
  alternateName: "KFC",
  url: "https://kurdistanfilmcommission.org",
  description:
    "The official, non-profit film commission in the Kurdistan region of Iraq — supporting filmmakers with locations, the Film Fund, and production services.",
  areaServed: "Kurdistan Region, Iraq",
  sameAs: [
    "https://youtube.com",
    "https://linkedin.com",
    "https://instagram.com",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      {/* The V2 frame lays a tiled paper scan at 40% over cream behind every
          section — sections stay transparent so it shows through. */}
      <main className="relative isolate overflow-x-clip bg-cream">
        <div
          className="texture-tile pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden
        />
        <Hero />
        <Introduction />
        <LocationsShowcase />
        <MoviesMade />
        <Testimonial />
        <Insights />
      </main>
      <Footer />
    </>
  );
}

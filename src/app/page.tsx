import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { QuickLinks } from "@/components/sections/QuickLinks";
import { Introduction } from "@/components/sections/Introduction";
import { LocationDatabase } from "@/components/sections/LocationDatabase";
import { MoviesMade } from "@/components/sections/MoviesMade";
import { FounderStatement } from "@/components/sections/FounderStatement";
import { NewsExperts } from "@/components/sections/NewsExperts";

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
      <main>
        <Hero />
        <QuickLinks />
        <Introduction />
        <LocationDatabase />
        <MoviesMade />
        <FounderStatement />
        <NewsExperts />
      </main>
      <Footer />
    </>
  );
}

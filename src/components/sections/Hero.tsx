import Image from "next/image";
import { HeroWordmark } from "@/components/HeroWordmark";
import { Parallax } from "@/components/Parallax";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ink">
      <Parallax speed={0.18} className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Snow-dusted mountains of Kurdistan glowing at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </Parallax>
      {/* Legibility wash — darker toward the base where it meets the cream band */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,12,13,0.35) 0%, rgba(20,12,13,0.10) 40%, rgba(20,12,13,0.30) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
        <h1 className="display-hero drop-shadow-sm" aria-label="Kurdistan Film Commission">
          <HeroWordmark />
        </h1>
        <p className="mt-4 font-serif text-lg font-medium text-white/95 drop-shadow-sm sm:text-xl md:text-2xl">
          The official film commission in <em className="italic">Kurdistan &amp; Iraq</em>.
        </p>
      </div>
    </section>
  );
}

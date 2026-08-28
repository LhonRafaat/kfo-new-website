import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { fundHero } from "@/lib/content";

/**
 * Film Fund hero (Figma 541:2432 → "Hero Section" + "Frame 9"): the wordmark
 * centred over a full-bleed photo with its squiggle under it, and the two
 * intro columns on the base line.
 *
 * The photo carries two washes, both from the frame: a flat 32% black over the
 * whole picture, and a 48% black gradient that only starts at 37.7% of the
 * height — the copy sits in the dark half it makes.
 */
export function FundHero() {
  return (
    <section className="relative flex h-svh min-h-[620px] flex-col justify-end overflow-hidden bg-ink-deep">
      <Image
        src={fundHero.image.src}
        alt={fundHero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/32" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 37.74%, rgba(0,0,0,0.48) 100%)",
        }}
        aria-hidden
      />

      {/* Wordmark, centred in the photo. The frame centres the lockup on the
          hero itself (its midpoint is the hero's), not on the band left over
          above the intro row — so it comes out of the flow and the intro keeps
          the base line to itself. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <Reveal className="reveal-underline flex flex-col items-center">
          <h1 className="w-[min(464px,80vw)]">
            <Image
              src={fundHero.wordmark.src}
              alt={fundHero.wordmark.alt}
              width={464}
              height={153}
              priority
              // Vector already; the optimizer rejects SVG unless allowlisted.
              unoptimized
              className="h-auto w-full"
            />
          </h1>
          {/* Figma draws the rule 229px wide under a 464px wordmark, and at
              2.52 it is the heaviest squiggle on the site. */}
          <Underline
            strokeWidth={2.5182}
            className="!mt-9 !h-[6px] w-[min(229px,40vw)] text-rust"
          />
        </Reveal>
      </div>

      <Container className="relative z-10 pb-10 text-white">
        {/* The frame sets the row's cross axis to MAX: the two columns are
            different depths and sit on a shared BASE line, not a shared top. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <Reveal
            as="p"
            delay={120}
            className="max-w-[528px] font-serif text-base font-medium leading-[1.5] md:text-lg"
          >
            {fundHero.lead}
          </Reveal>
          {/* One text block in the frame, so the two paragraphs run on
              consecutive lines with no space between them. */}
          <Reveal delay={180} className="max-w-[480px] lg:w-[480px] lg:shrink-0">
            {fundHero.aside.map((paragraph) => (
              <p key={paragraph} className="body-md leading-6 text-white">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

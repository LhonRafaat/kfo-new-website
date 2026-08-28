import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { aboutHero } from "@/lib/content";

/**
 * About hero (Figma 338:1246 → Frame 160 + Frame 16): a full-viewport photo
 * with the page title, its squiggle and the lead sitting on the image's base
 * line — the same bottom-anchored construction as the services hero.
 *
 * Figma's wash is a corner-to-corner gradient (top-right → bottom-left, black
 * at 43%) rather than the vertical one the other heroes use, so the darkest
 * corner lands under the copy.
 */
export function AboutHero() {
  return (
    <section className="relative flex h-svh min-h-[560px] flex-col overflow-hidden bg-ink">
      <Image
        src={aboutHero.image.src}
        alt={aboutHero.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(225deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.43) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative z-10 mt-auto pb-12 text-white">
        <Reveal className="reveal-underline max-w-[511px]">
          {/* Figma holds the title to 266px so it breaks after "Kurdistan". */}
          <h1 className="heading-section max-w-[268px]">
            {aboutHero.title}
            <em className="italic">{aboutHero.titleItalic}</em>
            <span className="font-normal italic"> .</span>
          </h1>
          {/* 149px in the frame. */}
          <Underline className="mt-2.5 !h-[5px] max-w-[149px]" />
          <p className="mt-2.5 font-serif text-lg font-medium leading-[1.5] md:text-[1.375rem]">
            {aboutHero.lead}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import { PersonCard } from "@/components/PersonCard";
import { fundTeam } from "@/lib/content";

/**
 * "The Fund Team" (Figma "Group 21", y4804) — the about page's people grid
 * turned over for the dark ground: a narrow heading column on the left, five
 * portraits and a closing panel on the right.
 *
 * The sixth cell is a #191919 panel rather than a portrait, and it points at
 * the full directory (frame 1078:128, built as /film-fund/team).
 */
export function FundTeam() {
  const { heading, intro, people, more } = fundTeam;

  return (
    <section id="team" className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[77px]">
          <Reveal className="flex flex-col gap-1 lg:w-[320px] lg:shrink-0">
            <h2 className="heading-section text-white">{heading}</h2>
            <p className="body-md leading-6 text-white/60">{intro}</p>
          </Reveal>

          {/* Figma: 16px between columns, 32px between rows. */}
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {people.map((person, i) => (
              <PersonCard
                key={`${person.name}-${i}`}
                person={person}
                delay={i * 60}
                tone="dark"
              />
            ))}

            {/* The closing panel: copy on the top edge, the link centred on the
                base — the frame spaces the two apart rather than stacking them. */}
            <Reveal
              delay={people.length * 60}
              className="reveal-underline flex flex-col justify-between rounded-2xl bg-ink-deep p-6"
            >
              <p className="body-md leading-6 text-white/60">{more.body}</p>
              <AccentLink
                href={more.href}
                className="mt-8 self-center text-white"
                underlineClassName="!h-[7px] w-[125px] text-rust"
              >
                {more.cta}
              </AccentLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

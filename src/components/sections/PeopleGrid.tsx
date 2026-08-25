import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import { PersonCard } from "@/components/PersonCard";
import { aboutAdvisory, aboutTeam } from "@/lib/content";

/**
 * "Team" and "Advisory Board" (Figma "Frame 153"/"Frame 161" + the two Gallery
 * Images Containers): a narrow heading column on the left and a 3×2 card grid
 * on the right, the sixth cell being a panel that points at the rest of the
 * people instead of a portrait.
 *
 * The sixth cell links through to the full directory of that group — the
 * "Team Opened" frame (981:106), built here as /about/team and
 * /about/advisory-board.
 */
const sections = { team: aboutTeam, advisory: aboutAdvisory };

export function PeopleGrid({ section }: { section: keyof typeof sections }) {
  const { heading, intro, people, more } = sections[section];

  return (
    <section className="relative">
      <Container className="relative z-10 pb-12 pt-16 md:pt-[112px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[77px]">
          <Reveal className="flex flex-col gap-2.5 lg:w-[320px] lg:shrink-0">
            <h2 className="heading-section text-ink">{heading}</h2>
            <p className="body-md leading-6 text-ink/60">{intro}</p>
          </Reveal>

          {/* Figma: 16px between columns, 32px between rows. */}
          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
            {people.map((person, i) => (
              <PersonCard key={`${person.name}-${i}`} person={person} delay={i * 60} />
            ))}

            <Reveal
              delay={people.length * 60}
              className="reveal-underline flex flex-col justify-between rounded-2xl bg-card p-6"
            >
              <p className="body-md leading-6 text-ink/60">{more.body}</p>
              <AccentLink href={more.href} className="mt-8">
                {more.cta}
              </AccentLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

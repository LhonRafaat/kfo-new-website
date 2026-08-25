import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AccentLink } from "@/components/ui/AccentLink";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { aboutAdvisory, aboutTeam, type Person } from "@/lib/content";

/**
 * "Team" and "Advisory Board" (Figma "Frame 153"/"Frame 161" + the two Gallery
 * Images Containers): a narrow heading column on the left and a 3×2 card grid
 * on the right, the sixth cell being a panel that points at the rest of the
 * people instead of a portrait.
 *
 * Hovering a card fades an ink wash over the portrait carrying that person's
 * biography — Figma draws card 2 of the team grid in that state. The cards are
 * focusable so the bio is reachable by keyboard, and a tap opens it on touch,
 * where there is no hover at all.
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

function PersonCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col gap-4">
      <div
        tabIndex={0}
        className="group relative aspect-253/301 overflow-hidden rounded-2xl bg-ink/10 outline-offset-4"
      >
        <Image
          src={person.image}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 253px"
          className="object-cover object-center"
        />

        {/* Figma "Frame 212": the portrait under a 72% ink wash, the biography
            inset 24px from the top-left and the link on the base line. */}
        <div className="crossfade absolute inset-0 flex flex-col justify-between bg-ink/72 p-6 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
          <p className="max-w-[170px] font-sans text-base leading-6 text-white">
            {person.bio}
          </p>
          <span className="font-serif text-lg font-medium italic capitalize leading-[1.14] tracking-label text-white">
            Read Biography
            {/* Drawn out in full: this rule arrives with the wash rather than
                on the scroll reveal every other underline uses. */}
            <Underline
              className="!mt-1 !h-[5px] w-[129px]"
              style={{ clipPath: "inset(0 0 0 0)" }}
            />
          </span>
        </div>
      </div>

      <div>
        <p className="font-sans text-base font-semibold uppercase leading-[1.4] tracking-label text-espresso">
          {person.name}
        </p>
        <p className="font-sans text-base leading-6 text-ink/60">
          {person.role}
        </p>
      </div>
    </Reveal>
  );
}

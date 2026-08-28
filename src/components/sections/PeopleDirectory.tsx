import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { CaretRight } from "@/components/icons";
import { PersonCard } from "@/components/PersonCard";
import { aboutAdvisory, aboutTeam, fundTeamPage } from "@/lib/content";

/**
 * The full directory behind a "Meet our team" card (Figma "Team Opened",
 * 981:106, and the film fund's copy of it, 1078:128): a centred back-link and
 * heading over a four-up grid of the same portrait cards.
 *
 * Figma mocks each grid with twelve cards, all repeats of its four placeholder
 * people — it is a layout study, not a roster — so this renders whatever the
 * group actually holds and stays centred at any count.
 */
const sections = {
  team: {
    heading: aboutTeam.heading,
    people: aboutTeam.people,
    back: { href: "/about", label: "Back to About" },
    tone: "light",
  },
  advisory: {
    heading: aboutAdvisory.heading,
    people: aboutAdvisory.people,
    back: { href: "/about", label: "Back to About" },
    tone: "light",
  },
  fund: {
    heading: fundTeamPage.heading,
    people: fundTeamPage.people,
    back: { href: "/film-fund", label: fundTeamPage.backLabel },
    tone: "dark",
  },
} as const;

export function PeopleDirectory({
  section,
}: {
  section: keyof typeof sections;
}) {
  const { heading, people, back, tone } = sections[section];
  const dark = tone === "dark";

  return (
    <Container className="relative z-10 pb-24 pt-12">
      <Reveal className="flex justify-center">
        <Link
          href={back.href}
          className={`flex items-center gap-2 font-sans text-base font-semibold uppercase tracking-label opacity-64 transition-opacity duration-300 hover:opacity-100 ${
            dark ? "text-white" : "text-espresso"
          }`}
        >
          <CaretRight className="h-5 w-5 rotate-180" />
          {back.label}
        </Link>
      </Reveal>

      <Reveal
        as="h1"
        delay={60}
        className={`heading-section mt-10 text-center ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {heading}
      </Reveal>

      {/* Figma centres the grid in the content column: four 253px cards, 16px
          apart, so the row measures 1060. */}
      <div className="mt-12 flex justify-center">
        <div className="grid w-full max-w-[1060px] grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {people.map((person, i) => (
            <PersonCard
              key={`${person.name}-${i}`}
              person={person}
              delay={i * 60}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

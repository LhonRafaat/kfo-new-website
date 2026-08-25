import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Underline } from "@/components/icons";
import { type Person } from "@/lib/content";

/**
 * One person in the about page's grids and in the full team/advisory
 * directories (Figma "Testimonial Left", 253×363): a 253×301 portrait with the
 * name and role under it.
 *
 * Hovering fades an ink wash over the portrait carrying that person's
 * biography — Figma draws card 2 of the team grid in that state. The card is
 * focusable so the bio is reachable by keyboard, and a tap opens it on touch,
 * where there is no hover at all.
 */
export function PersonCard({
  person,
  delay = 0,
}: {
  person: Person;
  delay?: number;
}) {
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

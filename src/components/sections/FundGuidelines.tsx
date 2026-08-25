import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { ArrowRightRow } from "@/components/icons";
import { fundGuidelines } from "@/lib/content";

/**
 * "Application Guidelines" (Figma "Frame 223" + "Frame 239"): a narrow intro
 * column beside four display-sized rows, each with an arrow at the far right
 * and a hairline under it.
 *
 * Only "Guidelines & Templates" has a page in the design; the other three are
 * still awaiting their content, so they render as plain rows with the arrow
 * dimmed rather than as links to nowhere.
 */
export function FundGuidelines() {
  return (
    <section className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[181px]">
          <Reveal className="flex max-w-[360px] flex-col gap-4 lg:shrink-0">
            <h2 className="heading-section text-white">
              {fundGuidelines.heading}
            </h2>
            <p className="font-sans text-base leading-[1.6] text-slate">
              {fundGuidelines.intro}
            </p>
          </Reveal>

          <ul className="flex flex-1 flex-col">
            {fundGuidelines.rows.map((row, i) => {
              const inner = (
                <>
                  <span className="font-serif text-[2rem] font-medium leading-[1.14] md:text-[3.5rem]">
                    {row.title}
                  </span>
                  <ArrowRightRow
                    className={`mt-2 h-8 w-8 shrink-0 transition-transform duration-300 md:mt-4 ${
                      row.href ? "group-hover:translate-x-1" : "opacity-40"
                    }`}
                  />
                </>
              );
              const rowClass = `flex w-full items-start justify-between gap-6 py-5 text-left text-white ${
                i > 0 ? "border-t border-white/15" : ""
              }`;

              return (
                <Reveal as="li" key={row.title} delay={i * 70}>
                  {row.href ? (
                    <Link
                      href={row.href}
                      className={`group ${rowClass} transition-opacity duration-300 hover:opacity-75`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    /* No destination yet — see the COPY NOTE in content.ts. */
                    <div className={rowClass} aria-disabled>
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

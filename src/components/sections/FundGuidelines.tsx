import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { ArrowRightRow } from "@/components/icons";
import { fundGuidelines } from "@/lib/content";

/**
 * "Fund Guidelines: Recourses & Governance" (Figma "Rectangle 20" + "Frame
 * 223" + "Frame 239"): a 1184×240 band of the mountain photo carrying the
 * display heading in ink, with the four regulation sets listed full-width
 * underneath.
 *
 * The band's copy runs in espresso rather than white — like the application
 * card, this is the one other block whose ground is bright sky.
 *
 * Only "Guidelines & Templates" has a page in the design; the other three are
 * still awaiting their content, so they render as plain rows with the arrow
 * dimmed rather than as links to nowhere.
 */
export function FundGuidelines() {
  return (
    <section id="guidelines" className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="relative isolate overflow-hidden rounded-2xl">
          <Image
            src={fundGuidelines.image.src}
            alt={fundGuidelines.image.alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1184px"
            className="-z-10 object-cover object-top"
          />
          {/* 240 tall in the frame, with its content inset 32px. */}
          <div className="flex flex-col gap-4 px-6 py-8 text-espresso sm:px-8 md:flex-row md:p-8 lg:min-h-[240px]">
            <h2 className="flex-1 font-serif text-[2rem] font-medium leading-[1.14] md:text-[2.75rem] lg:text-[3.5rem]">
              {fundGuidelines.heading}
              <br />
              {fundGuidelines.headingLine2}
            </h2>
            <p className="font-sans text-base leading-[1.6] md:w-[493px] md:shrink-0">
              {fundGuidelines.intro}
            </p>
          </div>
        </Reveal>

        {/* The rows are inset 32px against the band above them. */}
        <ul className="mt-12 flex flex-col md:px-8">
          {fundGuidelines.rows.map((row, i) => {
            const inner = (
              <>
                <span className="font-serif text-[1.75rem] font-medium leading-[1.14] md:text-[2.5rem]">
                  {row.title}
                </span>
                <ArrowRightRow
                  className={`h-8 w-8 shrink-0 transition-transform duration-300 ${
                    row.href ? "group-hover:translate-x-1" : "opacity-40"
                  }`}
                />
              </>
            );
            /* Every row carries the hairline on its BOTTOM edge in the frame,
               the last one included — so the list closes on a rule. The first
               row alone has no padding above it. */
            const rowClass = `flex w-full items-center justify-between gap-6 border-b border-white/15 pb-5 text-left text-white ${
              i > 0 ? "pt-5" : ""
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
      </Container>
    </section>
  );
}

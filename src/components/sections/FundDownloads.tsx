import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { ArrowLineDown } from "@/components/icons";
import { fundDownloadsPage } from "@/lib/content";

/**
 * The seven document rows on /film-fund/guidelines (Figma 939:110, "Frame
 * 239") — the same display rows as the fund page's guideline links, with a
 * download arrow instead of a chevron.
 *
 * None of the PDFs exist yet, so a row without a `file` renders with its arrow
 * dimmed rather than linking nowhere; see the note in content.ts.
 */
export function FundDownloads() {
  return (
    <Container className="relative z-10 pb-24">
      <ul className="flex flex-col">
        {fundDownloadsPage.rows.map((row, i) => {
          const inner = (
            <>
              <span className="font-serif text-[2rem] font-medium leading-[1.14] md:text-[3.5rem]">
                {row.title}
              </span>
              <ArrowLineDown
                className={`mt-2 h-8 w-8 shrink-0 transition-transform duration-300 md:mt-4 ${
                  row.file ? "group-hover:translate-y-1" : "opacity-40"
                }`}
              />
            </>
          );
          const rowClass = `flex w-full items-start justify-between gap-6 py-5 text-left text-white ${
            i > 0 ? "border-t border-white/15" : ""
          }`;

          return (
            <Reveal as="li" key={row.title} delay={i * 60}>
              {row.file ? (
                <a
                  href={row.file}
                  download
                  className={`group ${rowClass} transition-opacity duration-300 hover:opacity-75`}
                >
                  {inner}
                </a>
              ) : (
                <div className={rowClass} aria-disabled>
                  {inner}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </Container>
  );
}

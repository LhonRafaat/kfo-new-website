import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { fundTimeline } from "@/lib/content";

/** Figma paints the dots in its own rust, not the site's accent orange. */
const DOT = "#CA4A2F";

/**
 * "Fund Cycle Timeline" (Figma "Group 20"): six milestones threaded on a line
 * that runs the full width of the page — the 2026 cycle labelled under it, the
 * 2027 cycle over it, and the two announcement dots drawn at twice the size.
 *
 * The line is only meaningful when the whole run is visible at once, so below
 * `md` it turns and the milestones stack down a rail instead of squeezing six
 * columns into a phone.
 */
export function FundTimeline() {
  return (
    <section className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="flex max-w-[387px] flex-col gap-4">
          <h2 className="heading-section text-white">{fundTimeline.heading}</h2>
          <p className="font-sans text-base leading-[1.6] text-slate">
            {fundTimeline.intro}
          </p>
        </Reveal>
      </Container>

      {/* ---- md+: the horizontal line, full-bleed as in the frame ---- */}
      <Reveal className="relative mt-10 hidden h-[250px] w-full md:block">
        <div className="absolute inset-x-0 top-1/2 h-px bg-espresso/80" aria-hidden />
        <ol className="absolute inset-0 grid grid-cols-6">
          {fundTimeline.milestones.map((m, i) => (
            <li key={`${m.label}-${i}`} className="relative">
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: DOT,
                  width: m.major ? 64 : 32,
                  height: m.major ? 64 : 32,
                }}
              />
              <div
                className={`absolute left-1/2 w-[148px] -translate-x-1/2 text-center ${
                  m.above ? "bottom-1/2" : "top-1/2"
                }`}
                style={{
                  [m.above ? "marginBottom" : "marginTop"]: m.major ? 44 : 31,
                }}
              >
                <Label {...m} />
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* ---- below md: the same run, turned on its side ---- */}
      <Container className="relative z-10 mt-10 md:hidden">
        <ol className="relative flex flex-col gap-8">
          {/* The rail runs down x=7, and every dot is centred on it. */}
          <div
            className="absolute bottom-3 left-[7px] top-3 w-px bg-espresso/80"
            aria-hidden
          />
          {fundTimeline.milestones.map((m, i) => {
            const size = m.major ? 24 : 14;
            return (
              <Reveal
                as="li"
                key={`${m.label}-${i}`}
                delay={i * 60}
                className="relative pl-10"
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 rounded-full"
                  style={{
                    background: DOT,
                    width: size,
                    height: size,
                    left: 7 - size / 2,
                  }}
                />
                <Label {...m} />
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

function Label({ label, date }: { label: string; date: string }) {
  return (
    <>
      <p className="font-serif text-lg font-medium leading-[1.5] text-white">
        {label}
      </p>
      <p className="whitespace-pre-line font-sans text-base leading-6 text-white">
        {date}
      </p>
    </>
  );
}

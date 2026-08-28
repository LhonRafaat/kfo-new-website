import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { fundTimeline } from "@/lib/content";

/* Figma's "Group 19": six 148px columns with 48px between them — 1128px of
   run, centred in the 1280 frame — over a hairline that goes edge to edge.
   Each dot is centred on that line and its label sits 16px clear of the dot,
   which puts the 2026 cycle under the line and the 2027 cycle over it. */
const DOT_SIZE = { minor: 32, major: 64 };
const LABEL_GAP = 16;

export function FundTimeline() {
  return (
    <section id="cycle-timeline" className="relative">
      <Container className="relative z-10 pt-24 md:pt-40">
        <Reveal className="flex max-w-[387px] flex-col gap-4">
          <h2 className="heading-section text-white">{fundTimeline.heading}</h2>
          <p className="font-sans text-base leading-[1.6] text-slate">
            {fundTimeline.intro}
          </p>
        </Reveal>
      </Container>

      {/* ---- md+: the horizontal run, the line full-bleed as in the frame ---- */}
      <Reveal className="relative mt-[34px] hidden h-[250px] w-full md:block">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-cocoa/80"
          aria-hidden
        />
        <Container className="h-full">
          {/* 1128px at the design width, so the columns measure Figma's 148. */}
          <ol className="mx-auto grid h-full max-w-[1128px] grid-cols-6 gap-x-12">
            {fundTimeline.milestones.map((m, i) => {
              const size = m.major ? DOT_SIZE.major : DOT_SIZE.minor;
              const offset = size / 2 + LABEL_GAP;
              return (
                <li key={`${m.label}-${i}`} className="relative">
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust"
                    style={{ width: size, height: size }}
                  />
                  <div
                    className={`absolute left-1/2 w-full -translate-x-1/2 text-center ${
                      m.above ? "bottom-1/2" : "top-1/2"
                    }`}
                    style={{
                      [m.above ? "marginBottom" : "marginTop"]: offset,
                    }}
                  >
                    <Label {...m} />
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Reveal>

      {/* ---- below md: the same run, turned on its side ---- */}
      <Container className="relative z-10 mt-10 md:hidden">
        <ol className="relative flex flex-col gap-8">
          {/* The rail runs down x=7, and every dot is centred on it. */}
          <div
            className="absolute bottom-3 left-[7px] top-3 w-px bg-cocoa/80"
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
                  className="absolute top-1.5 rounded-full bg-rust"
                  style={{
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

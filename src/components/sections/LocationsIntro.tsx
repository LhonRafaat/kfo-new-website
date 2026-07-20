import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";

/**
 * Opening block of the location database page: eyebrow, split-italic headline,
 * and the right-aligned copy column. The flowing line behind it is drawn by the
 * page, so it can run across both this block and the map below.
 */
export function LocationsIntro() {
  return (
    <Container className="relative z-10 pt-16 md:pt-24">
      <Reveal as="div">
        <Eyebrow>Database Access Required</Eyebrow>
      </Reveal>

      <Reveal as="h1" delay={60} className="display-lg mt-4 text-ink">
        Explore our
        <br />
        <em className="italic">Location Database</em>
        <span className="font-normal italic">.</span>
      </Reveal>

      {/* Figma right-aligns this column at 650px inside the 1184px container */}
      <div className="mt-6 flex justify-end">
        <Reveal as="div" delay={120} className="max-w-[650px] space-y-2">
          <p className="font-serif text-2xl font-medium leading-[1.25] text-ink">
            We offer you the largest location database{" "}
            <em className="italic">in the Kurdistan Region</em>.
          </p>
          <p className="body-lg leading-[1.5]">
            We also add new locations regularly. If you cannot find the location
            you are looking for, do not hesitate to contact us.
          </p>
          <p className="body-lg leading-[1.5]">
            If you are based in Kurdistan and would like to add your property or
            have any other location you would like to add, do not hesitate to
            reach out to us.
          </p>
        </Reveal>
      </div>
    </Container>
  );
}

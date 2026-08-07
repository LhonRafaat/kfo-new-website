import { Fragment, type ReactNode } from "react";

/**
 * Renders a CMS string's newlines as `<br />`.
 *
 * The design breaks several headings at a specific word — "The New Filming /
 * Destination in the / Mena Region" — so those breaks are authored into the
 * field rather than left to the browser. Where the emphasised run goes (its own
 * line, or inline after a space) stays with the component, since that is the
 * Figma's layout rather than the editor's copy.
 */
export function lines(text: string | null | undefined): ReactNode {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

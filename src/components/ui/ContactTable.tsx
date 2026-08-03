import { Fragment } from "react";

export type ContactTableRow = {
  label: string;
  /** Single-line value; sits on the label's base line. */
  value?: string;
  /** Wraps the value in a link — `mailto:` / `tel:` / anything external. */
  href?: string;
  /** Multi-line value (an address); top-aligned and right-ragged instead. */
  lines?: string[];
  /** Caps the value column so a long address wraps where the Figma wraps it. */
  valueWidth?: string;
};

/**
 * The label/value table both the agency detail page (Figma 507:1047) and the
 * contact page (541:2415) put under their content: full-width rows separated
 * by hairlines at 16% black, 18px serif labels against 16px sans values, 16px
 * either side of every rule and 12px of padding at the foot.
 */
export function ContactTable({
  rows,
  className = "",
}: {
  rows: ContactTableRow[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 pb-3 ${className}`}>
      {rows.map((row) => (
        <ContactRow key={row.label} {...row} />
      ))}
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  lines,
  valueWidth,
}: ContactTableRow) {
  const body = lines ? (
    <span className="text-right">
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </span>
  ) : href ? (
    <a href={href} className="transition-colors duration-300 hover:text-accent">
      {value}
    </a>
  ) : (
    value
  );

  return (
    <div className="relative pt-4">
      {/* Figma draws these as zero-height LINE nodes; positioning the hairline
          absolutely keeps the 16px above the row exactly 16px. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-black/16" />
      <div
        className={`flex justify-between gap-8 px-4 ${
          lines ? "items-start" : "items-end"
        }`}
      >
        <span className="font-serif text-lg font-medium leading-normal text-ink">
          {label}
        </span>
        <span
          className="text-right font-sans text-base font-medium leading-6 text-ink"
          style={valueWidth ? { maxWidth: valueWidth } : undefined}
        >
          {body}
        </span>
      </div>
    </div>
  );
}

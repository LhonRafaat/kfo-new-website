"use client";

import { useId, useState } from "react";
import { CaretRight, Underline } from "@/components/icons";
import { fundAbout, fundFaq } from "@/lib/content";

/**
 * The two disclosure lists on the film fund page (Figma "Frame 238" and the
 * FAQ list): 20px of padding around each row, a hairline of white at 15%
 * between them, and the open row's answer 12px under its question.
 *
 * The FAQ list pages through its questions the way the frame's pager does —
 * five to a page, the current number underlined with the accent squiggle.
 *
 * Takes a group name rather than the rows themselves: data objects exported
 * from a module and handed across the server/client boundary have bitten this
 * codebase before (see `ScrollCurve`'s `variant`).
 */
const groups = {
  about: {
    ...fundAbout,
    titleClass: "font-serif text-xl font-medium leading-[1.14] md:text-2xl",
    bodyClass: "max-w-[545px]",
    perPage: 0,
  },
  faq: {
    ...fundFaq,
    titleClass:
      "max-w-[520px] font-sans text-lg font-semibold leading-[1.4] md:text-xl",
    bodyClass: "max-w-[520px]",
  },
};

export function FundDisclosureList({ group }: { group: keyof typeof groups }) {
  const { items, titleClass, bodyClass, perPage } = groups[group];
  const [open, setOpen] = useState<number | null>(0);
  const [page, setPage] = useState(1);
  const id = useId();

  const pageCount = perPage ? Math.ceil(items.length / perPage) : 1;
  const start = perPage ? (page - 1) * perPage : 0;
  const shown = perPage ? items.slice(start, start + perPage) : items;

  const goTo = (next: number) => {
    setPage(next);
    setOpen(null); // the row that was open is no longer on screen
  };

  return (
    <>
      <ul className="flex flex-col">
        {shown.map((item, i) => {
          const index = start + i;
          const isOpen = index === open;
          return (
            <li key={item.title} className={i > 0 ? "border-t border-white/15" : ""}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel-${index}`}
                  id={`${id}-row-${index}`}
                  className="group flex w-full items-start justify-between gap-6 py-5 text-left text-white"
                >
                  <span className={`${titleClass} transition-opacity duration-300 group-hover:opacity-75`}>
                    {item.title}
                  </span>
                  <CaretRight
                    className={`disclosure-caret mt-1 h-4 w-4 shrink-0 ${
                      isOpen ? "rotate-90" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              </h3>

              <div
                id={`${id}-panel-${index}`}
                role="region"
                aria-labelledby={`${id}-row-${index}`}
                aria-hidden={!isOpen}
                className={`disclosure-panel ${isOpen ? "is-open" : ""}`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`${bodyClass} pb-5 font-sans text-base leading-[1.6] text-slate`}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {pageCount > 1 && (
        <nav
          aria-label="FAQ pages"
          className="mt-6 flex items-center justify-center gap-6 text-white"
        >
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-6 w-6 items-center justify-center disabled:opacity-40"
          >
            <CaretRight className="h-4 w-4 rotate-180" />
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goTo(n)}
              aria-current={n === page ? "page" : undefined}
              className="flex h-6 min-w-6 flex-col items-center justify-center font-sans text-base font-semibold transition-colors duration-300 hover:text-accent"
            >
              {n}
              {/* Figma marks the current page with a 25px squiggle. */}
              <Underline
                /* At 3px tall the default stroke would scale to a hairline —
                   passing the weight pins it to real pixels (see icons.tsx). */
                strokeWidth={1.5}
                className={`!mt-0.5 !h-[3px] w-6 ${n === page ? "" : "!opacity-0"}`}
                style={{ clipPath: "inset(0 0 0 0)" }}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === pageCount}
            aria-label="Next page"
            className="flex h-6 w-6 items-center justify-center disabled:opacity-40"
          >
            <CaretRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </>
  );
}

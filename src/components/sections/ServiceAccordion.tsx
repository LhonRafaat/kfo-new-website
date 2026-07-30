"use client";

import { useId, useState } from "react";
import { CaretRight } from "@/components/icons";
import { serviceCategories, type ServiceCategorySlug } from "@/lib/content";

/**
 * The disclosure list inside a service category (Figma "Frame 121" / "Frame
 * 122"): one row per service, the open one switching to medium italic ink with
 * its paragraph underneath and its caret turned a quarter-turn down. Collapsed
 * rows sit at 48% ink with the caret at 80%, exactly as the Figma has them.
 *
 * Takes a slug rather than the rows themselves: data objects exported from a
 * module and handed across the server/client boundary have bitten this codebase
 * before (see `ScrollCurve`'s `variant`), so client components look their own
 * copy up from `content.ts`.
 */
export function ServiceAccordion({ slug }: { slug: ServiceCategorySlug }) {
  const category = serviceCategories.find((c) => c.slug === slug);
  const [open, setOpen] = useState<number | null>(category?.defaultOpen ?? null);
  const id = useId();

  if (!category) return null;

  return (
    <ul className="flex flex-col gap-6">
      {category.items.map((item, i) => {
        const isOpen = i === open;
        return (
          <li key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                id={`${id}-row-${i}`}
                className="group flex w-full items-center justify-between gap-6 text-left"
              >
                <span
                  className={`disclosure-title font-serif text-[1.375rem] leading-[1.14] ${
                    isOpen
                      ? "font-medium italic text-ink"
                      : "font-normal text-ink/48 group-hover:text-ink/75"
                  }`}
                >
                  {item.title}
                </span>
                <CaretRight
                  className={`disclosure-caret h-4 w-4 shrink-0 text-espresso ${
                    isOpen
                      ? "rotate-90 opacity-100"
                      : "opacity-80 group-hover:translate-x-1"
                  }`}
                />
              </button>
            </h3>

            <div
              id={`${id}-panel-${i}`}
              role="region"
              aria-labelledby={`${id}-row-${i}`}
              aria-hidden={!isOpen}
              className={`disclosure-panel ${isOpen ? "is-open" : ""}`}
            >
              <div className="overflow-hidden">
                <p className="body-md max-w-[460px] pt-6 leading-6">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

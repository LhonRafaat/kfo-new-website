"use client";

import { useState, type FormEvent } from "react";
import {
  CheckIcon,
  LockIcon,
  MailboxIcon,
  NewsletterArrow,
} from "@/components/icons";
import type { LocationsPage } from "@/lib/strapi";

export type AccessStatus = "email" | "sent" | "verified" | "error";

/**
 * The bar the database gate opens (Figma "Bar Statuses", 651:493): a black pill
 * centred 32px above the base of the viewport (its placement comes from
 * "Bar Showing up", 649:452, where it sits at 294/744 of the 1280×832 frame).
 *
 * The design draws three states, all 56px tall with a 20px white icon and
 * 16/24 copy:
 *   email    — lock + the prompt + a white/8 address field with its arrow
 *   sent     — mailbox + "check your email"
 *   verified — check + "you can now check our location database"
 *
 * `error` is a fourth the Figma does not draw, added now that the address goes
 * to a real endpoint that can fail; it reuses the lock and lets the visitor try
 * again rather than leaving the bar stuck on "sent".
 *
 * The address field is the only interactive state; the others are notices.
 */
export function LocationAccessBar({
  status,
  gate,
  onSubmit,
}: {
  status: AccessStatus;
  gate: LocationsPage["gate"];
  onSubmit: (email: string) => void;
}) {
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email.trim());
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex justify-center px-4">
      <div
        role="status"
        // Reuses the dialog's entrance so the bar arrives on the same curve.
        className={`animate-sheet-in pointer-events-auto flex max-w-full items-center gap-2.5 rounded-full bg-black text-white ${
          status === "email" || status === "error"
            ? "py-2 pl-6 pr-3"
            : "px-6 py-4"
        }`}
      >
        {(status === "email" || status === "error") && (
          <>
            <LockIcon className="h-5 w-5 shrink-0" />
            <p className="hidden font-sans text-base leading-6 tracking-label sm:block">
              {status === "error"
                ? "That didn’t go through — try again."
                : gate.prompt}
            </p>
            <form
              onSubmit={submit}
              className="flex h-10 w-60 max-w-full items-center gap-2.5 rounded-full bg-white/8 pl-3 pr-3"
            >
              <label htmlFor="locations-access-email" className="sr-only">
                {gate.prompt}
              </label>
              <input
                id="locations-access-email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={gate.placeholder}
                className="w-full min-w-0 bg-transparent font-sans text-base leading-6 tracking-label text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send the access link"
                className="shrink-0 transition-transform duration-300 ease-out hover:translate-x-0.5"
              >
                {/* The 56×56 carousel arrow renders far too thin inside a
                    16px box — the newsletter export has its own tight viewBox. */}
                <NewsletterArrow className="h-4 w-4 !text-[#FF6600]" />
              </button>
            </form>
          </>
        )}

        {status === "sent" && (
          <>
            <MailboxIcon className="h-5 w-5 shrink-0 !text-[#FF6600]" />
            <p className="font-sans text-base leading-6 tracking-label">
              {gate.sent}
            </p>
          </>
        )}

        {status === "verified" && (
          <>
            <CheckIcon className="h-5 w-5 shrink-0 !text-[#FF6600]" />
            <p className="font-sans text-base leading-6 tracking-label">
              {gate.verified}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { NewsletterArrow } from "@/components/icons";
import { subscribeToNewsletter } from "@/lib/strapi-forms";

/** Newsletter pill (Figma 529:1592): translucent white field, dim label and
 *  arrow that lift to full strength on focus/hover.
 *
 *  The address is written to Strapi's `newsletter-subscriber` collection, which
 *  is write-only over the API — the list is read in the admin panel. A repeat
 *  address comes back as a uniqueness error, which reads as success here: they
 *  are already subscribed. */
export function NewsletterForm({
  placeholder,
  successMessage,
}: {
  placeholder: string;
  successMessage: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = email.trim();
    if (!address || state === "sending") return;

    setState("sending");
    try {
      await subscribeToNewsletter(address);
      setEmail("");
      setState("sent");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (/unique|already/i.test(message)) {
        setEmail("");
        setState("sent");
      } else {
        setState("error");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="group flex w-full max-w-md items-center gap-2 rounded-full bg-white/[0.08] py-3 pl-6 pr-6 transition-colors duration-300 focus-within:bg-white/[0.12]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state !== "idle") setState("idle");
        }}
        placeholder={
          state === "sent"
            ? successMessage
            : state === "error"
              ? "Something went wrong — try again"
              : placeholder
        }
        aria-label="Email address"
        aria-invalid={state === "error"}
        className="w-full bg-transparent font-sans text-xl leading-[1.5] tracking-[0.02em] text-white placeholder:text-white/25 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        aria-label="Subscribe to newsletter"
        className="flex h-6 w-6 shrink-0 items-center justify-center text-white/25 transition-colors duration-300 hover:text-white disabled:opacity-50 group-focus-within:text-white"
      >
        <NewsletterArrow className="h-[14px] w-4" />
      </button>
      <span role="status" className="sr-only">
        {state === "sent" ? successMessage : ""}
      </span>
    </form>
  );
}

"use client";

import { useState } from "react";
import { NewsletterArrow } from "@/components/icons";

/** Newsletter pill (Figma 529:1592): a translucent field with a dim label and
 *  arrow that lift to full strength on focus/hover.
 *
 *  `tone="ink"` is the film fund footer's copy (753:99), where the ground is
 *  slate rather than espresso, so the wash and the type run in ink. */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "ink" }) {
  const ink = tone === "ink";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSent(true);
      }}
      className={`group flex w-full max-w-md items-center gap-2 rounded-full py-3 pl-6 pr-6 transition-colors duration-300 ${
        ink
          ? "bg-espresso/[0.08] focus-within:bg-espresso/[0.12]"
          : "bg-white/[0.08] focus-within:bg-white/[0.12]"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={sent ? "Thank you for subscribing" : "Join Newsletter"}
        aria-label="Email address"
        className={`w-full bg-transparent font-sans text-xl leading-[1.5] tracking-[0.02em] focus:outline-none ${
          ink
            ? "text-espresso placeholder:text-espresso/25"
            : "text-white placeholder:text-white/25"
        }`}
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className={`flex h-6 w-6 shrink-0 items-center justify-center transition-colors duration-300 ${
          ink
            ? "text-espresso/25 hover:text-espresso group-focus-within:text-espresso"
            : "text-white/25 hover:text-white group-focus-within:text-white"
        }`}
      >
        <NewsletterArrow className="h-[14px] w-4" />
      </button>
    </form>
  );
}

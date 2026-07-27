"use client";

import { useState } from "react";
import { NewsletterArrow } from "@/components/icons";

/** Newsletter pill (Figma 529:1592): translucent white field, dim label and
 *  arrow that lift to full strength on focus/hover. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSent(true);
      }}
      className="group flex w-full max-w-md items-center gap-2 rounded-full bg-white/[0.08] py-3 pl-6 pr-6 transition-colors duration-300 focus-within:bg-white/[0.12]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={sent ? "Thank you for subscribing" : "Join Newsletter"}
        aria-label="Email address"
        className="w-full bg-transparent font-sans text-xl leading-[1.5] tracking-[0.02em] text-white placeholder:text-white/25 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="flex h-6 w-6 shrink-0 items-center justify-center text-white/25 transition-colors duration-300 hover:text-white group-focus-within:text-white"
      >
        <NewsletterArrow className="h-[14px] w-4" />
      </button>
    </form>
  );
}

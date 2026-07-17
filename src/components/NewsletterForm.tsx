"use client";

import { useState } from "react";
import { NewsletterArrow } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSent(true);
      }}
      className="group flex w-full max-w-md items-center gap-2 rounded-full border border-white/25 bg-white/5 py-1.5 pl-6 pr-1.5 transition-colors duration-300 focus-within:border-white/50"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={sent ? "Thank you for subscribing" : "Join Newsletter"}
        aria-label="Email address"
        className="w-full bg-transparent py-2 font-sans text-xl text-white placeholder:text-white/60 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe to newsletter"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 hover:scale-105"
      >
        <NewsletterArrow className="h-4 w-4" />
      </button>
    </form>
  );
}

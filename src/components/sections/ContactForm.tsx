"use client";

import { useState, type FormEvent } from "react";
import { Underline } from "@/components/icons";
import { contactPage } from "@/lib/content";

/**
 * The letter form (Figma 541:2351): three underlined fields stacked 32px
 * apart, then the italic serif submit with its hand-drawn rule.
 *
 * The Figma labels sit *on* the rule with no room for typed text above them,
 * so they are the fields' placeholders; a visually-hidden <label> carries the
 * same wording for screen readers.
 *
 * There is no backend on this site, so submitting composes the letter in the
 * visitor's own mail client, addressed to the commission — which is exactly
 * what the page's copy asks for ("please send us a letter if interested").
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${contactPage.email}?subject=${encodeURIComponent(
      `Letter from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="flex flex-col gap-8"
    >
      <Field name="name" label={contactPage.form.name} type="text" />
      <Field name="email" label={contactPage.form.email} type="email" />

      {/* 508:1231 — label, then 96px of room, then the rule. */}
      <div>
        <label htmlFor="contact-message" className="sr-only">
          {contactPage.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={contactPage.form.message}
          className="field-rule h-[119px] w-full resize-none pb-0"
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        {/* `text-left`: a <button> centres its text by UA default, which would
            push the label off the form's left edge. */}
        <button type="submit" className="group inline-flex flex-col pt-4 text-left">
          <span className="font-serif text-xl font-medium italic leading-[1.139] tracking-label text-ink transition-colors duration-300 group-hover:text-accent">
            {contactPage.form.submit}
          </span>
          {/* Figma strokes this rule #645756 rather than the accent (508:1237).
              The wave fills 115 of the SVG's 150-unit box, so a 168px box draws
              the frame's 129px stroke. */}
          <Underline className="mt-1.5 !h-[5px] w-42 text-[#645756] transition-colors duration-300 group-hover:text-accent" />
        </button>

        {sent && (
          <p role="status" className="font-sans text-base text-ink/60">
            Opening your email app — if nothing happens, write to{" "}
            <a
              href={`mailto:${contactPage.email}`}
              className="text-ink underline underline-offset-2"
            >
              {contactPage.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

/** One underlined single-line field (Figma 508:1225 / 508:1228). */
function Field({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: "text" | "email";
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="sr-only">
        {label}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required
        placeholder={label}
        className="field-rule h-[39px] w-full pb-4"
      />
    </div>
  );
}

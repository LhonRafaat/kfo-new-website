"use client";

import { useState } from "react";
import { Underline } from "@/components/icons";
import { ProfileDialog } from "@/components/ProfileDialog";
import { useInView } from "@/lib/useInView";
import { founderMessage } from "@/lib/content";

/**
 * "Read Full Message" on the founder card, and the dialog it opens
 * (Figma "Testimonial Section", 537:1923).
 *
 * The sheet itself lives in `ProfileDialog`, which the person cards' "Read
 * Biography" opens too — this is the one use that carries links out of it.
 */
export function FounderMessage() {
  const [open, setOpen] = useState(false);
  // Same observer as every other reveal, so the trigger's underline draws in
  // with the copy above it. Doubles as the element focus returns to on close.
  const [triggerRef, visible] = useInView<HTMLButtonElement>();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`accent-link text-left ${visible ? "is-visible" : ""}`}
      >
        <span className="flex flex-col">
          <span>Read Full Message</span>
          <Underline />
        </span>
      </button>

      <ProfileDialog
        open={open}
        onClose={() => setOpen(false)}
        returnFocusRef={triggerRef}
        image={founderMessage.image}
        name={founderMessage.name}
        title={founderMessage.title}
        heading={
          <>
            {founderMessage.heading}
            <em className="font-normal italic">
              {founderMessage.headingItalic}
            </em>
          </>
        }
        body={founderMessage.body}
        links={[
          founderMessage.linkedin,
          {
            label: founderMessage.readStatement,
            href: founderMessage.linkedin.href,
          },
        ]}
        closeLabel="Close the founder's message"
      />
    </>
  );
}

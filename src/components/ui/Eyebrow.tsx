import { type ReactNode } from "react";

export function Eyebrow({
  children,
  variant = "solid",
  className = "",
}: {
  children: ReactNode;
  variant?: "solid" | "light";
  className?: string;
}) {
  return (
    <span className={`${variant === "light" ? "eyebrow-light" : "eyebrow"} ${className}`}>
      {children}
    </span>
  );
}

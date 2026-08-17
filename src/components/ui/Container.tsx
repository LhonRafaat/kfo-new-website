import { type ElementType, type ReactNode } from "react";

export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  console.log("hu");
  return <Tag className={`container-edge ${className}`}>{children}</Tag>;
}

"use client";

import type { AriaRole, CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export type RevealDelayClass =
  | "reveal--delay-1"
  | "reveal--delay-2"
  | "reveal--delay-3"
  | "reveal--delay-4";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delayClass?: RevealDelayClass;
  as?: "div" | "article" | "span";
  role?: AriaRole;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className = "",
  delayClass,
  as: Tag = "div",
  role,
  style,
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const delay = delayClass ? ` ${delayClass}` : "";
  return (
    <Tag
      ref={ref as never}
      className={`reveal${delay} ${className}`.trim()}
      role={role}
      style={style}
    >
      {children}
    </Tag>
  );
}

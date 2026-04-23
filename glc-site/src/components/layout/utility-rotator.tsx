"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
};

export function UtilityRotator({ lines, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, 4800);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className={className ?? "gl-util-rotator"} aria-live="polite">
      {lines.map((line, i) => (
        <span
          key={line}
          className={`gl-util-rotator__line${i === index ? " is-visible" : ""}`}
        >
          {line}
        </span>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, type RevealDelayClass } from "@/components/ui/reveal";
import type { StatCellProps } from "@/content/types";

type Props = StatCellProps & {
  delayClass?: RevealDelayClass;
};

export function StatCellAnimated({
  target,
  afterNumber,
  format,
  label,
  sub,
  delayClass,
}: Props) {
  const [value, setValue] = useState(0);
  const numHostRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = numHostRef.current?.closest(".stat-cell");
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1800;
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.floor(eased * target);
        setValue(progress < 1 ? current : target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <Reveal delayClass={delayClass} className="stat-cell">
      <span
        ref={numHostRef}
        className="stat-cell__num"
        data-target={target}
        data-format={format ?? afterNumber}
      >
        <span>{value}</span>
        <span style={{ color: "var(--yellow-core)" }}>{afterNumber}</span>
      </span>
      <span className="stat-cell__label">{label}</span>
      <span className="stat-cell__sub">{sub}</span>
    </Reveal>
  );
}

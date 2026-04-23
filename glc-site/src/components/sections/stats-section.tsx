import type { StatsProps } from "@/content/types";
import { StatCellAnimated } from "@/components/ui/stat-cell-animated";

export function StatsSection({ cells }: StatsProps) {
  const delays = [
    undefined,
    "reveal--delay-1",
    "reveal--delay-2",
    "reveal--delay-3",
  ] as const;

  return (
    <section id="stats" aria-label="Company statistics">
      {/* Yellow punctuation rail */}
      <div className="st3__top-rail" aria-hidden />

      <div className="st3__inner">
        {/* Vertical side label */}
        <div className="st3__side-label" aria-hidden>
          <span>Performance</span>
        </div>

        {/* 4-cell grid */}
        <div className="st3__grid">
          {cells.map((cell, i) => (
            <StatCellAnimated
              key={cell.label}
              {...cell}
              delayClass={delays[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

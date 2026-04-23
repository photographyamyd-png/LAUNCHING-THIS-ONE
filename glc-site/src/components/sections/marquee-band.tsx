import type { MarqueeProps } from "@/content/types";

export function MarqueeBand({ items }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  );
}

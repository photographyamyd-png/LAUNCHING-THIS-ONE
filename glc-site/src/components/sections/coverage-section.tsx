import { Reveal } from "@/components/ui/reveal";
import type { CoverageProps } from "@/content/types";

/** Dark-band coverage block — GLC tokens, 3-plane layout (see .cursorrules Part 4 / Part 5). */
export function CoverageSection(props: CoverageProps) {
  return (
    <section
      id="coverage"
      className="coverage relative overflow-hidden"
      style={{
        /* Inline ground plane so the band always reads in Next dev + Tailwind layer order */
        backgroundColor: "var(--charcoal)",
        color: "var(--white)",
        paddingTop: "var(--section-v)",
        paddingBottom: "var(--section-v)",
      }}
      aria-labelledby="coverage-heading"
    >
      {/* STRUCTURE: top accent + radial glow (see .coverage__fx-* in glc-base.css) */}
      <span aria-hidden className="coverage__fx-radial" />
      <span aria-hidden className="coverage__fx-topbar" />
      <div className="coverage__inner relative z-[1]">
        <div className="coverage__label-col">
          <div className="coverage__intro">
            <Reveal className="eyebrow coverage__eyebrow">{props.eyebrow}</Reveal>
            <Reveal delayClass="reveal--delay-1">
              <h2 id="coverage-heading" className="coverage__heading">
                {props.headingBefore}
                <em>{props.headingEmphasis}</em>
                {props.headingAfter}
              </h2>
            </Reveal>
            <Reveal delayClass="reveal--delay-2">
              <p className="coverage__body">{props.body}</p>
            </Reveal>
          </div>
        </div>
        <Reveal delayClass="reveal--delay-2" className="coverage__areas">
          {props.areas.map((a) => (
            <div key={a.name} className="coverage__area">
              <div className="coverage__area-dot" aria-hidden />
              <div className="coverage__area-text">
                <div className="coverage__area-name">{a.name}</div>
                <div className="coverage__area-sub">{a.sub}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

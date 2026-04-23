import type { SubServiceSection } from "@/components/services/service-layout-variants";

function tabLabel(heading: string): string {
  const t = heading.trim();
  if (t.length <= 36) return t;
  return `${t.slice(0, 33)}…`;
}

type Props = {
  sections: SubServiceSection[];
};

/** Sticky in-page jump links for capability blocks — pairs with scope strip / hash scroll. */
export function ServiceCapabilityStickyNav({ sections }: Props) {
  if (sections.length === 0) return null;
  return (
    <div className="service-cap-sticky-nav" role="navigation" aria-label="Jump to capability sections">
      <div className="service-cap-sticky-nav__inner">
        <span className="service-cap-sticky-nav__kicker">Capabilities</span>
        <div className="service-cap-sticky-nav__track">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="service-cap-sticky-nav__tab">
              {tabLabel(s.heading)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

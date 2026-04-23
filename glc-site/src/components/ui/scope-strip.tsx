import type { ServiceScopeStripLink } from "@/content/types";

type Props = {
  links: ServiceScopeStripLink[];
  ariaLabel?: string;
};

export function ScopeStrip({
  links,
  ariaLabel = "On-page sections",
}: Props) {
  return (
    <nav className="gl-scope-strip" aria-label={ariaLabel}>
      <div className="gl-scope-strip__inner">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="gl-scope-strip__link">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

type Props = { slug: string; className?: string };

export function ServiceCardIcon({ slug, className = "service-card__icon" }: Props) {
  const common = {
    className,
    viewBox: "0 0 40 40",
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 2,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "excavation-site-prep":
      return (
        <svg {...common}>
          <path d="M5 30L20 8l15 22H5z" />
          <rect x="14" y="20" width="12" height="10" />
        </svg>
      );
    case "foundations-civil":
      return (
        <svg {...common}>
          <rect x="6" y="22" width="28" height="12" />
          <rect x="10" y="14" width="20" height="10" />
          <line x1="18" y1="6" x2="18" y2="14" />
          <line x1="22" y1="6" x2="22" y2="14" />
        </svg>
      );
    case "septic-utilities":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="10" />
          <path d="M20 10V4M20 36v-6M10 20H4M36 20h-6" />
        </svg>
      );
    case "site-preparation-grading":
      return (
        <svg {...common}>
          <path d="M4 26 L36 26" strokeLinecap="square" />
          <path d="M6 18 L34 22" strokeLinecap="square" />
          <path d="M8 10 L32 16" strokeLinecap="square" />
        </svg>
      );
    case "drainage-hardscaping":
      return (
        <svg {...common}>
          <path
            d="M4 28 Q12 18 20 22 Q28 26 36 16"
            strokeLinecap="square"
          />
          <path
            d="M4 34 Q12 24 20 28 Q28 32 36 22"
            strokeDasharray="3 3"
          />
          <rect x="4" y="30" width="32" height="6" />
        </svg>
      );
    case "hauling-clearing":
      return (
        <svg {...common}>
          <rect x="4" y="22" width="32" height="12" />
          <path d="M10 22V18l6-8h8l6 8v4" />
          <rect x="14" y="26" width="12" height="8" />
        </svg>
      );
    case "snow-removal":
      return (
        <svg {...common}>
          <path
            d="M4 16 C8 8 16 4 24 6 S36 14 36 20"
            strokeLinecap="square"
          />
          <path d="M10 30 L30 30" strokeWidth="3" strokeLinecap="square" />
          <path d="M6 24 L34 24" strokeDasharray="4 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="8" y="8" width="24" height="24" />
        </svg>
      );
  }
}

/** Inline SVGs match [index.html] hero__service-bar. */
export function HeroServiceIcon({ slug }: { slug: string }) {
  const c = "hero__service-icon";
  switch (slug) {
    case "excavation-site-prep":
      return (
        <svg className={c} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M5 30L20 8l15 22H5z" />
          <rect x="14" y="20" width="12" height="10" />
        </svg>
      );
    case "foundations-civil":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <rect x="6" y="20" width="28" height="14" stroke="currentColor" fill="none" strokeWidth="2.5" />
          <rect x="10" y="14" width="20" height="8" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>
      );
    case "septic-utilities":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r="10" stroke="currentColor" fill="none" strokeWidth="2.5" />
          <path d="M20 10V4M20 36v-6M10 20H4M36 20h-6" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "site-preparation-grading":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <path d="M4 26 L36 26" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M6 18 L34 22" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="square" />
          <path d="M8 10 L32 16" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="square" />
        </svg>
      );
    case "drainage-hardscaping":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <path d="M4 28 Q12 18 20 22 Q28 26 36 16" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M4 34 Q12 24 20 28 Q28 32 36 22" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>
      );
    case "hauling-clearing":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <rect x="4" y="22" width="32" height="12" stroke="currentColor" fill="none" strokeWidth="2.5" />
          <path d="M10 22V18l6-8h8l6 8v4" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>
      );
    case "snow-removal":
      return (
        <svg className={c} viewBox="0 0 40 40" aria-hidden>
          <path d="M4 20 C8 12 16 8 24 10 S36 18 36 24" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="square" />
          <path d="M10 30 L30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
        </svg>
      );
    default:
      return <ServiceCardIcon slug={slug} className={c} />;
  }
}

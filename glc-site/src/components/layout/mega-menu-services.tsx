import { SmartLink } from "@/components/ui/smart-link";
import { ROUTES } from "@/lib/routes";
import type { NavigationConfig } from "@/content/types";

type Props = {
  mega: NavigationConfig["megaMenu"];
  megaIntro: string;
  megaViewHref: string;
  megaViewLabel: string;
};

export function MegaMenuServices({
  mega,
  megaIntro,
  megaViewHref,
  megaViewLabel,
}: Props) {
  return (
    <div className="gl-mega-panel__inner">
      <div className="gl-mega-panel__intro">
        <span className="gl-mega-panel__kicker">{mega.kicker}</span>
        <p>{megaIntro}</p>
        <SmartLink href={megaViewHref} className="btn-primary">
          {megaViewLabel}
        </SmartLink>
      </div>
      <div className="gl-mega-grid">
        {mega.cards.map((c) => (
          <SmartLink
            key={c.slug}
            className="gl-mega-card"
            href={ROUTES.service(c.slug)}
          >
            <span className="gl-mega-card__num">{c.num}</span>
            <span className="gl-mega-card__title">{c.title}</span>
            <span className="gl-mega-card__desc">{c.description}</span>
          </SmartLink>
        ))}
      </div>
    </div>
  );
}

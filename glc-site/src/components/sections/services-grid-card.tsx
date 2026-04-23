"use client";

import { SmartLink } from "@/components/ui/smart-link";
import { IconArrowSmall } from "@/components/ui/icon-arrow";
import { ServiceCardIcon } from "@/components/sections/service-card-icon";
import { useReveal } from "@/hooks/use-reveal";
import type { MegaMenuCard } from "@/content/types";
import { ROUTES } from "@/lib/routes";
import type { RevealDelayClass } from "@/components/ui/reveal";

type Props = {
  card: MegaMenuCard;
  delayClass?: RevealDelayClass;
};

export function ServicesGridCard({ card, delayClass }: Props) {
  const ref = useReveal<HTMLAnchorElement>();
  const delay = delayClass ? ` ${delayClass}` : "";
  return (
    <SmartLink
      href={ROUTES.service(card.slug)}
      className={`service-card reveal${delay}`.trim()}
      role="listitem"
      ref={ref}
    >
      <div className="service-card__num" aria-hidden="true">
        {card.num}
      </div>
      <ServiceCardIcon slug={card.slug} />
      <h3 className="service-card__title">
        {card.gridTitle.map((line, i) => (
          <span key={`${card.slug}-${i}`}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </h3>
      <p className="service-card__desc">{card.gridDescription}</p>
      <span className="service-card__link">
        Learn More
        <IconArrowSmall />
      </span>
    </SmartLink>
  );
}

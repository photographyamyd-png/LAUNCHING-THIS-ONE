import { Reveal } from "@/components/ui/reveal";
import { ServicesGridCard } from "@/components/sections/services-grid-card";
import type { MegaMenuCard, ServicesSectionProps } from "@/content/types";
import type { RevealDelayClass } from "@/components/ui/reveal";

const delayFor = (i: number): RevealDelayClass | undefined => {
  if (i % 3 === 1) return "reveal--delay-1";
  if (i % 3 === 2) return "reveal--delay-2";
  return undefined;
};

type Props = ServicesSectionProps & { cards: MegaMenuCard[] };

export function ServicesGridSection({ cards, ...props }: Props) {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="services__header">
        <div>
          <Reveal className="eyebrow eyebrow--dark" style={{ marginBottom: 16 }}>
            {props.eyebrow}
          </Reveal>
          <Reveal delayClass="reveal--delay-1">
            <h2 id="services-heading" className="services__heading">
              {props.headingLine1}
              <br />
              <span>{props.headingLine2}</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delayClass="reveal--delay-2">
          <p className="services__intro">{props.intro}</p>
        </Reveal>
      </div>

      <div className="services__grid-wrap">
        <div className="services__grid" role="list">
          {cards.map((card, i) => (
            <ServicesGridCard
              key={card.slug}
              card={card}
              delayClass={delayFor(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

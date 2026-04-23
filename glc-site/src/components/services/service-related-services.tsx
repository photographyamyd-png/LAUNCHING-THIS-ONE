import { ServicesGridCard } from "@/components/sections/services-grid-card";
import { Reveal } from "@/components/ui/reveal";
import type { MegaMenuCard } from "@/content/types";

type Props = {
  cards: MegaMenuCard[];
};

const delayFor = (i: number) => {
  if (i % 3 === 1) return "reveal--delay-1" as const;
  if (i % 3 === 2) return "reveal--delay-2" as const;
  return undefined;
};

export function ServiceRelatedServices({ cards }: Props) {
  if (!cards.length) return null;
  return (
    <section
      id="related-services"
      className="service-related-services"
      aria-labelledby="related-services-heading"
    >
      <div className="services__header">
        <div>
          <Reveal className="eyebrow eyebrow--dark" style={{ marginBottom: 16 }}>
            Related lines
          </Reveal>
          <Reveal delayClass="reveal--delay-1">
            <h2 id="related-services-heading" className="services__heading">
              Explore
              <br />
              <span>Other services</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delayClass="reveal--delay-2">
          <p className="services__intro">
            Same dispatch standards and field leadership across every Ground Level service line.
          </p>
        </Reveal>
      </div>
      <div className="services__grid-wrap">
        <div className="services__grid" role="list">
          {cards.map((card, i) => (
            <ServicesGridCard key={card.slug} card={card} delayClass={delayFor(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/reveal";
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import type { ServiceDetailContent } from "@/content/types";
const LONG_ITEM = 140;

type Props = {
  service: ServiceDetailContent;
};

export function ServiceScopeSection({ service }: Props) {
  const introJoined = service.intro.join(" ");
  return (
    <section id="scope" className="service-scope-band service-scope-band--editorial" aria-labelledby="scope-heading">
      <div className="service-scope-band__inner">
        <div className="service-scope-band__grid">
          <div className="service-scope-band__mast">
            <Reveal className="eyebrow eyebrow--dark service-scope-band__eyebrow">Scope of work</Reveal>
            <Reveal delayClass="reveal--delay-1">
              <h2 id="scope-heading" className="service-scope-band__title">
                {service.deliverablesHeading}
              </h2>
            </Reveal>
            <Reveal delayClass="reveal--delay-2" className="service-scope-band__quote-wrap">
              <blockquote className="service-scope-band__quote">
                <p>{introJoined}</p>
              </blockquote>
            </Reveal>
            <Reveal delayClass="reveal--delay-3" className="service-scope-band__actions">
              <SmartLink href="#field-capabilities" className="btn-ghost-dark">
                Explore capabilities
                <IconArrow />
              </SmartLink>
              <SmartLink href="#request-site-visit" className="btn-primary">
                Request site consult
                <IconArrow />
              </SmartLink>
            </Reveal>
          </div>

          <div className="service-scope-band__deliverables">
            <div className="service-scope-band__deliverables-head">
              <span className="service-scope-band__deliverables-kicker">What we deliver</span>
              <span className="service-scope-band__deliverables-rule" aria-hidden />
            </div>
            <ul className="service-scope-band__cards">
              {service.deliverables.map((item) => (
                <li key={item} className="service-scope-band__card">
                  {item.length > LONG_ITEM ? (
                    <details className="service-scope-band__details">
                      <summary className="service-scope-band__summary">{item.slice(0, 110).trim()}…</summary>
                      <p className="service-scope-band__details-body">{item}</p>
                    </details>
                  ) : (
                    <Reveal>
                      <p className="service-scope-band__card-text">{item}</p>
                    </Reveal>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="service-scope-band__closing" id="ready-to-scope">
          <Reveal delayClass="reveal--delay-3">
            <h3 className="service-scope-band__closing-title">{service.closingHeading}</h3>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

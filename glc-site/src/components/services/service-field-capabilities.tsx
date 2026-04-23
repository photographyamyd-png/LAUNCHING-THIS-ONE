import type { ServiceDetailContent } from "@/content/types";
import {
  ServiceLayoutVariantSection,
  type SubServiceSection,
} from "@/components/services/service-layout-variants";
import { ServiceCapabilityStickyNav } from "@/components/services/service-capability-sticky-nav";
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";
import { ROUTES } from "@/lib/routes";

type Props = {
  service: ServiceDetailContent;
  subSections: SubServiceSection[];
};

export function ServiceFieldCapabilities({ service, subSections }: Props) {
  const trust = service.trustBlock;
  const [trustLead, ...trustRest] = trust?.paragraphs ?? [];

  return (
    <section
      id="field-capabilities"
      className="service-field-capabilities"
      aria-label="Service capabilities and detail"
    >
      {trust ? (
        <div className="service-trust-shell">
          <div id={trust.id} className="service-trust-shell__grid">
            <div className="service-trust-shell__visual" aria-hidden>
              <div className="service-trust-shell__visual-pin" />
              <div className="service-trust-shell__photo" />
            </div>
            <div className="service-trust-shell__copy">
              <div className="eyebrow why__eyebrow service-trust-shell__eyebrow">Trust &amp; authority</div>
              <h2 className="why__heading service-trust-shell__heading">{trust.heading}</h2>
              {trustLead ? <p className="why__body service-trust-shell__lead">{trustLead}</p> : null}
              {trustRest.length ? (
                <details className="service-trust-shell__readmore">
                  <summary>Read the full standard of work</summary>
                  <div className="service-trust-shell__readmore-inner">
                    {trustRest.map((p) => (
                      <p key={p} className="why__body">
                        {p}
                      </p>
                    ))}
                  </div>
                </details>
              ) : null}
              <div className="service-trust-shell__cta">
                <SmartLink href={ROUTES.contact} className="btn-primary">
                  Talk to dispatch
                  <IconArrow />
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <ServiceCapabilityStickyNav sections={subSections} />

      <div className="service-cap-variant-list">
        {subSections.map((section) => (
          <ServiceLayoutVariantSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}

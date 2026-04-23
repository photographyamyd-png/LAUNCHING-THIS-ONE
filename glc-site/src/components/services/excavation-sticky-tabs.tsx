import type { ServiceDetailContent, SiteConfig } from "@/content/types";
import { SmartLink } from "@/components/ui/smart-link";
import { ROUTES } from "@/lib/routes";
import { getResolvedSections } from "@/lib/section-engine";

type Props = {
  service: ServiceDetailContent;
  site: SiteConfig;
};

export function ExcavationStickyTabs({ service, site }: Props) {
  getResolvedSections(service);
  const subServices = service.subServiceSections ?? [];

  const imageById: Record<string, string> = {
    "residential-commercial-excavation": "https://images.unsplash.com/photo-1617098474202-0d0d7f60f2d3?w=1400&q=80&auto=format",
    "subdivision-grading": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80&auto=format",
    "custom-home-grading": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1400&q=80&auto=format",
    "pool-excavation": "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1400&q=80&auto=format",
    "trenching-utilities": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1400&q=80&auto=format",
    "site-preparation": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80&auto=format",
    "lot-land-clearing": "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1400&q=80&auto=format",
    "hydrovac-excavation": "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1400&q=80&auto=format",
    "heavy-civil-site-prep": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format",
    "backfilling-compaction": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80&auto=format",
    "final-subgrade-lot-grading": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80&auto=format",
  };

  const sectionImage = (id: string, image?: string) =>
    image || imageById[id] || imageById["site-preparation"];

  return (
    <>
      <section className="excavation-tabs" aria-labelledby="excavation-tabs-heading">
        <div className="excavation-tabs__header">
          <div>
            <div className="eyebrow eyebrow--dark">Sub-Services</div>
            <h2 id="excavation-tabs-heading" className="services__heading">
              Excavation Service
              <br />
              <span>Scope & Delivery</span>
            </h2>
          </div>
          <p className="services__intro">{service.hero.lede}</p>
        </div>

        <div className="excavation-tabs__layout">
          <nav className="excavation-tabs__nav" aria-label="Excavation content sections">
            {service.scopeStrip.map((link) => (
              <a key={link.href} href={link.href} className="excavation-tabs__nav-link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {subServices.map((section, idx) => {
        const isAboutPattern = idx % 2 === 0;
        if (isAboutPattern) {
          return (
            <section key={section.id} id={section.id}>
              <div className="about__inner">
                <div className="about__media reveal">
                  <div className="about__media-shell">
                    <img src={sectionImage(section.id, section.image)} alt="" loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="about__copy">
                  <div className="eyebrow about__eyebrow reveal">Sub-Service</div>
                  <h2 className="about__heading reveal reveal--delay-1">{section.heading}</h2>
                  <div className="about__divider reveal reveal--delay-2" />
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="about__body reveal reveal--delay-2">
                      {paragraph}
                    </p>
                  ))}
                  {section.closing ? (
                    <div className="about__credentials reveal reveal--delay-3">
                      <div className="about__credential">
                        <div className="about__credential-title">Key Work</div>
                        <div className="about__credential-sub">{section.closing}</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        }

        return (
          <section key={section.id} id={section.id}>
            <div className="why__inner">
              <div className="why__copy">
                <div className="eyebrow why__eyebrow reveal">Sub-Service</div>
                <h2 className="why__heading reveal reveal--delay-1">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="why__body reveal reveal--delay-2">
                    {paragraph}
                  </p>
                ))}
                {section.closing ? (
                  <div className="why__reasons reveal reveal--delay-3">
                    <div className="why__reason">
                      <div className="why__reason-title">Key Work</div>
                      <p className="why__reason-text">{section.closing}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="why__media reveal">
                <div className="why__photo-shell">
                  <img src={sectionImage(section.id, section.image)} alt="" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section id="what-we-deliver" className="service-detail">
        <div className="service-detail__inner">
          <div className="service-detail__body">
            <h2>{service.deliverablesHeading}</h2>
            <div className="excavation-tabs__deliverables-grid">
              {service.deliverables.map((item) => (
                <div key={item} className="excavation-tabs__deliverable-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <aside className="service-detail__sidebar" aria-label="Deliverables sidebar">
            <h3>Dispatch</h3>
            <p>Barrie, Orillia, Wasaga Beach, Innisfil and all of Simcoe County.</p>
          </aside>
        </div>
      </section>

      {service.faq?.length ? (
        <section id="faq" className="service-detail">
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <h2>Frequently Asked Questions</h2>
              {service.faq.map((item) => (
                <details key={item.question} className="excavation-tabs__faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <aside className="service-detail__sidebar" aria-label="FAQ support">
              <h3>Need a direct answer?</h3>
              <p>
                Call <a href={`tel:${site.telephone}`}>{site.telephoneDisplay}</a> for site-specific
                questions.
              </p>
            </aside>
          </div>
        </section>
      ) : null}

      <section id="request-site-visit" className="excavation-tabs__cta">
        <div>
          <h3 className="excavation-tabs__heading">
            {service.ctaOverride?.heading ?? service.closingHeading}
          </h3>
          <p className="excavation-tabs__body">
            {service.ctaOverride?.supportingCopy ??
              "TODO_CONTENT_MAP_MISSING: request-site-visit-supporting-copy"}
          </p>
        </div>
        <div className="excavation-tabs__cta-actions">
          <a href={`tel:${site.telephone}`} className="btn-primary">
            {service.ctaOverride?.buttonLabel ?? "Request a Site Visit"}
          </a>
          <SmartLink href={`${ROUTES.home}#process`} className="btn-ghost">
            How we work
          </SmartLink>
        </div>
      </section>
    </>
  );
}

import type { ReactNode } from "react";
import { SmartLink } from "@/components/ui/smart-link";
import { commercialSnowFaqs } from "@/content/commercial-snow-faqs";
import {
  commercialSnowClosingCta,
  commercialSnowContracts,
  commercialSnowCredentialsStrip,
  commercialSnowEquipment,
  commercialSnowProcess,
  commercialSnowPropertyTypes,
  commercialSnowServiceArea,
  commercialSnowServices,
  commercialSnowServicesIntro,
  commercialSnowSla,
  commercialSnowTrustBadges,
  commercialSnowValueProp,
  commercialSnowVideoSection,
  commercialSnowWhyChoose,
} from "@/content/commercial-snow-page-data";

function SnowBand({
  children,
  tone = "light",
  id,
}: {
  children: ReactNode;
  tone?: "light" | "brand" | "white";
  id?: string;
}) {
  return (
    <section className={`glc-snow-band glc-snow-band--${tone}`} id={id}>
      <div className="glc-snow-band__inner">{children}</div>
    </section>
  );
}

function SnowAccordion({
  heading,
  children,
  id,
  defaultOpen = false,
}: {
  heading: ReactNode;
  children: ReactNode;
  id?: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className="glc-snow-details" id={id} open={defaultOpen}>
      <summary className="glc-snow-details__summary">
        <span className="glc-snow-details__chev" aria-hidden />
        {heading}
      </summary>
      <div className="glc-snow-details__body">{children}</div>
    </details>
  );
}

export function CommercialSnowPageMain() {
  return (
    <div className="glc-snow-page">
      <div className="glc-snow-trust-strip" aria-label="Commercial trust signals">
        <div className="glc-snow-trust-strip__inner">
          {commercialSnowTrustBadges.map((b) => (
            <div key={b.label} className="glc-snow-trust-strip__item">
              <span className="glc-snow-trust-strip__label">{b.label}</span>
              <span className="glc-snow-trust-strip__sub">{b.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <SnowBand tone="light" id="value-proposition">
        <h2 className="glc-snow-h2">{commercialSnowValueProp.heading}</h2>
        {commercialSnowValueProp.paragraphs.map((p, i) => (
          <p key={i} className="glc-snow-prose">
            {p}
          </p>
        ))}
      </SnowBand>

      <section className="glc-snow-ctv" id="ctv-news-barrie" aria-labelledby="ctv-heading">
        <div className="glc-snow-ctv__inner">
          <p className="glc-snow-ctv__eyebrow">{commercialSnowVideoSection.eyebrow}</p>
          <h2 id="ctv-heading" className="glc-snow-ctv__title">
            {commercialSnowVideoSection.heading}
          </h2>
          <h3 className="glc-snow-ctv__segment-title">{commercialSnowVideoSection.segmentTitle}</h3>
          <div className="glc-snow-ctv__body">
            <p className="glc-snow-ctv__subtitle">{commercialSnowVideoSection.ctvBodyParagraphs[0]}</p>
            <p className="glc-snow-ctv__published">{commercialSnowVideoSection.ctvBodyParagraphs[1]}</p>
          </div>
          <div className="glc-snow-ctv__frame">
            <iframe
              title={`${commercialSnowVideoSection.segmentTitle} — ${commercialSnowVideoSection.ctvBodyParagraphs[0]}`}
              src={commercialSnowVideoSection.segmentEmbedSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="glc-snow-ctv__note">
            <span className="glc-snow-ctv__note-label">Source — </span>
            <a href={commercialSnowVideoSection.ctvArticleUrl} target="_blank" rel="noopener noreferrer">
              CTV News Barrie: full segment and article
            </a>
          </p>
        </div>
      </section>

      <SnowBand tone="white" id="commercial-snow-services">
        <h2 className="glc-snow-h2">{commercialSnowServicesIntro.heading}</h2>
        <p className="glc-snow-prose glc-snow-prose--lead">{commercialSnowServicesIntro.lede}</p>
        <div className="glc-snow-svc-stack">
          {commercialSnowServices.map((svc, idx) => (
            <SnowAccordion
              key={svc.id}
              id={svc.fragment}
              defaultOpen={idx === 0}
              heading={<span className="glc-snow-details__h">{svc.heading}</span>}
            >
              <figure className="glc-snow-svc-fig">
                <div
                  className="glc-snow-svc-fig__ph"
                  role="img"
                  aria-label={svc.imageAlt}
                />
              </figure>
              <p className="glc-snow-prose">{svc.body}</p>
              <p className="glc-snow-svc-more">
                <SmartLink href={svc.moreHref} className="glc-snow-inline-link">
                  {svc.moreLabel}
                </SmartLink>
              </p>
            </SnowAccordion>
          ))}
        </div>
      </SnowBand>

      <SnowBand tone="light" id="equipment">
        <h2 className="glc-snow-h2">{commercialSnowEquipment.heading}</h2>
        <figure className="glc-snow-inline-fig">
          <div
            className="glc-snow-inline-fig__ph"
            role="img"
            aria-label={commercialSnowEquipment.imageAlt}
          />
        </figure>
        {commercialSnowEquipment.paragraphs.map((p, i) => (
          <p key={i} className="glc-snow-prose">
            {p}
          </p>
        ))}
      </SnowBand>

      <SnowBand tone="brand" id="sla-guarantees">
        <h2 className="glc-snow-h2 glc-snow-h2--on-dark">{commercialSnowSla.heading}</h2>
        <figure className="glc-snow-inline-fig glc-snow-inline-fig--dark">
          <div
            className="glc-snow-inline-fig__ph glc-snow-inline-fig__ph--dark"
            role="img"
            aria-label={commercialSnowSla.imageAlt}
          />
        </figure>
        {commercialSnowSla.paragraphs.map((p, i) => (
          <p key={i} className="glc-snow-prose glc-snow-prose--on-dark">
            {p}
          </p>
        ))}
      </SnowBand>

      <SnowBand tone="white" id="contracts">
        <h2 className="glc-snow-h2">{commercialSnowContracts.heading}</h2>
        <figure className="glc-snow-inline-fig">
          <div
            className="glc-snow-inline-fig__ph"
            role="img"
            aria-label={commercialSnowContracts.imageAlt}
          />
        </figure>
        {commercialSnowContracts.paragraphs.map((p, i) => (
          <p key={i} className="glc-snow-prose">
            {p}
          </p>
        ))}
      </SnowBand>

      <SnowBand tone="light" id="service-area">
        <h2 className="glc-snow-h2">{commercialSnowServiceArea.heading}</h2>
        <figure className="glc-snow-inline-fig">
          <div
            className="glc-snow-inline-fig__ph glc-snow-inline-fig__ph--map"
            role="img"
            aria-label={commercialSnowServiceArea.imageAlt}
          />
        </figure>
        {commercialSnowServiceArea.paragraphs.map((p, i) => (
          <p key={i} className="glc-snow-prose">
            {p}
          </p>
        ))}
        <p className="glc-snow-prose">
          {commercialSnowServiceArea.locationLinks.map((link, i) => (
            <span key={link.href}>
              {i > 0 ? " · " : null}
              <SmartLink href={link.href} className="glc-snow-inline-link">
                {link.label}
              </SmartLink>
            </span>
          ))}
        </p>
      </SnowBand>

      <SnowBand tone="white" id="why-choose">
        <h2 className="glc-snow-h2">{commercialSnowWhyChoose.heading}</h2>
        <div className="glc-snow-svc-stack">
          {commercialSnowWhyChoose.items.map((item, idx) => (
            <SnowAccordion
              key={item.title}
              defaultOpen={idx === 0}
              heading={
                <span>
                  <span className="glc-snow-details__h">{item.title}</span>
                  <span className="glc-snow-details__sub">{item.short}</span>
                </span>
              }
            >
              <div
                className="glc-snow-mini-ph"
                role="img"
                aria-label={item.imageAlt}
              />
              <p className="glc-snow-prose">{item.body}</p>
            </SnowAccordion>
          ))}
        </div>
      </SnowBand>

      <SnowBand tone="light" id="property-types">
        <h2 className="glc-snow-h2">{commercialSnowPropertyTypes.heading}</h2>
        <div className="glc-snow-svc-stack">
          {commercialSnowPropertyTypes.types.map((t, idx) => (
            <SnowAccordion
              key={t.title}
              defaultOpen={idx === 0}
              heading={<span className="glc-snow-details__h">{t.title}</span>}
            >
              <div className="glc-snow-mini-ph" role="img" aria-label={t.imageAlt} />
              <p className="glc-snow-prose">{t.body}</p>
            </SnowAccordion>
          ))}
        </div>
      </SnowBand>

      <SnowBand tone="brand" id="process">
        <h2 className="glc-snow-h2 glc-snow-h2--on-dark">{commercialSnowProcess.heading}</h2>
        <ol className="glc-snow-process">
          {commercialSnowProcess.steps.map((step, i) => (
            <li key={step.title} className="glc-snow-process__step">
              <span className="glc-snow-process__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="glc-snow-h3 glc-snow-h3--on-dark">{step.title}</h3>
                <p className="glc-snow-prose glc-snow-prose--on-dark">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </SnowBand>

      <SnowBand tone="white" id="faq">
        <h2 className="glc-snow-h2">Commercial Snow Removal FAQs - Barrie and Simcoe County</h2>
        <div className="glc-snow-svc-stack">
          {commercialSnowFaqs.map((faq, idx) => (
            <SnowAccordion
              key={faq.question}
              defaultOpen={idx === 0}
              heading={<span className="glc-snow-details__h">{faq.question}</span>}
            >
              <p className="glc-snow-prose">{faq.answer}</p>
            </SnowAccordion>
          ))}
        </div>
      </SnowBand>

      <SnowBand tone="light" id="credentials">
        <h2 className="glc-snow-h2">{commercialSnowCredentialsStrip.heading}</h2>
        <ul className="glc-snow-cred-list">
          {commercialSnowCredentialsStrip.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </SnowBand>

      <section className="glc-snow-final-cta" id="winter-ready">
        <div className="glc-snow-final-cta__inner">
          <h2 className="glc-snow-h2 glc-snow-h2--on-dark">{commercialSnowClosingCta.heading}</h2>
          {commercialSnowClosingCta.paragraphs.map((p, i) => (
            <p key={i} className="glc-snow-prose glc-snow-prose--on-dark">
              {p}
            </p>
          ))}
          <p className="glc-snow-urgency glc-snow-prose--on-dark">
            Limited seasonal contracts · Book now for guaranteed priority service · Early bird pricing — contact us for
            current season deadlines · Don&apos;t let winter slow your business operations
          </p>
          <div className="glc-snow-hero__cta-row glc-snow-final-cta__btns">
            <SmartLink href={commercialSnowClosingCta.ctas[0].href} className="glc-snow-btn glc-snow-btn--primary">
              {commercialSnowClosingCta.ctas[0].label}
            </SmartLink>
            <SmartLink href={commercialSnowClosingCta.ctas[1].href} className="glc-snow-btn glc-snow-btn--ghost">
              {commercialSnowClosingCta.ctas[1].label}
            </SmartLink>
            <SmartLink href={commercialSnowClosingCta.ctas[2].href} className="glc-snow-btn glc-snow-btn--line">
              {commercialSnowClosingCta.ctas[2].label}
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { ServiceDetailContent } from "@/content/types";

type Props = {
  service: ServiceDetailContent;
};

export function ServiceFaqSection({ service }: Props) {
  const items = service.faq ?? [];
  if (!items.length) return null;

  return (
    <section id="faq" className="service-faq" aria-labelledby="service-faq-heading">
      <div className="service-faq__inner">
        <div className="service-faq__head">
          <p className="eyebrow service-faq__eyebrow">FAQ</p>
          <h2 id="service-faq-heading" className="service-faq__title">
            Questions for{" "}
            <span>{service.schemaOfferName.split("&")[0].trim()}</span>
          </h2>
        </div>
        <div className="service-faq__list">
          {items.map((item) => (
            <details key={item.question} className="service-faq__details">
              <summary className="service-faq__summary">{item.question}</summary>
              <div className="service-faq__answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

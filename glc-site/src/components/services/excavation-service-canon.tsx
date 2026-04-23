import hub from "@/content/pages/excavation-hub-seo.json";

const canon = hub.canonSection as {
  eyebrow: string;
  heading: string;
  intro: string;
};
const services = hub.services as Array<{
  id: string;
  title: string;
  paragraphs: string[];
}>;

export function ExcavationServiceCanon() {
  return (
    <section
      id="excavation-capabilities"
      className="exc-canon gl-reveal"
      aria-labelledby="exc-canon-heading"
    >
      <div className="exc-canon__inner">
        <header className="exc-canon__header">
          <p className="gl-eyebrow gl-eyebrow--dark">{canon.eyebrow}</p>
          <h2 id="exc-canon-heading" className="gl-h2 exc-canon__heading">
            {canon.heading}
          </h2>
          <p className="gl-prose exc-canon__intro">{canon.intro}</p>
        </header>

        <div className="exc-canon__list" role="list">
          {services.map((svc, index) => (
            <details
              key={svc.id}
              id={svc.id}
              name="glc-exc-canon"
              className="exc-canon__disclosure gl-reveal"
            >
              <summary className="exc-canon__summary">
                <span className="exc-canon__summary-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="exc-canon__summary-main">
                  <span className="exc-canon__summary-eyebrow">Scope</span>
                  <h3 className="exc-canon__title">{svc.title}</h3>
                </span>
                <span className="exc-canon__chevron" aria-hidden />
              </summary>
              <div className="exc-canon__panel">
                <div className="exc-canon__rail" aria-hidden />
                <div className="exc-canon__body">
                  {svc.paragraphs.map((p, pi) => (
                    <p key={`${svc.id}-${pi}`} className="gl-prose exc-canon__para">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

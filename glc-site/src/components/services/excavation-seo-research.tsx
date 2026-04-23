import hub from "@/content/pages/excavation-hub-seo.json";

type Research = {
  eyebrow: string;
  heading: string;
  triggerLabel: string;
  triggerHint: string;
  primaryHeading: string;
  primaryKeywords: string[];
  secondaryHeading: string;
  secondaryKeywords: string[];
  longTailHeading: string;
  longTailKeywords: string[];
  geoHeading: string;
  geoLines: string[];
};

const research = hub.research as Research;

export function ExcavationSeoResearch() {
  return (
    <section
      className="exc-research gl-reveal"
      aria-labelledby="exc-research-heading"
    >
      <div className="exc-research__inner">
        <div className="exc-research__intro-block">
          <p className="gl-eyebrow gl-eyebrow--light">{research.eyebrow}</p>
          <h2 id="exc-research-heading" className="gl-h2 exc-research__heading">
            {research.heading}
          </h2>
          <p className="gl-prose gl-prose--light exc-research__hint">
            {research.triggerHint}
          </p>
        </div>

        <details className="exc-research__details">
          <summary className="exc-research__summary">
            <span className="exc-research__summary-label">{research.triggerLabel}</span>
            <span className="exc-research__summary-icon" aria-hidden />
          </summary>
          <div className="exc-research__panel">
            <div className="exc-research__columns">
              <div className="exc-research__col">
                <h3 className="exc-research__col-title">{research.primaryHeading}</h3>
                <ul className="exc-research__list">
                  {research.primaryKeywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
              <div className="exc-research__col">
                <h3 className="exc-research__col-title">{research.secondaryHeading}</h3>
                <ul className="exc-research__list">
                  {research.secondaryKeywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="exc-research__block">
              <h3 className="exc-research__col-title">{research.longTailHeading}</h3>
              <ul className="exc-research__list exc-research__list--dense">
                {research.longTailKeywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div className="exc-research__block exc-research__block--geo">
              <h3 className="exc-research__col-title">{research.geoHeading}</h3>
              <ul className="exc-research__geo-lines">
                {research.geoLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

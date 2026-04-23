import hub from "@/content/pages/excavation-hub-seo.json";

const geo = hub.geoHub as {
  eyebrow: string;
  heading: string;
  intro: string;
  territories: Array<{ name: string; sentence: string }>;
};

export function ExcavationGeoHub() {
  return (
    <section className="exc-geo gl-reveal" aria-labelledby="exc-geo-heading">
      <div className="exc-geo__inner">
        <div className="exc-geo__mast">
          <div className="exc-geo__map-block" aria-hidden>
            <div className="exc-geo__map-grid" />
            <span className="exc-geo__map-pin" />
          </div>
          <div className="exc-geo__mast-copy">
            <p className="gl-eyebrow gl-eyebrow--dark">{geo.eyebrow}</p>
            <h2 id="exc-geo-heading" className="gl-h2 exc-geo__heading">
              {geo.heading}
            </h2>
            <p className="gl-prose exc-geo__intro">{geo.intro}</p>
          </div>
        </div>
        <div className="exc-geo__territories">
          {geo.territories.map((t) => (
            <article key={t.name} className="exc-geo__card gl-reveal">
              <h3 className="exc-geo__card-title">{t.name}</h3>
              <p className="gl-prose exc-geo__card-text">{t.sentence}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

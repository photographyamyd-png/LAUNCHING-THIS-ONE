import hub from "@/content/pages/excavation-hub-seo.json";
import Image from "next/image";

const trust = hub.trust as {
  eyebrow: string;
  heading: string;
  pullquote: string;
  stats: Array<{ value: string; label: string }>;
  licensedLine: string;
  reviewsPlaceholder: string;
  galleryNote: string;
  mapNote: string;
};

export function ExcavationTrustStrip() {
  return (
    <section className="exc-trust gl-reveal" aria-labelledby="exc-trust-heading">
      <div className="exc-trust__inner">
        <div className="exc-trust__grid">
          <div className="exc-trust__media">
            <Image
              src="/images/excavation-and-foundations.png"
              alt="excavation crew and equipment on commercial site in Simcoe County Ontario"
              width={720}
              height={540}
              className="exc-trust__media-img"
            />
            <div className="exc-trust__media-scrim" aria-hidden />
          </div>

          <div className="exc-trust__copy">
            <p className="gl-eyebrow gl-eyebrow--dark">{trust.eyebrow}</p>
            <h2 id="exc-trust-heading" className="gl-h2 exc-trust__heading">
              {trust.heading}
            </h2>

            <div className="exc-trust__metrics">
              {trust.stats.map((s) => (
                <div key={s.label} className="exc-trust__metric">
                  <span className="exc-trust__metric-val">{s.value}</span>
                  <span className="exc-trust__metric-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <p className="gl-pullquote exc-trust__quote">{trust.pullquote}</p>
            <p className="gl-prose exc-trust__licensed">{trust.licensedLine}</p>
          </div>
        </div>

        <div className="exc-trust__deck">
          <div
            className="exc-trust__slot exc-trust__slot--reviews"
            data-placeholder="google-reviews"
          >
            <span className="exc-trust__slot-label">Google reviews</span>
            <p className="gl-prose exc-trust__slot-text">{trust.reviewsPlaceholder}</p>
          </div>
          <div className="exc-trust__slot exc-trust__slot--gallery">
            <span className="exc-trust__slot-label">Before / after</span>
            <p className="gl-prose exc-trust__slot-text">{trust.galleryNote}</p>
            <div className="exc-trust__thumb-pair" aria-hidden>
              <div className="exc-trust__thumb" />
              <div className="exc-trust__thumb" />
            </div>
          </div>
          <div className="exc-trust__slot exc-trust__slot--map">
            <span className="exc-trust__slot-label">Service footprint</span>
            <p className="gl-prose exc-trust__slot-text">{trust.mapNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

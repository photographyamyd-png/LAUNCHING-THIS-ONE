import hub from "@/content/pages/excavation-hub-seo.json";

type Props = {
  phoneDisplay: string;
  phoneHref: string;
};

const copy = hub.parallaxCta as { heading: string; responsePromise: string };

export function ExcavationParallaxCta({ phoneDisplay, phoneHref }: Props) {
  return (
    <section
      className="exc-parallax-cta gl-reveal"
      aria-labelledby="exc-parallax-cta-heading"
    >
      <div className="exc-parallax-cta__bg" aria-hidden />
      <div className="exc-parallax-cta__scrim" aria-hidden />
      <div className="exc-parallax-cta__inner">
        <div className="exc-parallax-cta__stripe" aria-hidden />
        <h2 id="exc-parallax-cta-heading" className="exc-parallax-cta__heading">
          {copy.heading}
        </h2>
        <a href={phoneHref} className="exc-parallax-cta__phone">
          {phoneDisplay}
        </a>
        <p className="exc-parallax-cta__promise">{copy.responsePromise}</p>
      </div>
    </section>
  );
}

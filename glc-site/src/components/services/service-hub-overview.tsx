/* eslint-disable @next/next/no-img-element */
import { Reveal } from "@/components/ui/reveal";
import type { ServiceDetailContent, ServiceHubStat } from "@/content/types";

const DEFAULT_MEDIA =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1100&q=80&auto=format";

type Props = {
  service: ServiceDetailContent;
  hubStats: ServiceHubStat[];
};

export function ServiceHubOverview({ service, hubStats }: Props) {
  const media = service.heroImage ?? DEFAULT_MEDIA;
  const body = service.hero.body ?? service.intro;
  const [lead, ...restBody] = body;
  return (
    <section id="overview" className="service-hub service-hub--editorial" aria-labelledby="overview-heading">
      <div className="about__inner service-hub__split service-hub__editorial-grid">
        <Reveal className="about__media service-hub__visual">
          <div className="service-hub__visual-slab" aria-hidden />
          <div className="about__media-shell service-hub__visual-frame">
            <img src={media} alt="" loading="lazy" decoding="async" />
          </div>
        </Reveal>
        <div className="about__copy service-hub__narrative">
          <Reveal className="eyebrow about__eyebrow">Overview</Reveal>
          <Reveal delayClass="reveal--delay-1">
            <h2 id="overview-heading" className="about__heading">
              {service.schemaOfferName.split("&")[0].trim()}{" "}
              <span>Capabilities</span>
            </h2>
          </Reveal>
          <Reveal delayClass="reveal--delay-2" className="about__divider service-hub__rule" />
          {lead ? (
            <Reveal delayClass="reveal--delay-2">
              <p className="about__body service-hub__lead">{lead}</p>
            </Reveal>
          ) : null}
          {restBody.length ? (
            <div className="service-hub__body-stack">
              {restBody.map((p, i) => (
                <Reveal key={p} delayClass="reveal--delay-2">
                  <p className={`about__body service-hub__support${i % 2 ? " service-hub__support--offset" : ""}`}>
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="service-hub__bridge service-hub__bridge--stagger">
        {hubStats.map((s, i) => {
          const delays: (undefined | "reveal--delay-1" | "reveal--delay-2" | "reveal--delay-3")[] = [
            undefined,
            "reveal--delay-1",
            "reveal--delay-2",
            "reveal--delay-3",
          ];
          return (
          <Reveal
            key={`${s.label}-${s.value}`}
            delayClass={delays[Math.min(i, 3)]}
            className={`service-hub__chip service-hub__chip--tilt-${(i % 3) + 1}`}
          >
            <span className="service-hub__chip-value">{s.value}</span>
            <span className="service-hub__chip-label">{s.label}</span>
            {s.sub ? <span className="service-hub__chip-sub">{s.sub}</span> : null}
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

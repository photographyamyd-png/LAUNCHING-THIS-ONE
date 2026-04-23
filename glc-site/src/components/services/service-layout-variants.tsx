/* eslint-disable @next/next/no-img-element */
import type { ServiceDetailContent } from "@/content/types";
import { SmartLink } from "@/components/ui/smart-link";
import { IconArrow } from "@/components/ui/icon-arrow";

const PARA_COLLAPSE_LEN = 220;

export type SubServiceSection = NonNullable<ServiceDetailContent["subServiceSections"]>[number] & {
  layout?: string;
  layoutVariant?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80&auto=format";

function SectionImage({ section }: { section: SubServiceSection }) {
  return (
    <div className="about__media-shell">
      <img src={section.image || DEFAULT_IMAGE} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return <div className="eyebrow eyebrow--dark">{text}</div>;
}

function SubServiceCards({ section }: { section: SubServiceSection }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "14px",
      }}
    >
      {section.paragraphs.map((paragraph) => (
        <article
          key={paragraph}
          style={{
            background: "var(--white)",
            borderLeft: "3px solid var(--yellow-core)",
            padding: "16px",
          }}
        >
          <p style={{ margin: 0 }}>{paragraph}</p>
        </article>
      ))}
      {section.closing ? (
        <article
          style={{
            background: "var(--charcoal-deep)",
            color: "var(--off-white)",
            padding: "16px",
            gridColumn: "1 / -1",
          }}
        >
          <strong style={{ color: "var(--yellow-core)" }}>Key Work</strong>
          <p style={{ margin: "8px 0 0" }}>{section.closing}</p>
        </article>
      ) : null}
    </div>
  );
}

function SplitLayout({
  section,
  reverse = false,
  ratio = "1fr 1fr",
  offset = false,
}: {
  section: SubServiceSection;
  reverse?: boolean;
  ratio?: string;
  offset?: boolean;
}) {
  const [leadPara, ...moreParas] = section.paragraphs;
  const leadLong = leadPara != null && leadPara.length > PARA_COLLAPSE_LEN;
  const hasMoreBody = moreParas.length > 0;
  const closingLong = section.closing != null && section.closing.length > 160;

  const textCol = (
    <div className={`about__copy service-cap-split__copy${reverse ? " service-cap-split__copy--reverse" : ""}`}>
      <Eyebrow text="Sub-Service" />
      <h2 className="about__heading">{section.heading}</h2>
      <div className="about__divider service-cap-split__rule" />
      {leadPara && !leadLong ? (
        <p className="about__body service-cap-split__lede">{leadPara}</p>
      ) : null}
      {leadPara && leadLong ? (
        <p className="about__body service-cap-split__lede">
          {`${leadPara.slice(0, 198).trim()}…`}
        </p>
      ) : null}
      {leadLong || hasMoreBody ? (
        <details className="service-cap-readmore">
          <summary>Technical depth &amp; field notes</summary>
          <div className="service-cap-readmore__inner">
            {leadLong ? (
              <p className="about__body">{leadPara}</p>
            ) : null}
            {moreParas.map((paragraph) => (
              <p key={paragraph} className="about__body">
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      ) : null}
      {section.closing ? (
        closingLong ? (
          <details className="service-cap-readmore service-cap-readmore--key">
            <summary>Key work snapshot</summary>
            <div className="about__credentials">
              <div className="about__credential">
                <div className="about__credential-title">Key Work</div>
                <div className="about__credential-sub">{section.closing}</div>
              </div>
            </div>
          </details>
        ) : (
          <div className="about__credentials service-cap-split__key">
            <div className="about__credential">
              <div className="about__credential-title">Key Work</div>
              <div className="about__credential-sub">{section.closing}</div>
            </div>
          </div>
        )
      ) : null}
      <div className="service-cap-split__actions">
        <SmartLink href="#request-site-visit" className="btn-primary">
          Site consult
          <IconArrow />
        </SmartLink>
        <SmartLink href="#field-capabilities" className="btn-ghost-dark">
          Capabilities menu
          <IconArrow />
        </SmartLink>
      </div>
    </div>
  );
  const mediaCol = (
    <div
      className={`about__media service-cap-split__media${offset ? " service-cap-split__media--offset" : ""}`}
    >
      <div className="service-cap-split__media-slab" aria-hidden />
      <SectionImage section={section} />
    </div>
  );

  return (
    <section
      id={section.id}
      className={`service-cap-block service-cap-block--split service-cap-block--editorial${reverse ? " service-cap-block--flip" : ""}`}
    >
      <div className="about__inner service-cap-split__grid" style={{ gridTemplateColumns: ratio }}>
        {reverse ? mediaCol : textCol}
        {reverse ? textCol : mediaCol}
      </div>
    </section>
  );
}

function StackedLayout({ section, compact = false, layered = false }: { section: SubServiceSection; compact?: boolean; layered?: boolean }) {
  return (
    <section id={section.id} style={{ padding: compact ? "var(--section-v) 0 32px" : undefined }}>
      <div
        className="service-detail__inner"
        style={
          layered
            ? {
                background:
                  "linear-gradient(135deg, rgba(34,32,30,1) 0%, rgba(22,20,18,1) 100%)",
                padding: "24px",
                borderTop: "2px solid var(--yellow-core)",
              }
            : undefined
        }
      >
        <div className="service-detail__body">
          <Eyebrow text="Sub-Service" />
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.closing ? <p><strong>Key Work:</strong> {section.closing}</p> : null}
        </div>
      </div>
    </section>
  );
}

function ContrastLayout({ section, mode }: { section: SubServiceSection; mode: "band" | "split" | "inset" | "left-bar" | "overlay" }) {
  const sectionStyle =
    mode === "band"
      ? { background: "var(--charcoal-deep)" }
      : mode === "split"
        ? {
            background:
              "linear-gradient(90deg, var(--charcoal-deep) 50%, var(--off-white) 50%)",
          }
        : undefined;
  const bodyStyle =
    mode === "inset"
      ? { background: "var(--white)", padding: "24px", border: "1px solid var(--gray-200)" }
      : mode === "left-bar"
        ? { borderLeft: "4px solid var(--yellow-core)", paddingLeft: "16px" }
        : mode === "overlay"
          ? {
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.72), rgba(0,0,0,0.5)), url('" +
                (section.image || DEFAULT_IMAGE) +
                "') center/cover no-repeat",
              color: "var(--off-white)",
              padding: "24px",
            }
          : undefined;

  return (
    <section id={section.id} style={sectionStyle}>
      <div className="service-detail__inner">
        <div className="service-detail__body" style={bodyStyle}>
          <Eyebrow text="Sub-Service" />
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.closing ? <p><strong>Key Work:</strong> {section.closing}</p> : null}
        </div>
      </div>
    </section>
  );
}

function GridLayout({ section, columns }: { section: SubServiceSection; columns: number }) {
  return (
    <section id={section.id} className="service-detail">
      <div className="service-detail__inner">
        <div className="service-detail__body">
          <Eyebrow text="Sub-Service" />
          <h2>{section.heading}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: "14px",
            }}
          >
            {section.paragraphs.map((paragraph) => (
              <article key={paragraph} style={{ background: "var(--white)", padding: "16px" }}>
                <p style={{ margin: 0 }}>{paragraph}</p>
              </article>
            ))}
          </div>
          {section.closing ? <p style={{ marginTop: "14px" }}><strong>Key Work:</strong> {section.closing}</p> : null}
        </div>
      </div>
    </section>
  );
}

export function ServiceLayoutVariantSection({ section }: { section: SubServiceSection }) {
  const layout = section.layout || section.layoutVariant || "split-default";
  switch (layout) {
    case "split-default":
      return <SplitLayout section={section} />;
    case "split-reverse":
      return <SplitLayout section={section} reverse />;
    case "split-asym-left":
      return <SplitLayout section={section} ratio="1.25fr 0.75fr" />;
    case "split-asym-right":
      return <SplitLayout section={section} ratio="0.75fr 1.25fr" reverse />;
    case "split-offset":
      return <SplitLayout section={section} offset />;
    case "stacked-tight":
      return <StackedLayout section={section} compact />;
    case "stacked-feature":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              <div style={{ width: "64px", borderBottom: "2px solid var(--yellow-core)", marginBottom: "10px" }} />
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.closing ? <a className="btn-ghost" href="#request-site-visit">Request a Site Visit</a> : null}
            </div>
          </div>
        </section>
      );
    case "stacked-card-grid":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              <SubServiceCards section={section} />
            </div>
          </div>
        </section>
      );
    case "stacked-highlight":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              {section.paragraphs[0] ? (
                <blockquote
                  style={{
                    margin: "0 0 12px",
                    borderLeft: "3px solid var(--yellow-core)",
                    padding: "8px 12px",
                    background: "var(--white)",
                  }}
                >
                  {section.paragraphs[0]}
                </blockquote>
              ) : null}
              {section.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.closing ? <p><strong>Key Work:</strong> {section.closing}</p> : null}
            </div>
          </div>
        </section>
      );
    case "stacked-layered":
      return <StackedLayout section={section} layered />;
    case "contrast-band":
      return <ContrastLayout section={section} mode="band" />;
    case "contrast-split":
      return <ContrastLayout section={section} mode="split" />;
    case "contrast-inset":
      return <ContrastLayout section={section} mode="inset" />;
    case "contrast-left-bar":
      return <ContrastLayout section={section} mode="left-bar" />;
    case "contrast-overlay":
      return <ContrastLayout section={section} mode="overlay" />;
    case "grid-2-col":
      return <GridLayout section={section} columns={2} />;
    case "grid-3-col":
      return <GridLayout section={section} columns={3} />;
    case "grid-masonry":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body" style={{ columns: 2, columnGap: "14px" }}>
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <article
                  key={paragraph}
                  style={{ breakInside: "avoid", marginBottom: "14px", background: "var(--white)", padding: "14px" }}
                >
                  {paragraph}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "grid-feature-first":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "14px" }}>
                <article style={{ background: "var(--charcoal-deep)", color: "var(--off-white)", padding: "16px" }}>
                  {section.paragraphs[0]}
                </article>
                {section.paragraphs.slice(1).map((paragraph) => (
                  <article key={paragraph} style={{ background: "var(--white)", padding: "16px" }}>
                    {paragraph}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case "grid-inline-icons":
      return (
        <section id={section.id}>
          <div className="service-detail__inner">
            <div className="service-detail__body">
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <div key={paragraph} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: "10px", marginBottom: "10px" }}>
                  <span aria-hidden style={{ color: "var(--yellow-core)", fontWeight: 700 }}>+</span>
                  <p style={{ margin: 0 }}>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "timeline-flow":
      return (
        <section id={section.id} className="service-cap-block service-cap-timeline">
          <div className="process__inner">
            <div className="process__header service-cap-timeline__header">
              <Eyebrow text="Sub-service flow" />
              <h2 className="process__heading service-cap-timeline__title">{section.heading}</h2>
            </div>
            <div className="process__steps service-cap-timeline__steps">
              {section.paragraphs.map((paragraph, index) => (
                <div className="process__step" key={paragraph}>
                  <div className="process__step-circle" aria-hidden>
                    <span className="process__step-num">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="process__step-well">
                    <p className="process__step-desc">{paragraph}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "sticky-split":
      return (
        <section id={section.id}>
          <div className="service-detail__inner" style={{ gridTemplateColumns: "0.8fr 1.2fr" }}>
            <aside className="service-detail__sidebar" style={{ position: "sticky", top: "110px" }}>
              <Eyebrow text="Sub-Service" />
              <h3>{section.heading}</h3>
            </aside>
            <div className="service-detail__body">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      );
    case "media-bleed":
      return (
        <section id={section.id} className="service-cap-block service-cap-block--split service-cap-block--bleed">
          <div className="about__inner service-cap-block__inner--bleed">
            <div className="about__copy">
              <Eyebrow text="Sub-Service" />
              <h2 className="about__heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about__body">{paragraph}</p>
              ))}
            </div>
            <div className="about__media service-cap-block__media--bleed">
              <SectionImage section={section} />
            </div>
          </div>
        </section>
      );
    case "hero-layered":
      return (
        <section id={section.id} style={{ position: "relative", overflow: "hidden" }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(120deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('${section.image || DEFAULT_IMAGE}') center/cover no-repeat`,
            }}
          />
          <div className="service-detail__inner" style={{ position: "relative", zIndex: 1 }}>
            <div className="service-detail__body" style={{ color: "var(--off-white)" }}>
              <Eyebrow text="Sub-Service" />
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      );
    case "cta-emphasis":
      return (
        <section id={section.id}>
          <div
            className="cta-band__inner"
            style={{
              background: "var(--charcoal-deep)",
              borderTop: "2px solid var(--yellow-core)",
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              padding: "32px",
            }}
          >
            <Eyebrow text="Sub-Service" />
            <h2 className="cta-band__heading">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="cta-band__sub">{paragraph}</p>
            ))}
            <a href="#request-site-visit" className="btn-primary">Request a Site Visit</a>
          </div>
        </section>
      );
    default:
      throw new Error(`Missing structural renderer for layout variant: ${layout}`);
  }
}

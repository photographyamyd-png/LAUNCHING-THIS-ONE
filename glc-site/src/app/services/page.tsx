import type { Metadata } from "next";
import hub from "@/content/pages/services-index.json";
import navigation from "@/content/navigation.json";
import type { NavigationConfig } from "@/content/types";
import { SmartLink } from "@/components/ui/smart-link";
import { ROUTES } from "@/lib/routes";
import site from "@/content/site.json";
import type { SiteConfig } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

const navData = navigation as NavigationConfig;
const siteData = site as SiteConfig;

type Hub = {
  breadcrumb: { homeLabel: string; currentLabel: string };
  title: string;
  titleEmphasis: string;
  lede: string;
  cardCtaLabel: string;
  cardDesc: string;
};

const hubData = hub as Hub;

const servicesSeo = pageMetadata({
  title: `Services | ${siteData.name}`,
  description: hubData.lede,
  path: ROUTES.services,
});

export const metadata: Metadata = {
  ...servicesSeo,
  openGraph: {
    ...servicesSeo.openGraph,
    siteName: siteData.name,
  },
};

export default function ServicesIndexPage() {
  return (
    <main id="main-content">
      <section
        className="service-page-hero"
        style={{ paddingTop: "calc(var(--gl-header-height) + 32px)" }}
      >
        <div className="service-page-hero__bg" aria-hidden="true" />
        <div className="service-page-hero__inner">
          <p className="service-page-hero__breadcrumb">
            <SmartLink href={ROUTES.home}>{hubData.breadcrumb.homeLabel}</SmartLink>
            {" · "}
            {hubData.breadcrumb.currentLabel}
          </p>
          <h1 className="service-page-hero__title">
            {hubData.title}
            <em>{hubData.titleEmphasis}</em>
          </h1>
          <p className="service-page-hero__lede">{hubData.lede}</p>
        </div>
      </section>

      <section className="service-detail" style={{ background: "var(--off-white)" }}>
        <div
          className="container"
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <div className="services-hub__grid" style={{ marginTop: 0 }}>
            {navData.megaMenu.cards.map((card) => (
              <SmartLink
                key={card.slug}
                className="service-card"
                style={{ minHeight: 200 }}
                href={ROUTES.service(card.slug)}
              >
                <div className="service-card__num">{card.num}</div>
                <h3 className="service-card__title">
                  {card.gridTitle.map((line, i) => (
                    <span key={`${card.slug}-h-${i}`}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="service-card__desc">{hubData.cardDesc}</p>
                <span className="service-card__link">
                  {hubData.cardCtaLabel}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

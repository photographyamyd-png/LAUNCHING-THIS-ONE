import { JsonLdFaq } from "@/components/seo/json-ld-faq";
import { JsonLdService } from "@/components/seo/json-ld-service";
import { ContactBand } from "@/components/sections/ContactBand";
import { CoverageSection } from "@/components/sections/coverage-section";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { ParallaxTypeBand } from "@/components/sections/parallax-type-band";
import { Process } from "@/components/sections/Process";
import { StatsBar } from "@/components/sections/StatsBar";
import { ScopeStrip } from "@/components/ui/scope-strip";
import { ServiceFieldCapabilities } from "@/components/services/service-field-capabilities";
import { ServiceFaqSection } from "@/components/services/service-faq-section";
import { ServiceHubOverview } from "@/components/services/service-hub-overview";
import { ServicePageHero } from "@/components/services/service-page-hero";
import { ServiceRelatedServices } from "@/components/services/service-related-services";
import { ServiceScopeSection } from "@/components/services/service-scope-section";
import home from "@/content/pages/home.json";
import navigation from "@/content/navigation.json";
import type { HomePageContent, NavigationConfig, ServiceDetailContent, SiteConfig } from "@/content/types";
import { getResolvedSubServiceSections } from "@/lib/section-engine";
import { resolveHubStats, resolveProcessSection } from "@/lib/service-defaults";
import { ROUTES } from "@/lib/routes";
import { canonicalUrl } from "@/lib/seo";

type Props = {
  service: ServiceDetailContent;
  site: SiteConfig;
};

export function ServicePageView({ service, site }: Props) {
  const homeContent = home as HomePageContent;
  const navData = navigation as NavigationConfig;
  const marquee = homeContent.sections.find((section) => section.type === "marquee");
  const coverage = homeContent.sections.find((section) => section.type === "coverage");
  const stats = homeContent.sections.find((section) => section.type === "stats");
  const ctaBand = homeContent.sections.find((section) => section.type === "ctaBand");
  const subSections = getResolvedSubServiceSections(service);
  const hubStats = resolveHubStats(service);
  const processSection = resolveProcessSection(service);
  const servicePageUrl = canonicalUrl(ROUTES.service(service.slug));

  const relatedCards = navData.megaMenu.cards.filter((c) => c.slug !== service.slug).slice(0, 3);

  const ctaProps =
    ctaBand && ctaBand.type === "ctaBand"
      ? {
          ...ctaBand.props,
          sub: service.ctaOverride?.supportingCopy ?? ctaBand.props.sub,
        }
      : null;

  return (
    <>
      <JsonLdService
        site={site}
        serviceName={service.schemaOfferName}
        serviceUrl={servicePageUrl}
        description={service.meta.description}
      />
      <JsonLdFaq items={service.faq ?? []} />
      <main id="main-content">
        <ServicePageHero service={service} />
        {marquee && marquee.type === "marquee" ? <MarqueeTicker {...marquee.props} /> : null}

        <ScopeStrip links={service.scopeStrip} />

        <ServiceHubOverview service={service} hubStats={hubStats} />
        {service.parallaxBand ? (
          <ParallaxTypeBand
            id={`${service.slug}-type-band`}
            tone="light"
            eyebrow={service.parallaxBand.eyebrow}
            title={service.parallaxBand.title}
            subtitle={service.parallaxBand.subtitle}
            imageSrc={service.parallaxBand.image}
            imageAlt={service.parallaxBand.imageAlt}
          />
        ) : null}
        <ServiceScopeSection service={service} />
        <ServiceFieldCapabilities service={service} subSections={subSections} />

        {processSection ? <Process {...processSection} /> : null}

        <ServiceFaqSection service={service} />
        <ServiceRelatedServices cards={relatedCards} />

        {coverage && coverage.type === "coverage" ? <CoverageSection {...coverage.props} /> : null}
        {stats && stats.type === "stats" ? <StatsBar {...stats.props} /> : null}

        {ctaProps ? (
          <ContactBand {...ctaProps} sectionId="request-site-visit" />
        ) : null}
      </main>
    </>
  );
}
